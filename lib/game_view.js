class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
    this.game.addGoals();
    this.puck = this.game.addPuck();
  }

  menu() {
    this.game.draw();
    const result = document.getElementById('result-screen');
    while (result.firstChild) {
      result.removeChild(result.firstChild);
    }
    result.style.display = "flex";
    const img = document.createElement('IMG');
    img.src = "images/LogoMakr_Title.png";
    img.alt = "Welcome to Slime Air Hockey";
    img.width = 200;
    const pvp = document.createElement("button");
    const pvpText = document.createTextNode("Player versus Player");
    pvp.appendChild(pvpText);
    const pvc = document.createElement("button");
    const pvcText = document.createTextNode("Player versus Computer");
    pvc.appendChild(pvcText);
    const cvc = document.createElement("button");
    const cvcText = document.createTextNode("Computer versus Computer");
    cvc.appendChild(cvcText);
    result.appendChild(img);
    result.appendChild(pvp);
    result.appendChild(pvc);
    result.appendChild(cvc);
    pvp.addEventListener('click', () => {
      result.style.display = "none";
      this.start("pvp");
    });
    pvc.addEventListener('click', () => {
      this.versusComputerScreen();
    });
    cvc.addEventListener('click', () => {
      result.style.display = "none";
      this.start("cvc");
    })
  }

  versusComputerScreen(){
    const result = document.getElementById('result-screen');
    while (result.firstChild) {
      result.removeChild(result.firstChild);
    }
    const img = document.createElement('IMG');
    img.src = "images/LogoMakr_Title.png";
    img.alt = "Welcome to Slime Air Hockey";
    img.width = 200;
    const pvcR = document.createElement("button");
    const pvcRText = document.createTextNode("Random Comp");
    const pvcA = document.createElement("button");
    const pvcAText = document.createTextNode("Aggro Comp");
    const pvcD = document.createElement("button");
    const pvcDText = document.createTextNode("Defensive Comp");
    const back = document.createElement("button");
    const backText = document.createTextNode("back");
    pvcR.appendChild(pvcRText);
    pvcA.appendChild(pvcAText);
    pvcD.appendChild(pvcDText);
    back.appendChild(backText);
    result.appendChild(img);
    result.appendChild(pvcR);
    result.appendChild(pvcA);
    result.appendChild(pvcD);
    result.appendChild(back);
    pvcR.addEventListener('click', () => {
      result.style.display = "none";
      this.start("pvcR");
    });
    pvcA.addEventListener('click', () => {
      result.style.display = "none";
      this.start("pvcA");
    });
    pvcD.addEventListener('click', () => {
      result.style.display = "none";
      this.start("pvcD");
    })
    back.addEventListener('click', () => {
      this.menu();
    });
  }


  start(type) {
    if(type === "pvp"){
      this.pvpSlimes();
    } else if(type === "pvcR") {
      this.pvcRAISlime();
    } else if (type === "pvcA") {
      this.pvcAAISlime();
    } else if (type === "pvcD") {
      this.pvcDAISlime();
    } else if(type === "cvc"){
      this.cvcSlimes();
    }
    this.lastTime = 0;
    this.game.handleTimer();
    requestAnimationFrame(this.animate.bind(this));
  }

  pvpSlimes(){
    this.slime1 = this.game.addSlime(1);
    this.slime2 = this.game.addSlime(3);
    this.slime1.keybind("player1");
    this.slime2.keybind("player2");
  }

  pvcRAISlime(){
    this.slime1 = this.game.addSlime(1);
    this.slime2 = this.game.addRAISlime(3);
    this.slime1.keybind("player1");
  }

  pvcAAISlime(){
    this.slime1 = this.game.addSlime(1);
    this.slime2 = this.game.addAAISlime(3);
    this.slime1.keybind("player1");
  }

  pvcDAISlime() {
    this.slime1 = this.game.addSlime(1);
    this.slime2 = this.game.addDAISlime(3);
    this.slime1.keybind("player1");
  }

  cvcSlimes() {
    this.slime1 = this.game.addRNGSlime(1);
    this.slime2 - this.game.addRNGSlime(3);
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    this.game.draw();
    this.lastTime = time;
    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES = {
  w: {'x': 0, 'y': -2},
  a: {'x': -2, 'y': 0},
  s: {'x': 0, 'y': 2},
  d: {'x': 2, 'y': 0},
};

GameView.MOVES2 = {
  'up': {'x': 0, 'y': -2},
  'left': {'x': -2, 'y': 0},
  'down': {'x': 0, 'y': 2},
  'right': {'x': 2, 'y': 0},
}


export default GameView;
