const { getNavigatorLanguage } = require('./utils');

class LanguageSelector {
  constructor() {
    this.selector = $('#language-selector');
    const availableLanguages = { fr: 'Français', en: 'English' };
    Object.keys(availableLanguages).forEach((locale) => {
      const option = new Option(availableLanguages[locale], locale);
      $(option).html(availableLanguages[locale]);
      this.selector.append(option);
    });
    this.selector.val(getNavigatorLanguage());
    this.selector.change(LanguageSelector.onClickLanguage);
  }

  static onClickLanguage(event) {
    $.i18n.changeLanguage(event.target.value).then(() => {
      $('body').localize();
    });
  }
}

new LanguageSelector();
