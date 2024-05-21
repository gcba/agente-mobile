import { IAgentConfig } from '../../../../../src/models';

const agentConfig: IAgentConfig = {
    dwnUrl: 'https://dwn-ssi.buenosaires.gob.ar/',
    universalResolverUrl: 'https://proxyquarkid.extrimian.com',//'https://node-ssi.buenosaires.gob.ar',
    didMethod: 'did:quarkid',//'did:quarkid:zksync',
    entities: 'https://quarkid.org/.well-known/did.json'
};

export default agentConfig;
