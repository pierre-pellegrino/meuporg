class Character {
  constructor(hp, dmg, mana, spName, spDmg, spShield, spHeal, spBoost, spCost, spDesc) {
    this.hp = hp;
    this.dmg = dmg;
    this.mana = mana;
    this.state = "playing";
    this.shield = 0;
    this.spName = spName;
    this.spDmg = spDmg;
    this.spShield = spShield;
    this.spHeal = spHeal;
    this.spBoost = spBoost;
    this.spCost = spCost;
    this.spDesc = spDesc;
  }

  takeDamage(amount) {
    if (this.hp - (amount - this.shield) <= 0) {
      this.hp = 0;
      this.state = "loser";
      console.log(`${this.name} est mort.`);
    }
    else {
      this.hp -= (amount - this.shield);
    }
  }

  dealDamage(victim) {
    console.log(`${this.name} inflige ${this.dmg - victim.shield} ${this.dmg - victim.shield > 1 ? "dégâts" : "dégât"} à ${victim.name}.`);
    victim.takeDamage(this.dmg);
  }

  special(victim) {
    console.log(`${this.name} lance ${this.spName}.`);
    if (this.spShield > 0) {
      this.shield += this.spShield;
      console.log(`${this.name} réduit les dégâts de ${this.spShield} ce tour.`);
    }
    if (this.spDmg > 0) {
      console.log(`${this.name} inflige ${this.spDmg - victim.shield} ${this.spDmg - victim.shield > 1 ? "dégâts" : "dégât"} à ${victim.name}.`);
      victim.takeDamage(this.spDmg);
    }
    if (this.spHeal > 0) {
      this.hp += this.spHeal;
      console.log(`${this.name} récupère ${this.spHeal} points de vie.`);
    }
    if (this.spBoost > 0) {
      this.dmg += 1;
      console.log(`${this.name} gagne ${this.spBoost} dégât permanent.`);
      this.hp > 1 ? this.hp -= 1 : null;
      console.log(`${this.name} s'inflige 1 point de dégât.`);
    }
  };
}

class Fighter extends Character {
  constructor(hp = 12, mana = 40, dmg = 4, name = "Grace", spName = "Vision sombre", spDmg = 5, spShield = 2, spHeal = 0, spBoost = 0, spCost = 20, spDesc="Inflige 5 dégâts. Réduit de 2 les dégâts subis pour le tour.") {
    super(hp, dmg, mana, spName, spDmg, spShield, spHeal, spBoost, spCost, spDesc);
    this.name = name;
  }
}

class Paladin extends Character {
  constructor(hp = 16, mana = 160, dmg = 3, name = "Ulder", spName = "Éclair de soin", spDmg = 4, spShield = 0, spHeal = 5, spBoost = 0, spCost = 40, spDesc="Inflige 4 dégâts. Soigne 5 points de vie.") {
    super(hp, dmg, mana, spName, spDmg, spShield, spHeal, spBoost, spCost, spDesc);
    this.name = name;
  }
}

class Monk extends Character {
  constructor(hp = 8, mana = 200, dmg = 2, name = "Moana", spName = "Imposition des mains", spDmg = 0, spShield = 0, spHeal = 8, spBoost = 0, spCost = 25, spDesc="Soigne 8 points de vie.") {
    super(hp, dmg, mana, spName, spDmg, spShield, spHeal, spBoost, spCost, spDesc);
    this.name = name;
  }
}

class Berzerker extends Character {
  constructor(hp = 8, mana = 0, dmg = 4, name = "Draven", spName = "Rage", spDmg = 0, spShield = 0, spHeal = 0, spBoost = 1, spCost = 0, spDesc="Inflige +1 dégât permanent. Vous inflige 1 point de vie.") {
    super(hp, dmg, mana, spName, spDmg, spShield, spHeal, spBoost, spCost, spDesc);
    this.name = name;
  }
}

class Assassin extends Character {
  constructor(hp = 6, mana = 20, dmg = 4, name = "Carl", spName = "Frappe de l'ombre", spDmg = 7, spShield = 999, spHeal = 0, spBoost = 0, spCost = 20, spDesc="Inflige 7 dégâts. Vous rend insensible aux dégâts ce tour.") {
    super(hp, dmg, mana, spName, spDmg, spShield, spHeal, spBoost, spCost, spDesc);
    this.name = name;
  }
}