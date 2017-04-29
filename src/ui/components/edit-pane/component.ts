import Component, {tracked} from "@glimmer/component";
import Store from "../store-service";
import Pixel from "../pixel-model";
import {Frame} from "../sprite-model";

export default class EditPane extends Component {
  @tracked store: Store = Store.getStore();

  @tracked activeColor: string;

  didInsertElement() {
    let jscolor = window['jscolor'];
    let root: HTMLElement = this.element as HTMLElement;
    let inputEle: HTMLInputElement = root.getElementsByClassName('jscolor')[0] as HTMLInputElement;

    jscolor(inputEle);
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

  copyFrame(frame: Frame) {

  }
}
