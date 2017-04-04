import Component, { tracked } from "@glimmer/component";

export default class PxlrSpriteEditor extends Component {
  @tracked width = 8;
  @tracked height = 4;

  set4() {
    this.width = 4;
    this.height = 4;
  }

  set8() {
    this.width = 8;
    this.height = 8;
  }

  testAction(arg1, arg2) {
    console.log('external!', arg1, arg2);
  }
}
