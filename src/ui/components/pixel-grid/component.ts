import Component, {tracked} from "@glimmer/component";
import Store from "../store";

export default class PixelGrid extends Component {
  @tracked activeColor: string;
  @tracked mouseDown: boolean = false;

  @tracked store: Store = Store.getStore();

  didInsertElement() {
    let inputEle = this.element.getElementsByClassName('jscolor')[0];
    window['jscolor'](inputEle);
    this.activeColor = "#" + inputEle.value;

    document.addEventListener('mouseup', () => {
      this.mouseDown = false
    });
  }

  colorChange(event) {
    this.activeColor = "#" + event.target.value;
  }

  clickPixel(pixel) {
    this.store.changePixelColor(pixel, this.activeColor);
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
    this.store.closeSprite();
  }

  onToggle() {
    this.store.toggleWhiteAsEmpty();
  }
}
