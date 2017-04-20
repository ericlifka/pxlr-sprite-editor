import Component, {tracked} from "@glimmer/component";
import Store from "../store";

export default class CreateSpriteForm extends Component {
  @tracked width: number = 32;
  @tracked height: number = 32;
  @tracked name: string = "";

  @tracked store: Store = Store.getStore();

  didInsertElement() {
    this.element.getElementsByClassName('focus-on-load')[0].focus();
  }

  updateName(event) {
    this.name = event.target.value;
  }

  updateDimensions(dimension, event) {
    this[dimension] = parseInt(event.target.value, 10);
  }

  createSprite() {
    this.store.createSprite(this.width, this.height, this.name);
  }
}
