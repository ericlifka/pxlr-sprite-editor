import Component, {tracked} from "@glimmer/component";

export default class TwoClickDelete extends Component {
  @tracked showPrompt: boolean = false;

  click() {
    if (!this.showPrompt) {
      this.showPrompt = true;
    } else {
      this.showPrompt = false;
      this.args.action();
    }
  }
}
