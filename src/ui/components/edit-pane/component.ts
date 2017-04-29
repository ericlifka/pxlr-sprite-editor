import Component, {tracked} from "@glimmer/component";
import Store from "../store";
import Pixel from "../pixel";
import {Frame} from "../sprite";

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
    this.store.changePixelColor(this.args.sprite, pixel, this.activeColor);
  }

  closeSprite() {
    this.args.closeSprite();
  }

  onToggle() {
    this.store.toggleWhiteAsEmpty(this.args.sprite);
  }

  addFrame() {
    this.store.addFrameToSprite(this.args.sprite);
  }

  moveFrame(frame: Frame, direction: string) {
    this.store.moveFrame(this.args.sprite, frame, direction);
  }
}
