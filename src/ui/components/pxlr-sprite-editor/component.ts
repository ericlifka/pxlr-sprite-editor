import Component, { tracked } from "@glimmer/component";

export default class PxlrSpriteEditor extends Component {
  @tracked width = 8;
  @tracked height = 4;

  widthChange(event) {
    let val = event.target.value;
    this.width = parseInt(val, 10);
  }

  heightChange(event) {
    let val = event.target.value;
    this.height = parseInt(val, 10);
  }

  testAction(arg1, arg2) {
    console.log('external!', arg1, arg2);
  }

  inputChange(event) {
    console.log('inputChange', event.target.value);
  }
}
