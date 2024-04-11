class Character {
	constructor(hp, dmg, mana, name, maxHp) {
		this.hp = hp;
    this.maxHp = hp;
		this.dmg = dmg;
		this.mana = mana;
    this.name = name;
		this.status = 'Alive';
	}

  setMaxHp(maxHp) {
    this.maxHp = maxHp;
    if (this.hp > this.maxHp) {
      this.hp = this.maxHp;
    }
  }

  takeDamage(damage) {
    this.hp -= damage;
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

class Fighter extends Character {
	constructor() {
		super(12, 4, 40, "Anduin", 12);
	}

  darkVision(target) {
    if (this.mana >= 20) {
      target.takeDamage(3);
      this.mana -= 20;
      console.log(`${this.name} the ${this.constructor.name} attacks ${target.name} the ${target.constructor.name}. He deals 3 damage.`);
    } else {
      console.log("Not enough mana !");
    }
  }

  specialAbility(target) {
    this.darkVision(target);
  }
}

// 5 dmg, 20 mana, -2 incoming damage next turn

class Paladin extends Character {
	constructor() {
		super(16, 3, 160, "Uther", 16);
	}

  healingLightning(target) {
    if (this.mana >= 35) {
      target.takeDamage(3);
      this.hp += 5;
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
}

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
}

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
}

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
}

// 7 dmg  + if tar = noDead then 7 dmg @assa, 20 mana

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
}

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
}

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
    console.log(`This is turn ${11 - this.turnLeft}`);
    this.watchStats();
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
    this.endGame();
  }

  watchStats() {
    this.characters.forEach(character => {
      console.log(`${character.name} the ${character.constructor.name}: HP : ${character.hp}/${character.maxHp}, ATK : ${character.dmg}, Mana : ${character.mana}, Status : ${character.status}`);
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

// Create Game

const game = new Game();

document.getElementById("actionForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const action = document.getElementById("action").value;
  game.handleUserAction(action);
  document.getElementById("output").innerText = "Action effectuée : " + action;
});

game.startGame();