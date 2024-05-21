import { IExtraConfig } from '../../../../../src/models';

const extraConfig: IExtraConfig = {
    initialEntities: [
        {
            title: 'Gobierno de la Ciudad de Buenos Aires',
            description: 'Emisión oficial de credenciales verificables del gobierno de la Ciudad de Buenos Aires',
            url: 'https://issuer-ssi.buenosaires.gob.ar/',
            style: {
                thumbnail: {
                    uri: 'https://i.ibb.co/xgVj07X/image.png',
                    alt: 'Logo',
                },
                hero: {
                    uri: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/27/82/36.jpg',
                    alt: 'Hero',
                },
                background: {
                    color: '#ECC717',
                },
                text: {
                    color: '#2B2B2D',
                },
            },
        },
    ],
};

export default extraConfig;
