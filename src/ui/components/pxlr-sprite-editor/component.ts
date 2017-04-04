import Component, { tracked } from "@glimmer/component";

export default class PxlrSpriteEditor extends Component {
  @tracked width = 8;

  set4() {
    this.width = 4;
  }

  set8() {
    this.width = 8;
  }
}
