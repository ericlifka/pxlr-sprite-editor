import Component, { tracked } from "@glimmer/component";

class Pixel {
  id: number = Date.now();
  @tracked color: string;

  constructor(color="#00ff00") {
    this.color = color;
  }
}

export default class PxlrSpriteEditor extends Component {
  @tracked activeColor: string = "green";
  @tracked pixels: Pixel[][] = [ [ new Pixel() ] ];

  didInsertElement() {
    this.activeColor = "#" + this.element.getElementsByClassName('jscolor')[0].value;
  }

  colorChange(event) {
    this.activeColor = "#" + event.target.value;
  }

  clickPixel(pixel) {
    pixel.color = this.activeColor;
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
