import Slime from './slime';
import RAISlime from "./RAIslime";
import MLSlime from "./MLslime";
import AAISlime from "./AAIslime";
import DAISlime from "./DAIslime";
import BAISlime from "./BAIslime";
import Puck from './puck';
import Goal from './goals';
import GameView from './game_view';

const FIELD ={
  minimumSize: 20,
  height: 360,
  width: 760,
}

class Game {
  constructor(ctx){
    this.ctx = ctx
    this.slimes = [];
    this.puck = [];
    this.goals = [];
    this.goalFlag = true;
    this.stopDraw = false;
    this.stopGame = false;
    this.field = FIELD;
    this.startTime = 60;
    this.time = 60;
    this.frames = 60;
    this.handlePauseScreen = this.handlePauseScreen.bind(this);
    this.removePause = this.removePause.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  add(object){
    if (object instanceof Slime){
      this.slimes.push(object);
    } else if (object instanceof Puck) {
      this.puck.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  }

  addPuck() {
    const puck = new Puck({
      pos: {'x': Game.DIM_X /2, 'y': Game.DIM_Y /2},
      radius: 10,
      game: this,
      field: this.field,
    });
    this.add(puck);
    return puck;
  }

  addSlime(s) {
    const slime = new Slime({
      startPos: Game.DIM_X * s/4,
      pos: {'x': Game.DIM_X * s/4, 'y': Game.DIM_Y / 2},
      game: this,
      field: this.field,
      side: s,
      puck: this.puck[0]
    });
    this.add(slime);
    return slime;
  }

  addMLSlime(s) {
    const slime = new MLSlime({
      startPos: Game.DIM_X * s/4,
      pos: {'x': Game.DIM_X * s/4, 'y': Game.DIM_Y / 2},
      game: this,
      field: this.field,
      side: s,
      puck: this.puck[0],
    });
    this.add(slime);
    return slime;
  }

  addRAISlime(s) {
    const slime = new RAISlime({
      startPos: Game.DIM_X * s/4,
      pos: {'x': Game.DIM_X * s/4, 'y': Game.DIM_Y / 2},
      game: this,
      field: this.field,
      side: s,
      puck: this.puck[0]
    });
    this.add(slime);
    return slime;
  }

  addAAISlime(s) {
    const slime = new AAISlime({
      startPos: Game.DIM_X * s/4,
      pos: {'x': Game.DIM_X * s/4, 'y': Game.DIM_Y / 2},
      game: this,
      field: this.field,
      side: s,
      puck: this.puck[0]
    });
    this.add(slime);
    return slime;
  }

  addDAISlime(s) {
    const slime = new DAISlime({
      startPos: Game.DIM_X * s/4,
      pos: {'x': Game.DIM_X * s/4, 'y': Game.DIM_Y / 2},
      game: this,
      field: this.field,
      side: s,
      puck: this.puck[0],
    });
    this.add(slime);
    return slime;
  }

  addBAISlime(s) {
    const slime = new BAISlime({
      startPos: Game.DIM_X * s/4,
      pos: {'x': Game.DIM_X * s/4, 'y': Game.DIM_Y / 2},
      game: this,
      field: this.field,
      side: s,
      puck: this.puck[0],
    });
    this.add(slime);
    return slime;
  }

  addRNGSlime(s) {
    const choice = Math.floor(Math.random() * 4);
    if (choice === 0){
      this.addRAISlime(s);
    } else if (choice === 1) {
      this.addAAISlime(s);
    } else if(choice === 2){
      this.addDAISlime(s);
    } else if (choice === 3){
      this.addBAISlime(s);
    }
  }

  addTrainSlime(s){
    const choice = Math.floor(Math.random() * 2);
    if (choice === 0){
      this.addDAISlime(s);
    } else if (choice === 1){
      this.addBAISlime(s);
    }
  }

  resetSlimes(dir) {
    this.allObjects().forEach((obj) => {
      obj.relocate();
    })
    this.slimes[0].pos = {
      'x': Game.DIM_X /6, 'y': Game.DIM_Y / 2
    }
    this.slimes[1].pos = {
      'x': Game.DIM_X * 5/6, 'y': Game.DIM_Y / 2
    }
    if(dir === 'left'){
      this.puck[0].pos = {
        'x': Game.DIM_X/4,
        'y': Math.random() * 2*this.field.height/3 + this.field.minimumSize + this.field.height/6
      }
    } else {
      this.puck[0].pos = {
        'x': Game.DIM_X * 3/4,
        'y': Math.random() * 2*this.field.height/3 + this.field.minimumSize + this.field.height/6
      }
    }

  }

  addGoals() {
    const goal1 = new Goal({
      posX: this.field.minimumSize,
      field: this.field
    });
    this.goals.push(goal1);
    const goal2 = new Goal({
      posX: this.field.width,
      field: this.field
    });
    this.goals.push(goal2);
  }


  allObjects() {
    return [].concat(this.slimes, this.puck);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];
        if (obj1 !== obj2 && obj1.isCollidedWith(obj2)) {
          const collision = obj1.collideWith(obj2);
          if (collision) return;
        }
        obj1.checkWallCollisions();
      }
    }
  }

  checkVelocity() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++){
      const obj = allObjects[i];
      obj.velocityLimit();
    }
  }

  checkGoal() {
    const puck = this.puck[0]
    if (puck.pos['y'] <= this.goals[0].pos['y'] + this.goals[0].height &&
        puck.pos['y'] >= this.goals[0].pos['y'] - 1){
          if (puck.pos['x'] <= this.field.minimumSize + this.goals[0].width){
            this.goalFlag = false;
            this.handleGoal('left');
          } else if (puck.pos['x'] >= this.field.width) {
            this.goalFlag = false;
            this.handleGoal('right');
          }
    }
  }

  handleGoal(dir){
    if(!this.stopGame){
      const goalWindow = document.getElementById('goal-screen');
      goalWindow.style.display = "flex";
      setTimeout(() => {
        goalWindow.style.display = "none";
        this.goalFlag = true;
        if(dir === "left") {
          this.resetSlimes('left');
          this.slimes[1].points += 1;
        } else {
          this.resetSlimes('right');
          this.slimes[0].points += 1;
        }
      }, 2000);
    }
  }

  handleTimer(){
    this.timer = setInterval(() => {
      this.time -= 1;
      if (this.time <= 0){
        this.goalFlag = false;
        this.resetTimer();
        this.winner();
        this.displayEndScreen();
      }
    }, 1000)
  }

  handlePause() {
    document.addEventListener('keypress',this.handlePauseScreen);
  }

  removePause(){
    document.removeEventListener('keypress', this.handlePauseScreen)
  }

  handlePauseScreen(e) {
    if (!this.goalFlag) {
      return;
    }
    if (e.keyCode === 32 && !this.stopDraw && !this.stopGame) { //space bar
      clearInterval(this.timer);
      this.stopDraw = true;
      const pause = document.getElementById("result-screen");
      while (pause.firstChild) {
        pause.removeChild(pause.firstChild);
      }
      pause.style.display = "flex";
      const pauseHead = document.createElement("H3");
      const pauseText = document.createTextNode("Game Paused");
      pauseHead.appendChild(pauseText);
      pause.appendChild(pauseHead);
      const continueButton = document.createElement("BUTTON");
      continueButton.id = "pause-screen";
      const continueText = document.createTextNode("Continue Game");
      continueButton.appendChild(continueText);
      pause.appendChild(continueButton);
      const goToMenu = document.createElement("BUTTON");
      goToMenu.id = "pause-screen";
      const menuText = document.createTextNode("Go to Menu");
      goToMenu.appendChild(menuText);
      pause.appendChild(goToMenu);
      const continueH3 = document.createElement("H3");
      const continuePress = document.createTextNode("Press Space to Continue")
      continueH3.appendChild(continuePress);
      pause.appendChild(continueH3);
      continueButton.addEventListener("click", (e) => {
        this.handleTimer();
        pause.style.display = "none";
        this.stopDraw = false;
      });
      goToMenu.addEventListener("click", (e) => {
        this.resetGame();
      });
      }
     else if (e.keyCode === 32 && this.stopDraw && !this.stopGame) {
      this.handleTimer();
      const pause = document.getElementById("result-screen");
      pause.style.display = "none";
      this.stopDraw = false;
    }
  }

  resetTimer() {
    clearInterval(this.timer);
    this.time = this.startTime;
    this.goalFlag = false;
    this.stopGame = true;
  }

  winner() {
    if (this.slimes[0].points > this.slimes[1].points) {
      this.winner = "Player 1 has won";
    } else if (this.slimes[0].points < this.slimes[1].points){
      this.winner = "Player 2 has won";
    } else {
      this.winner = "Tied Game";
    }
  }

  displayEndScreen(){
    const result = document.getElementById('result-screen');
    while (result.firstChild) {
      result.removeChild(result.firstChild);
    }
    result.style.display = "flex";
    const head = document.createElement('H3')
    const winner = document.createTextNode(this.winner);
    head.appendChild(winner);
    const toMenu = document.createElement("button");
    const toMenuButton = document.createTextNode("Go to Menu");
    toMenu.appendChild(toMenuButton);
    const toMenuEnter = document.createElement('H3');
    const toMenuText = document.createTextNode("Or Press Enter");
    toMenuEnter.appendChild(toMenuText);
    result.appendChild(head);
    result.appendChild(toMenu);
    result.appendChild(toMenuEnter);
    toMenu.addEventListener('click', () => {
      this.resetGame();
    })
    document.addEventListener('keypress', this.handleKeyPress, true);
  }


  handleKeyPress(e) {
    if (e.keyCode === 13 && this.stopGame) {
      document.removeEventListener('keypress', this.handleKeyPress, true);
      this.resetGame();
    }
  }

  resetGame() {
    this.removePause();
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    const game = new Game(this.ctx);
    new GameView(game, this.ctx).menu();
  }


  displayTimer() {
    const min = Math.floor(this.time / 60).toString();
    let sec = (this.time % 60).toString();
    sec = sec.length < 2 ? "0" + sec : sec;
    this.ctx.font = "bold 16px Arial";
    this.time > 10 ? this.ctx.fillStyle = "blue" : this.ctx.fillStyle = "red";
    this.ctx.fillText(min + ":" + sec, this.field.width/2, this.field.minimumSize - 1 );
  }

  draw(){
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ctx.fillStyle = "#DDDDDD";
    this.ctx.fillRect(0,0, Game.DIM_X, Game.DIM_Y);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(this.field.minimumSize, this.field.minimumSize,
      this.field.width, this.field.height);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.strokeStyle = "red";
    this.ctx.moveTo(Game.DIM_X/2, Game.DIM_Y / 2);
    this.ctx.arc(
      Game.DIM_X/2, Game.DIM_Y / 2, Game.DIM_Y/4, 1.5 * Math.PI, 3.5 * Math.PI, false
    );
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(Game.DIM_X /2, this.field.minimumSize);
    this.ctx.lineTo(Game.DIM_X /2, Game.DIM_Y - this.field.minimumSize);
    this.ctx.stroke();
    this.goals.map((goal) => {
      goal.draw(this.ctx);
    });
    this.puck[0].draw(this.ctx);
    this.slimes.map((slime) => {
      slime.draw(this.ctx);
      slime.drawScore(this.ctx);
    });
    this.displayTimer();
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  }

  remove(object) {
    if (object instanceof Slime){
      this.slimes.splice(this.slimes.indexOf(object), 1);
    } else {
      throw new Error('unknown type of object');
    }
  }

  step(delta){
    this.checkVelocity();
    this.moveObjects(delta);
    if (this.goalFlag){
      this.checkGoal();
    }
    this.checkCollisions();
  }
}

Game.DIM_X = 800;
Game.DIM_Y = 400;

export default Game;
