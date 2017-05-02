import Component, {tracked} from "@glimmer/component";

export default class CreateSpriteForm extends Component {
  @tracked width: number = 32;
  @tracked height: number = 32;
  @tracked name: string = "";

  didInsertElement() {
    let root: HTMLElement = this.element as HTMLElement;
    let inputEle: HTMLInputElement = root.getElementsByClassName('focus-on-load')[0] as HTMLInputElement;

    inputEle.focus();
  }

  updateName(event) {
    this.name = event.target.value;
  }

  updateDimensions(dimension, event) {
    this[dimension] = parseInt(event.target.value, 10);
  }

  submitForm(event) {
    this.args.createSprite(this.width, this.height, this.name);

    event.preventDefault();
    return false;
  }
}
