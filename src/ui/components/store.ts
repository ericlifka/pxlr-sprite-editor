import {tracked} from "@glimmer/component";
import Pixel from "./pixel";

let INSTANCE: Store = null;

export default class Store {
  @tracked editingSprite: boolean = false;
  @tracked whiteAsEmpty: boolean = true;
  @tracked pixels: Pixel[];
  @tracked spriteBlob: string;
  @tracked sprites: any[];

  private Constructor() {
    let spriteList = localStorage['savedSpritesList'];
    if (typeof spriteList === "string") {
      spriteList = JSON.parse(spriteList);
    }

    this.sprites = spriteList.map(spriteName => {
      let spriteDef = localStorage[spriteName];
      if (typeof spriteDef === "string") {
        spriteDef = JSON.parse(spriteDef);
      }
      let rows = spriteDef.map(row => {
        return row.map(colorCode => {
          if (!colorCode) {
            colorCode = "#FFFFFF";
          }

          return new Pixel(colorCode);
        });
      });
      rows['name'] = spriteName;

      return rows;
    });
  }

  public static getStore(): Store {
    if (!INSTANCE) {
      INSTANCE = new Store();
      window['STORE'] = INSTANCE;
    }

    return INSTANCE;
  }

  createSprite(width, height) {
    let rows = [];
    for (let h = 0; h < height; h++) {
      let row = [];
      for (let w = 0; w < width; w++) {
        row.push(new Pixel());
      }
      rows.push(row);
    }
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
}


