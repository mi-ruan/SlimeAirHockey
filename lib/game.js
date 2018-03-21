import Slime from './slime';

class Game {
  constructor(){
    this.slimes = []
  }

  add(object){
    if (object instanceof Slime){
      this.slimes.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  }

  addSlime() {
    const slime = new Slime({
      pos: {'x': Game.DIM_X /4, 'y': Game.DIM_Y / 2},
      game: this
    });

    this.add(slime);
    return slime;
  }

  allObjects() {
    return [].concat(this.slimes);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = i + 1; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1.isCollidedWith(obj2)) {
          const collision = obj1.collideWith(obj2);
          if (collision) return;
        }
      }
    }
  }

  draw(ctx){
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(10, 10, 780, 380);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
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
    this.moveObjects(delta)
    this.checkCollisions();
  }
}

Game.DIM_X = 800;
Game.DIM_Y = 400;
Game.FPS = 30;

export default Game;
