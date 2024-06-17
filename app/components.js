// import getTranslation from "./translation.js";
const getTranslation = () => "LABEL";

class RPGElement extends HTMLElement {
  
  #internals;

  constructor () {
    super();

    this.#internals = this.attachInternals();
  }

  // Manage internal states 
  // this.states.add('hidden') or this.states.delete('hidden')
  // or this.states.has('hidden');
  get states () { return this.#internals.states; }
}

class RPGLabel extends HTMLElement {
  connectedCallback() {
    this.addEventListener("localize", this.#localize.bind(this));
  }

  #localize () {
    const labelKey = this.getAttribute("for");
    this.textContent = getTranslation(labelKey); 
  }
}
customElements.define("rpg-label", RPGLabel);


class RPGText extends RPGElement {
  constructor () {
    super();

    this.attachShadow({mode:"open"});
    this.shadowRoot.innerHTML = `<rpg-label for="${this.constructor.name}"></rpg-label><slot></slot>`;
  }
}

class CharacterName extends RPGText {
  connectedCallback() {
    this.shadowRoot.querySelector('rpg-label').textContent = "Name";
  }
}
customElements.define("character-name", CharacterName);

class CharacterOrigin extends RPGText {
  connectedCallback() {
    this.shadowRoot.querySelector('rpg-label').textContent = "Origin";
  }
}
customElements.define("character-origin", CharacterOrigin);

class CharacterBiography extends RPGText {
  connectedCallback() {
    this.shadowRoot.querySelector('rpg-label').textContent = "Biography";
  }
}
customElements.define("character-biography", CharacterBiography);


class CharacterLevel extends RPGElement {

  #level = "level";
  #xpEarned = "xp-earned";
  #xpToNextLevel = "xp-to-next-level";

  constructor () {
    super();

    this.attachShadow({mode:"open"});
    this.shadowRoot.innerHTML = `
      <level>
        <rpg-label for="${this.#level}">Level</rpg-label>
        <value id="${this.#level}">0</value>
      </level>
      <xp>
        <earned>
          <rpg-label for="${this.#xpEarned}">XP earned</rpg-label>
          <value id="${this.#xpEarned}">0</value>
        </earned>
        <to-next-level>
          <rpg-label for="${this.#xpToNextLevel}">XP to next level</rpg-label>
          <value id="${this.#xpToNextLevel}">0</value>
        </to-next-level>
      </xp>
    `;
  }
  get level () { return this.getAttribute(this.#level); }
  get xpEarned () { return this.getAttribute(this.#xpEarned); }
  get xpToNextLevel () { return this.getAttribute(this.#xpToNextLevel); }

  connectedCallback () {
    this.shadowRoot.querySelector('#'+ this.#level).textContent = this.level;
    this.shadowRoot.getElementById(this.#xpEarned).textContent = this.xpEarned;
    this.shadowRoot.getElementById(this.#xpToNextLevel).textContent = this.xpToNextLevel;
  }

  attributeChangedCallback (name, _oldValue, newValue) {
    const scope = [this.#level, this.#xpEarned, this.#xpToNextLevel];
    if (scope.includes(name)) this.shadowRoot.getElementById(name).textContent = newValue;
  }

}
customElements.define("character-level", CharacterLevel);


class CharacterPerk extends RPGElement {
  constructor() {
    super();

    this.attachShadow({mode:"open"});
    this.shadowRoot.innerHTML = `
      <rpg-label for="${this.perk}">Perk not found</rpg-label>
      <rank>0</rank>
      <slot></slot>
    `;
     
  }

  get perk () { return this.getAttribute("perk"); }
  get rank () { return this.getAttribute("rank"); }
  
  connectedCallback () {
    this.shadowRoot.querySelector("rpg-label").textContent = this.perk;
    this.shadowRoot.querySelector("rank").textContent = this.rank;
  }

  attributeChangedCallback (name, _oldValue, newValue) {
    if (name === "rank") this.shadowRoot.querySelector("rank").textContent = newValue;
  }
}
customElements.define("character-perk", CharacterPerk);


class WeaponPerk extends RPGElement {
  constructor () {
    super();

    const perkLabel = getTranslation(`weapon.${this.from}`);

    this.attachShadow({mode: "open"});
    this.shadowRoot.innerHTML = `
      <label>${perkLabel}</label>
      <slot></slot> 
    `;
  }

  get from () { return this.getAttribute('from'); }
}
customElements.define("weapon-perk", WeaponPerk);


