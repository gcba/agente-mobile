import { useNavigation } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { createContext, useContext, useEffect } from 'react';
import { Platform } from 'react-native';
import { shallow } from 'zustand/shallow';
import Authenticate from '../components/Authenticate';
import Loading from '../components/Loading';
import Waiting from '../components/Waiting';
import i18n from '../locale';
import { NotificationType, StateType } from '../models';
import { useApplicationStore, websocketTransport } from './useApplicationStore';

const initialState = {};

const Context = createContext(initialState);

export const AppProvider = ({ children }) => {
    const navigation = useNavigation();

    const { state, pin, isLoading, agent, isConnected, notification, credential } = useApplicationStore(
        (state) => ({
            state: state.state,
            pin: state.pin,
            notification: state.notification,
            isLoading: state.isLoading,
            credential: state.credential,
            agent: state.agent,
            isConnected: state.isConnected,
        }),
        shallow
    );

    const { setIsConnected, credentialArrived, ackCompleted, initialize, processMessage } = useApplicationStore(
        (state) => ({
            credentialArrived: state.credentialArrived,
            initialize: state.initialize,
            processMessage: state.processMessage,
            setIsConnected: state.setIsConnected,
            ackCompleted: state.ackCompleted,
        }),
        shallow
    );

    useEffect(() => {
        // Function initialize the app
        const initializeStores = async () => {
            await initialize(navigation);
        };

        // Function to handle credential arrived
        const handleCredentialArrived = (data) => {
            credentialArrived(data);
        };

        const handleAckCompleted = (data) => {
            ackCompleted(data);
        };

        const handleAuthenticate = () => {
            ackCompleted({ status: 'OK' });
        };

        const handleConnect = (e) => {
            setIsConnected(true);
        };

        const handleDisconnect = (e) => {
            setIsConnected(false);
        };

        // Function to get initial url
        const getInitialUrl = async (url) => {
            const message = url || (await Linking.getInitialURL());
            if (url && Platform.OS === 'ios') WebBrowser.dismissBrowser();
            if (message) processMessage({ message });
        };

        // Function to handle linking url
        const handleLinkingUrl = ({ url }) => {
            getInitialUrl(url);
        };

        // Function to initialize events
        const initializeEvents = async () => {
            getInitialUrl();
            credential.refresh();
            const linking = Linking.addEventListener('url', handleLinkingUrl);
            agent.vc.credentialArrived.on(handleCredentialArrived);
            agent.vc.ackCompleted.on(handleAckCompleted);
            agent.vc.problemReport.on(handleAckCompleted);
            agent.transport.connected.on(handleConnect);
            agent.transport.disconnected.on(handleDisconnect);
            // oneClickPlugin.problemReport.on(handleProblemReport);
            // oneClickPlugin.userLoggedIn.on(handleAuthenticate);

            return () => {
                linking.remove();
                agent.vc.credentialArrived.off(handleCredentialArrived);
                agent.vc.ackCompleted.off(handleAckCompleted);
                agent.vc.problemReport.off(handleProblemReport);
                // oneClickPlugin.problemReport.off(handleProblemReport);
                // oneClickPlugin.userLoggedIn.off(handleAuthenticate);
                agent.transport.connected.off(handleConnect);
                agent.transport.disconnected.off(handleDisconnect);
            };
        };

        const notifyCreation = async () => {
            await notification.send(NotificationType.DID_CREATED);
        };

        // Function to handle identity created
        const handleIdentityCreated = () => {
            agent.identity.operationalDIDChanged.on(initializeEvents);
            agent.identity.didCreated.on(notifyCreation);
            return () => {
                agent.identity.operationalDIDChanged.off(initializeEvents);
                agent.identity.didCreated.off(notifyCreation);
            };
        };

        // Initialize stores
        initializeStores();

        // Initialize events
        agent.identity.identityInitialized.on(() => {
            agent.identity.getOperationalDID() ? initializeEvents() : handleIdentityCreated();
        });

        return () => {
            agent.identity.identityInitialized.off();
        };
    }, []);

    return (
        <Context.Provider value={{}}>
            {/* {state === StateType.UNAUTHENTICATED && <Authenticate />} */}
            {isLoading && <Loading />}
            {isConnected && (
                <Loading
                    closeConnection={() => {
                        setIsConnected(false);
                        websocketTransport.dispose();
                    }}
                />
            )}
            {children}
        </Context.Provider>
    );
};

export const useAppProvider = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error('useAppProvider must be used within a AppProvider');
    }
    return context;
};
