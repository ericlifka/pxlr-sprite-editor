import Component, { tracked } from '@glimmer/component';

export default class PixelComponent extends Component {
  click() {
    this.args.clickPixel(this.args.pixel);
  }
}
