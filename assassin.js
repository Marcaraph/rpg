import { Character } from './character.js';

class Assassin extends Character {
	constructor() {
		super(6, 6, 20, "Valeera", 6);
	}

  shadowHit(target) {
    if (this.mana >= 10) {
      target.takeDamage(5);
      this.mana -= 10;
      console.log(`${this.name} the ${this.constructor.name} is preparing his attack.`);
    } else {
      console.log("Not enough mana !");
    }
  }

  specialAbility(target) {
    this.shadowHit(target);
  }

  nextTurn() {
    
  };
}

export { Assassin };