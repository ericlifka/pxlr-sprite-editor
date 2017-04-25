import {tracked} from "@glimmer/component";
import Pixel from "./pixel";

export default class Sprite {
  @tracked pixels: Pixel[][];
  @tracked name: string;
  @tracked width: number;
  @tracked height: number;

  static initializeEmptySprite(name, width, height) {
    let sprite = new Sprite();
    sprite.name = name;
    sprite.width = width;
    sprite.height = height;
    sprite.pixels = [];
    for (let h = 0; h < height; h++) {
      let row: Pixel[] = [];
      for (let w = 0; w < width; w++) {
        row.push(new Pixel());
      }
      sprite.pixels.push(row);
    }
    return sprite;
  }

  static initializeSavedSprite(name: string, pixels: Pixel[][]) {
    let sprite = new Sprite();
    sprite.name = name;
    sprite.pixels = pixels;
    sprite.height = pixels.length;
    sprite.width = pixels[0].length;
    return sprite;
  }
}
