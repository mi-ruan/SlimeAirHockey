import MovingObject from './moving_object';

class Puck extends MovingObject {
  constructor(options){
    super(options);
  }
  draw(ctx) {
    if (this.speed() < 10) {
      ctx.moveTo(this.pos['x'], this.pos['y']);
      ctx.beginPath();
      ctx.arc(
        this.pos['x'], this.pos['y'], this.radius, 0, 2 * Math.PI, true
      );
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.stroke();
    } else {
      const img = document.getElementById("fireball");
      ctx.drawImage(img, this.pos['x'] - this.radius, this.pos['y'] - this.radius, 30, 30);
    }
  }

  velocityLimit(){
     if (this.vel['x'] > 12) {
       this.vel['x'] = 12;
     }
     else if (this.vel['x'] < -12) {
       this.vel['x'] = -12;
     }
     if (this.vel['y'] > 12) {
       this.vel['y'] = 12;
     }
     else if (this.vel['y'] < -12) {
       this.vel['y'] = -12;
     }
   }
}

export default Puck;
