import Component, { tracked } from '@glimmer/component';

export default class PixelComponent extends Component {
  click() {
    console.log(this.args.x, this.args.y);
  }
}
