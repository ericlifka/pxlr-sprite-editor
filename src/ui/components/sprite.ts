import {tracked} from "@glimmer/component";
import Pixel from "./pixel";

export default class Sprite {
  @tracked pixels: Pixel[][];
  @tracked name: string;
  @tracked width: number;
  @tracked height: number;
  @tracked whiteAsEmpty: boolean = true;

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
    sprite.save();
    return sprite;
  }

  save() {
    localStorage[this.name] = JSON.stringify(
      this.pixels.map(row =>
        row.map(pixel => pixel.color.toLowerCase())));
  }

  static load(name: string) {
    let pixels = JSON.parse(localStorage[name] || "[[\"#FFFFFF\"]]")
      .map(row => row.map(colorCode =>
        colorCode ?
          new Pixel(colorCode) :
          new Pixel("#FFFFFF")));

    let sprite = new Sprite();
    sprite.name = name;
    sprite.pixels = pixels;
    sprite.height = pixels.length;
    sprite.width = pixels[0].length;
    return sprite;
  }

  getBlob() {
    let whiteAsEmpty = this.whiteAsEmpty;

    return JSON.stringify(
      this.pixels.map(row => row.map(pixel =>
        whiteAsEmpty && pixel.color.toLowerCase() === "#ffffff" ? null : pixel.color)));
  }
}
