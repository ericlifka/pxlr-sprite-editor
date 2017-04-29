import {tracked} from "@glimmer/component";
import guid from "./guid-helper";

export default class Pixel {
  id: string = guid();
  @tracked color: string;

  constructor(color: string = "#ffffff") {
    this.color = color;
  }
}
