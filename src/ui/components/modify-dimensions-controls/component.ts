import Component, {tracked} from "@glimmer/component";

export default class ModifyDimensionsControls extends Component {
  click() {
    this.args.action(...arguments);
  }
}
