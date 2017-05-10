import Component, {tracked} from "@glimmer/component";

export default class ImportSpriteForm extends Component {
  @tracked blobInput: string = "";
  submitted: boolean = false;

  updateBlobInput(event) {
    this.blobInput = event.target.value;
  }

  submitForm(event) {
    if (!this.submitted) {
      this.submitted = true;
      this.args.importSprite(this.blobInput);
    }

    event.preventDefault();
    return false;
  }
}
