import i18next from 'i18next';

i18next.init({
    fallbackLng: 'en',
    resources: {
        pl: {
            translations: require('../locales/pl/translations.json')
        },
        en: {
            translations: require('../locales/en/translations.json')
        },
        no: {
            translations: require('../locales/no/translations.json')
        }
    },
    ns: ['translations'],
    defaultNS: 'translations',
    returnObjects: true,
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
        escapeValue: false,
    },
    react: {
        wait: true,
    },
});

i18next.languages = ['pl', 'en', 'no'];

export default i18next;