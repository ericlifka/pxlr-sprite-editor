import Component, {tracked} from "@glimmer/component";

export default class ColorConverter extends Component {
  @tracked red: number = 0;
  @tracked green: number = 0;
  @tracked blue: number = 0;
  @tracked hex: string = "000000";

  updateRGB(color, event) {
    this[color] = parseInt(event.target.value || "0", 10);

    this.recalculateHex();
  }

  recalculateHex() {
    this.hex =
      toHexCode(this.red) +
      toHexCode(this.green) +
      toHexCode(this.blue);
  }
}

function toHexCode(num: number = 0) {
  let hexStr = num.toString(16);

  if (!hexStr) {
    return "00";
  }

  if (hexStr.length < 2) {
    return "0" + hexStr;
  }

  if (hexStr.length > 2) {
    return "ff";
  }

  return hexStr;
}
