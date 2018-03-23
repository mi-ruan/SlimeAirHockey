import Slime from './slime';
import Puck from './puck';
import Goal from './goals';


const FIELD ={
  minimumSize: 20,
  height: 360,
  width: 760,
}

class Game {
  constructor(){
    this.slimes = [];
    this.puck = [];
    this.goals = [];
    this.field = FIELD;
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
      startPos: Game.DIM_X * s/4,
      pos: {'x': Game.DIM_X * s/4, 'y': Game.DIM_Y / 2},
      game: this,
      field: this.field,
    });
    this.add(slime);
    return slime;
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
        'x': Game.DIM_X/4, 'y': Game.DIM_Y * Math.random()
      }
    } else {
      this.puck[0].pos = {
        'x': Game.DIM_X * 3/4, 'y': Game.DIM_Y * Math.random()
      }
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
    for (let i = 0; i < this.slimes.length; i++){
      const obj = this.slimes[i]
      obj.velocityLimit();
    }
  }

  checkGoal() {
    const puck = this.puck[0]
    if (puck.pos['y'] <= this.goals[0].pos['y'] + this.goals[0].height &&
        puck.pos['y'] >= this.goals[0].pos['y']){
          if (puck.pos['x'] <= this.field.minimumSize + this.goals[0].width){
            this.slimes[1].points += 1;
            this.resetSlimes('left');
          } else if (puck.pos['x'] >= this.field.width) {
            this.slimes[0].points += 1;
            this.resetSlimes('right');
          }
        }
    // if (puck.pos['x'] === this.field.minimumSize + puck.radius &&
    // puck.pos['y'] <= this.goals[0].pos['y'] + this.goals[0].height + puck.radius &&
    // puck.pos['y'] >= this.goals[0].pos['y'] - puck.radius){
    //   this.slimes[1].points += 1;
    // } else if (puck.pos['x'] === this.field.width - puck.radius &&
    // puck.pos['y'] <= this.goals[0].pos['y'] + this.goals[0].height + puck.radius &&
    // puck.pos['y'] >= this.goals[0].pos['y'] - puck.radius) {
    //   this.slimes[0].points += 1;
    // }
  }


  draw(ctx){
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.field.minimumSize, this.field.minimumSize,
      this.field.width, this.field.height);
    this.goals.map((goal) => {
      goal.draw(ctx);
    });
    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
    this.slimes.map((slime) => {
      slime.drawScore(ctx);
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
    this.checkVelocity();
    this.checkGoal();
  }
}

Game.DIM_X = 800;
Game.DIM_Y = 400;
Game.FPS = 30;

export default Game;
