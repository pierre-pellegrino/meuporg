class Game {
  constructor(players, turnLeft = 10) {
    this.turnLeft = turnLeft;
    this.players = players;

    this.init();
  }

  updateEnemiesList() {
    const enemiesList = document.getElementById("enemies-target");
    enemiesList.innerHTML = "";
    this.players.filter((p, i) => i > 0 && p.state != "loser").map((p, i) => {
      enemiesList.innerHTML += `<option value='${i+1}'>${p.name}</option>`;
    })
  }

  init() {
    const atkBtn = document.getElementById("attack-btn");
    const speBtn = document.getElementById("special-btn");
    let turnNext=11;
    const enemiesList = document.getElementById("enemies-target");
    enemiesList.innerHTML = "";
    let targetedEnemy=1;
    this.updateEnemiesList();
    enemiesList.addEventListener('change', e => {
      targetedEnemy = enemiesList.value;
    })
    this.newTurn(this.players, 0);
    atkBtn.addEventListener('click', e => {
      turnNext--;    
      if (this.turnLeft > 0 && this.players.filter(p => p.state == "loser").length < this.players.length - 1 && this.players[0].state != "loser" && this.turnLeft == turnNext) {
        document.querySelector(".game-fight-infos").innerHTML = "";
        this.newTurn(this.players, 1, targetedEnemy);
        // displays current players states
        this.newTurn(this.players, 0);
        targetedEnemy = 1;
        this.updateEnemiesList();
      }
      if (this.turnLeft <= 0 || this.players.filter(p => p.state == "loser").length >= this.players.length - 1 || this.players[0].state == "loser") {
        document.querySelector(".game-end").classList.remove("hidden");
        document.querySelector(".game-end").innerHTML += "Partie terminée !";
        console.log("Partie terminée.");
        let winners = this.players.filter(p => p.state != "loser");
        winners.length >= 1 ? (winners.forEach(w => document.querySelector(".game-end").innerHTML += `<p>${w.name} ressort victorieux.</p>`)) : null;
        winners.length >= 1 ? (winners.forEach(w => console.log(`${w.name} ressort victorieux.`))) : console.log("F");
        atkBtn.classList.add("hidden");
        speBtn.classList.add("hidden");
        enemiesList.classList.add("hidden");
        document.querySelector(".game-enemies-infos").classList.add("hidden");
        document.querySelector(".game-end").innerHTML += `<p><button class='replay-btn'>Rejouer</button></p>`;
        document.querySelector(".replay-btn").addEventListener('click', e => {
          location.reload();
        })
      }
    })

    speBtn.addEventListener('click', e => {
      turnNext--;    
      if (this.turnLeft > 0 && this.players.filter(p => p.state == "loser").length < this.players.length - 1 && this.players[0].state != "loser" && this.turnLeft == turnNext) {
        document.querySelector(".game-fight-infos").innerHTML = "";
        this.newTurn(this.players, 2, targetedEnemy);
        // displays current players states
        this.newTurn(this.players, 0);
        targetedEnemy = 1;
        this.updateEnemiesList();
      }
      if (this.turnLeft <= 0 || this.players.filter(p => p.state == "loser").length >= this.players.length - 1 || this.players[0].state == "loser") {
        document.querySelector(".game-end").classList.remove("hidden");
        document.querySelector(".game-end").innerHTML += "Partie terminée !";
        console.log("Partie terminée.");
        let winners = this.players.filter(p => p.state != "loser");
        winners.length >= 1 ? (winners.forEach(w => document.querySelector(".game-end").innerHTML += `<p>${w.name} ressort victorieux.</p>`)) : null;
        winners.length >= 1 ? (winners.forEach(w => console.log(`${w.name} ressort victorieux.`))) : console.log("F");
        atkBtn.classList.add("hidden");
        speBtn.classList.add("hidden");
        enemiesList.classList.add("hidden");
        document.querySelector(".game-enemies-infos").classList.add("hidden");
        document.querySelector(".game-end").innerHTML += `<p><button class='replay-btn'>Rejouer</button></p>`;
        document.querySelector(".replay-btn").addEventListener('click', e => {
          location.reload();
        })
      }
    })
  }

  newTurn(player, atkType, target) {
    document.querySelector(".turns-left").innerText = `Il reste ${this.turnLeft} ${this.turnLeft > 1 ? 'tours' : 'tour'}.`;
    console.log(`Il reste ${this.turnLeft} ${this.turnLeft > 1 ? 'tours' : 'tour'}.`);
    new Turn(player, atkType, target);
    atkType != 0 ? this.turnLeft -= 1 : null;
  }
}