
import { engine }  from "./engine.js";
// import { FormEngine } from "./FormEngine.js";
import { uploadFile } from "./file.js";
import "./components.js";

const navSettings = document.querySelector("nav-list#character-sheet");
const navFile = document.querySelector("nav-list#file");


// Handle UX
document.querySelector("nav-direction#left").addEventListener("click", engine.Nav.previous, false);
document.querySelector("nav-direction#right").addEventListener("click", engine.Nav.next, false);

document.querySelector("nav-settings").addEventListener("click", () => {
  if ( navSettings.classList.contains("show") ) navSettings.classList.toggle("show"); 

  document.querySelector("nav-list#file").classList.toggle("show");
});

document.querySelector("nav-main").addEventListener("click", () => {
  if (navFile.classList.contains("show") ) navFile.classList.toggle("show");

  document.querySelector("nav-list#character-sheet").classList.toggle("show");
}, false);

document.querySelector("nav-edit").addEventListener("click", () => {
  if ( navSettings.classList.contains("show") ) navSettings.classList.toggle("show"); 
  if (navFile.classList.contains("show") ) navFile.classList.toggle("show");

  const inputs = document.querySelectorAll("input");

  for (const input of inputs) {
    input.disabled = !input.disabled;
  }
}, false);

// Manage Player data import and export
document.getElementById('upload').addEventListener('change', uploadFile, false );
document.getElementById('download').addEventListener('click', () => { 
  engine.File.download(); 
}, false );

/*
// load the default tabletop layout
const defaultLayout = 'fallout';
const tabletopLayout = await fetch(`/tabletop/${defaultLayout}.json`).then( response => response.json() );
FormEngine.render( tabletopLayout.screens );


// Create the skill table
const skills = [
  { skill: "athletics", title:"Athletics", special:"STR" },
  { skill: "barter", title:"Barter", special:"CHA" },
  { skill: "bigGuns", title:"Big Guns", special:"END" },
  { skill: "energyWeapons", title:"Energy Weapons", special:"PER" },
  { skill: "explosives", title:"Explosives", special:"PER" },
  { skill: "lockpick", title:"Lockpick", special:"PER" },
  { skill: "medicine", title:"Medicine", special:"INT" },
  { skill: "meleeWeapons", title:"Melee Weaons", special:"STR" },
  { skill: "pilot", title:"Pilot", special:"PER" },
  { skill: "repair", title:"Repair", special:"INT" },
  { skill: "science", title:"Science", special:"INT" },
  { skill: "smallGuns", title:"Small Guns", special:"AGI" },
  { skill: "sneak", title:"Sneak", special:"AGI" },
  { skill: "speach", title:"Speach", special:"CHA" },
  { skill: "survival", title:"Survival", special:"END" },
  { skill: "throwing", title:"Throwing", special:"AGI" },
  { skill: "unarmed", title:"Unarmed", special:"STR" },
]

function createSkillTable ( skills = [] ) {
  const skillTable = document.querySelector('skill-table');
  let skillTableHTML = '<col-name class="label">Name</col-name><col-tag class="label">Tag</col-tag><col-rank class="label">Rank</col-rank>';

  for (const { skill, title, special } of skills ) {
    skillTableHTML += `
        <label for="${skill}">${title} <span class="special">[${special}]<span></label>
        <input name="${skill}Tag" type="checkbox" disabled>
        <input name="${skill}Rank" type="number" min="0" step="1" value="0" disabled/>
    `;
  }

  skillTable.innerHTML = skillTableHTML;
}

createSkillTable( skills );
*/
