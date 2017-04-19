import {tracked} from "@glimmer/component";
import Pixel from "./pixel";

let INSTANCE: Store = null;

export default class Store {
  @tracked editingSprite: boolean = false;
  @tracked pixels: Pixel[];
  @tracked spriteBlob: string;

  private Constructor() {

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

  serializeSprite() {
    // let whiteAsEmpty = this.whiteAsEmpty;
    let whiteAsEmpty = true;
    return JSON.stringify(this.pixels.map(row => row.map(pixel => {
      if (pixel.color.toLowerCase() === "#ffffff" && whiteAsEmpty) {
        return null;
      }
      return pixel.color;
    })));
  }
}

