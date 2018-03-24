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
    result.appendChild(img);
    result.appendChild(pvp);
    pvp.addEventListener('click', () => {
      result.style.display = "none";
      this.start();
    });
  }


  start() {
    // this.bindKeyHandlers1(this.slime1);
    // this.bindKeyHandlers2(this.slime2);
    this.slime1.keybind("player1");
    this.slime2.keybind("player2");
    // document.addEventListener("keydown", this.keyDownHandler.bind(this));
    // document.addEventListener("keyup", this.keyUpHandler.bind(this));
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
