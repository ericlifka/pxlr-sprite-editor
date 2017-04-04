import Component, { tracked } from '@glimmer/component';

export default class PixelGrid extends Component {
  @tracked buttons = this.updateButtons();
  @tracked buttonColorClass = "blue";
  @tracked buttonColorStyle = "blue";

  @tracked pixels = this.updatePixels();

  updatePixels() {
    let width = this.args.width || 8;
    let height = this.args.height || 8;
    let pixels = [];

    for (let y = 0; y < height; y++) {
      let row = [];

      for (let x = 0; x < width; x++) {
        let pixel = {
          x, y, color: "#ffffff"
        };
        row.push(pixel);
      }

      pixels.push(row);
    }

    return pixels;
  }

  didUpdate() {
    this.buttons = this.updateButtons();
    this.pixels = this.updatePixels();
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
    this.buttonColorStyle = this.buttonColorStyle === "blue" ? "green" : "blue";
  }
};
