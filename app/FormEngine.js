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
  get value () { return this.querySelector('input[type="checkbox"]').checked; }
  set value( bool ) { this.querySelector('input[type="checkbox]').checked = bool;}
}

class RPGNumber extends RPGElement {
  get value () { return this.querySelector('input[type="number"]').value; }
  set value ( number ) { this.querySelector('input[type="number"]').value = number; }
}

class RPGText extends RPGElement {
  get value () { return this.querySelector('input[type="text"]').value; }
  set value ( text ) { this.querySelector('input[type="text"]').value = text; }
}

class RPGTextArea extends RPGElement {
  get value () { return this.querySelector('textarea').value; }
  set value ( text ) { this.querySelector('textarea').value = text; }
}

/**********************************************
 * RPG CLASS
 * *******************************************/
class CharacterName extends RPGText {
  static render ({ label, value="My Name" }) {
    return `
      <character-name>
        <label>${label}</label>
        <input type="text" value="${value}" disabled>
      </character-name>
    `;
  }
}
customElements.define( "character-name", CharacterName );

class characterOrigin extends RPGText {
  static render ({ label, value = "UNKNOWN" }) {
    return `
      <character-origin>
        <label>${label}</label>
        <input type="text" value="${value}" disabled>
      </character-origin>
    `;
  }
}
customElements.define( "character-origin", CharacterOrigin );

class CharacterBiography extends RPGTextArea {
  static render ({ label, value="NO BIO YET"}) {
    return `
      <character-biography>
        <details>
        <summary>${label}</summary>
        <text-area row="5">${value}</text-area>
        </details>
      </character-biography>
    `;
  }
}
customElements.define( "character-biographyr", CharacterBiography );

class CharacterLevel extends RPGNumber {
  static render ({ 
    label, 
    min = 0,
    max = 9999,
    step = 1,
    value = 0 
  }) {
    return `
      <character-level>
        <label>${label}</label>
        <input type="number" min="${min}" max="${max}" step=${step} value="${value}">
      </character-level>
    `;
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
    return `
      <maximum-hp>
        <label>${label}</label>
        <input type="number" min="${min}" max="${max}" step=${step} value="${value}">
      </maximum-hp>
    `;
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
    return `
      <current-hp>
        <label>${label}</label>
        <input type="number" min="${min}" max="${max}" step=${step} value="${value}">
      </current-hp>
    `;
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
    return `
      <xp-earned>
        <label>${label}</label>
        <input type="number" min="${min}" max="${max}" step=${step} value="${value}">
      </xp-earned>
    `;
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
    return `
      <xp-to-next-level>
        <label>${label}</label>
        <input type="number" min="${min}" max="${max}" step=${step} value="${value}">
      </xp-to-next-level>
    `;
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
    return `
      <character-attribute name="${attribute}">
        <label>${label}</label>
        <input attribute-rank type="number" min="${min}" max="${max}" step=${step} value="${value}">
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
    return `
      <attribute-point-pool>
        <label>${label}</label>
        <input type="number" min="${min}" max="${max}" step=${step} value="${value}">
      </attribute-point-pool>
    `;
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
        <input skill-tag type="checkbox">
        <input skill-rank type="number" min="${min}" max="${max}" step=${step} value="${value}">

      </character-skill>`;
  }

  get tag () { return this.querySelector('[skill-tag]').checked; }
  set tag ( bool ) { this.querySelector('[skill-tag]').checked = bool; }
  get rank () { return this.querySelector('[skill-rank]').value; }
  set rank ( rank ) { this.querySelector('[skill-rank]').value = rank; }
}
customElements.define( "character-skill", CharacterSkill );

class RPGEffect extends RPGTextArea {
  static render ({ label, description }) {
    return `
      <details>
        <summary>${label}</summary>
        <textarea row="5">${description}</textarea>
      </details>
    `;  
  }
}

class PerkEffect extends RPGEffect {
  static render ({ 
    effect,
    label, 
    description = "NO DESCRIPTION" }) {
    
    const effectHTML = RPGEffect.render({ label, description });

    return `
      <perk-effect name="${effect}">
      ${effectHTML}
      </perk-effect>
    `;
  }
}
customElements.define( "perk-effect", PerkEffect );

class CharacterPerk extends RPGElement {
  static render ({ 
    perk,
    label, 
    effects = [], 
    min = 0,
    max = 10,
    step = 1,
    value = 0
  }) {

    const effectsDescriptions= '';

    for (let i=0; i < descriptions.length; i++) {
      effectsDescriptions += PerkEffect.render( effects[i] ); 
    }

    return `
      <character-perk name="${perk}">
        <label>${label}</label>
        <input perk-rank type="number" min="${min}" max="${max}" step=${step} value="${value}">
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
  static render ({ trait, label, description="NO DESCRIPTION"}) {
    return `
      <rpg-trait name="${trait}">
        <label>${label}</label>
        <text-area trait-descripion row="5" >${description}</text-area>
      </rpg-trait>
    `;
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
<input type="number" min="${min}" max="${max}" step=${step} value="${value}"><rpg-icon ${icon}>        
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
    return `
      <combat-defense>
        <label>${label}</label>
        <input type="number" min="${min}" max="${max}" step=${step} value="${value}">
      </combat-defense>
    `;
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
    return `
      <combat-initiative>
        <label>${label}</label>
        <input type="number" min="${min}" max="${max}" step=${step} value="${value}">
      </combat-initiative>
    `;
  }
}

class DamageResistance extends RPGElement {
  static render ({
    damage,
    label,
    min = 0,
    max = 99,
    step = 1,
    value = 0,
    immunityValue = "Immune",
    buttonLabel = "Change Immunity"

  }) {
    return `
      <damage-resistance name="${damage}">
        <label>${label}</label>
        <input resistance type="number" min="${min}" max="${max}" step=${step} value="${value}">
        <input immunity type="text" value="${immunityValue}" hidden>
        <button type="button"hidden>${buttonLabel}</button>
      </damage-resistance>
    `;
  }

  get value () {
    return this.querySelector('input:not([hidden])').value;
  }

  set value ( n ) {
      const textInput = this.querySelector('input[type="text"]');
      const numberInput = this.querySelector('input[type="number"]');

      if( typeof n === 'string') {
        textInput.value = n;
        textInput.hidden = false;
        numberInput.hidden = true;
      } else {
        numberInput.value = n;
        numberInput.hidden = false;
        textInput.hidden = true;
      }
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

class BodyPart extends RPGNumber {
  static render ({
    part,
    label,
    min = 0,
    max = 99,
    step = 1,
    value = 0,
    resistances
  }) {

    let resistancesHTML = "";
    for (const resistance of resistances) {
      resistancesHTML += DamageResistance(resistance);
    }

    return `
      <body-part name="${part}">
        <body-part-hp>
          <label>${label}</label>
          <input type="number" min="${min}" max="${max}" step=${step} value="${value}">
        </body-part-hp>
        ${resistancesHTML}
      </body-part>
    `;
  }
}
customElements.define( "body-part", BodyPart );

class WeaponEffect extends RPGEffect {
  static render ({ 
    effect,
    label, 
    description = "NO DESCRIPTION" }) {
    
    const effectHTML = RPGEffect.render({ label, description });

    return `
      <weapon-effect name="${effect}">
      ${effectHTML}
      </weapon-effect>
    `;
  }
}
customElements.define( "weapon-effect", WeaponEffect );

class RPGQuality extends RPGTextArea {
  static render ({ label, description = "NO QUALITY" }) {
    return `
      <details>
        <summary>${label}</summary>
        <textarea row="5">${description}</textarea>
      </details>
    `;
  }
}

class WeaponQuality extends RPGQuality {
  static render ({ quality, label, description = "NO QUALITY" }) {
    const qualityHTML = RPGQuality.render({ label, description });

    return `
      <weapon-quality name="${quality}">
      ${qualityHTML}
      </weapon-quality>
    `;
  } 
}


/**********************************************
 * BUILD LOGIC
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


class Section extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <section-title></section-title>
      <section-inputs></section-inputs>
    `;
  }

  render ({ title = "Section Title", inputs = [] }) {
    for ( const data of inputs ) {
      this.innerHTML += "";
      
    }
  }

}
customElements.define("rpg-section", Section);


class Sheet extends HTMLElement {
  constructor () {
    super();

    this.innerHTML = `
      <sheet-title></sheet-title>
      <sheet-sections></sheet-sections>
    `;
  }

  render ({ title = "Sheet Title", sections = [] }) {
    for ( const section of sections ) {
      const sectionElement = new Section();
      sectionElement.render( section );
      this.querySelector("sheet-section").appendChild( sectionElement );
    }
  }
}
customElements.define("rpg-sheet", Sheet);


const rpgForm = document.querySelector("rpg-form");

class FormEngine {
  static render ( sheets = [] ) {  
    for (const sheet of sheets ) {
      const sheetElement = new Sheet();
      sheetElement.render( sheet );

      rpgForm.appendChild( sheetElement );
    }
  }
}
