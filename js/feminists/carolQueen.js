const Feminist = require('../feminist');

module.exports = new Feminist(
  'Carol Queen',
  [
    {
      title: 'San Francisco',
      year: 1957,
    },
    {
      title: 'San Francisco',
      year: 'today',
    },
  ],
  ['https://en.wikipedia.org/wiki/Carol_Queen'],
);
