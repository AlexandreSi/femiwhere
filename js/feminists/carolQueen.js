const Feminist = require('../feminist');

module.exports = new Feminist(
  'Carol Queen',
  [
    {
      latitude: 37.769096,
      longitude: -122.484979,
      title: 'San Francisco',
      year: 1957,
    },
    {
      latitude: 37.769096,
      longitude: -122.484979,
      title: 'San Francisco',
      year: 'today',
    },
  ],
  ['https://en.wikipedia.org/wiki/Carol_Queen'],
);
