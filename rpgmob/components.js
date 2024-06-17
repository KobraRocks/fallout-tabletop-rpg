const STATES = {
  active: 'active',
  inactive: 'inactive'
}


class RPGElement extends HTMLElement {
  
  #internals;

  constructor () {
    super();

    this.#internals = this.attachInternals();
  }

  get states () { return this.#internals.states; }

}



class ScreenElement extends RPGElement {
  #mainScreenTag = 'start-screen';

  connectedCallback () {
    this.active = this.hasAttribute(STATES.active);
    console.log(this.constructor.name + `is active ${this.active}`);
  }

  get active () { return this.states.has(STATES.active);}
  set active ( flag ) {
    if ( flag ) {
      this.states.delete(STATES.inactive);
      this.states.add(STATES.active);
    } else {
      this.states.delete(STATES.active);
      this.states.add(STATES.inactive);
    }
  }

  backToMainScreen () {
    ScreenElement.switchScreen(this, document.querySelector( this.#mainScreenTag ));
  }

  static switchScreen ( a, b ) {
    a.active = false;
    b.active = true;
  }
}


class StartScreen extends ScreenElement {
  connectedCallback () {
    super.connectedCallback();
    this.querySelector('[action="new"]').addEventListener("click", this.#openNewGameScreen.bind(this));
    this.querySelector('[action="continue"]').addEventListener("click", this.#openContinueGameScreen.bind(this));
    this.querySelector('[action="credit"]').addEventListener("click", this.#openCreditGameScreen.bind(this));
  }

  #openNewGameScreen () {
    ScreenElement.switchScreen( this, document.querySelector("new-game") );
  }

  #openContinueGameScreen () {
    ScreenElement.switchScreen( this, document.querySelector("continue-game") );
  }

  #openCreditGameScreen () {
    ScreenElement.switchScreen( this, document.querySelector("rpgmob-credit") );
  }
}
customElements.define("start-screen", StartScreen);




class SecondaryScreen extends ScreenElement {
  connectedCallback () {
    super.connectedCallback();
    this.querySelector('[action="back"]').addEventListener('click', this.backToMainScreen.bind(this));
  }

}



class NewGame extends SecondaryScreen{
}
customElements.define("new-game", NewGame);



class ContinueGame extends SecondaryScreen {
}
customElements.define("continue-game", ContinueGame);




class RPGMOBCredit extends SecondaryScreen {
}
customElements.define("rpgmob-credit", RPGMOBCredit);



class StartSession extends SecondaryScreen {
}
customElements.define("start-session", StartSession);
