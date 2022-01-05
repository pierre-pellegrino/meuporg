class Turn {
  constructor(players) {
    this.players = players;
    this.init();
  }

  playerTarget() {
    let playerChoice = 0;
    this.players.filter((p, i) => i > 0).map((p, i) => console.log(`${i+1} - ${p.name} : ${p.hp}pdv.`))
    while (playerChoice <1 || playerChoice > this.players.length - 1) {
      playerChoice = window.prompt("Choisissez votre cible. (Voir console)");
    }
    return playerChoice;
  }

  init() {
    let whoseTurn = 0;
    this.players = this.players.filter(p => p.state != "loser");
    while (whoseTurn < this.players.length) {
      this.players[whoseTurn].state != "loser" ? console.log(`C'est au tour de ${this.players[whoseTurn].name}.`) : null;
      // Players turn
      if (whoseTurn == 0) {
        let playerChoice = 0;
        console.log(`Attaque spéciale : ${this.players[whoseTurn].spName} - ${this.players[whoseTurn].spDesc}`)
        while (playerChoice < 1 || playerChoice > 4) {
          playerChoice = window.prompt("Tapez 1 pour attaquer, 2 pour lancer votre attaque spéciale ou 3 pour voir l'état des joueurs.");
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
      else if (this.players[whoseTurn].state != "loser"){
        this.players[whoseTurn].dealDamage(this.players[0]);
      }
      whoseTurn++;    
    }
    // End of turn effects
    this.players.forEach(player => player.shield = 0);
  }
}