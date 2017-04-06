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
  @tracked whiteAsEmpty: boolean = true;
  @tracked mouseDown: boolean = false;

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

  onMouseDown(pixel) {
    this.mouseDown = true;
    this.clickPixel(pixel);
  }
  onMouseUp() {
    this.mouseDown = false;
  }
  onMouseOver(pixel) {
    if (this.mouseDown) {
      this.clickPixel(pixel);
    }
  }

  updateDimensions(dimension, event) {
    this[dimension] = parseInt(event.target.value, 10);
  }

  createSprite() {
    let rows = [];
    for (let h = 0; h < this.height; h++) {
      let row = [];
      for (let w = 0; w < this.width; w++) {
        row.push(new Pixel(this.activeColor));
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
    let whiteAsEmpty = this.whiteAsEmpty;
    return JSON.stringify(this.pixels.map(row => row.map(pixel => {
      if (pixel.color.toLowerCase() === "#ffffff" && whiteAsEmpty) {
        return null;
      }
      return pixel.color;
    })));
  }

  onToggle() {
    this.whiteAsEmpty = !this.whiteAsEmpty;
    this.spriteBlob = this.serializeSprite();
  }
}
