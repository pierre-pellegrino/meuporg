const charaInput = document.getElementById("characters-input");
const charaBtn = document.getElementById("characters-btn");

// let p1 = new Fighter;
let p2 = new Monk;
let p3 = new Assassin;

// g = new Game([p1,p2,p3]);

charaBtn.addEventListener("click", e => {
  let p1;
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

  g = new Game([p1,p2,p3]);
})