import Component, { tracked } from '@glimmer/component';

export default class PixelGrid extends Component {
  @tracked buttons = this.updateButtons();
  @tracked buttonColorClass = "blue";
  @tracked buttonColorStyle = "background-color: blue";

  didUpdate() {
    this.buttons = this.updateButtons();
  }

  updateButtons() {
    let width = this.args.width;
    let height = this.args.height;
    let buttons = [];

    for (let h = 0; h < height; h++) {
      let row = [];

      for (let w = 0; w < width; w++) {
        row.push(h + "," + w);
      }

      buttons.push(row);
    }

    return buttons;
  }

  internalAction(arg) {
    console.log('internal', arg);
    this.args.externalAction(arg, 'param2');
  }

  changeButtonColor() {
    this.buttonColorClass = this.buttonColorClass === "blue" ? "green" : "blue";
  }

  changeButtonStyle() {
    this.buttonColorStyle = this.buttonColorStyle === "background-color: blue" ? "background-color: green" : "background-color: blue";
  }
};
