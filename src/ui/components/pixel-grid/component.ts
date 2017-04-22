import Component, {tracked} from "@glimmer/component";

export default class PixelGrid extends Component {
  @tracked mouseDown: boolean = false;

  didInsertElement() {
    document.addEventListener('mouseup', () => {
      this.mouseDown = false
    });
  }

  clickPixel(pixel) {
    this.args.selectPixel(pixel);
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
}
