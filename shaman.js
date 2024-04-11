import { Character } from './character.js';

class Shaman extends Character {
  constructor() {
    super(10, 2, 75, "Thrall", 10);
  }

  stormStrike(target) {
    if (this.mana >= 20) {
      target.takeDamage(3);
      this.mana -= 20;
      console.log(`${this.name} the ${this.constructor.name} cast his spell on ${target.name} the ${target.constructor.name} and deals 3 damage.`)
    } else {
      console.log("Not enough mana !");
    }
  }

  specialAbility(target) {
    this.stormStrike(target);
  }

  nextTurn() {
    
  };
}

export { Shaman };