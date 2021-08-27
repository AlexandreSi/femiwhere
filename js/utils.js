export const getNavigatorLanguage = () => {
  const locale = new Intl.Locale(navigator.language || navigator.userLanguage)
  return locale.language
}
