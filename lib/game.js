import Slime from './slime';
import Puck from './puck'

class Game {
  constructor(canvas){
    this.slimes = [];
    this.puck = [];
    this.canvas = canvas;
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

  addSlime(s) {
    const slime = new Slime({
      pos: {'x': Game.DIM_X * s/4, 'y': Game.DIM_Y / 2},
      game: this
    });

    this.add(slime);
    return slime;
  }

  addPuck() {
    const puck = new Puck({
      pos: {'x': Game.DIM_X /2, 'y': Game.DIM_Y /2},
      radius: 10,
      game: this
    });
    this.add(puck);
    return puck;
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
        this.checkWallCollisions(obj1);
      }
    }
  }

  checkWallCollisions(obj) {
    if(obj.pos['x'] - obj.radius + obj.vel['x'] < 20 ||
      obj.pos['x'] + obj.radius + obj.vel['x'] > this.canvas.width){
        obj.vel['x'] *= -0.6;
    }
    if (obj.pos['y'] - obj.radius + obj.vel['y'] < 20 ||
        obj.pos['y'] + obj.radius + obj.vel['y'] > this.canvas.height){
          obj.vel['y'] *= -0.6;
    }
    if (obj.pos['y'] + obj.radius > this.canvas.height) {
      obj.pos['y'] = this.canvas.height - obj.radius;
    }
    if (obj.pos['y'] - obj.radius < 0) {
      obj.pos['y'] = obj.radius + 20;
    }
    if (obj.pos['x'] + obj.radius > this.canvas.width) {
      obj.pos['x'] = this.canvas.width - obj.radius;
    }
    if (obj.pos['x'] - obj.radius < 0) {
      obj.pos['x'] = obj.radius + 20;
    }
  }

  draw(ctx){
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(20, 20, 780, 380);

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
