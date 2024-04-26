import { Base, BaseConverter } from '@quarkid/kms-core';
import { BbsBls2020Suite } from '@extrimian/kms-suite-bbsbls2020';
import { Buffer } from 'buffer';
import React from 'react';
import { emit, useNativeMessage, webViewRender } from 'react-native-react-bridge/lib/web';
global.Buffer = Buffer;

const WebModule = () => {
    useNativeMessage(async (message) => {
        switch (message.type) {
            case 'getBbsBlsSecrets':
                const bbsBls2020Suite = new BbsBls2020Suite();
                const bbsKeySecrets = await bbsBls2020Suite.create();
                const jwk = BaseConverter.convert(bbsKeySecrets.publicKey, Base.Base58, Base.JWK, bbsKeySecrets.keyType);

                emit({
                    type: 'sendBbsBlsSecrets',
                    data: {
                        secrets: bbsKeySecrets,
                        publicKeyJWK: jwk,
                        id: 'vc-bbs',
                        vmKey: 1,
                    },
                });
                break;
            default:
                break;
        }
    });

    return null;
};

export default webViewRender(<WebModule />);
