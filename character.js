class Character {
	constructor(hp, dmg, mana, name, maxHp) {
		this.hp = hp;
    this.maxHp = hp;
		this.dmg = dmg;
		this.mana = mana;
    this.name = name;
    this.protection = 0;
		this.status = 'Alive';
	}

  setMaxHp(maxHp) {
    this.maxHp = maxHp;
    if (this.hp > this.maxHp) {
      this.hp = this.maxHp;
    }
  }

  takeDamage(damage) {
    this.hp -= (damage - (this.protection ? 2 : 0));
    if (this.hp <= 0) {
      this.hp = 0;
      this.status = 'Dead';
    }
  }

  dealDamage(victim) {
    victim.takeDamage(this.dmg);
    if (victim.status === 'Dead') {
      this.mana += 20;
    }
  }
}

export { Character };