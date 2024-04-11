import { Fighter } from './fighter.js'
import { Paladin } from './paladin.js'
import { Monk } from './monk.js'
import { Berzerker } from './berzerker.js'
import { Assassin } from './assassin.js'
import { Wizard } from './wizard.js'
import { Shaman } from './shaman.js'
import { Character } from './character.js'

// Create characters

const anduin = new Fighter();
const uther = new Paladin();
const chen = new Monk();
const grom = new Berzerker();
const valeera = new Assassin();
const rhonin = new Wizard();
const thrall = new Shaman();

// Create class Game

class Game {
  constructor() {
    this.turnLeft = 10;
    this.allCharacters = [anduin, uther, chen, grom, valeera, rhonin, thrall];
    this.characters = this.selectRandomCharacters(5);
  }

  selectRandomCharacters(num) {
    const shuffledCharacters = this.allCharacters.sort(() => Math.random() - 0.5);
    return shuffledCharacters.slice(0, num);
  }

  skipTurn() {
    this.turnLeft--;
    if (this.turnLeft === 0) {
      this.endGame();
    }
  }

  startTurn() {
    console.log(`This is round ${11 - this.turnLeft}`);
    this.watchStats();
    this.characters.forEach(character => {
      if (character.status === 'Alive' && character instanceof Fighter) {
        character.handleProtectedStatus();
      }
    });
  }

  playTurn() {
    this.startTurn();
    this.characters.forEach(character => {
      if (character.status === 'Alive') {
        console.log(`It's ${character.name} the ${character.constructor.name}'s turn.`);
        // Choosing random target
        const availableTargets = this.characters.filter(char => char !== character && char.status === 'Alive');
        if (availableTargets.length === 0) {
          return;
        }
        const target = availableTargets[Math.floor(Math.random() * availableTargets.length)];
        // Attack or special
        if (Math.random() < 0.5) {
          character.specialAbility(target);
        } else {
          character.dealDamage(target);
          console.log(`${character.name} the ${character.constructor.name} attacks ${target.name} the ${target.constructor.name} and deals ${character.dmg} damage.`)
        }
        console.log(`${character.name} the ${character.constructor.name} has ${character.hp} hp left and ${target.name} the ${target.constructor.name} has ${target.hp} hp left.`);
      }
    });
    this.skipTurn();
    this.currentTurn++;
    this.endGame();
  }

  watchStats() {
    this.characters.forEach(character => {
      console.log(`${character.name} the ${character.constructor.name}: HP : ${character.hp}/${character.maxHp}, ATK : ${character.dmg}, Mana : ${character.mana}, Status : ${character.status} - ${character.protectedStatus}`);
    });
  }

  endGame() {
    const remainingCharacters = this.characters.filter(character => character.status === 'Alive');
    if (remainingCharacters.length === 1) {
      remainingCharacters[0].status = 'winner';
      console.log(`${remainingCharacters[0].constructor.name} is the winner !`);
      this.turnLeft = 0;
    } else if (this.turnLeft === 0) {
      console.log("Game over. Draw !")
      this.watchStats();
    }
  }

  startGame() {
    console.log("Let the fight begins !");
    while (this.turnLeft > 0) {
      this.playTurn();
    }
  }

  handleUserAction(action, initiatorIndex) {
    const initiator = this.characters[initiatorIndex];
    const availableTargets = this.characters.filter((character, index) => index !== initiatorIndex && character.status === 'Alive');

    if (availableTargets.length === 0) {
      console.log("You don't have a target !");
      return;
    }

    const targetIndex = Math.floor(Math.random() * availableTargets.length);
    const target = availableTargets[targetIndex];

    switch (action) {
      case 'attack':
        initiator.dealDamage(target);
        console.log(`${initiator.name} the ${initiator.constructor.name} attacks ${target.name} the ${target.constructor.name} and deals ${initiator.dmg} damage.`);
        break;
      case 'special':
        if (initiator.hasOwnProperty('specialAbility')) {
          initiator.specialAbility();
          console.log(`${initiator.name} the ${initiator.constructor.name} uses ${initiator.specialAbility}.`);
        } else {
          console.log(`${initiator.name} the ${initiator.constructor.name} doesn't have a Special Ability.`);
        }
        break;
      default:
        console.log("C'EST NON !");  
    }
  }
}

export { Game };