class Game {
  constructor(players, turnLeft = 10) {
    this.turnLeft = turnLeft;
    this.players = players;

    this.init();
  }

  init() {
    while (this.turnLeft > 0 && this.players.filter(p => p.state == "loser").length < this.players.length - 1 && this.players[0].state != "loser" ) {
      this.newTurn(this.players);
    }
    console.log("c fini loul");
  }

  newTurn(player) {
    console.log(`Il reste ${this.turnLeft} ${this.turnLeft > 1 ? 'tours' : 'tour'}.`);
    new Turn(player);
    this.turnLeft -= 1;
  }
}