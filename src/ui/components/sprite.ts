import {tracked} from "@glimmer/component";
import Pixel from "./pixel";

type Row = Pixel[];
type Frame = Row[];

export default class Sprite {
  @tracked frames: Frame[];
  @tracked firstFrame: Frame;
  @tracked name: string;
  @tracked width: number;
  @tracked height: number;
  @tracked whiteAsEmpty: boolean = true;

  static initializeEmptySprite(name, width, height) {
    let sprite = new Sprite();
    sprite.name = name;
    sprite.width = width;
    sprite.height = height;
    let frame: Frame = [];
    for (let h = 0; h < height; h++) {
      let row: Row = [];
      for (let w = 0; w < width; w++) {
        row.push(new Pixel());
      }
      frame.push(row);
    }
    sprite.frames = [ frame ];
    sprite.firstFrame = frame;
    sprite.save();

    return sprite;
  }

  save() {
    localStorage[this.name] = JSON.stringify({
      name: this.name,
      width: this.width,
      height: this.height,
      whiteAsEmpty: this.whiteAsEmpty,
      frames: this.frames.map((frame: Frame) =>
        frame.map((row: Row) =>
          row.map((pixel: Pixel) =>
            pixel.color.toLowerCase())))
    });
  }

  static load(name: string) {
    let sprite = new Sprite();
    let descriptor = JSON.parse(localStorage[name]);
    sprite.name = descriptor.name;
    sprite.whiteAsEmpty = descriptor.whiteAsEmpty;
    sprite.height = descriptor.height;
    sprite.width = descriptor.width;
    sprite.frames = descriptor.frames.map(frame => frame.map(row => row.map(color => new Pixel(color))));
    sprite.firstFrame = sprite.frames[0];

    return sprite;
  }

  getBlob() {
    let whiteAsEmpty = this.whiteAsEmpty;

    return JSON.stringify(
      this.frames.map(frame => frame.map(row => row.map(pixel =>
        whiteAsEmpty && pixel.color.toLowerCase() === "#ffffff" ? null : pixel.color))));
  }

  toggleWhiteAsEmpty() {
    this.whiteAsEmpty = !this.whiteAsEmpty;
    this.save();
  }
}
