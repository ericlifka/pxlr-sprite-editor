import Component from "@glimmer/component";

export default class SavedSpritesDisplay extends Component {
  openSprite(sprite) {
    this.args.openSprite(sprite);
  }
}
