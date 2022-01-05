class Character {
  constructor(hp, dmg, mana) {
    this.hp = hp;
    this.dmg = dmg;
    this.mana = mana;
    this.state = "playing";
  }

  takeDamage(amount) {
    console.log(`${this.name} reçoit ${amount} dégâts.`);
    if (this.hp - amount <= 0) {
      this.hp = 0;
      this.state = "loser";
      console.log(`${this.name} est mort.`);
    }
    else {
      this.hp -= amount;
    }
  }

  dealDamage(victim) {
    victim.takeDamage(this.dmg);
  }
}

class Fighter extends Character {
  constructor(hp = 12, mana = 40, dmg = 4, name = "Grace") {
    super(hp, dmg, mana);
    this.name = name;
  }
}

class Paladin extends Character {
  constructor(hp = 16, mana = 160, dmg = 3, name = "Ulder") {
    super(hp, dmg, mana);
    this.name = name;
  }
}

class Monk extends Character {
  constructor(hp = 8, mana = 200, dmg = 2, name = "Moana") {
    super(hp, dmg, mana);
    this.name = name;
  }
}

class Berzerker extends Character {
  constructor(hp = 8, mana = 0, dmg = 4, name = "Draven") {
    super(hp, dmg, mana);
    this.name = name;
  }
}

class Assassin extends Character {
  constructor(hp = 6, mana = 20, dmg = 4, name = "Carl") {
    super(hp, dmg, mana);
    this.name = name;
  }
}