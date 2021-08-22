import PubSub from 'pubsub-js';
import {drawFeminists} from "./map";

export default class FeministsPlot {
  constructor(chart, feminists) {
    this.chart = chart;
    this.feminists = feminists;
    this.mapElements = drawFeminists(chart, feminists);
    PubSub.subscribe('time', this.updatePlot.bind(this))
  }

  updatePlot(queue, year) {
    const parsedYear = parseInt(year)
    const feministsToDraw = this.feminists.filter(feminist => (feminist.birthYear <= parsedYear) && (feminist.deathYear >= parsedYear))
    this.mapElements.map(element => {
      if ((element.feminist.birthYear <= parsedYear) && (element.feminist.deathYear >= parsedYear)) {
        element.appear(200)
      } else {
        element.hide(400)
      }
    })
  }
}
