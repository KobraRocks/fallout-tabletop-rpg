/**********************************************
 * BASE CLASS
 * *******************************************/
class RPGElement extends HTMLElement {
  TAGNAME = "MISSING-TAG";
  get name () { return this.getAttribute('name'); }
}

/**********************************************
 * BASE INPUT CLASS
 * *******************************************/
class RPGToto extends RPGElement {

  #label;
  #input;

  constructor () {
    super();
    
    const shadowRoot = this.attachShadow({ mode: open});
    shadowRoot.innerHTML = `
      <label></label>
      <input type="checkbox">
    `;

    this.#label = shadowRoot.querySelector('label');
    this.#input = shadowRoot.querySelector('input');

  }

  get checked () { return this.hasAttribute("checked"); }
  set checked ( bool ) { 

    if ( bool ) {
      this.setAttribute(document.createAttribute("checked")); 
    } else {
      this.removeAttribute("checked");
    }
    this.shadowRoot.querySelector("input").checked = bool; 
  }

  get label () { return this.getAttribute("label"); }

  connectedCallback() {
    this.shadowRoot.querySelector("label").textContent = this.label;
    this.shadowRoot.querySelector("input").checked = this.checked;
  }
}
customElements.define("skill-tag", RPGToto);


class RPGCheckBox extends RPGElement {
  static render ( tagname, { label, checked }) {

    const labelHTML = label ? `<label>${label}</label>` : '';

    return `
      <${tagname}>
        ${labelHTML}
        <input type="checkbox" ${checked ? 'checked': ''}>
      </${tagname}>
    `;
  }
  get value () { return this.querySelector('input[type="checkbox"]').checked; }
  set value( bool ) { this.querySelector('input[type="checkbox]').checked = bool;}
}

class RPGNumber extends RPGElement {
  static render ( tagname, { label, min, max, step, value }) {

    const labelHTML = label ? `<label>${label}</label>` : '';

    return `
      <${tagname}>
        ${labelHTML}
        <input type="number" min="${min}" max="${max}" step="${step}" value="${value}" disabled>
      </${tagname}>
    `;
  }
  get value () { return this.querySelector('input[type="number"]').value; }
  set value ( number ) { this.querySelector('input[type="number"]').value = number; }
}

class RPGText extends RPGElement {
  static render ( tagname, { label, value } ) {

    const labelHTML = label ? `<label>${label}</label>` : '';

    return `
      <${tagname}>
        ${labelHTML}
        <input type="text" value="${value}" disabled>
      </${tagname}>
    `;
  } 
  get value () { return this.querySelector('input[type="text"]').value; }
  set value ( text ) { this.querySelector('input[type="text"]').value = text; }
}

class RPGTextArea extends RPGElement {
  static render (tagname, { name, label, value }) {
    let nameAttribute;

    if (name) nameAttribute = `name="${name}"`;

    return `
      <${tagname} ${name}>
        <details>
          <summary>${label}</summary>
          <textarea row="5" disabled>${value}</textarea>
        </details>
      </${tagname}>
    `;
  }
  get value () { return this.querySelector('textarea').value; }
  set value ( text ) { this.querySelector('textarea').value = text; }
}



/**********************************************
 * RPG CLASS
 * *******************************************/
class CharacterName extends RPGText {
  static TAGNAME =  "character-name";
  static render ({ label, value="My Name" }) {
    return RPGText.render( CharacterName.TAGNAME, {label, value});
  }
}
customElements.define( CharacterName.TAGNAME, CharacterName );

class CharacterOrigin extends RPGText {
  static TAGNAME = "character-origin";
  static render ({ label, value = "UNKNOWN" }) {
    return RPGText.render( CharacterOrigin.TAGNAME, { label, value }); 
  }
}
customElements.define( CharacterOrigin.TAGNAME, CharacterOrigin );

class CharacterBiography extends RPGTextArea {
  static TAGNAME = "character-biography";
  static render ({ label, value="NO BIO YET"}) {
    return RPGTextArea.render( CharacterBiography.TAGNAME, {label, value }); 
  }
}
customElements.define( CharacterBiography.TAGNAME, CharacterBiography );

class CharacterLevel extends RPGNumber {
  static TAGNAME = "character-level";
  static render ({ 
    label, 
    min = 0,
    max = 9999,
    step = 1,
    value = 0 
  }) {
    return RPGNumber.render( CharacterLevel.TAGNAME, {label, min, max, step, value});
  }
}
customElements.define( CharacterLevel.TAGNAME, CharacterLevel );

class MaximumHP extends RPGNumber {
  static TAGNAME = "maximum-hp";
  static render ({
    label,
    min = 0,
    max = 9999,
    step = 1,
    value = 0
  }) {
   return  RPGNumber.render( MaximumHP.TAGNAME, {label, min, max, step, value }); 
  }
}
customElements.define( MaximumHP.TAGNAME, MaximumHP );

class CurrentHP extends RPGNumber {
  static TAGNAME ="current-hp";
  static render ({
    label,
    min = 0,
    max = 9999,
    step = 1,
    value = 0
  }) {
   return  RPGNumber.render( CurrentHP.TAGNAME, {label, min, max, step, value }); 
  }
}
customElements.define( CurrentHP.TAGNAME, CurrentHP );

class XPEarned extends RPGNumber {
  static TAGNAME = "xp-earned";
  static render ({ 
    label, 
    min = 0,
    max = 9999,
    step = 1,
    value = 0 
  }) {
   return  RPGNumber.render( XPEarned.TAGNAME, {label, min, max, step, value });
  }
}
customElements.define( XPEarned.TAGNAME, XPEarned );

class XPToNextLevel extends RPGNumber {
  static TAGNAME = "xp-to-next-level";
  static render ({ 
    label, 
    min = 0,
    max = 99999,
    step = 1,
    value = 0 
  }) {
   return  RPGNumber.render( XPToNextLevel.TAGNAME, {label, min, max, step, value });
  }  
}
customElements.define( XPToNextLevel.TAGNAME, XPToNextLevel );

class CharacterAttribute extends RPGNumber {
  static TAGNAME = "character-attribute";
  static render ({
    attribute,
    label,
    min = 0,
    max = 99,
    step = 1,
    value = 0
  }) {
    const rankHTML = RPGNumber.render( CharacterAttribute.TAGNAME, {label, min, max, step, value});

    return `
      <${CharacterAttribute.TAGNAME} name="${attribute}">
        ${rankHTML}
      </${CharacterAttribute.TAGNAME}>
    `;
  }
}
customElements.define( "character-attribute", CharacterAttribute );

class AttributePointPool extends RPGNumber {
  static TAGNAME = "attribute-point-pool";
  static render ({ 
    label, 
    min = 0,
    max = 99,
    step = 1,
    value = 0 
  }) {
    return RPGNumber.render( AttributePointPool.TAGNAME, {label, min, max, step, value});
  }
}
customElements.define( AttributePointPool.TAGNAME, AttributePointPool );

class CharacterSkill extends RPGElement {
  static TAGNAME = "character-skill";
  static render ({ 
    skill, 
    parentAttribute,
    attributeShort,
    rank
  }) {
    const skillTagHTML = RPGCheckBox.render("skill-tag");
    const skillRankHTML = RPGNumber.render("skill-rank",rank);

    return `
      <${CharacterSkill.TAGNAME} name="${skill}" parent-attribute="${parentAttribute}">
        <label>${label} <span class="attribute short">[${attributeShort}]</span></label>
        ${skillTagHTML}
        ${skillRankHTML}

      </${CharacterSkill.TAGNAME}>`;
  }

  get tag () { return this.querySelector('[skill-tag]').checked; }
  set tag ( bool ) { this.querySelector('[skill-tag]').checked = bool; }
  get rank () { return this.querySelector('[skill-rank]').value; }
  set rank ( rank ) { this.querySelector('[skill-rank]').value = rank; }
}
customElements.define( CharacterSkill.TAGNAME, CharacterSkill );

class PerkEffect extends RPGTextArea {
  static TAGNAME = "perk-effect";
  static render ({ 
    name,
    label, 
    description = "NO DESCRIPTION" }) {
    
    return RPGTextArea.render( PerkEffect.TAGNAME, { name, label, description });
  }
}
customElements.define( PerkEffect.TAGNAME, PerkEffect );

class CharacterPerk extends RPGElement {
  static TAGNAME = "character-perk";
  static render ({ 
    perk,
    label, 
    effects = [], 
  }) {

    const perkRankHTML = RPGNumber.render("perk-rank", rank );
    let effectsDescriptions= '';

    for (let i=0; i < effects.length; i++) {
      effectsDescriptions += PerkEffect.render( effects[i] ); 
    }

    return `
      <${CharacterPerk.TAGNAME} name="${perk}">
        <label>${label}</label>
        ${perkRankHTML}
        <effect-descriptions>
          ${effectsDescriptions}
        </effect-descriptions>
      </${CharacterPerk.TAGNAME}>
    `;
  }

  get rank () { return this.querySelector('[perk-rank]').value; }
  set rank ( rank ) { this.querySelector('[perk-rank]').value = rank; }
  get effects () {
    const perkEffects = this.querySelectorAll('perk-effect');
    const result = [];

    for ( const perkEffect of perkEffects ) {
      result.push({ effect: perkEffect.name, value: perkEffect.value });
    }

    return result;
  }

}
customElements.define( CharacterPerk.TAGNAME, CharacterPerk );

class CharacterTrait extends RPGTextArea {
  static TAGNAME = "character-trait";
  static render ({ name, label, description="NO DESCRIPTION"}) {
    return RPGTextArea.render( CharacterTrait.TAGNAME, { name, label, description });
  }
}
customElements.define( CharacterTrait.TAGNAME, CharacterTrait );

class DamageDice extends RPGNumber {
  static TAGNAME = "damage-dice";
  static render ({
    icon,
    min = 0,
    max = 99,
    step = 1,
    value = 0

  }) {
    return `
      <${DamageDice.TAGNAME}>
        <input type="number" min="${min}" max="${max}" step=${step} value="${value}" disabled><rpg-icon ${icon}>       
      </${DamageDice.TAGNAME}>
    `;
  }
}
customElements.define( DamageDice.TAGNAME, DamageDice );

class DiceBonus extends RPGElement {
  static TAGNAME = "dice-bonus";
  static render ({ 
    bonus,
    label,
    min = 0,
    max = 99,
    step = 1,
    value = "0", 
    icon 
  }) {

    const damageDiceHTML = RPGHTML.DamageDice({ icon, min, max, step, value});

    return `
      <${DiceBonus.TAGNAME} name="${bonus}">
        <label>${label}</label>
        ${damageDiceHTML}
      </${DiceBonus.TAGNAME}>
    `;
  }
}
customElements.define( "dice-bonus", DiceBonus );

class CombatDefense extends RPGNumber {
  static TAGNAME = "combat-defense";
  static render ({
    label,
    min = 0,
    max = 99,
    step = 1,
    value = 0
  }) {
    return RPGNumber.render(CombatDefense.TAGNAME, { label, min, max, step, value });
  }
}
customElements.define( CombatDefense.TAGNAME, CombatDefense );

class CombatInitiative extends RPGNumber {
  static TAGNAME = "combat-initiative";
  static render ({
    label,
    min = 0,
    max = 99,
    step = 1,
    value = 0
  }) {
    return RPGNumber.render(CombatInitiative.TAGNAME, { label, min, max, step, value });
  }
}
customElements.define(CombatInitiative.TAGNAME, CombatInitiative);

class DamageResistance extends RPGElement {
  static TAGNAME = "damage-resistance";
  static render ({
    damage,
    label,
    resistance,
    immunity

  }) {

    const resistanceHTML = RPGNumber.render("damage-value", resistance);
    const immunityHTML = RPGCheckBox.render("damage-immunity", immunity);

    return `
      <${DamageResistance.TAGNAME} name="${damage}">
        <label>${label}</label>
        ${immunityHTML}
        ${resistanceHTML}
      </${DamageResistance.TAGNAME}>
    `;
  }

  get value () {
    return this.resistanceElement.value;
  }
  set value ( n ) {
    this.resistanceElement = n;
  }

  get immuneElement () { return this.querySelector('damage-immunity'); }
  get resistanceElement () { return this.querySelector('damage-value'); } 
  get isImmune () { return this.immuneElement.checked; }

  connectedCallback () {
    this.toggleValue();
    this.immuneElement.addEventListener("change", this.toggleValue.bind(this));
  }

  toggleValue () {
    this.resistanceElement.hidden = this.isImmune; 
  }
}

class DamageType extends RPGElement {
  static TAGNAME = "damage-type";
  static render ({ type, label }) {
    return `
      <${DamageType.TAGNAME} name="${type}">
        <label>${label}</label>
      </${DamageType.TAGNAME}>
    `;
  }
}
customElements.define( DamageType.TAGNAME, DamageType );

class PartHP extends RPGNumber {
  static TAGNAME = "part-hp";
  static render ({ 
    label, 
    min = 0, 
    max = 99,
    step = 1,
    value = 0
  }) {
    return RPGNumber.render( PartHP.TAGNAME,{ label, min, max, step, value });
  }
}
customElements.define( PartHP.TAGNAME, PartHP );

class BodyPart extends RPGNumber {
  static TAGNAME = "body-part";
  static render ({
    name,
    part,
    resistances
  }) {

    let resistancesHTML = "";
    for (const resistance of resistances) {
      resistancesHTML += DamageResistance.render(resistance);
    }

    let partHpHTML = PartHP.render(part);

    return `
      <${BodyPart.TAGNAME} name="${name}">
        ${partHpHTML}        
        ${resistancesHTML}
      </${BodyPart.TAGNAME}>
    `;
  }
}
customElements.define( BodyPart.TAGNAME, BodyPart );

class WeaponEffect extends RPGTextArea {
  static TAGNAME = "weapon-effect"
  static render ({ 
    name,
    label, 
    description = "NO DESCRIPTION" 
  }) {
    return RPGTextArea.render(WeaponEffect.TAGNAME, { name, label, description }); 
  }
}
customElements.define( WeaponEffect.TAGNAME, WeaponEffect );

class WeaponQuality extends RPGTextArea {
  static TAGNAME = "weapon-quality";
  static render ({ name, label, description = "NO QUALITY" }) {
    return RPGTextArea.render( WeaponQuality.TAGNAME,{ name, label, description } );
  } 
}
customElements.define( WeaponQuality.TAGNAME, WeaponQuality );


/**********************************************
 * RPGHTML API
 * *******************************************/
class RPGHTML {

  static rpgSection ( label ) {
    return `<rpg-section>${label}</rpg-section>`;
  }

  static CharacterName = CharacterName;
  static CharacterOrigin = CharacterOrigin;
  static CharacterBiography = CharacterBiography;
  static CharacterLevel = CharacterLevel;
  static MaximumHP = MaximumHP;
  static CurrentHP = CurrentHP;
  static XPEarned = XPEarned;  
  static XPToNextLevel = XPToNextLevel;
  static CharacterAttribute = CharacterAttribute;
  static AttributePointPool = AttributePointPool;
  static CharacterSkill = CharacterSkill;
  static CharacterPerk = CharacterPerk;
  static CharacterTrait = CharacterTrait;
  static DamageDice = DamageDice; 
  static Dicebonus = DiceBonus; 
  static CombatDefense = CombatDefense;
  static CombatInitiative = CombatInitiative; 
  static DamageResistance = DamageResistance;
  static DamageType = DamageType;
  static BodyPart = BodyPart;
  static WeaponEffect = WeaponEffect;
  static WeaponQuality = WeaponQuality;

  static rangedWeapon ({
    label,
    damageType,
    rate,
    range
  }) {
    return `
      <ranged-weapon>
        <label>${label}</label>
        <input rate type="number" min="${rate.min}" max="${rate.max}" step="${rate.step}" value="${rate.value}" >
        <select range>
        </select>
      </ranged-weapon>
    `;
  }
}


class ScreenSection extends HTMLElement {
  static render ({ name, title = "Section Title", inputs = [] }) {
    let inputsHTML = '';

    for ( const data of inputs ) {
      const rpgType = data.type;
      inputsHTML += RPGHTML[rpgType].render( data );  
    }

    return `
    <screen-section name="${name}">
      <section-title>${title}</section-title>
      <section-form>
        ${inputsHTML}
      </section-form>
    </screen-section>
    `;
  }

customElements}
customElements.define("screen-section", ScreenSection);


class Screen extends HTMLElement {
  static render ({ title = "Screen Title", sections = [] }) {
    let sectionsHTML = '';

    for ( const section of sections ) {
      sectionsHTML += ScreenSection.render( section );
    }

    return `
      <screen-title>${title}</screen-title>
      <screen-sections>${sectionsHTML}</screen-sections>
    `;

  }
}
customElements.define("rpg-screen", Screen);

/**********************************************
 * BASE RPG ELEMENTS 
 * *******************************************/
class RPGTable extends RPGElement {
  static render ( tagname, { name, headers = [], actions = [] } ) {

    let headersHTML, actionsHTML;

    if ( actions ) {
      actionsHTML = '<table-actions></table-actions>';

      for ( const action of actions ) {
        if ( action.name === 'add' ) actionsHTML += `<button type="button" action="add" item="${action.item}"  table="${name}">${action.label}<button/>`;
      }
    }

    if ( headers ) {
      headersHTML = '<table-headers>';

      for ( const header of headers) {
        headersHTML += `<table-header>${header}</table-header>`;
      }

      headersHTML += '</table-headers>';

    }

    return `
      <${tagname} name="${name}">
        <table-actions></table-actions>
        ${headersHHTML}
        <table-content></table-content>
      </${tagname}>
    `;
  } 

  #getAddButton () { return this.querySelector('[action="add"]'); }
  #getTableContent () { return this.querySelector('table-content'); } 

  connectedCallback () {
    const actionAddButton = this.#getAddButton();
    
    if ( actionAddButton !== null ) actionAddButton.addEventListener("click", () => {
      const RPGClassName = actionAddButton.getAttribute('item');
      const RPGClass = RPGHTML[RPGClassName];
      this.#getTableContent().appendChild( new RPGClass() );
    });
  }

  addItems ( items = [] ) {
    const addButton = this.#getAddButton();
    const RPGClassName = actionAddButton.getAttribute('item');
    const RPGClass = RPGHTML[RPGClassName];

    let HTML = '';

    for ( const item of items ) {
      HTML += RPGClass.render(item);
    }

    this.#getTableContent().innerHTML = HTML;
  }
}


/**********************************************
 * RENDER RPG FORM
 * *******************************************/
const rpgForm = document.querySelector("rpg-form");

export class FormEngine {
  static render ( screens = [] ) {  
    let screensHTML = '';

    for (const screen of screens ) {
      screensHTML += Screen.render(screen);
    }

    rpgForm.innerHTML = screensHTML;
  }
}
