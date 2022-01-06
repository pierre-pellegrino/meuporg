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
    this.gameTextDiv = document.querySelector(".game-fight-infos");
  }

  takeDamage(attacker, amount) {
    if (amount >= this.shield) {
      if (this.hp - (amount - this.shield) <= 0) {
        this.hp = 0;
        this.state = "loser";
        this.gameTextDiv.innerHTML += `<p>${this.name} est mort.</p>`;
        console.log(`${this.name} est mort.`);
        attacker.mana += 20;
        this.gameTextDiv.innerHTML += `<p>${attacker.name} gagne 20 de mana.</p>`;
        console.log(`${attacker.name} gagne 20 de mana.`);
      }
      else {
        this.hp -= (amount - this.shield);
      }
    }
  }

  dealDamage(victim) {
    this.gameTextDiv.innerHTML += `<p>${this.name} inflige ${this.dmg - victim.shield > 0 ? this.dmg : 0} ${this.dmg - victim.shield > 1 ? "dégâts" : "dégât"} à ${victim.name}.</p>`;
    console.log(`${this.name} inflige ${this.dmg - victim.shield > 0 ? this.dmg : 0} ${this.dmg - victim.shield > 1 ? "dégâts" : "dégât"} à ${victim.name}.`);
    victim.takeDamage(this, this.dmg);
    this.gameTextDiv.innerHTML += `<p style="margin-bottom:16px"></p>`;
  }

  special(victim) {
    if (this.mana >= this.spCost) {
      this.mana -= this.spCost;
      this.gameTextDiv.innerHTML += `<p>${this.name} lance ${this.spName}.</p>`;
      console.log(`${this.name} lance ${this.spName}.`);
      if (this.spShield > 0) {
        this.shield += this.spShield;
        this.gameTextDiv.innerHTML += `<p>${this.name} réduit les dégâts de ${this.spShield} ce tour.</p>`;
        console.log(`${this.name} réduit les dégâts de ${this.spShield} ce tour.`);
      }
      if (this.spDmg > 0) {
        this.gameTextDiv.innerHTML += `<p>${this.name} inflige ${this.spDmg - victim.shield > 0 ? this.spDmg : 0} ${this.spDmg - victim.shield > 1 ? "dégâts" : "dégât"} à ${victim.name}.</p>`;
        console.log(`${this.name} inflige ${this.spDmg - victim.shield} ${this.spDmg - victim.shield > 1 ? "dégâts" : "dégât"} à ${victim.name}.`);
        victim.takeDamage(this, this.spDmg);
      }
      if (this.spHeal > 0) {
        this.hp += this.spHeal;
        this.gameTextDiv.innerHTML += `<p>${this.name} récupère ${this.spHeal} points de vie.</p>`;
        console.log(`${this.name} récupère ${this.spHeal} points de vie.`);
      }
      if (this.spBoost > 0) {
        this.dmg += 1;
        this.gameTextDiv.innerHTML += `<p>${this.name} gagne ${this.spBoost} dégât permanent.</p>`;
        console.log(`${this.name} gagne ${this.spBoost} dégât permanent.`);
        if (this.hp > 1) {
          this.hp -= 1;
          this.gameTextDiv.innerHTML += `<p>${this.name} s'inflige 1 point de dégât.</p>`;
          console.log(`${this.name} s'inflige 1 point de dégât.`);
        }
      }
      this.gameTextDiv.innerHTML += `<p style="margin-bottom:16px"></p>`;
    }
    else {
      this.gameTextDiv.innerHTML += `<p>N'ayant pas assez de mana, vous lancez une attaque normale.</p>`;
      console.log(`N'ayant pas assez de mana, vous lancez une attaque normale.`);
      this.dealDamage(victim);
    }
  };
}

class Fighter extends Character {
  constructor(hp = 12, mana = 40, dmg = 4, name = "Grace le guerrier", spName = "Vision sombre", spDmg = 4, spShield = 2, spHeal = 0, spBoost = 0, spCost = 20, spDesc="Inflige 4 dégâts. Réduit de 2 les dégâts subis pour le tour.") {
    super(hp, dmg, mana, spName, spDmg, spShield, spHeal, spBoost, spCost, spDesc);
    this.name = name;
  }
}

class Paladin extends Character {
  constructor(hp = 14, mana = 160, dmg = 3, name = "Ulder le paladin", spName = "Éclair de soin", spDmg = 3, spShield = 0, spHeal = 3, spBoost = 0, spCost = 40, spDesc="Inflige 3 dégâts. Soigne 3 points de vie.") {
    super(hp, dmg, mana, spName, spDmg, spShield, spHeal, spBoost, spCost, spDesc);
    this.name = name;
  }
}

class Monk extends Character {
  constructor(hp = 8, mana = 100, dmg = 2, name = "Moana la moine", spName = "Imposition des mains", spDmg = 0, spShield = 0, spHeal = 5, spBoost = 0, spCost = 25, spDesc="Soigne 5 points de vie.") {
    super(hp, dmg, mana, spName, spDmg, spShield, spHeal, spBoost, spCost, spDesc);
    this.name = name;
  }
}

class Berzerker extends Character {
  constructor(hp = 18, mana = 0, dmg = 4, name = "Draven le berzerker", spName = "Rage", spDmg = 0, spShield = 0, spHeal = 0, spBoost = 1, spCost = 0, spDesc="Inflige +1 dégât permanent. Vous inflige 1 point de vie.") {
    super(hp, dmg, mana, spName, spDmg, spShield, spHeal, spBoost, spCost, spDesc);
    this.name = name;
  }
}

class Assassin extends Character {
  constructor(hp = 6, mana = 20, dmg = 4, name = "Carl", spName = "Frappe de l'ombre", spDmg = 6, spShield = 999, spHeal = 0, spBoost = 0, spCost = 20, spDesc="Inflige 6 dégâts. Vous rend insensible aux dégâts ce tour.") {
    super(hp, dmg, mana, spName, spDmg, spShield, spHeal, spBoost, spCost, spDesc);
    this.name = name;
  }
}

class Bard extends Character {
  constructor(hp = 9, mana = 60, dmg = 4, name = "Francis Lalanne", spName = "Douce ballade", spDmg = 7, spShield = 0, spHeal = 0, spBoost = 0, spCost = 40, spDesc="Lance un chant enchanteur. Inflige 7 dégâts.") {
    super(hp, dmg, mana, spName, spDmg, spShield, spHeal, spBoost, spCost, spDesc);
    this.name = name;
  }
}