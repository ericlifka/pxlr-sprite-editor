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
  @tracked spriteBlob: string;

  didInsertElement() {
    this.activeColor = "#" + this.element.getElementsByClassName('jscolor')[0].value;
  }

  colorChange(event) {
    this.activeColor = "#" + event.target.value;
  }

  clickPixel(pixel) {
    pixel.color = this.activeColor;
    this.spriteBlob = this.serializeSprite();
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
    this.spriteBlob = this.serializeSprite();
    this.spriteActive = true;
  }

  cancelSprite() {
    this.pixels = null;
    this.spriteBlob = null;
    this.spriteActive = false;
  }

  serializeSprite() {
    return JSON.stringify(this.pixels.map(row => row.map(pixel => pixel.color)));
  }
}
