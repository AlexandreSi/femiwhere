import FeministsPlot from './feminists_plot';
import Feminist from './feminist';
import { createChart } from './map';
import feminists from './feminists';
import './i18n';
import './description';
import './slider';
import './languageSelector';
import './utils';

const chart = createChart();
const feministsPlot = new FeministsPlot(chart, feminists);
