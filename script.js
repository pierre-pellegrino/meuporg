const charaInput = document.getElementById("characters-input");
const charaBtn = document.getElementById("characters-btn");
const charaDiv = document.querySelector(".character-select-div");

const charaHp = document.querySelector(".characters-hp");
const charaMana = document.querySelector(".characters-mana");
const charaDmg = document.querySelector(".characters-dmg");
const charaSp = document.querySelector(".characters-sp");

charaInput.addEventListener("change", e => {
  switch (charaInput.value) {
    case '0':
      charaHp.innerText = "12";
      charaMana.innerText = "40";
      charaDmg.innerText = "4";
      charaSp.innerText = "Vision sombre (20 mana) - Inflige 4 dégâts. Réduit de 2 les dégâts subis pour le tour."
    break;
    case '1':
      charaHp.innerText = "14";
      charaMana.innerText = "160";
      charaDmg.innerText = "3";
      charaSp.innerText = "Éclair de soin (40 mana) - Inflige 3 dégâts. Soigne 3 points de vie."
    break;
    case '2':
      charaHp.innerText = "8";
      charaMana.innerText = "100";
      charaDmg.innerText = "2";
      charaSp.innerText = "Imposition des mains (25 mana) - Soigne 5 points de vie."
    break;
    case '3':
      charaHp.innerText = "18";
      charaMana.innerText = "0";
      charaDmg.innerText = "4";
      charaSp.innerText = "Rage (0 mana) - Inflige +1 dégât permanent. Vous inflige 1 point de vie."
    break;
    case '4':
      charaHp.innerText = "6";
      charaMana.innerText = "20";
      charaDmg.innerText = "6";
      charaSp.innerText = "Frappe de l'ombre (20 mana) - Inflige 6 dégâts. Vous rend insensible aux dégâts ce tour."
    break;
    case '5':
      charaHp.innerText = "9";
      charaMana.innerText = "60";
      charaDmg.innerText = "4";
      charaSp.innerText = "Douce ballade (40 mana) - Lance un chant enchanteur. Inflige 7 dégâts."
    break;
  }
})

charaBtn.addEventListener("click", e => {
  let p1, p2, p3;
  let enemyPool = [0,1,2,3,4,5].filter(e => e != charaInput.value);
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
    case '5':
      p1 = new Bard;
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
    case 5:
      p2 = new Bard;
    break;
  }

  enemyPool = [0,1,2,3,4,5].filter(e => e != enemy1 && e != charaInput.value);
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
    case 5:
      p3 = new Bard;
    break;
  }

  charaDiv.classList.add("hidden");
  document.querySelector('.game-div').classList.remove("hidden");
  
  g = new Game([p1,p2,p3]);
})