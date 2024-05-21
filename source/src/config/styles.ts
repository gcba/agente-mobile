import { IStylesConfig } from '../models';

const stylesConfig: IStylesConfig = {
    style: {
        primaryColor: '#f3f6f9',
        secondaryColor: '#404267',
        tertiaryColor: '#D7F1F6',
        fontColor: '#6B6C89',
        footerColor: '#fff',
        statusBar: 'dark-content',
        introductionType: 'all',
    },
    features: [],
    introduction: {
        es: [
            {
                title: 'Guardá de forma segura tus credenciales',
                image: require('../assets/introduction/Quark-onboarding_ESP-01.png'),
            },
            {
                title: 'Tu identidad, en tu teléfono',
                image: require('../assets/introduction/Quark-onboarding_ESP-02.png'),
            },
            {
                title: 'Ingresá a edificios, oficinas y eventos',
                image: require('../assets/introduction/Quark-onboarding_ESP-03.png'),
            },
            {
                title: 'Tus datos son privados y están bajo tu control',
                image: require('../assets/introduction/Quark-onboarding_ESP-04.png'),
            },
        ],
        en: [
            {
                title: 'Save your credentials safely',
                image: require('../assets/introduction/Quark-onboarding_ENG-01.png'),
            },
            {
                title: 'Your identity, on your phone',
                image: require('../assets/introduction/Quark-onboarding_ENG-02.png'),
            },
            {
                title: 'Enter buildings, offices and events',
                image: require('../assets/introduction/Quark-onboarding_ENG-03.png'),
            },
            {
                title: 'Your data is private and are under your control',
                image: require('../assets/introduction/Quark-onboarding_ENG-04.png'),
            },
        ],
    },
    steps: [require('../assets/steps/step1.png'), require('../assets/steps/step2.jpg'), require('../assets/steps/step3.jpg')],
};

export default stylesConfig;
