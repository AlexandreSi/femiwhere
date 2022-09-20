const Feminist = require('../feminist');

module.exports = new Feminist('Vandana Shiva', [
  {
    latitude: 30.325832,
    longitude: 78.045731,
    title: 'Dehradun',
    year: 1952,
  },
  {
    latitude: 30.759568,
    longitude: 76.766871,
    title: 'Chandigarh',
    year: 1970,
  },
  {
    latitude: 43.531580,
    longitude: -80.230362,
    title: 'Guelph',
    year: 1974,
  },
  {
    latitude: 12.976967,
    longitude: 77.593868,
    title: 'Bengalore',
    year: 1978,
  },
  {
    latitude: 12.976967,
    longitude: 77.593868,
    title: 'Bengalore',
    year: 'today',
  },
], [
  'https://en.wikipedia.org/wiki/Vandana_Shiva',
]);
