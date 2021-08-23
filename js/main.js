import FeministsPlot from "./feminists_plot";
import Feminist from "./feminist";
import { createChart } from "./map";
import "./description";
import "./slider";

const virginiaWoolf = new Feminist("Virginia Woolf", [
  {
    "latitude": 51.5088,
    "longitude": -0.11753,
    "title": "Londres",
    "year": 1920,
  },
  {
    "latitude": 48.856614,
    "longitude": 2.3522219,
    "title": "Paris",
    "year": 1940,
  },
  {
    "latitude": 51.5088,
    "longitude": -0.11753,
    "title": "Londres",
    "year": 1970,
  }
], ["Une chambre à soi"])

const elenaLagadinova = new Feminist("Elena Lagadinova", [
  {
    "latitude": 42.7,
    "longitude": 23.33,
    "title": "Sofia",
    "year": 1930,
  },
  {
    "latitude": 42.7,
    "longitude": 23.33,
    "title": "Sofia",
    "year": 2017,
  },
], ["https://en.wikipedia.org/wiki/Sofia"])

const feminists = [];

feminists.push(virginiaWoolf, elenaLagadinova);

const chart = createChart();
const feministsPlot = new FeministsPlot(chart, feminists);
