import Component, {tracked} from "@glimmer/component";
import Store from "../store";
import Sprite from "../sprite";

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
