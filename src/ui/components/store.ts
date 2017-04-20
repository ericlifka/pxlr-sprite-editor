import {tracked} from "@glimmer/component";
import Pixel from "./pixel";

let INSTANCE: Store = null;

export default class Store {
  @tracked editingSprite: boolean = false;
  @tracked whiteAsEmpty: boolean = true;
  @tracked pixels: Pixel[];
  @tracked spriteBlob: string;
  @tracked sprites: any[];

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
    this.spriteBlob = this.serializeSprite();
    this.editingSprite = true;
  }

  closeSprite() {
    this.editingSprite = false;
  }

  serializeSprite() {
    let whiteAsEmpty = this.whiteAsEmpty;
    return JSON.stringify(this.pixels.map(row => row.map(pixel => {
      if (pixel.color.toLowerCase() === "#ffffff" && whiteAsEmpty) {
        return null;
      }
      return pixel.color;
    })));
  }

  toggleWhiteAsEmpty() {
    this.whiteAsEmpty = !this.whiteAsEmpty;
    this.spriteBlob = this.serializeSprite();
  }

  changePixelColor(pixel, activeColor) {
    pixel.color = activeColor;
    this.spriteBlob = this.serializeSprite();
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
