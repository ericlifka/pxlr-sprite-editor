import Component, {tracked} from "@glimmer/component";
import Store from "../store-service";
import Pixel from "../pixel-model";
import {Frame} from "../sprite-model";

export default class EditPane extends Component {
  @tracked store: Store = Store.getStore();

  @tracked activeColor: string;
  @tracked copiedFrame: Frame;
  @tracked displaySize: string = "medium";
  @tracked animationClass: string = "";
  @tracked copySuccess: boolean = false;
  @tracked toolkitState: string = "expanded";

  breakAnimation: boolean = false;

  didInsertElement() {
    let jscolor = window['jscolor'];
    let root: HTMLElement = this.element as HTMLElement;
    let inputEle: HTMLInputElement =
      root.getElementsByClassName('jscolor')[0] as HTMLInputElement;

    jscolor.call(window, inputEle);
    this.activeColor = "#" + inputEle.value;
  }

  colorChange(event) {
    this.activeColor = "#" + event.target.value;
  }

  changeActiveColor(colorCode) {
    this.activeColor = colorCode;

    let root: HTMLElement = this.element as HTMLElement;
    let inputEle: HTMLInputElement =
      root.getElementsByClassName('jscolor')[0] as HTMLInputElement;

    inputEle.value = colorCode.split('#')[1];
    inputEle.dispatchEvent(new Event('blur'));
  }

  selectPixel(pixel: Pixel) {
    this.store.changePixelColor(this.args.sprite, pixel, this.activeColor);
  }

  closeSprite() {
    this.breakAnimation = true;

    this.args.closeSprite();
  }

  onToggle() {
    this.store.toggleWhiteAsEmpty(this.args.sprite);
  }

  selectChange(event) {
    let index = event.target.selectedIndex;
    let value = event.target.options[index].value;

    this.displaySize = value || "medium";
  }

  addFrame() {
    this.store.addEmptyFrameToSprite(this.args.sprite);
  }

  moveFrame(frame: Frame, direction: string) {
    this.store.moveFrame(this.args.sprite, frame, direction);
  }

  copyFrame(frame: Frame) {
    this.copiedFrame = this.store.duplicateFrame(frame);
  }

  pasteCopiedFrame() {
    this.store.addFrameToSprite(this.args.sprite, this.copiedFrame);
    this.copiedFrame = null;
  }

  removeFrame(frame: Frame) {
    this.copyFrame(frame);
    this.store.removeFrameFromSprite(this.args.sprite, frame);
  }

  showAnimation() {
    this.breakAnimation = false;
    this.animationClass = "show-animation";

    let root: HTMLElement = this.element as HTMLElement;
    let frames = root.getElementsByClassName('frame');

    let activeFrame = 0;
    let boundary = frames.length;
    let start;

    function updateClasses() {
      for (let i = 0; i < boundary; i++) {
        if (i === activeFrame) {
          frames[i].classList.remove('hidden');
        } else {
          frames[i].classList.add('hidden');
        }
      }

      activeFrame++;
      if (activeFrame >= boundary) {
        activeFrame = 0;
      }
    }

    const frameHandler = (time) => {
      if (!start) {
        start = time;
      }

      if (time - start > 250) {
        start = time;

        updateClasses();
      }

      if (this.breakAnimation){
        this.animationClass = "";
        for (let i = 0; i < boundary; i++) {
          frames[i].classList.remove('hidden');
        }
      } else {
        requestAnimationFrame(frameHandler);
      }
    };
    requestAnimationFrame(frameHandler);
  }

  hideAnimation() {
    this.breakAnimation = true;
  }

  copySpriteBlob() {
    let root: HTMLElement = this.element as HTMLElement;
    let textarea = root.getElementsByTagName('textarea')[0];

    textarea.select();
    let res = document.execCommand('copy');
    textarea.selectionEnd = 0;

    if (res) {
      this.copySuccess = true;
      setTimeout(() => {
        this.copySuccess = false;
      }, 500);
    }
  }

  collapseToolkit() {
    this.toolkitState = "collapsed";
  }
  expandToolkit() {
    this.toolkitState = "expanded";
  }
}
