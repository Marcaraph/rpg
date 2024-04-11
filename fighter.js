import { Character } from './character.js';

class Fighter extends Character {
	constructor() {
		super(12, 4, 40, "Anduin", 12);
    this.protectedStatus = false;
    this.protectedTurn = 0;
    this.currentTurn = 1;
	}

  darkVision(target) {
    if (this.mana >= 20) {
      target.takeDamage(3);
      this.mana -= 20;
      this.protectedTurn = this.currentTurn + 1;
      this.protectedStatus = true;
      this.protection = 2;
      console.log(`${this.name} the ${this.constructor.name} attacks ${target.name} the ${target.constructor.name}. He deals 3 damage.`);
      console.log(`${this.name} the ${this.constructor.name} gains the Protected status for the next round.`);
    } else {
      console.log("Not enough mana !");
    }
  }

  specialAbility(target) {
    this.darkVision(target);
  }

  handleProtectedStatus() {
    if (this.protectedStatus && this.protectedTurn <= this.currentTurn) {
      this.protectedStatus = false;
      console.log(`${this.name} the ${this.constructor.name} loses the Protected status.`);
    }
  }

}

export { Fighter };