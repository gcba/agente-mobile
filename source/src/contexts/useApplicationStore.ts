import {
    Agent,
    AgentModenaUniversalRegistry,
    AgentModenaUniversalResolver,
    ConnectableTransport,
    DID,
    DWNTransport,
    IdentityPlainTextDataShareBehavior,
    OpenIDProtocol,
    VerifiableCredential,
    WACIProtocol,
    WebsocketClientTransport,
} from '@extrimian/agent';
import { IJWK, IKeyPair } from '@quarkid/kms-core';
import { OneClickPlugin } from '@extrimian/one-click-agent-plugin';
import { NavigationProp } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import RNRestart from 'react-native-restart';
import { create } from 'zustand';
import agentConfig from '../config/agent';
import extraConfig from '../config/extra';
import i18n from '../locale';
import {
    IEntities,
    INotification,
    IssuerData,
    NotificationType,
    SecureStorageType,
    StateType,
    StorageItemsType,
    StorageType,
    VerifiableCredentialWithInfo,
} from '../models';
import { SecureStorage } from '../storages/secure-storage';
import { Storage } from '../storages/storage';

const applicationSecureStorage = new SecureStorage('application');
const applicationStorage = new Storage('application');

const agentSecureStorage = new SecureStorage('agent');
const agentStorage = new Storage('agent');
const vcStorage = new Storage('vc');
const waciStorage = new Storage('waci');
const openidStorage = new Storage('openid');

export const oneClickPlugin = new OneClickPlugin();

export const websocketTransport = new WebsocketClientTransport();
export const dwnTransport = new DWNTransport();

const initialStates = {
    state: StateType.STARTING,
    credentials: [],
    notifications: [],
    entities: [],
    navigation: null,
    isLoading: true,
    isConnected: false,
};

interface ApplicationStoreProps {
    // TO DO
    state: StateType;
    updateAvailableScreen: () => Promise<void>;
    credentialArrived: (data: { credentials: VerifiableCredentialWithInfo[]; issuer: IssuerData; messageId: string }) => Promise<void>;
    ackCompleted: (data: { status?: string; messageId: string; code?: string }) => Promise<void>;
    //
    agent: Agent;
    initialize: (navigation: NavigationProp<any>) => Promise<void>;
    processMessage: (message: any) => Promise<void>;
    reset: () => Promise<void>;
    credentials: VerifiableCredentialWithInfo[];
    notifications: INotification[];
    entities: IEntities[];
    navigation: NavigationProp<any>;
    isLoading: boolean;
    isConnected: boolean;
    setIsConnected: (isConnected: boolean) => void;
    setIsLoading: (isLoading: boolean) => void;
    did: {
        create: (didMethod: string, keysToImport?: { id: string; vmKey: any; publicKeyJWK: IJWK; secrets: IKeyPair }[]) => Promise<void>;
        import: (file: any) => Promise<void>;
        export: () => Promise<any>;
        current: () => Promise<DID>;
        confirm: () => Promise<void>;
    };
    credential: {
        remove: (id: string) => Promise<void>;
        get: (id: string) => Promise<VerifiableCredentialWithInfo>;
        add: (credential: VerifiableCredentialWithInfo) => Promise<void>;
        refresh: () => Promise<void>;
    };
    notification: {
        send: (type: NotificationType, extra?: any) => Promise<void>;
        remove: (id: string) => Promise<void>;
        add: (notification: INotification) => Promise<void>;
        read: (id: string) => Promise<void>;
    };
    pin: {
        set: (pin: string) => Promise<void>;
        authenticate: () => Promise<void>;
        validate: (pin: string) => Promise<boolean>;
    };
    introduction: {
        skip: () => Promise<void>;
    };
    tutorial: {
        skip: () => Promise<void>;
    };
}
export const useApplicationStore = create<ApplicationStoreProps>((set, get) => ({
    // Init states
    ...initialStates,
    // Actions
    initialize: async (navigation) => {
        const notifications: INotification[] = (await applicationStorage.get(StorageItemsType.NOTIFICATIONS)) || [];
        let data: IEntities[]
        await fetch(agentConfig.entities).then((res)=>{return res.json()}).then((j)=>{data = j.service}).catch((error) => {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
        const entities: IEntities[] = data || extraConfig.initialEntities || [];
        await get().agent.initialize();
        set(() => ({
            notifications,
            entities,
            navigation,
            isLoading: false,
        }));
        get().updateAvailableScreen();
    },
    setIsConnected: (isConnected) => set(() => ({ isConnected })),
    agent: new Agent({
        didDocumentRegistry: new AgentModenaUniversalRegistry(agentConfig.universalResolverUrl),
        didDocumentResolver: new AgentModenaUniversalResolver(agentConfig.universalResolverUrl),
        vcProtocols: [
            new WACIProtocol({
                holder: {
                    credentialApplication: async (inputs, message, issuer, credentialsToReceive) => {
                        const transport = get().agent.transport.getTranportByMessageId(message.id);
                        const isConnectableTransport = transport instanceof ConnectableTransport;

                        const alreadySeenNotifications = await applicationStorage.get(StorageItemsType.ALREADY_SEEN_NOTIFICATIONS);

                        const isAlreadySeen = alreadySeenNotifications && alreadySeenNotifications.includes(message.id);

                        if (isAlreadySeen) {
                            await applicationStorage.add(
                                StorageItemsType.ALREADY_SEEN_NOTIFICATIONS,
                                alreadySeenNotifications.filter((id: string) => id !== message.id)
                            );
                        }

                        if (isConnectableTransport) {
                            set(() => ({
                                isConnected: false,
                            }));
                        }

                        if (isConnectableTransport || isAlreadySeen) {
                            const verifiableCredentials = new Promise<VerifiableCredential[]>((resolve, reject) => {
                                const presentCredentials = (credentials: VerifiableCredential[]) => {
                                    set(() => ({
                                        isConnected: isConnectableTransport,
                                    }));
                                    resolve(credentials);
                                };
                                get().navigation.navigate('PresentCredentials', {
                                    inputs,
                                    issuer,
                                    credentialsToReceive,
                                    resolve: presentCredentials,
                                });
                            });
                            return verifiableCredentials;
                        } else {
                            if (!alreadySeenNotifications) {
                                await applicationStorage.add(StorageItemsType.ALREADY_SEEN_NOTIFICATIONS, [message.id]);
                            } else {
                                await applicationStorage.add(StorageItemsType.ALREADY_SEEN_NOTIFICATIONS, [...alreadySeenNotifications, message.id]);
                            }

                            get().notification.send(credentialsToReceive ? NotificationType.OFFER_CREDENTIAL : NotificationType.REQUEST_PRESENTATION, {
                                issuer,
                                message,
                            });

                            return new Promise<VerifiableCredential[]>((resolve, reject) => {});
                        }
                    },
                },
                storage: waciStorage,
            }),
            new OpenIDProtocol({
                storage: openidStorage,
            }),
        ],
        agentPlugins: [],
        agentStorage,
        secureStorage: agentSecureStorage,
        vcStorage,
        supportedTransports: [websocketTransport, dwnTransport],
    }),

    setIsLoading: (isLoading) => {
        set(() => ({ isLoading }));
    },
    credentialArrived: async ({ credentials, issuer, messageId }) => {
        const transport = get().agent.transport.getTranportByMessageId(messageId);
        const isConnectableTransport = transport instanceof ConnectableTransport;

        if (isConnectableTransport) {
            set(() => ({
                isConnected: false,
            }));
            setTimeout(() => {
                websocketTransport.dispose();
            }, 3000);
            get().navigation.navigate('AcceptCredentials', {
                credentials,
                issuer,
            });
        } else {
            get().notification.send(NotificationType.ISSUE_CREDENTIAL, {
                credentials,
                issuer,
            });
        }
    },
    ackCompleted: async ({ status, messageId, code }) => {
        const transport = get().agent.transport.getTranportByMessageId(messageId);
        const isConnectableTransport = transport instanceof ConnectableTransport;

        if (isConnectableTransport) {
            set(() => ({
                isConnected: false,
            }));
            websocketTransport.dispose();
            if (status) {
                get().navigation.navigate('VerificationResult', {
                    data: { status },
                });
            } else {
                get().navigation.navigate('VerificationResult', {
                    data: { code },
                });
            }
        } else {
            get().notification.send(NotificationType.PRESENTATION_ACK, {
                status,
                code,
            });
        }
    },
    updateAvailableScreen: async () => {
        if (get().state === StateType.STARTING) {
            if (await applicationSecureStorage.get(SecureStorageType.PIN)) {
                set(() => ({ state: StateType.UNAUTHENTICATED }));
            } else {
                set(() => ({ state: StateType.NO_PIN }));
                get().navigation.navigate('PinStack');
            }
        } else if (get().state === StateType.AUTHENTICATED) {
            if (!(await applicationStorage.get(StorageType.INTRODUCTION))) {
                get().navigation.navigate('Introduction');
            } else if (!(await applicationStorage.get(StorageType.WITH_DID))) {
                get().navigation.navigate('DidStack', { screen: 'CreateDid' });
            } else if (!(await applicationStorage.get(StorageType.CONFIRMED_DID))) {
                get().navigation.navigate('DidStack', { screen: 'ConfirmDid' });
            } else {
                get().navigation.navigate('MainStack', {
                    screen: 'TabStack',
                    params: {
                        tutorial: !(await applicationStorage.get(StorageType.TUTORIAL)),
                    },
                });
            }
        }
    },

    did: {
        create: async (didMethod, keysToImport) => {
            try {
                await get().agent.identity.createNewDID({
                    dwnUrl: agentConfig.dwnUrl,
                    preventCredentialCreation: true,
                    didMethod,
                    keysToImport,
                });
                const did = get().agent.identity.getOperationalDID();
                console.log('DID created:', did.value);
                await applicationStorage.add(StorageType.WITH_DID, true);
                await get().updateAvailableScreen();
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        import: async (file) => {
            await get().agent.identity.importKeys({
                exportResult: file,
                exportBehavior: new IdentityPlainTextDataShareBehavior(),
            });
            const did = get().agent.identity.getOperationalDID();
            console.log('DID imported:', did.value);
            await applicationStorage.add(StorageType.WITH_DID, true);
            await get().updateAvailableScreen();
        },
        export: async () => {
            const exportedKeys = await get().agent.identity.exportKeys({ exportBehavior: new IdentityPlainTextDataShareBehavior() });
            return exportedKeys;
        },
        current: async () => {
            return get().agent.identity.getOperationalDID();
        },
        confirm: async () => {
            await applicationStorage.add(StorageType.CONFIRMED_DID, true);
            await get().updateAvailableScreen();
        },
    },

    credential: {
        add: async (credential: VerifiableCredentialWithInfo) => {
            await get().agent.vc.saveCredentialWithInfo(credential.data, {
                display: credential.display,
                styles: credential.styles,
            });
            set((state) => ({ credentials: [...state.credentials, credential] }));
        },
        remove: async (id: string) => {
            await get().agent.vc.removeCredential(id);
            set((state) => ({ credentials: state.credentials.filter((credential) => credential.data.id !== id) }));
        },
        get: async (id: string) => {
            return get().credentials.find(({ data }) => data.id === id);
        },
        refresh: async () => {
            const credentials = await get().agent.vc.getVerifiableCredentialsWithInfo();
            set(() => ({ credentials }));
        },
    },

    notification: {
        remove: async (id: string) => {},
        add: async (notification: INotification) => {
            let notifications: INotification[] = get().notifications || [];
            notifications = [notification, ...notifications];
            await applicationStorage.add(StorageItemsType.NOTIFICATIONS, notifications);
            set(() => ({ notifications }));
        },
        read: async (id: string) => {
            let notifications: INotification[] = get().notifications || [];
            notifications = notifications.map((notification) => {
                if (notification.id === id) {
                    notification.read = true;

                    switch (notification.type) {
                        case NotificationType.ISSUE_CREDENTIAL:
                            get().navigation.navigate('AcceptCredentials', {
                                credentials: notification.extra.credentials,
                                issuer: notification.extra.issuer,
                            });
                            break;
                        case NotificationType.PRESENTATION_ACK:
                            get().navigation.navigate('VerificationResult', {
                                data: { status: notification.extra.status, code: notification.extra.code },
                            });
                            break;
                        default:
                            break;
                    }
                }

                return notification;
            });

            await applicationStorage.add(StorageItemsType.NOTIFICATIONS, notifications);
            set(() => ({ notifications }));
        },
        send: async (type, extra) => {
            let data = {
                type,
                id: Date.now().toString(),
                read: false,
                extra,
            } as INotification;
            switch (type) {
                case NotificationType.PRESENTATION_ACK:
                    if (extra.status) {
                        data = {
                            ...data,
                            title: 'notifications.' + type + '.titleOk',
                            body: 'notifications.' + type + '.bodyOk',
                        };
                    } else {
                        data = {
                            ...data,
                            title: 'notifications.' + type + '.titleFail',
                            body: 'notifications.' + type + '.bodyFail',
                        };
                    }
                    break;
                default:
                    data = {
                        ...data,
                        title: 'notifications.' + type + '.title',
                        body: 'notifications.' + type + '.body',
                    };
                    break;
            }

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: i18n.t(data.title),
                    body: i18n.t(data.body),
                },
                trigger: { seconds: 2 },
            });

            let notifications: INotification[] = get().notifications || [];
            notifications = [data, ...notifications];
            await applicationStorage.add(StorageItemsType.NOTIFICATIONS, notifications);
            set(() => ({ notifications }));
        },
    },

    pin: {
        set: async (pin: string) => {
            await applicationSecureStorage.add(SecureStorageType.PIN, pin);
            set(() => ({
                state: StateType.AUTHENTICATED,
            }));
            await get().updateAvailableScreen();
        },
        authenticate: async () => {
            set(() => ({
                state: StateType.AUTHENTICATED,
            }));
            await get().updateAvailableScreen();
        },
        validate: async (pin: string) => {
            return pin === (await applicationSecureStorage.get(SecureStorageType.PIN));
        },
    },

    introduction: {
        skip: async () => {
            await applicationStorage.add(StorageType.INTRODUCTION, true);
            await get().updateAvailableScreen();
        },
    },

    tutorial: {
        skip: async () => {
            await applicationStorage.add(StorageType.TUTORIAL, true);
        },
    },

    processMessage: async (message: any) => {
        await get().agent.processMessage(message);
    },

    reset: async () => {
        console.log('Resetting');
        await Promise.allSettled([applicationSecureStorage.clear(), agentSecureStorage.clear(), applicationStorage.clear()]);
        RNRestart.Restart();
    },
}));
