import Component, {tracked} from "@glimmer/component";
import Store from "../store";

export default class PixelGrid extends Component {
  @tracked activeColor: string;
  @tracked mouseDown: boolean = false;

  @tracked store: Store = Store.getStore();

  didInsertElement() {
    this.activeColor = "#" + this.element.getElementsByClassName('jscolor')[0].value;

    document.addEventListener('mouseup', () => {
      this.mouseDown = false
    });
  }

  colorChange(event) {
    this.activeColor = "#" + event.target.value;
  }

  clickPixel(pixel) {
    pixel.color = this.activeColor;
    // this.spriteBlob = this.serializeSprite();
  }

  onMouseDown(pixel) {
    this.mouseDown = true;
    this.clickPixel(pixel);
  }
  onMouseOver(pixel) {
    if (this.mouseDown) {
      this.clickPixel(pixel);
    }
  }

  cancelSprite() {
    // this.pixels = null;
    // this.spriteBlob = null;
    // this.spriteActive = false;
  }

  onToggle() {
    // this.whiteAsEmpty = !this.whiteAsEmpty;
    // this.spriteBlob = this.serializeSprite();
  }
}
