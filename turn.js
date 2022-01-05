class Turn {
  constructor(players) {
    this.players = players;
    this.init();
  }

  playerTarget() {
    let playerChoice = 0;
    this.players.filter((p, i) => i > 0).map((p, i) => console.log(`${i+1} - ${p.name} : ${p.hp}pdv.`))
    while (isNaN(playerChoice) || playerChoice <1 || playerChoice > this.players.length - 1) {
      playerChoice = window.prompt("Choisissez votre cible. (Voir console)");
      parseInt(playerChoice, 10);
    }
    return playerChoice;
  }

  npcTarget(index) {
    let targetPool = this.players.filter(p => p !== this.players[index]);    
    this.players[index].dealDamage(targetPool[Math.floor(Math.random() * targetPool.length)]);
  }

  init() {
    let whoseTurn = 0;
    while (whoseTurn < this.players.length) {
      this.players = this.players.filter(p => p.state != "loser");
      typeof this.players[whoseTurn] !== 'undefined' && this.players[whoseTurn].state != "loser" ? console.log(`C'est au tour de ${this.players[whoseTurn].name}.`) : null;
      // Players turn
      if (whoseTurn == 0) {
        let playerChoice = 0;
        console.log(`PV : ${this.players[whoseTurn].hp} - Mana : ${this.players[whoseTurn].mana}`);
        console.log(`Attaque spéciale : ${this.players[whoseTurn].spCost} Mana - ${this.players[whoseTurn].spName} - ${this.players[whoseTurn].spDesc}`);
        while (isNaN(playerChoice) || playerChoice < 1 || playerChoice > 3) {
          playerChoice = window.prompt("Tapez 1 pour attaquer, 2 pour lancer votre attaque spéciale ou 3 pour voir l'état des joueurs.");
          parseInt(playerChoice, 10);
        }
        switch (parseInt(playerChoice, 10)) {
          case 1: 
            this.players[whoseTurn].dealDamage(this.players[this.playerTarget()]);
          break;
          case 2: 
            this.players[whoseTurn].special(this.players[this.playerTarget()]);
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