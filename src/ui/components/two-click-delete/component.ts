import Component, {tracked} from "@glimmer/component";

export default class TwoClickDelete extends Component {
  @tracked showPrompt: boolean = false;
  @tracked showCheck: boolean = false;

  click() {
    if (this.showCheck) {
      return;
    }

    if (!this.showPrompt) {
      this.showPrompt = true;
    } else {
      this.showCheck = true;
      setTimeout(() => {
        this.showPrompt = false;
        this.showCheck = false;
        this.args.action();
      }, 400);
    }
  }
}
