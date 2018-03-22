import MovingObject from './moving_object';

class Puck extends MovingObject {
  constructor(options){
    super(options);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos['x'], this.pos['y'], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }


}

export default Puck;
