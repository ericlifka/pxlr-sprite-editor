import Component, {tracked} from "@glimmer/component";
import Store from "../store-service";
import Sprite from "../sprite-model";

export default class PxlrSpriteEditor extends Component {
  @tracked store: Store = Store.getStore();
  @tracked activeSprite: Sprite;

  createSprite(width, height, name) {
    this.activeSprite = this.store.createSprite(width, height, name);
  }

  openSprite(sprite: Sprite) {
    this.activeSprite = sprite;
  }

  closeSprite() {
    this.activeSprite = null;
  }
}
