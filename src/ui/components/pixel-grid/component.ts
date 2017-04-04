import Component, { tracked } from '@glimmer/component';

export default class PixelGrid extends Component {
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

  clickPixel(x, y) {
    this.sprite.pixels[y][x].color = "blue";
  }

  didUpdate() {
    this.sprite = this.updateSprite();
  }
};
