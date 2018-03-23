class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
    this.game.addGoals();
    this.slime1 = this.game.addSlime(1);
    this.slime2 = this.game.addSlime(3);
    this.puck = this.game.addPuck();
  }

  // bindKeyHandlers1(s) {
  //   const slime = s;
  //   Object.keys(GameView.MOVES).forEach((k) => {
  //     const move = GameView.MOVES[k];
  //     key(k, () => {slime.acceleration(move);});
  //   });
  // }
  // bindKeyHandlers2(s) {
  //   const slime = s;
  //   Object.keys(GameView.MOVES2).forEach((k) => {
  //     const move = GameView.MOVES2[k];
  //     key(k, () => {slime.acceleration(move);});
  //   });
  // }


  start() {
    // this.bindKeyHandlers1(this.slime1);
    // this.bindKeyHandlers2(this.slime2);
    document.addEventListener("keydown", this.keyDownHandler.bind(this));
    document.addEventListener("keyup", this.keyUpHandler.bind(this));
    this.lastTime = 0;
    this.game.handleTimer();
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    this.game.draw();
    this.lastTime = time;
    requestAnimationFrame(this.animate.bind(this));
  }


  keyDownHandler(event){
    if (this.game.stopGame) {
      return;
    } else if (event.keyCode === 65) { // A
      this.slime1.vel['x'] -= 3;
    } else if (event.keyCode === 87) { // W
      this.slime1.vel['y'] -= 3;
    } else if (event.keyCode === 68) { // D
      this.slime1.vel['x'] += 3;
    } else if (event.keyCode === 83) { // S
      this.slime1.vel['y'] += 3;
    } else if (event.keyCode === 37) { // Left
      this.slime2.vel['x'] -= 3;
    } else if (event.keyCode === 38) { // Up
      this.slime2.vel['y'] -= 3;
    } else if (event.keyCode === 39) { // Right
      this.slime2.vel['x'] += 3;
    } else if (event.keyCode === 40) { // Down
      this.slime2.vel['y'] += 3;
    }
  }

  keyUpHandler(event){
    if (event.keyCode === 65 || event.keyCode === 68){
      this.slime1.vel['x'] = 0;
    } else if(event.keyCode === 87 || event.keyCode === 83){
      this.slime1.vel['y'] = 0;
    } else if(event.keyCode === 37 || event.keyCode === 39){
      this.slime2.vel['x'] = 0;
    } else if(event.keyCode === 38 || event.keyCode === 40){
      this.slime2.vel['y'] = 0;
    }
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
