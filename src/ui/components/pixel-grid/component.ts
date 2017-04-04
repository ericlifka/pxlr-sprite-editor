import Component, { tracked } from '@glimmer/component';

export default class PixelGrid extends Component {
  @tracked buttons = this.updateButtons();

  didUpdate() {
    this.buttons = this.updateButtons();
  }

  updateButtons() {
    let buttons = [];
    for (let i = 0; i < this.args.width; i++) {
      buttons.push(i);
    }
    return buttons;
  }
};
