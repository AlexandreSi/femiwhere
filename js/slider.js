import PubSub from 'pubsub-js';
import $ from 'jquery';

class Slider {
  constructor() {
    this.slider = $("#time");
    this.yearDisplay = $("#year-display")
    this.slider.on('input', (event) => this.onChangeYear(event.target.value))
    this.slider.trigger('input');
  }

  onChangeYear(year) {
    PubSub.publish('time', year);
    this.yearDisplay.text(year)
  }
}

new Slider();

