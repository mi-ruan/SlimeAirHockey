import MovingObject from './moving_object';
import {calc} from 'popmotion';

class Slime extends MovingObject {
  constructor(options){
    super(options);
    this.points = 0;
    this.startPos = options.startPos;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(
      this.pos['x'], this.pos['y'], this.radius, 0, 2 * Math.PI, true
    );
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();
    ctx.moveTo(this.pos['x'] - this.radius/2, this.pos['y'] - this.radius/4);
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(
      this.pos['x'] - this.radius/2, this.pos['y'] - this.radius/4, 5, 0, 2 * Math.PI, true
    );
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(
      this.pos['x'] - this.radius/2, this.pos['y'] - this.radius/4, 2, 0, 2 * Math.PI, true
    );
    ctx.fill();
    ctx.moveTo(this.pos['x'] - this.radius/2, this.pos['y'] - this.radius/4);
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(
      this.pos['x'] + this.radius/2, this.pos['y'] - this.radius/4, 5, 0, 2 * Math.PI, true
    );
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(
      this.pos['x'] + this.radius/2, this.pos['y'] - this.radius/4, 2, 0, 2 * Math.PI, false
    );
    ctx.fill();
    ctx.moveTo(this.pos['x'], this.pos['y'] + this.radius/4);
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(
      this.pos['x'], this.pos['y'] + this.radius/4, 10, 0, Math.PI, false
    );
    ctx.stroke();
  }

  drawScore(ctx) {
    ctx.font = "bold 16px Arial";
    ctx.fillStyle = this.color;
    ctx.fillText("Score: " + this.points, this.startPos, this.field.minimumSize - 1);
  };


  isCollidedWith(otherObject) {
    const centerDist = calc.distance(this.pos, otherObject.pos)
    return centerDist < (this.radius + otherObject.radius);
  }

  keybind(player) {
    if (player === "player1"){
      document.addEventListener("keydown", this.keyDownHandler1.bind(this));
      document.addEventListener("keyup", this.keyUpHandler1.bind(this));
    } else if (player === "player2") {
      document.addEventListener("keydown", this.keyDownHandler2.bind(this));
      document.addEventListener("keyup", this.keyUpHandler2.bind(this));
    }
  }

  keyDownHandler1(event){
    if (this.game.stopGame) {
      return;
    } else if (event.keyCode === 65) { // A
        this.vel['x'] -= 3;
    } else if (event.keyCode === 87) { // W
        this.vel['y'] -= 3;
    } else if (event.keyCode === 68) { // D
        this.vel['x'] += 3;
    } else if (event.keyCode === 83) { // S
        this.vel['y'] += 3;
    }
  }
  keyDownHandler2(event){
    if (this.game.stopGame) {
      return;
    } else if (event.keyCode === 37) { // Left
        this.vel['x'] -= 3;
    } else if (event.keyCode === 38) { // Up
        this.vel['y'] -= 3;
    } else if (event.keyCode === 39) { // Right
        this.vel['x'] += 3;
    } else if (event.keyCode === 40) { // Down
        this.vel['y'] += 3;
    }
  }

  keyUpHandler1(event){
    if (event.keyCode === 65 || event.keyCode === 68){
      this.vel['x'] = 0;
    } else if(event.keyCode === 87 || event.keyCode === 83){
      this.vel['y'] = 0;
    }
  }
  keyUpHandler2(event){
    if(event.keyCode === 37 || event.keyCode === 39){
      this.vel['x'] = 0;
    } else if(event.keyCode === 38 || event.keyCode === 40){
      this.vel['y'] = 0;
    }
  }




  velocityLimit(){
     if (this.vel['x'] > 5) {
       this.vel['x'] = 5;
     } else if (this.vel['x'] < -5) {
       this.vel['x'] = -5;
     } else if (this.vel['y'] < -5) {
       this.vel['y'] = -5;
     } else if (this.vel['y'] > 5) {
       this.vel['y'] = 5;
     }
  }


}
export default Slime;
