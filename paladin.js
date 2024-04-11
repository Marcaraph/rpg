import { Character } from './character.js';

class Paladin extends Character {
	constructor() {
		super(14, 3, 140, "Uther", 14);
	}

  healingLightning(target) {
    if (this.mana >= 35) {
      target.takeDamage(3);
      this.hp += 4;
      if (this.hp > this.maxHp) {
        this.hp = this.maxHp;
      }
      this.mana -= 35;
      console.log(`${this.name} the ${this.constructor.name} attacks ${target.name} the ${target.constructor.name}. He deals 3 damage and heals himself for 4 hp.`);
    } else {
      console.log("Not enough mana !");
    }
  }

  specialAbility(target) {
    this.healingLightning(target);
  }

  nextTurn() {
    
  };
}

export { Paladin };