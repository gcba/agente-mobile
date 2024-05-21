import { IAgentConfig } from '../../../../../src/models';

const agentConfig: IAgentConfig = {
    dwnUrl: 'https://dwn-qa.gcba.gob.ar',
    universalResolverUrl: 'https://is-apiproxy-qa.gcba.gob.ar',
    didMethod: 'did:quarkid',//'did:quarkid:zksync',
    entities: 'https://quarkid.org/.well-known/did.qa.json'
};

export default agentConfig;
