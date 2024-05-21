import { IAgentConfig } from '../../../../../src/models';

const agentConfig: IAgentConfig = {
    dwnUrl: 'https://dwn-hml.gcba.gob.ar',
    universalResolverUrl: 'https://is-apiproxy-hml.gcba.gob.ar',
    didMethod: 'did:quarkid',//'did:quarkid:zksync',
    entities: 'https://quarkid.org/.well-known/did.hml.json'
};

export default agentConfig;
