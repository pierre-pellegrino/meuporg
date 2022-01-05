class Turn {
  constructor(players) {
    this.players = players;
    this.init();
  }

  init() {
    let whoseTurn = 0;
    while (whoseTurn < this.players.filter(p => p.state != "loser").length) {
      console.log(`C'est au tour de ${this.players[whoseTurn].name}.`);
      // Players turn
      if (whoseTurn == 0) {
        let playerChoice = 0;
        while (playerChoice < 1 || playerChoice > 2) {
          playerChoice = window.prompt("Tapez 1 pour attaquer.");
        }
        switch (parseInt(playerChoice, 10)) {
          case 1: 
            this.players[whoseTurn].dealDamage(this.players[whoseTurn+1]);
          break;
          case 2: 
            this.players[whoseTurn].special(this.players[whoseTurn+1]);
          break;
        }
      }
      // NPC turn(s)
      else {
        this.players[whoseTurn].dealDamage(this.players[0]);
      }
      whoseTurn++;    
    }
    // End of turn effects
    this.players.forEach(player => player.shield = 0);
  }
}