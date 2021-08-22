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
    this.focusButton.hide()
    this.focusButton.on('click', this.onClickFocusButton.bind(this))
    this.backToGlobalViewButton = description.find("#back-to-global-view");
    this.backToGlobalViewButton.hide()
    this.backToGlobalViewButton.on('click', this.onClickBackToGlobalViewButton.bind(this))
  }

  onClickFocusButton(event) {
    event.preventDefault();
    PubSub.publish('map', {event: 'focus', object: this.feminist})
    this.focusButton.hide()
    this.backToGlobalViewButton.show()
  }

  onClickBackToGlobalViewButton(event) {
    event.preventDefault();
    PubSub.publish('map', {event: 'backToGlobalView', object: this.feminist})
    this.focusButton.show()
    this.backToGlobalViewButton.hide()
  }

  changeDescription(queue, data) {
    if (data.event === 'hit') {
      this.feminist = data.object
      this.focusButton.show();
      this.name.text(this.feminist.name);
      this.references.html('');
      this.feminist.references.map(reference => this.references.append(`<li>${reference}</li>`));
    }
  }
}

new Description();
