import {tracked} from "@glimmer/component";

export default class Pixel {
  id: number = Date.now();
  @tracked color: string;

  constructor(color = "#ffffff") {
    this.color = color;
  }
}
