const FeministsPlot = require('./feminists_plot');
const { createChart } = require('./map');
const feminists = require('./feminists');
require('./i18n');
require('./description');
require('./slider');
require('./languageSelector');
require('./utils');

const chart = createChart();
new FeministsPlot(chart, feminists);
