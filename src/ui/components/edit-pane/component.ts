import Component, {tracked} from "@glimmer/component";
import Store from "../store";
import Pixel from "../pixel";

export default class EditPane extends Component {
  @tracked store: Store = Store.getStore();

  @tracked activeColor: string;

  didInsertElement() {
    let inputEle = this.element.getElementsByClassName('jscolor')[0];
    window['jscolor'](inputEle);
    this.activeColor = "#" + inputEle.value;
  }

  colorChange(event) {
    this.activeColor = "#" + event.target.value;
  }

  selectPixel(pixel: Pixel) {
    this.store.changePixelColor(pixel, this.activeColor);
  }

  closeSprite() {
    this.store.closeSprite();
  }

  onToggle() {
    this.store.toggleWhiteAsEmpty();
  }
}
