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
    ctx.font = "16px Arial";
    ctx.fillStyle = this.color;
    ctx.fillText("Score: " + this.points, this.startPos, this.field.minimumSize - 1);
  };


  isCollidedWith(otherObject) {
    const centerDist = calc.distance(this.pos, otherObject.pos)
    return centerDist < (this.radius + otherObject.radius);
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
