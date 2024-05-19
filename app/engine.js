const elements = Object.freeze({
  profil: Object.freeze({
    name: document.querySelector('player-name input'),
    level: document.querySelector('player-level input'),
    xpEarned: document.querySelector('xp-earned'),
    xpToNextLevel: document.querySelector('xp-to-next-level'),
    origin: document.querySelector('player-origin'),
    special: Object.freeze({
      strength: document.querySelector('special-attribute [name="strength"]'),
      perception: document.querySelector('special-attribute [name="perception"]'),
      endurance: document.querySelector('special-attribute [name="endurance"]'),
      charisma: document.querySelector('special-attribute [name="charisma"]'),
      intelligence: document.querySelector('special-attribute [name="intelligence"]'),
      agility: document.querySelector('special-attribute [name="agility"]'),
      luck: document.querySelector('special-attribute [name="luck"]'),
    }),
    luckPoints: document.querySelector('luck-points input')
  }),
  
});

const sheets = ["player-profil", "player-skills", "player-combat", "player-weapons"];
let activeSheet = 0;

class Nav {
  static next () {
    const nextSheet = activeSheet === sheets.length -1 ? 0 : activeSheet + 1;

    document.querySelector(sheets[activeSheet]).style.display = "none";
    document.querySelector(sheets[nextSheet]).style.display = "flex";

    activeSheet = nextSheet;
  }

  static previous () {
    const previousSheet = activeSheet === 0 ? sheets.length - 1 : activeSheet - 1;

    document.querySelector(sheets[activeSheet]).style.display = "none";
    document.querySelector(sheets[previousSheet]).style.display = "flex";

    activeSheet = previousSheet;
  }
}


class File {
  static upload ( event ) {
    const file = event.target.files[0];
  
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        const jsonContent = e.target.result;
        
        try {
          const data = JSON.parse(jsonContent);
          updateHTML(data);
        } catch (err) {
          console.error('Error parsing JSON:', err);
          alert('Invalid JSON file');
        }
      };
          
      reader.readAsText(file);
  
    } else {
      alert('Please upload a valid JSON file');
    }
    
  }

  static download () {
    const jsonData = getData();

    console.log(jsonData);

    const jsonString = JSON.stringify(jsonData, null, 2); // Convert JSON object to string with indentation
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.hidden = true;
    a.download = 'player-data.json'; // The file name for the downloaded file
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Revoke the object URL to free up memory
    URL.revokeObjectURL(url);
  }

  static localSave() {

  }
  
}

const SKILLS = [ "athletics", "barter", "bigGuns", "energyWeapons", "explosives", "lockpick", "medicine", "meleeWeapons", "pilot", "repair", "science", "smallGuns", "sneak", "speach", 'survival', "throwing", "unarmed" ];

function getData () {

  const skills = {};

  for ( const name of SKILLS ) {
    console.log(`Skill name ${name}`);
    skills[name] = {
      tag: document.querySelector(`skill-table [name="${name}Tag"]`).checked,
      rank: document.querySelector(`skill-table [name="${name}Rank"]`).value
    }
  }

  console.log(skills);

  return {
    profil: {
      name: elements.profil.name.value,
      level: elements.profil.level.value,
      xpEarned: elements.profil.xpEarned.value,
      xpToNextLevel: elements.profil.xpToNextLevel.value,
      origin: elements.profil.origin.value,
      special: {
        strength: elements.profil.special.strength.value,
        perception: elements.profil.special.perception.value,
        endurance: elements.profil.special.endurance.value,
        charisma: elements.profil.special.charisma.value,
        intelligence: elements.profil.special.intelligence.value,
        agility: elements.profil.special.agility.value,
        luck: elements.profil.special.luck.value, 
      },
      luckPoints: elements.profil.luckPoints.value
    },
    skills,
  }
}

function updateHTML ({ profil, skills }) {
  elements.profil.name.value = profil.name;
  elements.profil.level.value = profil.level;
  elements.profil.xpEarned.value = profil.xpEarned;
  elements.profil.xpToNextLevel.value = profil.xpToNextLevel;
  elements.profil.origin.value = profil.origin;
  elements.profil.special.strength.value = profil.special.strength;
  elements.profil.special.perception.value = profil.special.perception;
  elements.profil.special.endurance.value = profil.special.endurance;
  elements.profil.special.charisma.value = profil.special.charisma;
  elements.profil.special.intelligence.value = profil.special.intelligence;
  elements.profil.special.agility.value = profil.special.agility;
  elements.profil.special.luck.value = profil.special.luck;
  elements.profil.luckPoints.value = profil.luckPoints;
  
  for ( const name of SKILLS ) {
    document.querySelector(`skill-table [name="${name}Tag"]`).checked = skills[name].tag;
    document.querySelector(`skill-table [name="${name}Rank"]`).value = skills[name].rank;
  }

}


export const engine = Object.freeze({
  File,
  Nav,
});


