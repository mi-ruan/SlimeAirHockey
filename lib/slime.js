import MovingObject from './moving_object';
import {calc} from 'popmotion';

class Slime extends MovingObject {
  constructor(options){
    super(options);
    this.points = 0;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos['x'], this.pos['y'], this.radius, 0, 1 * Math.PI, true
    );
    ctx.fill();
  }

  drawScore(ctx) {
    ctx.font = "16px Arial";
    ctx.fillStyle = this.color;
    ctx.fillText("Score: " + this.points, this.pos['x'], this.field.minimumSize - 1);
  };


  isCollidedWith(otherObject) {
    const centerDist = calc.distance(this.pos, otherObject.pos)
    return centerDist < (this.radius/2 + otherObject.radius);
  }

  checkWallCollisions() {
    if(this.pos['x'] - this.radius + this.vel['x'] - this.field.minimumSize < 0 ||
      this.pos['x'] + this.radius + this.vel['x'] > this.field.width + this.field.minimumSize){
        this.vel['x'] *= -0.6;
    }
    if (this.pos['y'] - this.radius + this.vel['y'] - this.field.minimumSize < 0 ||
        this.pos['y'] + this.vel['y'] > this.field.height + this.field.minimumSize){
          this.vel['y'] *= -0.6;
    }
    if (this.pos['y'] > this.field.height + this.field.minimumSize) {
      this.pos['y'] = this.field.height + this.field.minimumSize;
    }
    if (this.pos['y'] - this.radius - this.field.minimumSize < 0) {
      this.pos['y'] = this.radius + this.field.minimumSize;
    }
    if (this.pos['x'] + this.radius > this.field.width + this.field.minimumSize) {
      this.pos['x'] = this.field.width + this.field.minimumSize - this.radius;
    }
    if (this.pos['x'] - this.radius - this.field.minimumSize < 0) {
      this.pos['x'] = this.radius + this.field.minimumSize;
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

  relocate(){
    this.vel = {'x': 0, 'y': 0};
  }
}
export default Slime;
