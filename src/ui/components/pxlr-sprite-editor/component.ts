import Component, { tracked } from "@glimmer/component";

class Pixel {
  id: number = Date.now();
  @tracked color: string;

  constructor(color="#00ff00") {
    this.color = color;
  }
}

export default class PxlrSpriteEditor extends Component {
  @tracked pixels: Pixel[] = [ new Pixel() ];

  changeColor(color) {
    // this.pixels[0].color = color;
    this.pixels.forEach(pixel => pixel.color = color);
  }

  clickPixel(pixel) {
    pixel.color = "#ffffff";
  }

  addPixel() {
    let pixel = new Pixel();
    this.pixels = [ ...this.pixels, pixel ];
  }
}
