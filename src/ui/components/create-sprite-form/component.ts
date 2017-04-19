import Component, {tracked} from "@glimmer/component";
import Store from "../store";

export default class CreateSpriteForm extends Component {
  @tracked width: number = 32;
  @tracked height: number = 32;

  @tracked store: Store = Store.getStore();

  updateDimensions(dimension, event) {
    this[dimension] = parseInt(event.target.value, 10);
  }

  createSprite() {
    this.store.createSprite(this.width, this.height);
  }
}
