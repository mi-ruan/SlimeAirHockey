class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
    this.slime = this.game.addSlime();
  }

  bindKeyHandlers() {
    const slime = this.slime;
    Object.keys(GameView.MOVES).forEach((k) => {
      const move = GameView.MOVES[k];
      key(k, () => {slime.acceleration(move);});
    });
  }

  start() {
    this.bindKeyHandlers();
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

export default GameView;
