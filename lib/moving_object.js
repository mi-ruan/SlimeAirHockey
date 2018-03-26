import Util from './util';


class MovingObject {
  constructor(options){
    this.pos = options.pos;
    this.vel = options.vel || {'x': 0, 'y': 0};
    this.radius = options.radius || 25;
    this.color = options.color || this.randomColor();
    this.game = options.game;
    this.field = options.field;
    this.collided = 0;
    this.mass = Math.pow(this.radius, 3);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(
      this.pos['x'], this.pos['y'], this.radius, 0, 2 * Math.PI, true
    );
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fill();
  }

  randomColor() {
    const colorArray = ['#E6194B', '#3CB44B', '#FFE119', '#0082C8', '#F58231',
  '#911EB4', '#46F0F0', '#F032E6', '#008080', '#AA6E28', '#800000',
  '#808000', "#000080", "#808080"]

    return colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  checkWallCollisions() {
    if(this.pos['x'] - this.radius - this.field.minimumSize + this.vel['x'] < 0 ||
      this.pos['x'] + this.radius + this.vel['x'] > this.field.width + this.field.minimumSize){
        this.vel['x'] *= -0.5;
    }
    if (this.pos['y'] - this.radius - this.field.minimumSize + this.vel['y'] < 0 ||
      this.pos['y'] + this.radius + this.vel['y'] > this.field.height + this.field.minimumSize){
        this.vel['y'] *= -0.5;
    }
    if (this.pos['y'] + this.radius > this.field.height + this.field.minimumSize) {
      this.pos['y'] = this.field.height + this.field.minimumSize - this.radius;
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

  collideWith(otherObj){
    if (otherObj.speed() < 0.1){
      this.staticCollision(otherObj);
    } else {
      this.elasticCollision(otherObj);
    }
  }

  staticCollision(otherObj){
    const theta1 = this.angle();
    const theta2 = otherObj.angle();
    const m1 = this.mass;
    const m2 = otherObj.mass;
    const v1 = this.speed();
    const v2 = otherObj.speed();
    const vel1dif = v1 * Math.sqrt(m1*m1 + m2*m2 + 2*m1*m2* Math.cos(theta1))/ (m1 + m2);
    const vel2dif = v1 * 2 * m1/(m1 + m2) * Math.sin(theta1/2);
    this.vel['x'] = vel1dif * Math.cos(theta1);
    this.vel['y'] = vel1dif * Math.sin(theta1);
    otherObj.vel['x'] = vel2dif * Math.cos(theta2);
    otherObj.vel['y'] = vel2dif * Math.sin(theta2);
  }

  elasticCollision(otherObj){
    const phi = Math.atan2(otherObj.vel['y'] - this.vel['y'],
    otherObj.vel['x'] - this.vel['x'] )
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
    const centerDist = Util.dist(this.pos, otherObject.pos);

    if (centerDist <= (this.radius + otherObject.radius) && this.collided < 100) {
      this.collided += 1;
      return true;
    } else {
      this.collided = 0;
      return false;
    }
  }

  speed() {
    return Math.sqrt(this.vel['x'] * this.vel['x'] + this.vel['y'] * this.vel['y']);
  }

  angle() {
    return Math.atan2(this.vel['x'], this.vel['y']);
  }

  move(timeDelta){
    const NORMAL_FRAME_TIME_DELTA = 1000/this.game.frames;
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel['x'] * velocityScale,
      offsetY = this.vel['y'] * velocityScale;
    this.pos = {'x': this.pos['x'] + offsetX, 'y': this.pos['y'] + offsetY};
  }

  relocate(){
    this.vel = {'x': 0, 'y': 0};
  }

  // remove() {
  //   this.game.remove(this);
  // }
}

export default MovingObject;
