import { Character } from './character.js';

class Wizard extends Character {
  constructor() {
    super(10, 2, 200, "Rhonin", 10);
  }

  fireBall(target) {
    if (this.mana >= 20) {
      target.takeDamage(5);
      this.mana -= 20;
      console.log(`${this.name} the ${this.constructor.name} cast his spell on ${target.name} the ${target.constructor.name} and deals 5 damage.`)
    } else {
      console.log("Not enough mana !");
    }
  }

  specialAbility(target) {
    this.fireBall(target);
  }

  nextTurn() {
    
  };
}

export { Wizard };