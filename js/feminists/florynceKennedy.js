const Feminist = require('../feminist');

module.exports = new Feminist(
  'Florynce Kennedy',
  [
    {
      latitude: 39.119203,
      longitude: -94.53824,
      title: 'Kansas City',
      year: 1916,
    },
    {
      title: 'New York City',
      year: 1942,
    },
    {
      title: 'New York City',
      year: 2000,
    },
  ],
  ['https://en.wikipedia.org/wiki/Florynce_Kennedy'],
);
