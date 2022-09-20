const jqueryI18next = require('jquery-i18next');
const i18next = require('i18next/dist/cjs/i18next');

const { getNavigatorLanguage } = require('./utils');

i18next.init(
  {
    lng: getNavigatorLanguage(),
    resources: {
      en: {
        translation: {
          app: {
            title: 'Find a feminist',
          },
          slider: {
            year: 'Year',
          },
        },
      },
      fr: {
        translation: {
          app: {
            title: "En quête d'une féministe ?",
          },
          slider: {
            year: 'Année',
          },
        },
      },
    },
  },
  () => {
    jqueryI18next.init(i18next, $, {
      tName: 't', // --> appends $.t = i18next.t
      i18nName: 'i18n', // --> appends $.i18n = i18next
      handleName: 'localize', // --> appends $(selector).localize(opts);
      selectorAttr: 'data-i18n', // selector for translating elements
      targetAttr: 'i18n-target', // data-() attribute to grab target element to translate (if different than itself)
      optionsAttr: 'i18n-options', // data-() attribute that contains options, will load/set if useOptionsAttr = true
      useOptionsAttr: false, // see optionsAttr
      parseDefaultValueFromContent: true, // parses default values from content ele.val or ele.text
    });

    $('body').localize();
  },
);
