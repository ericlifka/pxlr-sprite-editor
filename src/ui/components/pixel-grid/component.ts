import Component, { tracked } from '@glimmer/component';

class Sprite {
  @tracked width;
  @tracked height;
  @tracked rows;

  constructor(width=16, height=16) {
    this.width = width;
    this.height = height;
    this.rows = [];
  }
}

class PixelRow {
  @tracked pixels;

  constructor() {
    this.pixels = [];
  }
}

class Pixel {
  @tracked color;

  constructor(color="#ffffff") {
    this.color = color;
  }
}

export default class PixelGrid extends Component {
  @tracked sprite = this.updateSprite();

  updateSprite() {
    let sprite = new Sprite(this.args.width, this.args.height);

    for (let y = 0; y < sprite.height; y++) {
      let row = new PixelRow();

      for (let x = 0; x < sprite.width; x++) {
        let pixel = new Pixel();
        row.pixels.push(pixel);
      }

      sprite.rows.push(row);
    }

    return sprite;
  }

  clickPixel(pixel) {
    pixel.color = "blue";
    window.pixel = pixel;
  }

  didUpdate() {
    this.sprite = this.updateSprite();
  }
};
