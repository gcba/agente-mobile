import { IAgentConfig } from '../../../../../src/models';

const agentConfig: IAgentConfig = {
    dwnUrl: 'https://quarkid-dwn-dev.gcba.gob.ar/',
    universalResolverUrl: 'https://is-proxy-dev.gcba.gob.ar',
    didMethod: 'did:quarkid',//'did:quarkid:zksync',
    entities: 'https://quarkid.org/.well-known/did.dev.json'
};

export default agentConfig;
