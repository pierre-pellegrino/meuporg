const charaInput = document.getElementById("characters-input");
const charaBtn = document.getElementById("characters-btn");
const charaDiv = document.querySelector(".character-select-div");

const charaHp = document.querySelector(".characters-hp");
const charaMana = document.querySelector(".characters-mana");
const charaSp = document.querySelector(".characters-sp");

// let p1 = new Fighter;
// let p2 = new Monk;
// let p3 = new Assassin;

// g = new Game([p1,p2,p3]);

charaInput.addEventListener("change", e => {
  switch (charaInput.value) {
    case '0':
      charaHp.innerText = "12";
      charaMana.innerText = "40";
      charaSp.innerText = "Vision sombre (20 mana) - Inflige 5 dégâts. Réduit de 2 les dégâts subis pour le tour."
    break;
    case '1':
      charaHp.innerText = "16";
      charaMana.innerText = "160";
      charaSp.innerText = "Éclair de soin (25 mana) - Inflige 4 dégâts. Soigne 5 points de vie."
    break;
    case '2':
      charaHp.innerText = "8";
      charaMana.innerText = "200";
      charaSp.innerText = "Imposition des mains (40 mana) - Soigne 8 points de vie."
    break;
    case '3':
      charaHp.innerText = "8";
      charaMana.innerText = "0";
      charaSp.innerText = "Rage (0 mana) - Inflige +1 dégât permanent. Vous inflige 1 point de vie."
    break;
    case '4':
      charaHp.innerText = "6";
      charaMana.innerText = "20";
      charaSp.innerText = "Frappe de l'ombre (20 mana) - Inflige 7 dégâts. Vous rend insensible aux dégâts ce tour."
    break;
  }
})

charaBtn.addEventListener("click", e => {
  let p1, p2, p3;
  let enemyPool = [0,1,2,3,4].filter(e => e != charaInput.value);
  switch (charaInput.value) {
    case '0':
      p1 = new Fighter;
    break;
    case '1':
      p1 = new Paladin;
    break;
    case '2':
      p1 = new Monk;
    break;
    case '3':
      p1 = new Berzerker;
    break;
    case '4':
      p1 = new Assassin;
    break;
  }

  let enemy1 = enemyPool[Math.floor(Math.random()*enemyPool.length)]
  switch (enemy1) {
    case 0:
      p2 = new Fighter;
    break;
    case 1:
      p2 = new Paladin;
    break;
    case 2:
      p2 = new Monk;
    break;
    case 3:
      p2 = new Berzerker;
    break;
    case 4:
      p2 = new Assassin;
    break;
  }

  enemyPool = [0,1,2,3,4].filter(e => e != enemy1 && e != charaInput.value);
  let enemy2 = enemyPool[Math.floor(Math.random()*enemyPool.length)]
  switch (enemy2) {
    case 0:
      p3 = new Fighter;
    break;
    case 1:
      p3 = new Paladin;
    break;
    case 2:
      p3 = new Monk;
    break;
    case 3:
      p3 = new Berzerker;
    break;
    case 4:
      p3 = new Assassin;
    break;
  }

  charaDiv.classList.add("hidden");
  document.querySelector('.game-div').classList.remove("hidden");
  
  g = new Game([p1,p2,p3]);
})