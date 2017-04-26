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
    localStorage[this.name] = JSON.stringify({
      name: this.name,
      width: this.width,
      height: this.height,
      whiteAsEmpty: this.whiteAsEmpty,
      pixels: this.pixels.map(row => row.map(pixel => pixel.color.toLowerCase()))
    });
  }

  static load(name: string) {
    let sprite = new Sprite();
    let descriptor = JSON.parse(localStorage[name]);
    sprite.name = descriptor.name;
    sprite.whiteAsEmpty = descriptor.whiteAsEmpty;
    sprite.height = descriptor.height;
    sprite.width = descriptor.width;
    sprite.pixels = descriptor.pixels.map(
      row => row.map(color => new Pixel(color))
    );

    return sprite;
  }

  getBlob() {
    let whiteAsEmpty = this.whiteAsEmpty;

    return JSON.stringify(
      this.pixels.map(row => row.map(pixel =>
        whiteAsEmpty && pixel.color.toLowerCase() === "#ffffff" ? null : pixel.color)));
  }

  toggleWhiteAsEmpty() {
    this.whiteAsEmpty = !this.whiteAsEmpty;
    this.save();
  }
}
