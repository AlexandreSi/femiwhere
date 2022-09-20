const Feminist = require('../feminist');

module.exports = new Feminist(
  'Carol Leigh',
  [
    {
      latitude: 40.753887,
      longitude: -73.889028,
      title: 'New York',
      year: 1951,
    },
    {
      latitude: 42.089863,
      longitude: -75.969047,
      title: 'Binghamton',
      year: 1968,
    },
    {
      latitude: 42.351432,
      longitude: -71.10073,
      title: 'Boston',
      year: 1974,
    },
    {
      title: 'San Francisco',
      year: 1977,
    },
    {
      title: 'San Francisco',
      year: 'today',
    },
  ],
  ['https://en.wikipedia.org/wiki/Carol_Leigh'],
);
