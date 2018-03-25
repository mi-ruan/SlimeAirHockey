import Slime from "./slime";


class DAISlime extends Slime {
  constructor(options){
    super(options)
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
    const midpoint = this.field.width/2 + this.field.minimumSize;
    if(this.game.puck[0].pos['x'] === midpoint){
      this.side === 1 ? this.vel['x'] += 1 : this.vel['x'] -= 1;
    }
    this.otherSlime = this.game.slimes.filter((slime) => slime.startPos !== this.startPos)[0];
    this.vel['y'] += Math.sin(this.angletoPuck())/2;
    if(this.side === 1){
      if (this.game.puck[0].pos['x'] > midpoint &&
      this.otherSlime.pos['x'] < midpoint) {
        this.vel['x'] += Math.cos(this.angletoPuck())/2;
      } else if (this.otherSlime.pos['x'] < midpoint ||
      this.pos['x'] > (midpoint - this.field.minimumSize)){
        this.moveToGoal();
      } else if (this.game.puck[0].pos['x'] < midpoint) {
        this.vel['x'] += Math.cos(this.angletoPuck())/2;
      }
    } else if (this.side === 3){
      if (this.game.puck[0].pos['x'] < midpoint &&
     this.otherSlime.pos['x'] > midpoint) {
       this.vel['x'] += Math.cos(this.angletoPuck())/2;
     } else if (this.otherSlime.pos['x'] > midpoint ||
      this.pos['x'] < (midpoint + this.field.minimumSize)) {
        this.moveToGoal();
      } else if (this.game.puck[0].pos['x'] > midpoint) {
        this.vel['x'] += Math.cos(this.angletoPuck())/2;
      }
    }
  }
  moveToGoal(){
    const goal = this.game.goals[0];
    if(this.side === 1){
      if(this.pos['x'] > (this.field.minimumSize + goal.width)){
        this.vel['x'] -= 2;
      }
    } else if (this.side === 3) {
      if (this.pos['x'] < (this.field.width - goal.width)) {
        this.vel['x'] += 2;
      }
    }
    if (this.pos['y'] > goal.height + goal.pos['y']) {
      this.vel['y'] -= 1;
    } else if (this.pos['y'] < goal.pos['y']) {
      this.vel['y'] += 1;
    }
  }


}


export default DAISlime;
