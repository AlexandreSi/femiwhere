import PubSub from 'pubsub-js';
import $ from 'jquery'

class Description {
  constructor() {
    const description = $("#description");
    this.name = description.find("#name")
    this.references = description.find("#references");
    this.feminist = null;
    PubSub.subscribe('map', this.changeDescription.bind(this));
    this.focusButton = description.find("#focus");
    this.focusButton.on('click', this.onClickFocusButton.bind(this))
  }

  onClickFocusButton(event) {
    event.preventDefault();
    PubSub.publish('map', {event: 'focus', object: this.feminist})
  }

  changeDescription(queue, data) {
    if (data.event === 'hit') {
      this.feminist = data.object
      this.focusButton.html("Focus")
      this.name.text(this.feminist.name);
      this.references.html('');
      this.feminist.references.map(reference => this.references.append(`<li>${reference}</li>`));
    }
  }
}

new Description();
