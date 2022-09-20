const PubSub = require('pubsub-js');

class Slider {
  constructor() {
    this.slider = $('#time');
    this.yearDisplay = $('#year-display');
    this.slider.on('input', (event) => this.onChangeYear(event.target.value));
    this.slider.attr({ max: new Date().getFullYear() });
    PubSub.subscribe('start', this.onChartReady.bind(this));
  }

  onChartReady() {
    this.slider.trigger('input');
  }

  onChangeYear(year) {
    PubSub.publish('time', year);
    this.yearDisplay.text(year);
  }
}

new Slider();
