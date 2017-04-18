import {tracked} from "@glimmer/component";

let INSTANCE: Store = null;

export default class Store {
  @tracked editingSprite: boolean = false;

  private Constructor() {

  }

  public static getStore(): Store {
    if (!INSTANCE) {
      INSTANCE = new Store();
      window['STORE'] = INSTANCE;
    }

    return INSTANCE;
  }
}


