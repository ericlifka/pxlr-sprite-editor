import {tracked} from "@glimmer/component";
import Pixel from "./pixel-model";
import guid from "./guid-helper";

export type Row = Pixel[];
export type Frame = Row[];

export default class Sprite {
  @tracked name: string;
  @tracked whiteAsEmpty: boolean;
  @tracked width: number;
  @tracked height: number;
  @tracked frames: Frame[];
  @tracked firstFrame: Frame;

  @tracked spriteBlob: string;
  @tracked colorPalette: string[];
  @tracked canSave: boolean = true;

  static CURRENT_SCHEMA_VERSION: number = 2;

  regenerateBlob() {
    let whiteAsEmpty = this.whiteAsEmpty;
    let json = this.toJSON();

    if (whiteAsEmpty) {
      json['frames'] = json['frames'].map(frame => frame.map(row => row.map(color =>
        color === "#ffffff" ? null : color)));
    }

    this.spriteBlob = JSON.stringify(json);
  }

  toggleWhiteAsEmpty() {
    this.whiteAsEmpty = !this.whiteAsEmpty;
    this.regenerateBlob();
  }

  addEmptyFrame() {
    this.addFrame(createBlankFrame(this.width, this.height));
  }

  addFrame(frame: Frame) {
    this.canSave = false;
    let newFrames = [ ...this.frames, frame ];
    this.frames = [];
    requestAnimationFrame(() => {
      this.frames = newFrames;
      this.regenerateBlob();
      this.generateColorPalette();
      this.canSave = true;
    });
  }

  removeFrame(frame: Frame) {
    if (this.frames.indexOf(frame) > -1) {
      this.canSave = false;
      let newFrames = this.frames.filter(_f => _f !== frame);
      this.frames = [];
      requestAnimationFrame(() => {
        this.frames = newFrames;
        this.regenerateBlob();
        this.generateColorPalette();
        this.canSave = true;
      });
    }
  }

  generateColorPalette() {
    this.colorPalette = [];
    requestAnimationFrame(() => {
      let colorPalette = new Set();

      this.frames.forEach((frame: Frame) => frame.forEach((row: Row) => row.map((pixel: Pixel) =>
        colorPalette.add(pixel.color))));

      this.colorPalette = [...colorPalette];
    });
  }

  addColorToPalette(color: string) {
    this.colorPalette = Array.from(new Set([...this.colorPalette, color]));
  }

  deleteData() {
    delete localStorage[this.name];
  }

  /**
   * WARNING - WARNING - WARNING:
   *  The following four functions (save, toJSON, load, initializeEmptySprite) are responsible for moving data between
   *  localStorage and Sprite models.
   *
   *  THEY SHOULD ALL BE REFERENCING THE SAME PROPERTIES.
   *
   *  If they aren't all in sync then things are going to go bad in one direction or the other.
   *  If changes are needed to one then do the following:
   *    1) Update the other two to match
   *    2) Bump the CURRENT_SCHEMA_VERSION property
   *    3) Add a migration from the old schema value to the new schema value
   *    4) Add the migration to the migration list in `runMigrations` below
   */
  save(): void {
    if (this.canSave) {
      localStorage[this.name] = JSON.stringify(this.toJSON());
      console.log('save succeeded');
    } else {
      console.log('save deferred');
      requestAnimationFrame(() => {
        this.save();
      });
    }
  }

  private toJSON(): object {
    return {
      schema: Sprite.CURRENT_SCHEMA_VERSION,
      name: this.name,
      whiteAsEmpty: this.whiteAsEmpty,
      width: this.width,
      height: this.height,
      frames: this.frames.map((frame: Frame) =>
        frame.map((row: Row) =>
          row.map((pixel: Pixel) =>
            pixel.color.toLowerCase())))
    };
  }

  static load(name: string): Sprite {
    return Sprite.loadFromBlob(localStorage[name]);
  }

  static loadFromBlob(blob: string): Sprite {
    let sprite = new Sprite();
    let descriptor = JSON.parse(blob);

    descriptor = runMigrations(descriptor, name);

    sprite.name = descriptor.name;
    sprite.whiteAsEmpty = descriptor.whiteAsEmpty;
    sprite.width = descriptor.width;
    sprite.height = descriptor.height;
    sprite.frames = processFrameData(descriptor.frames);
    sprite.firstFrame = sprite.frames[0];

    sprite.regenerateBlob();
    sprite.generateColorPalette();

    return sprite;
  }

  static initializeEmptySprite(name: string, width: number, height: number): Sprite {
    let sprite = new Sprite();

    sprite.name = name;
    sprite.whiteAsEmpty = true;
    sprite.width = width;
    sprite.height = height;
    sprite.frames = createBlankFrameList(width, height);
    sprite.firstFrame = sprite.frames[0];

    sprite.regenerateBlob();
    sprite.generateColorPalette();

    return sprite;
  }
}

function processFrameData(frames) {
  return frames.map(frame => {
    let _frame = frame.map(row => row.map(color => new Pixel(color)));
    _frame['id'] = guid();
    return _frame;
  });
}

function createBlankFrameList(width: number, height: number): Frame[] {
  return [ createBlankFrame(width, height) ];
}

function createBlankFrame(width: number, height: number): Frame {
  let frame: Frame = [];
  for (let h = 0; h < height; h++) {
    let row: Row = [];
    for (let w = 0; w < width; w++) {
      row.push(new Pixel());
    }
    frame.push(row);
  }
  return frame;
}

function runMigrations(json: any, name: string) {
  let schema = json.schema || 0;

  // Jump into the list of migrations at the current level of the model, and start up-converting from there.
  switch(schema) {
    case 0: json = migrate0to1(json, name);
    case 1: json = migrate1to2(json);
    case 2:
      // current schema version
      return json;
  }
}

function migrate0to1(json, name) {
  // convert 2d array of colors to descriptor object containing array, also replaces null with white
  // [ [null, ...], ...] ->
  // { "name": string, "width": number, "height": number, "whiteAsEmpty": boolean, pixels: [ ["#ffffff", ...], ...] }
  return {
    name,
    height: json.length,
    width: json[0].length,
    whiteAsEmpty: true,
    pixels: json.map(row => row.map(val => !val ? "#ffffff" : val))
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
