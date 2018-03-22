import { calc } from 'popmotion';

class MovingObject {
  constructor(options){
    this.pos = options.pos;
    this.vel = options.vel || {'x': 0, 'y': 0};
    this.radius = options.radius || 25;
    this.color = options.color || this.randomColor();
    this.game = options.game;
    this.canvas = options.canvas;
    this.mass = Math.pow(this.radius, 3);
  }

  randomColor() {
    const hexDigits = "0123456789ABCDEF";

    let color = "#";
    for (let i = 0; i < 3; i++) {
      color += hexDigits[Math.floor((Math.random() * 16))];
    }

    return color;
  }

  checkWallCollisions() {
    if(this.pos['x'] - this.radius + this.vel['x'] < 0 ||
      this.pos['x'] + this.radius + this.vel['x'] > this.canvas.width){
        this.vel['x'] *= -0.6;
    }
    if (this.pos['y'] - this.radius + this.vel['y'] < 0 ||
        this.pos['y'] + this.radius + this.vel['y'] > this.canvas.height){
          this.vel['y'] *= -0.6;
    }
    if (this.pos['y'] + this.radius > this.canvas.height) {
      this.pos['y'] = this.canvas.height - this.radius;
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

  collideWith(otherObj){
    const phi = Math.atan2(otherObj.pos['y'] - this.pos['y'],
    otherObj.pos['x'] - this.pos['x'] )
    const theta1 = this.angle();
    const theta2 = otherObj.angle();
    const m1 = this.mass;
    const m2 = otherObj.mass;
    const v1 = this.speed();
    const v2 = otherObj.speed();

    const velx1dif = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) /
    (m1+m2) * Math.cos(phi) + v1*Math.sin(theta1-phi) * Math.cos(phi+Math.PI/2);
    const vely1dif = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) /
    (m1+m2) * Math.sin(phi) + v1*Math.sin(theta1-phi) * Math.sin(phi+Math.PI/2);
    const velx2dif = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) /
    (m1+m2) * Math.cos(phi) + v2*Math.sin(theta2-phi) * Math.cos(phi+Math.PI/2);
    const vely2dif = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) /
    (m1+m2) * Math.sin(phi) + v2*Math.sin(theta2-phi) * Math.sin(phi+Math.PI/2);

    this.vel['x'] = velx1dif;
    this.vel['y'] = vely1dif;
    otherObj.vel['x'] = velx2dif;
    otherObj.vel['y'] = vely2dif;
  }

  isCollidedWith(otherObject) {
    const centerDist = calc.distance(this.pos, otherObject.pos)
    return centerDist < (this.radius + otherObject.radius);
  }

  acceleration(acc){
    if (Math.abs(this.vel['x']) < 5 && Math.abs(this.vel['y'] < 5)) {
      this.vel['x'] += acc['x']/2;
      this.vel['y'] += acc['y']/2;
    }
  }

  speed() {
    return Math.sqrt(this.vel['x'] * this.vel['x'] + this.vel['y'] * this.vel['y']);
  }

  angle() {
    return Math.atan2(this.vel['x'], this.vel['y']);
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
