import { VerifiableCredential } from '@extrimian/agent';
export enum StorageType {
    INTRODUCTION = 'introduction',
    TUTORIAL = 'tutorial',
    WITH_DID = 'withDid',
    CONFIRMED_DID = 'confirmDid',
}

export enum StorageItemsType {
    NOTIFICATIONS = 'notifications',
    ALREADY_SEEN_NOTIFICATIONS = 'alreadySeenNotifications',
}

export enum StateType {
    NO_PIN = 'noPin',
    UNAUTHENTICATED = 'unauthenticated',
    AUTHENTICATED = 'authenticated',
    STARTING = 'starting',
}

export enum SecureStorageType {
    PIN = 'pin',
}

export enum NotificationType {
    DID_CREATED = 'didCreated',
    ISSUE_CREDENTIAL = 'issueCredential',
    OFFER_CREDENTIAL = 'offerCredential',
    REQUEST_PRESENTATION = 'requestPresentation',
    PRESENTATION_ACK = 'presentationAck',
    PDF_ARRIVED = 'pdfArrived',
    TEXT_ARRIVED = 'textArrived'
}

export interface IAgentConfig {
    dwnUrl: string;
    universalResolverUrl: string;
    didMethod: string;
    entities: string;
}
export interface IExtraConfig {
    initialEntities: {
        title: string;
        description: string;
        url: string;
        style: IStyles;
    }[];
}

interface IIntroduction {
    title: string;
    subtitle?: string;
    description?: string;
    image: any;
}
export interface IStylesConfig {
    style: {
        primaryColor: string;
        secondaryColor: string;
        tertiaryColor: string;
        fontColor: string;
        footerColor: string;
        statusBar: 'light-content' | 'dark-content';
        introductionType?: 'all' | 'none';
        introductionResizeMode?: 'all' | 'none' | 'cover';
    };
    features: any[];
    introduction: {
        en: IIntroduction[];
        es?: IIntroduction[];
    };
    steps: any[];
}

export interface IStyles {
    thumbnail?: IStylesUri;
    hero?: IStylesUri;
    background?: IStylesColor;
    text?: IStylesColor;
}

export interface IStylesColor {
    color: string;
}

export interface IStylesUri {
    uri: string;
    alt: string;
}

export interface IProperties {
    path: string[];
    fallback: string;
    format?: string;
}

export interface IText {
    text: string;
}

export interface IDisplay {
    title?: string;
    subtitle?: string;
    description?: string;
    properties: (IProperties | IText)[];
}

export interface IVerifiableCredential {
    '@context': string[];
    id: string;
    type: string[] | string;
    credentialSubject: any;
    issuer: string;
    issuanceDate: string;
    expirationDate?: string;
}

export interface ICredential {
    data: IVerifiableCredential;
    styles?: IStyles;
    display?: IDisplay;
}

export interface INotification {
    type: any;
    id: string;
    title: string;
    body: string;
    data?: any;
    read?: boolean;
    extra?: any;
}

export interface IEntities {
    title: string;
    description: string;
    url: string;
    style: IStyles;
}

export type CredentialDisplay = {
    title?: DisplayMappingObject;
    subtitle?: DisplayMappingObject;
    description?: DisplayMappingObject;
    properties?: (DisplayMappingObject & {
        label?: string;
    })[];
};

export type DisplayMappingObject =
    | {
          path?: string[];
          schema?: {
              type?: string;
          };
          fallback?: string;
      }
    | {
          text: string;
      };

export type CredentialManifestStyles = {
    thumbnail?: ThumbnailImage;
    hero?: ThumbnailImage;
    background?: ColorDefinition;
    text?: ColorDefinition;
};

export type ColorDefinition = {
    color: string;
};
export type ThumbnailImage = {
    uri: string;
    alt: string;
};

export type IssuerData = {
    id: string;
    name: string;
    styles?: CredentialManifestStyles;
};

export type VerifiableCredentialWithInfo = {
    data: VerifiableCredential;
    styles: CredentialManifestStyles;
    display: CredentialDisplay;
};
