const Feminist = require('../feminist');

module.exports = new Feminist('Liv Strömquist', [
  {
    latitude: 55.717507,
    longitude: 14.151440,
    title: 'Ravlunda',
    year: 1978,
  },
  {
    latitude: 55.602175,
    longitude: 12.996785,
    title: 'Malmo',
    year: 1998,
  },
  {
    latitude: 55.602175,
    longitude: 12.996785,
    title: 'Malmo',
    year: 'today',
  },
], [
  'https://en.wikipedia.org/wiki/Liv_Str%C3%B6mquist',
]);
