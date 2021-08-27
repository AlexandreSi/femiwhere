import FeministsPlot from "./feminists_plot";
import Feminist from "./feminist";
import { createChart } from "./map";
import feminists from "./feminists";
import "./description";
import "./slider";

const chart = createChart();
const feministsPlot = new FeministsPlot(chart, feminists);
