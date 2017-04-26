import {tracked} from "@glimmer/component";
import Sprite from "./sprite";

let INSTANCE: Store = null;

export default class Store {
  @tracked editingSprite: boolean = false;
  @tracked activeSprite: Sprite;
  @tracked spriteBlob: string;
  @tracked sprites: any[] = [];

  private constructor() {
    this.sprites = this.parseLocalStorageSprites();
  }

  public static getStore(): Store {
    if (!INSTANCE) {
      INSTANCE = new Store();
      window['STORE'] = INSTANCE;
    }

    return INSTANCE;
  }

  createSprite(width, height, name = "untitled" + Date.now()) {
    let sprite = Sprite.initializeEmptySprite(name, width, height);
    this.sprites.push(sprite);
    this.activeSprite = sprite;
    this.editingSprite = true;

    this.saveSpriteList();
    this.regenerateBlob();
  }

  openSprite(sprite) {
    this.activeSprite = sprite;
    this.editingSprite = true;
    this.regenerateBlob();
  }

  closeSprite() {
    this.editingSprite = false;
    this.activeSprite = null;
    this.spriteBlob = null;
  }

  toggleWhiteAsEmpty() {
    this.activeSprite.whiteAsEmpty = !this.activeSprite.whiteAsEmpty;
    this.regenerateBlob();
  }

  changePixelColor(pixel, activeColor) {
    pixel.color = activeColor;
    this.activeSprite.save();
  }

  parseLocalStorageSprites() {
    return JSON.parse(localStorage['savedSpritesList'] || "[]")
      .map(name => Sprite.load(name));
  }

  private saveSpriteList() {
    localStorage['savedSpritesList'] = JSON.stringify(this.sprites.map(sprite => sprite['name']));
  }

  private regenerateBlob() {
    this.spriteBlob = this.activeSprite.getBlob();
  }
}
