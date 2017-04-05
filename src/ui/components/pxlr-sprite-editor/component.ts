import Component, {tracked} from "@glimmer/component";

class Pixel {
  id: number = Date.now();
  @tracked color: string;

  constructor(color = "#ffffff") {
    this.color = color;
  }
}

export default class PxlrSpriteEditor extends Component {
  @tracked width: number = 16;
  @tracked height: number = 16;
  @tracked activeColor: string = "green";
  @tracked pixels: Pixel[][] = [[new Pixel()]];

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
    let row = [];
    for (let i = 0; i < this.pixels[0].length; i++) {
      row.push(new Pixel());
    }
    this.pixels = [...this.pixels, row]
  }

  addColumn() {
    this.pixels = this.pixels.map(row => [...row, new Pixel()]);
  }

  updateDimensions(dimension, event) {
    this[dimension] = parseInt(event.target.value, 10);
  }

  updateSpriteDimensions() {
    while (this.width > this.pixels[0].length) {
      this.addColumn();
    }

    while (this.height > this.pixels.length) {
      this.addRow();
    }
  }
}
