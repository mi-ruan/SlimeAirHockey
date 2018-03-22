import MovingObject from './moving_object';
import {calc} from 'popmotion';

class Slime extends MovingObject {
  constructor(options){
    super(options);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos['x'], this.pos['y'], this.radius, 0, 1 * Math.PI, true
    );
    ctx.fill();
  }

  isCollidedWith(otherObject) {
    const centerDist = calc.distance(this.pos, otherObject.pos)
    return centerDist < (this.radius/2 + otherObject.radius);
  }

  checkWallCollisions() {
    if(this.pos['x'] - this.radius + this.vel['x'] < 0 ||
      this.pos['x'] + this.radius + this.vel['x'] > this.canvas.width){
        this.vel['x'] *= -0.6;
    }
    if (this.pos['y'] - this.radius + this.vel['y'] < 0 ||
        this.pos['y'] + this.vel['y'] > this.canvas.height){
          this.vel['y'] *= -0.6;
    }
    if (this.pos['y'] + this.radius > this.canvas.height) {
      this.pos['y'] = this.canvas.height;
    }
    if (this.pos['y'] - this.radius < 0) {
      this.pos['y'] = this.radius;
    }
    if (this.pos['x'] + this.radius > this.canvas.width) {
      this.pos['x'] = this.canvas.width - this.radius;
    }
    if (this.pos['x'] - this.radius < 0) {
      this.pos['x'] = this.radius;
    }
  }
  relocate(){
    this.vel = {'x': 0, 'y': 0};
  }
}
export default Slime;
