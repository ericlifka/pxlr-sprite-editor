import Component, { tracked } from '@glimmer/component';

export default class PixelGrid extends Component {
  @tracked buttons = this.updateButtons();
  @tracked buttonColorClass = "blue";
  @tracked buttonColorStyle = "blue";

  @tracked sprite = this.updateSprite();

  updateSprite() {
    let sprite = {
      width: this.args.width || 8,
      height: this.args.height || 8,
      pixels: []
    };

    for (let y = 0; y < sprite.height; y++) {
      let row = [];

      for (let x = 0; x < sprite.width; x++) {
        let pixel = {
          x, y, color: "#ffffff"
        };
        row.push(pixel);
      }

      sprite.pixels.push(row);
    }

    return sprite;
  }

  clickPixel(pixel) {
    console.log('clicked:', pixel.x, pixel.y);
    this.pixels.pixels[pixel.y][pixel.x].color = "blue";
    this.pixels = { pixels: this.pixels.pixels };
  }

  didUpdate() {
    this.sprite = this.updateSprite();
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
