import {tracked} from "@glimmer/component";
import Pixel from "./pixel";

let INSTANCE: Store = null;

export default class Store {
  @tracked editingSprite: boolean = false;
  @tracked whiteAsEmpty: boolean = true;
  @tracked pixels: Pixel[][];
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
    let rows = [];
    for (let h = 0; h < height; h++) {
      let row = [];
      for (let w = 0; w < width; w++) {
        row.push(new Pixel());
      }
      rows.push(row);
    }
    rows['name'] = name;

    this.sprites.push(rows);
    this.pixels = rows;
    this.editingSprite = true;
    this.serializeSprite();
    localStorage['savedSpritesList'] = JSON.stringify(this.sprites.map(sprite => sprite['name']));
  }

  openSprite(sprite) {
    this.pixels = sprite;
    this.editingSprite = true;
    this.serializeSprite();
  }

  closeSprite() {
    this.editingSprite = false;
    this.pixels = null;
    this.spriteBlob = null;
  }

  serializeSprite() {
    let whiteAsEmpty = this.whiteAsEmpty;
    let spriteName = this.pixels['name'];
    this.spriteBlob = JSON.stringify(this.pixels.map(row =>
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

        rows['name'] = spriteName;

        return rows;
      });
  }
}
