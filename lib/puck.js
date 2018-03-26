import MovingObject from './moving_object';

class Puck extends MovingObject {
  constructor(options){
    super(options);
  }
  draw(ctx) {
    if (this.speed() < 8) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(
      this.pos['x'], this.pos['y'], this.radius, 0, 2 * Math.PI, true
    );
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fill();
    } else {
      const img = document.getElementById("fireball");
      ctx.drawImage(img, this.pos['x'] - this.radius, this.pos['y'] - this.radius, 30, 30);
    }
  }

  velocityLimit(){
     if (this.vel['x'] > 10) {
       this.vel['x'] = 10;
     }
     else if (this.vel['x'] < -10) {
       this.vel['x'] = -10;
     }
     if (this.vel['y'] > 10) {
       this.vel['y'] = 10;
     }
     else if (this.vel['y'] < -10) {
       this.vel['y'] = -10;
     }
   }
}

export default Puck;
