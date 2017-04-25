import {tracked} from "@glimmer/component";
import Pixel from "./pixel";
import Sprite from "./sprite";

let INSTANCE: Store = null;

export default class Store {
  @tracked editingSprite: boolean = false;
  @tracked whiteAsEmpty: boolean = true;
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
    this.serializeSprite();
    localStorage['savedSpritesList'] = JSON.stringify(this.sprites.map(sprite => sprite['name']));
  }

  openSprite(sprite) {
    this.activeSprite = sprite;
    this.editingSprite = true;
    this.serializeSprite();
  }

  closeSprite() {
    this.editingSprite = false;
    this.activeSprite = null;
    this.spriteBlob = null;
  }

  serializeSprite() {
    let whiteAsEmpty = this.whiteAsEmpty;
    let spriteName = this.activeSprite['name'];
    this.spriteBlob = JSON.stringify(this.activeSprite.pixels.map(row =>
      row.map(pixel =>
        pixel.color.toLowerCase() === "#ffffff" && whiteAsEmpty ?
          null :
          pixel.color)));

    localStorage[spriteName] = this.spriteBlob;
  }

  toggleWhiteAsEmpty() {
    this.whiteAsEmpty = !this.whiteAsEmpty;
    this.serializeSprite();
  }

  changePixelColor(pixel, activeColor) {
    pixel.color = activeColor;
    this.serializeSprite();
  }

  parseLocalStorageSprites() {
    return JSON.parse(localStorage['savedSpritesList'] || "[]")
      .map(spriteName => {
        let rows = JSON.parse(localStorage[spriteName] || "[[\"#FFFFFF\"]]")
          .map(row =>
            row.map(colorCode =>
              colorCode ?
                new Pixel(colorCode) :
                new Pixel("#FFFFFF")));

        return Sprite.initializeSavedSprite(spriteName, rows);
      });
  }
}
