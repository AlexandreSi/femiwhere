import PubSub from 'pubsub-js';

class Slider {
  constructor() {
    this.slider = $("#time");
    this.yearDisplay = $("#year-display");
    this.slider.on('input', (event) => this.onChangeYear(event.target.value));
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
