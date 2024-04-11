import { Character } from './character.js';

class Monk extends Character {
	constructor() {
		super(7, 2, 200, "Chen", 7);
	}

  heal() {
    if (this.mana >= 30) {
      this.hp +=7;
      if (this.hp > this.maxHp) {
        this.hp = this.maxHp;
      }
      this.mana -= 25;
      console.log(`${this.name} the ${this.constructor.name} heals herself for ${this.maxHp - this.hp} hp.`);
    } else {
      console.log("Not enough mana !");
    }
  }

  specialAbility() {
    this.heal();
  }

  nextTurn() {
    
  };
}

export { Monk };