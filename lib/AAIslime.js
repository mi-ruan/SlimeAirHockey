import Slime from './slime';

class AAISlime extends Slime {
  constructor(options){
    super(options);
  }

  move(timeDelta){
    const NORMAL_FRAME_TIME_DELTA = 1000/this.game.frames;
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel['x'] * velocityScale,
      offsetY = this.vel['y'] * velocityScale;
    this.pos = {'x': this.pos['x'] + offsetX, 'y': this.pos['y'] + offsetY};
    this.checkMoves();
  }

  checkMoves() {
    const angle = this.angletoPuck();
    this.vel['x'] += Math.cos(angle)/2;
    this.vel['y'] += Math.sin(angle)/2;
  }
}

export default AAISlime;
