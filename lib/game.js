import Slime from './slime';
import Puck from './puck';
import Goal from './goals';


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
    this.field = FIELD;
    this.startTime = 120;
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

  displayTimer() {
    const min = Math.floor(this.startTime / 60).toString();
    let sec = (this.startTime % 60).toString();
    sec = sec.length < 2 ? "0" + sec : sec;
    this.ctx.font = "bold 16px Arial";
    this.ctx.fillStyle = "blue";
    this.ctx.fillText(min + ":" + sec, this.field.width/2, this.field.minimumSize - 1 );
  }


  draw(){
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ctx.fillStyle = "white";
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
    this.allObjects().forEach((object) => {
      object.draw(this.ctx);
    });
    this.slimes.map((slime) => {
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
    this.moveObjects(delta)
    this.checkCollisions();
    this.checkVelocity();
    this.checkGoal();
  }
}

Game.DIM_X = 800;
Game.DIM_Y = 400;
Game.FPS = 120;

export default Game;
