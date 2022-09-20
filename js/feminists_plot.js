const PubSub = require('pubsub-js');
const { drawFeminists, drawTrajectory, zoomOnTrajectory } = require('./map');

module.exports = class FeministsPlot {
  constructor(chart, feminists) {
    this.chart = chart;
    this.feminists = feminists;
    this.feministsOnYearView = drawFeminists(chart, feminists);
    this.currentFocus = null;
    this.currentYear = -9999;
    PubSub.subscribe('time', this.onTimeEvent.bind(this));
    PubSub.subscribe('map', this.onMapEvent.bind(this));
  }

  byYearComparison() {
    return (feminist) => feminist.birthYear <= this.currentYear
      && feminist.deathYear >= this.currentYear;
  }

  setCurrentYear(year) {
    this.currentYear = parseInt(year, 10);
  }

  onTimeEvent(queue, year) {
    this.setCurrentYear(year);
    this.plotFeministsForCurrentYear();
  }

  plotFeministsForCurrentYear() {
    const feministsToDraw = this.feminists.filter(this.byYearComparison());
    this.feministsOnYearView.forEach((element) => {
      if (feministsToDraw.indexOf(element.feminist) >= 0) {
        element.appear(200);
      } else {
        element.hide(400);
      }
    });
  }

  onMapEvent(queue, data) {
    if (data.event === 'focus') {
      const feministToFocus = data.object;
      this.feministsOnYearView.map((element) => element.hide(400));
      this.currentFocus = drawTrajectory(this.chart, feministToFocus);
      zoomOnTrajectory(this.chart, feministToFocus);
    } else if (data.event === 'backToGlobalView') {
      this.chart.goHome();
      this.currentFocus.map((series) => {
        this.chart.series
          .removeIndex(this.chart.series.indexOf(series))
          .dispose();
      });
      this.plotFeministsForCurrentYear();
    }
  }
};
