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
    const training = document.createElement("button");
    const trainingText = document.createTextNode("Machine Learning Training");
    training.appendChild(trainingText);
    const options = document.createElement("button");
    const optionText = document.createTextNode("options");
    options.appendChild(optionText);
    cvc.appendChild(cvcText);
    result.appendChild(img);
    result.appendChild(pvp);
    result.appendChild(pvc);
    result.appendChild(cvc);
    result.appendChild(training);
    result.appendChild(options);
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
    });
    training.addEventListener('click', () => {
      result.style.display = "none";
      this.start("training");
    })
    options.addEventListener('click', () => {
      this.optionScreen();
    });
  }

  optionScreen() {
    const option = document.getElementById('result-screen');
    while (option.firstChild) {
      option.removeChild(option.firstChild);
    }
    const timerHText = document.createElement('H3');
    const timerText = document.createTextNode('Game Length');
    timerHText.appendChild(timerText);
    option.appendChild(timerHText);
    const spanTimer = document.createElement('SPAN');
    spanTimer.classList.add("spanTimer");
    const timer100 = document.createElement('button');
    const timer100text = document.createTextNode('1 MIN');
    timer100.appendChild(timer100text);
    spanTimer.appendChild(timer100);
    const timer200 = document.createElement('button');
    const timer200text = document.createTextNode('2 MIN');
    if (this.game.startTime === 60){
      timer100.classList.add("pressed");
    } else {
      timer200.classList.add("pressed");
    }
    timer200.appendChild(timer200text);
    spanTimer.appendChild(timer200);
    const back = document.createElement("button");
    const backText = document.createTextNode("back");
    back.append(backText);
    timer100.addEventListener('click', () => {
      timer200.classList.remove("pressed");
      this.game.startTime = 60;
      this.game.time = 60;
      timer100.classList.add("pressed");
    });
    timer200.addEventListener('click', () => {
      timer100.classList.remove("pressed");
      this.game.startTime = 120;
      this.game.time = 120;
      timer200.classList.add("pressed");
    })
    back.addEventListener('click', () => {
      this.menu();
    });
    option.appendChild(spanTimer);
    option.appendChild(back);
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
    const pvcRNG = document.createElement("button");
    const pvcRNGText = document.createTextNode("Random Slime");
    const pvcML = document.createElement("button");
    const pvcMLText = document.createTextNode("Machine Learning");
    const pvcR = document.createElement("button");
    const pvcRText = document.createTextNode("Drunk Slime");
    const pvcA = document.createElement("button");
    const pvcAText = document.createTextNode("Angry Slime");
    const pvcD = document.createElement("button");
    const pvcDText = document.createTextNode("Defensive Slime");
    const pvcB = document.createElement("button");
    const pvcBText = document.createTextNode("Bossy Slime");
    const back = document.createElement("button");
    const backText = document.createTextNode("back");
    pvcRNG.appendChild(pvcRNGText);
    pvcML.appendChild(pvcMLText);
    pvcR.appendChild(pvcRText);
    pvcA.appendChild(pvcAText);
    pvcD.appendChild(pvcDText);
    pvcB.appendChild(pvcBText);
    back.appendChild(backText);
    result.appendChild(img);
    result.appendChild(pvcRNG);
    result.appendChild(pvcML);
    result.appendChild(pvcR);
    result.appendChild(pvcA);
    result.appendChild(pvcD);
    result.appendChild(pvcB);
    result.appendChild(back);
    pvcRNG.addEventListener('click', () => {
    result.style.display = "none";
    this.start("pvcRNG");
    });
    pvcML.addEventListener('click', () => {
    result.style.display = "none";
    this.start("pvcML");
    });
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
    });
    pvcB.addEventListener('click', () => {
      result.style.display = "none";
      this.start("pvcB");
    });
    back.addEventListener('click', () => {
      this.menu();
    });
  }


  start(type) {
    if(type === "pvp"){
      this.pvpSlimes();
    } else if(type === "pvcRNG") {
      this.pvcRNGSlime();
    } else if (type ==="pvcML") {
      this.pvcMLSlime();
    } else if(type === "pvcR") {
      this.pvcRAISlime();
    } else if (type === "pvcA") {
      this.pvcAAISlime();
    } else if (type === "pvcD") {
      this.pvcDAISlime();
    } else if (type === "pvcB") {
      this.pvcBAISlime();
    } else if(type === "cvc"){
      this.cvcSlimes();
    } else if (type === "training"){
      this.trainingSlime();
    }
    this.lastTime = 0;
    this.game.handleTimer();
    this.game.handlePause();
    requestAnimationFrame(this.animate.bind(this));
  }

  trainingSlime() {
    this.slime1 = this.game.addDAISlime(1);
    this.slime2 = this.game.addMLSlime(3);
  }

  pvpSlimes(){
    this.slime1 = this.game.addSlime(1);
    this.slime2 = this.game.addSlime(3);
    this.slime1.keybind("player1");
    this.slime2.keybind("player2");
  }

  pvcRNGSlime() {
    this.slime1 = this.game.addSlime(1);
    this.slime2 = this.game.addRNGSlime(3);
    this.slime1.keybind("player1");
  }

  pvcMLSlime() {
    this.slime1 = this.game.addSlime(1);
    this.slime2 = this.game.addMLSlime(3);
    this.slime1.keybind("player1");
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

  pvcBAISlime() {
    this.slime1 = this.game.addSlime(1);
    this.slime2 = this.game.addBAISlime(3);
    this.slime1.keybind("player1");
  }

  cvcSlimes() {
    this.slime1 = this.game.addRNGSlime(1);
    this.slime2 - this.game.addRNGSlime(3);
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    if (!this.game.stopDraw) {
      this.game.step(timeDelta);
      this.game.draw();
    }
    this.lastTime = time;
    if (!this.game.stopGame){
      requestAnimationFrame(this.animate.bind(this));
    }
  }
}

export default GameView;
