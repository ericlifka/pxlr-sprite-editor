import Component, {tracked} from "@glimmer/component";

class Pixel {
  id: number = Date.now();
  @tracked color: string;

  constructor(color = "#ffffff") {
    this.color = color;
  }
}

export default class PxlrSpriteEditor extends Component {
  @tracked spriteActive: boolean;
  @tracked width: number = 16;
  @tracked height: number = 16;
  @tracked activeColor: string = "green";
  @tracked pixels: Pixel[][];

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
  removeRow() {
    this.pixels.pop();
    this.pixels = this.pixels;
  }

  addColumn() {
    this.pixels = this.pixels.map(row => [...row, new Pixel()]);
  }
  removeColumn() {
    this.pixels.forEach(row => row.pop());
    this.pixels = this.pixels;
  }

  updateDimensions(dimension, event) {
    this[dimension] = parseInt(event.target.value, 10);
  }

  createSprite() {
    let rows = [];
    for (let h = 0; h < this.height; h++) {
      let row = [];
      for (let w = 0; w < this.width; w++) {
        row.push(new Pixel());
      }
      rows.push(row);
    }
    this.pixels = rows;
    this.spriteActive = true;
  }

  cancelSprite() {
    this.pixels = null;
    this.spriteActive = false;
  }
}
