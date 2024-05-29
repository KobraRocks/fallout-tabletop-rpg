/**********************************************
 * BASE CLASS
 * *******************************************/
class RPGElement extends HTMLElement {
  get name () { return this.getAttribute('name'); }
}

/**********************************************
 * BASE INPUT CLASS
 * *******************************************/
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
  static render ({ label, value="My Name" }) {
    return RPGText.render("character-name", {label, value});
  }
}
customElements.define( "character-name", CharacterName );

class CharacterOrigin extends RPGText {
  static render ({ label, value = "UNKNOWN" }) {
    return RPGText.render("character-origin", { label, value }); 
  }
}
customElements.define( "character-origin", CharacterOrigin );

class CharacterBiography extends RPGTextArea {
  static render ({ label, value="NO BIO YET"}) {
    return RPGTextArea.render("character-biography", {label, value }); 
  }
}
customElements.define( "character-biography", CharacterBiography );

class CharacterLevel extends RPGNumber {
  static render ({ 
    label, 
    min = 0,
    max = 9999,
    step = 1,
    value = 0 
  }) {
    return RPGNumber.render("character-level", {label, min, max, step, value});
  }
}
customElements.define( "character-level", CharacterLevel );

class MaximumHP extends RPGNumber {
  static render ({
    label,
    min = 0,
    max = 9999,
    step = 1,
    value = 0
  }) {
   return  RPGNumber.render("maximum-hp", {label, min, max, step, value }); 
  }
}
customElements.define( "maximum-hp", MaximumHP );

class CurrentHP extends RPGNumber {
  static render ({
    label,
    min = 0,
    max = 9999,
    step = 1,
    value = 0
  }) {
   return  RPGNumber.render("current-hp", {label, min, max, step, value }); 
  }
}
customElements.define( "current-hp", CurrentHP );

class XPEarned extends RPGNumber {
  static render ({ 
    label, 
    min = 0,
    max = 9999,
    step = 1,
    value = 0 
  }) {
   return  RPGNumber.render("xp-earned", {label, min, max, step, value });
  }
}
customElements.define( "xp-earned", XPEarned );

class XPToNextLevel extends RPGNumber {
  static render ({ 
    label, 
    min = 0,
    max = 99999,
    step = 1,
    value = 0 
  }) {
   return  RPGNumber.render("xp-to-next-level", {label, min, max, step, value });
  }  
}
customElements.define( "xp-to-next-level", XPToNextLevel );

class CharacterAttribute extends RPGNumber {
  static render ({
    attribute,
    label,
    min = 0,
    max = 99,
    step = 1,
    value = 0
  }) {
    const rankHTML = RPGNumber.render("attribute-rank", {label, min, max, step, value});

    return `
      <character-attribute name="${attribute}">
        ${rankHTML}
      </character-attribute>
    `;
  }
}
customElements.define( "character-attribute", CharacterAttribute );

class AttributePointPool extends RPGNumber {
  static render ({ 
    label, 
    min = 0,
    max = 99,
    step = 1,
    value = 0 
  }) {
    return RPGNumber.render("attribute-point-pool", {label, min, max, step, value});
  }
}
customElements.define( "attribute-point-pool", AttributePointPool );

class CharacterSkill extends RPGElement {
  static render ({ 
    skill, 
    parentAttribute,
    attributeShort,
    label,
    min = 0,
    max = 99,
    step = 1,
    value = 0
  }) {
    return `
      <character-skill name="${skill}" parent-attribute="${parentAttribute}">
        <label>${label} <span class="attribute short">[${attributeShort}]</span></label>
        <input skill-tag type="checkbox" disabled>
        <input skill-rank type="number" min="${min}" max="${max}" step=${step} value="${value}" disabled>

      </character-skill>`;
  }

  get tag () { return this.querySelector('[skill-tag]').checked; }
  set tag ( bool ) { this.querySelector('[skill-tag]').checked = bool; }
  get rank () { return this.querySelector('[skill-rank]').value; }
  set rank ( rank ) { this.querySelector('[skill-rank]').value = rank; }
}
customElements.define( "character-skill", CharacterSkill );

class PerkEffect extends RPGTextArea {
  static render ({ 
    name,
    label, 
    description = "NO DESCRIPTION" }) {
    
    return RPGTextArea.render("perk-effect", { name, label, description });
  }
}
customElements.define( "perk-effect", PerkEffect );

class CharacterPerk extends RPGElement {
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
      <character-perk name="${perk}">
        <label>${label}</label>
        ${perkRankHTML}
        <effect-descriptions>
          ${effectsDescriptions}
        </effect-descriptions>
      </character-perk>
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
customElements.define( "character-perk", CharacterPerk );

class CharacterTrait extends RPGTextArea {
  static render ({ name, label, description="NO DESCRIPTION"}) {
    return RPGTextArea.render("character-trait", { name, label, description });
  }
}
customElements.define( "character-trait", CharacterTrait );

class DamageDice extends RPGNumber {
  static render ({
    icon,
    min = 0,
    max = 99,
    step = 1,
    value = 0

  }) {
    return `
      <damage-dice>
<input type="number" min="${min}" max="${max}" step=${step} value="${value}" disabled><rpg-icon ${icon}>       
      </damage-dice>
    `;
  }
}
customElements.define( "damage-dice", DamageDice );

class DiceBonus extends RPGElement {
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
      <dice-bonus name="${bonus}">
        <label>${label}</label>
        ${damageDiceHTML}
      </dice-bonus>
    `;
  }
}
customElements.define( "dice-bonus", DiceBonus );

class CombatDefense extends RPGNumber {
  static render ({
    label,
    min = 0,
    max = 99,
    step = 1,
    value = 0
  }) {
    return RPGNumber.render("combat-defense", { label, min, max, step, value });
  }
}
customElements.define( "combat-defense", CombatDefense );

class CombatInitiative extends RPGNumber {
  static render ({
    label,
    min = 0,
    max = 99,
    step = 1,
    value = 0
  }) {
    return RPGNumber.render("combat-initiative", { label, min, max, step, value });
  }
}

class DamageResistance extends RPGElement {
  static render ({
    damage,
    label,
    resistance,
    immunity

  }) {

    const resistanceHTML = RPGNumber.render("damage-value", resistance);
    const immunityHTML = RGPCheckbox.render("damage-immunity", immunity);

    return `
      <damage-resistance name="${damage}">
        <label>${label}</label>
        ${immunityHTML}
        ${resistanceHTML}
      </damage-resistance>
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
  static render ({ type, label }) {
    return `
      <damage-type name="${type}">
        <label>${label}</label>
      </damage-type>
    `;
  }
}
customElements.define( "damage-type", DamageType );

class PartHP extends RPGNumber {
  static render ({ 
    label, 
    min = 0, 
    max = 99,
    step = 1,
    value = 0
  }) {
    return RPGNumber.render( "part-hp",{ label, min, max, step, value });
  }
}
customElements.define( "part-hp",PartHP );

class BodyPart extends RPGNumber {
  static render ({
    part,
    hp,
    resistances
  }) {

    let resistancesHTML = "";
    for (const resistance of resistances) {
      resistancesHTML += DamageResistance.render(resistance);
    }

    let partHpHTML = PartHP.render();

    return `
      <body-part name="${part}">
        
        ${resistancesHTML}
      </body-part>
    `;
  }
}
customElements.define( "body-part", BodyPart );

class WeaponEffect extends RPGTextArea {
  static render ({ 
    name,
    label, 
    description = "NO DESCRIPTION" }) {
    
    const effectHTML = RPGEffect.render({ label, description });

    return RPGTextArea.render("weapon-effect", { name, label, description }); 
  }
}
customElements.define( "weapon-effect", WeaponEffect );

class WeaponQuality extends RPGTextArea {
  static render ({ name, label, description = "NO QUALITY" }) {
    const qualityHTML = RPGQuality.render({ label, description });

    return RPGTextAera.render( "weapon-quality",{ name, label, description } );
  } 
}
customElements.define( "weapon-quality", WeaponQuality );


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
        headerHTML += `<table-header>${header}</table-header>`;
      }

      headerHTML += '</table-headers>';

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
  #getTaBleContent () { return this.querySelector('table-content'); } 

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
