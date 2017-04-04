import Component, { tracked } from '@glimmer/component';

export default class PixelComponent extends Component {
  @tracked backgroundColor = this.args.color;

  click() {
    this.backgroundColor = "blue";
    this.args.clickPixel(this.args.x, this.args.y);
  }
}
