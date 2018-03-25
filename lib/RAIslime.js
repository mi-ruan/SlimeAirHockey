import Slime from './slime';

class RAISlime extends Slime {
  constructor(options){
    super(options);
    this.antishake = 0;
  }

  move(timeDelta){
    const NORMAL_FRAME_TIME_DELTA = 1000/this.game.frames;
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel['x'] * velocityScale,
      offsetY = this.vel['y'] * velocityScale;
    this.pos = {'x': this.pos['x'] + offsetX, 'y': this.pos['y'] + offsetY};
    if (this.antishake === 0){
      this.checkMoves();
    }
    this.antishake += 1;
    this.checkShake();
  }

  drawLeftEye(ctx){
    ctx.moveTo(this.pos['x'] + 2*this.radius/3, this.pos['y'] - this.radius/3);
    ctx.fillStyle = 'white';
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(
      this.pos['x'] + 2*this.radius/3, this.pos['y'] - this.radius/2, 6, 0, 2 * Math.PI, true
    );
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(
      3 * this.vel['x']/5 + (this.pos['x'] + 2*this.radius/3),
      3 * this.vel['y']/5 + (this.pos['y'] - this.radius/2),
      3, 0, 2 * Math.PI, false
    );
    ctx.fill();
  }

  drawRightEye(ctx){
    ctx.moveTo(this.pos['x'] - 2*this.radius/3, this.pos['y'] - this.radius/2);
    ctx.fillStyle = 'white';
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(
      this.pos['x'] - 2*this.radius/3, this.pos['y'] - this.radius/2, 6, 0, 2 * Math.PI, true
    );
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(
      3 * this.vel['x']/5 + (this.pos['x'] - 2*this.radius/3),
      3 * this.vel['y']/5 + (this.pos['y'] - this.radius/2),
      3, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }


  checkShake() {
    if(this.antishake > 25){
      this.antishake = 0;
    }
  }

  checkMoves() {
    this.vel['x'] = (Math.random() * 10) - 5;
    this.vel['y'] = (Math.random() * 10) - 5;
  }

}


export default RAISlime;
