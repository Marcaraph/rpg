import { Character } from './character.js';

class Berzerker extends Character {
	constructor() {
		super(8, 4, 0, "Grom", 8);
	}

  rage() {
    this.dmg++;
    this.hp--;
    console.log(`${this.name} the ${this.constructor.name} enrages ! He loses 1 hp and gains 1 Dmg. He has now ${this.hp} hp and ${this.dmg} Dmg.`);
  }

  specialAbility() {
    this.rage();
  }

  nextTurn() {
    
  };
}

export { Berzerker };