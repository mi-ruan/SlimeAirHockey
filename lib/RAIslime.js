import Slime from './slime';

class RAISlime extends Slime {
  constructor(options){
    super(options);
    this.antishake = 0;
  }

  move(timeDelta){
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

const NORMAL_FRAME_TIME_DELTA = 1000/ 100;

export default RAISlime;
