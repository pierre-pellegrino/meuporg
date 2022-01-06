class Turn {
  constructor(players, atkType, targetedEnemy) {
    this.players = players;
    this.atkType = atkType;
    this.targetedEnemy = targetedEnemy;
    this.init();
  }

  npcTarget(index) { 
    let targetPool = this.players.filter(p => p !== this.players[index]);
    let killablePool = targetPool.filter(p => p.hp <= this.players[index].dmg);
    // (Merci de ne pas voler mon algorithme génétique ci-dessous, google en pls)
    if (killablePool.length > 0) {
      this.players[index].dealDamage(killablePool[0]);
    }
    else if (this.players[index].mana >= this.players[index].spCost && Math.floor(Math.random() * 6 + 1) < 5) {
      this.players[index].special(targetPool[Math.floor(Math.random() * targetPool.length)]);
    }
    else {    
      this.players[index].dealDamage(targetPool[Math.floor(Math.random() * targetPool.length)]);
    }
  }

  showEnemiesStats() {
    const enemiesDiv = document.querySelector(".game-enemies-infos");
    enemiesDiv.innerHTML = "";
    this.players.filter((p,i) => i > 0).map(p => {
      enemiesDiv.innerHTML += `<p> ${p.name} : ${p.hp}PV`;
    })
  }

  init() {
    const gameText = document.querySelector(".game-text");
    const attackBtn = document.getElementById("attack-btn");
    const specialBtn = document.getElementById("special-btn");
    let whoseTurn = 0;
    while (whoseTurn < this.players.length) {
      this.players = this.players.filter(p => p.state != "loser");
      typeof this.players[whoseTurn] !== 'undefined' && this.players[whoseTurn].state != "loser" ? console.log(`C'est au tour de ${this.players[whoseTurn].name}.`) : null;
      // Players turn
      if (whoseTurn == 0) {
        gameText.innerHTML = `<p> PV : <span class="bolder">${this.players[whoseTurn].hp}</span> - Mana : <span class="bolder">${this.players[whoseTurn].mana}</span> </p>`;
        console.log(`PV : ${this.players[whoseTurn].hp} - Mana : ${this.players[whoseTurn].mana}`);
        gameText.innerHTML += `<p> Attaque spéciale : <span class="bolder">${this.players[whoseTurn].spCost}</span> Mana - ${this.players[whoseTurn].spName} - ${this.players[whoseTurn].spDesc} </p>`;
        console.log(`Attaque spéciale : ${this.players[whoseTurn].spCost} Mana - ${this.players[whoseTurn].spName} - ${this.players[whoseTurn].spDesc}`);
      this.showEnemiesStats();

       switch (this.atkType) {
        // case 0 is state of the game before first turn.
        case 0:
          whoseTurn = this.players.length;
          break;
        case 1:
          this.players[whoseTurn].dealDamage(this.players[this.targetedEnemy]);
        break;
        case 2:
          this.players[whoseTurn].special(this.players[this.targetedEnemy]);
        break;
       }
      }

      // NPC turn(s)
      else if (typeof this.players[whoseTurn] !== 'undefined' && this.players[whoseTurn].state != "loser"){
        this.npcTarget(whoseTurn);
      }
      console.log(" ");
      whoseTurn++;    
    }
    // End of turn effects
    this.players.forEach(player => player.shield = 0);
  }
}