import Component, {tracked} from "@glimmer/component";

export default class PixelGrid extends Component {
  @tracked mouseDown: boolean = false;
  editable: boolean;

  didInsertElement() {
    console.log(this.args.frame);
    this.editable = JSON.parse(this.args.editable || 'false');

    if (this.editable) {
      document.addEventListener('mouseup', () => {
        this.mouseDown = false
      });
    }
  }

  clickPixel(pixel) {
    if (this.editable) {
      this.args.selectPixel(pixel);
    }
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
