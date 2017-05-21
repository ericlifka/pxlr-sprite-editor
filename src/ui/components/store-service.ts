import {tracked} from "@glimmer/component";
import Sprite, {Frame, Row} from "./sprite-model";
import Pixel from "./pixel-model";
import guid from "./guid-helper";

let INSTANCE: Store = null;

export default class Store {
  @tracked sprites: Sprite[] = [];

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

  createSprite(width: number, height: number, name: string = "untitled" + Date.now()) {
    let sprite: Sprite = Sprite.initializeEmptySprite(name, width, height);
    this.sprites.push(sprite);

    sprite.save();
    this.saveSpriteList();

    return sprite;
  }

  createSpriteFromBlob(blob: string): Sprite {
    let sprite: Sprite = Sprite.loadFromBlob(blob);

    this.sprites.push(sprite);
    sprite.save();
    this.saveSpriteList();

    return sprite;
  }

  deleteSprite(sprite: Sprite) {
    let sprites = this.sprites.filter(_s => _s !== sprite);
    this.sprites = [];
    requestAnimationFrame(() => {
      this.sprites = sprites;
      this.saveSpriteList();
      sprite.deleteData();
    });
  }

  toggleWhiteAsEmpty(sprite: Sprite) {
    sprite.toggleWhiteAsEmpty();
    sprite.save();
  }

  changePixelColor(sprite: Sprite, pixel: Pixel, activeColor: string) {
    pixel.color = activeColor;
    sprite.addColorToPalette(activeColor);
    sprite.regenerateBlob();
    sprite.save();
  }

  addEmptyFrameToSprite(sprite: Sprite) {
    sprite.addEmptyFrame();
    sprite.save();
  }

  addFrameToSprite(sprite: Sprite, frame: Frame) {
    sprite.addFrame(frame);
    sprite.save();
  }

  removeFrameFromSprite(sprite: Sprite, frame: Frame) {
    sprite.removeFrame(frame);
    sprite.save();
  }

  moveFrame(sprite: Sprite, frame: Frame, direction: string) {
    let index = sprite.frames.indexOf(frame);
    let front: Frame[];
    let left: Frame;
    let right: Frame;
    let back: Frame[];

    if (direction === "left") {

      if (index === -1 || index === 0) {
        return;
      }

      front = sprite.frames.slice(0, index - 1);
      left = sprite.frames[index - 1];
      right = sprite.frames[index];
      back = sprite.frames.slice(index + 1);

    }

    if (direction === "right") {

      if (index === -1 || index === sprite.frames.length - 1) {
        return;
      }

      front = sprite.frames.slice(0, index);
      left = sprite.frames[index];
      right = sprite.frames[index + 1];
      back = sprite.frames.slice(index + 2);

    }

    sprite.frames = [...front, right, left, ...back];
    sprite.regenerateBlob();
    sprite.save();
  }

  duplicateFrame(frame: Frame) {
    let newFrame: Frame =
      frame.map((row: Row) =>
        row.map((pixel: Pixel) =>
          new Pixel(pixel.color)));
    newFrame['id'] = guid();

    return newFrame;
  }

  private parseLocalStorageSprites() {
    return JSON.parse(localStorage['savedSpritesList'] || "[]")
      .map(name => Sprite.load(name));
  }

  private saveSpriteList() {
    localStorage['savedSpritesList'] = JSON.stringify(this.sprites.map((sprite: Sprite) => sprite.name));
  }

  addRow(sprite: Sprite, side: string) {
    if (side === "left") sprite.addColumn(true);
    if (side === "right") sprite.addColumn();
    if (side === "top") sprite.addRow(true);
    if (side === "bottom") sprite.addRow();

    sprite.save();
  }

  subtractRow(sprite: Sprite, side: string) {
    if (side === "left") sprite.subtractColumn(true);
    if (side === "right") sprite.subtractColumn();
    if (side === "top") sprite.subtractRow(true);
    if (side === "bottom") sprite.subtractRow();

    sprite.save();
  }
}
