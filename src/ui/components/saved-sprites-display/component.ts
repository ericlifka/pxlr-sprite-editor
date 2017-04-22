import Component, {tracked} from "@glimmer/component";
import Store from "../store";

export default class SavedSpritesDisplay extends Component {
  @tracked store: Store = Store.getStore();

  openSprite(sprite) {
    this.store.openSprite(sprite);
  }
}
