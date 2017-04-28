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

  static currentSchemaVer: number = 2;

  save() {
    localStorage[this.name] = JSON.stringify({
      schema: Sprite.currentSchemaVer,
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

  static load(name: string) {
    let sprite = new Sprite();
    let descriptor = JSON.parse(localStorage[name]);

    descriptor = Sprite.runMigrations(descriptor, name);

    sprite.name = descriptor.name;
    sprite.whiteAsEmpty = descriptor.whiteAsEmpty;
    sprite.height = descriptor.height;
    sprite.width = descriptor.width;
    sprite.frames = descriptor.frames.map(frame => frame.map(row => row.map(color => new Pixel(color))));
    sprite.firstFrame = sprite.frames[0];

    return sprite;
  }

  private static runMigrations(json: any, name: string) {
    let schema = json.schema || 0;
    switch(schema) {

      case 0: json = migrate0to1(json, name);
      case 1: json = migrate1to2(json);
      case 2:
        // current
        return json;
    }
  }
}

function migrate0to1(json, name) {
  // convert 2d array of colors to descriptor object containing array
  // [ ["#ffffff", ...], ...] ->
  // { "name": string, "width": number, "height": number, "whiteAsEmpty": boolean, pixels: [ ["#ffffff", ...], ...] }
  return {
    name,
    height: json.length,
    width: json[0].length,
    whiteAsEmpty: true,
    pixels: json
  };
}

function migrate1to2(json) {
  // convert from property "pixels" as a single frame to property "frames" containing an array of frames
  // { ..., pixels: [[...], ...] } ->
  // { ..., frames: [ [[...], ...], ...] }
  let frame = json.pixels;
  json.frames = [ frame ];
  delete json.pixels;

  return json;
}
