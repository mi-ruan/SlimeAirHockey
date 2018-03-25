import Slime from "./slime";

class BAISlime extends Slime {
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
    const angle = this.angletoSlime();
    this.vel['x'] += Math.cos(angle)/2;
    this.vel['y'] += Math.sin(angle)/2;
    if (this.isCollidedWith(this.otherSlime)){
      this.otherSlime.vel['x'] *= 1.5;
      this.otherSlime.vel['y'] *= 1.5;
    }
  }



  angletoSlime() {
    this.otherSlime = this.game.slimes.filter((slime) => slime.startPos !== this.startPos)[0];
    const xdiff = this.otherSlime.pos['x'] - this.pos['x'];
    const ydiff = this.otherSlime.pos['y'] - this.pos['y'];
    const angle = Math.atan2(ydiff, xdiff);
    return angle;
  }


}

export default BAISlime;
