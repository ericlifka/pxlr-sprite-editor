import Component, { tracked } from "@glimmer/component";

class Pixel {
  id: number = Date.now();
  @tracked color: string;

  constructor(color="#00ff00") {
    this.color = color;
  }
}

export default class PxlrSpriteEditor extends Component {
  @tracked pixels: Pixel[][] = [ [ new Pixel() ] ];

  changeColor(color) {
    // this.pixels[0].color = color;
    this.pixels.forEach(row => row.forEach(pixel => pixel.color = color));
  }

  clickPixel(pixel) {
    pixel.color = "#ffffff";
  }

  addRow() {
    // let pixel = new Pixel();
    // this.pixels = [ ...this.pixels, pixel ];
    let row = [];
    for (let i = 0; i < this.pixels[0].length; i++) {
      row.push(new Pixel());
    }
    this.pixels = [ ...this.pixels, row ]
  }

  addColumn() {
    this.pixels = this.pixels.map(row => [ ...row, new Pixel() ]);
  }
}
