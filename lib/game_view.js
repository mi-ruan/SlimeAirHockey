class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
    this.slime1 = this.game.addSlime(1);
    this.slime2 = this.game.addSlime(3);
    this.puck = this.game.addPuck();
  }

  bindKeyHandlers1(s) {
    const slime = s;
    Object.keys(GameView.MOVES).forEach((k) => {
      const move = GameView.MOVES[k];
      key(k, () => {slime.acceleration(move);});
    });
  }
  bindKeyHandlers2(s) {
    const slime = s;
    Object.keys(GameView.MOVES2).forEach((k) => {
      const move = GameView.MOVES2[k];
      key(k, () => {slime.acceleration(move);});
    });
  }


  start() {
    this.bindKeyHandlers1(this.slime1);
    this.bindKeyHandlers2(this.slime2);
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;
    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES = {
  w: {'x': 0, 'y': -1},
  a: {'x': -1, 'y': 0},
  s: {'x': 0, 'y': 1},
  d: {'x': 1, 'y': 0},
};

GameView.MOVES2 = {
  'up': {'x': 0, 'y': -1},
  'left': {'x': -1, 'y': 0},
  'down': {'x': 0, 'y': 1},
  'right': {'x': 1, 'y': 0},
}


export default GameView;
