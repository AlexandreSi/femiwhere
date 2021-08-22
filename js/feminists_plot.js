import PubSub from 'pubsub-js';
import {drawFeminists, drawTrajectory, zoomOnTrajectory} from "./map";

export default class FeministsPlot {
  constructor(chart, feminists) {
    this.chart = chart;
    this.feminists = feminists;
    this.feministsOnYearView = drawFeminists(chart, feminists);
    PubSub.subscribe('time', this.updateYearView.bind(this))
    PubSub.subscribe('map', this.focusOnFeminist.bind(this))
  }

  static byYearComparison(year) {
    const parsedYear = parseInt(year)
    return feminist => (feminist.birthYear <= parsedYear) && (feminist.deathYear >= parsedYear)
  }

  updateYearView(queue, year) {
    const feministsToDraw = this.feminists.filter(FeministsPlot.byYearComparison(year))
    this.feministsOnYearView.map(element => {
      if (feministsToDraw.indexOf(element.feminist) >= 0) {
        element.appear(200)
      } else {
        element.hide(400)
      }
    })
  }

  focusOnFeminist(queue, data) {
    if (data.event === 'focus') {
      const feministToFocus = data.object;
      this.feministsOnYearView.map(element => element.hide(400))
      console.log(feministToFocus.trajectory)
      drawTrajectory(this.chart, feministToFocus)
      zoomOnTrajectory(this.chart, feministToFocus)
    }
  }
}
