import { calc } from 'popmotion';

class MovingObject {
  constructor(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos['x'], this.pos['y'], this.radius, 0, 1 * Math.PI, true
    );
    ctx.fill();
  }

  // collidedWith(otherObject){
  //
  // }

  isCollidedWith(otherObject) {
    const centerDist = calc.distance(this.pos, otherObject.pos)
    return centerDist < (this.radius + otherObject.radius);
  }

  move(timeDelta){
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel['x'] * velocityScale,
      offsetY = this.vel['y'] * velocityScale;
    this.pos = {'x': this.pos['x'] + offsetX, 'y': this.pos['y'] + offsetY};
  }

  remove() {
    this.game.remove(this);
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

export default MovingObject;
