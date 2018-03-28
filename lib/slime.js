import MovingObject from './moving_object';

class Slime extends MovingObject {
  constructor(options){
    super(options);
    this.puck = options.puck;
    this.side = options.side;
    this.points = 0;
    this.startPos = options.startPos;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(
      this.pos['x'], this.pos['y'], this.radius, 0, 2 * Math.PI, true
    );
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();
    if (this.side === 1){
      this.drawLeftEye(ctx);
    } else {
      this.drawRightEye(ctx);
    }
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
      3 * Math.cos(this.angletoPuck()) + (this.pos['x'] + 2*this.radius/3),
      3 * Math.sin(this.angletoPuck()) + (this.pos['y'] - this.radius/2),
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
      3 * Math.cos(this.angletoPuck()) + (this.pos['x'] - 2*this.radius/3),
      3 * Math.sin(this.angletoPuck()) + (this.pos['y'] - this.radius/2),
      3, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  angletoPuck(){
    const xdiff = this.puck.pos['x'] - this.pos['x'];
    const ydiff = this.puck.pos['y'] - this.pos['y'];
    const angle = Math.atan2(ydiff, xdiff);
    return angle;
  }

  drawScore(ctx) {
    ctx.font = "bold 16px Helvetica, Arial, sans-serif";
    ctx.textBaseline = "bottom";
    ctx.fillStyle = this.color;
    ctx.fillText("Score: " + this.points, this.startPos, this.field.minimumSize - 1);
    ctx.fill();
  };


  keybind(player) {
    if (player === "player1"){
      document.addEventListener("keydown", this.keyDownHandler1.bind(this));
      document.addEventListener("keyup", this.keyUpHandler1.bind(this));
    } else if (player === "player2") {
      document.addEventListener("keydown", this.keyDownHandler2.bind(this));
      document.addEventListener("keyup", this.keyUpHandler2.bind(this));
    }
  }

  keyDownHandler1(event){
    if (this.game.stopGame) {
      return;
    } else if (event.keyCode === 65) { // A
        this.vel['x'] -= 5;
    } else if (event.keyCode === 87) { // W
        this.vel['y'] -= 5;
    } else if (event.keyCode === 68) { // D
        this.vel['x'] += 5;
    } else if (event.keyCode === 83) { // S
        this.vel['y'] += 5;
    }
  }
  keyDownHandler2(event){
    if (this.game.stopGame) {
      return;
    } else if (event.keyCode === 37) { // Left
        this.vel['x'] -= 5;
    } else if (event.keyCode === 38) { // Up
        this.vel['y'] -= 5;
    } else if (event.keyCode === 39) { // Right
        this.vel['x'] += 5;
    } else if (event.keyCode === 40) { // Down
        this.vel['y'] += 5;
    }
  }

  keyUpHandler1(event){
    if (event.keyCode === 65 || event.keyCode === 68){
      this.vel['x'] = 0;
    } else if(event.keyCode === 87 || event.keyCode === 83){
      this.vel['y'] = 0;
    }
  }
  keyUpHandler2(event){
    if(event.keyCode === 37 || event.keyCode === 39){
      this.vel['x'] = 0;
    } else if(event.keyCode === 38 || event.keyCode === 40){
      this.vel['y'] = 0;
    }
  }

  velocityLimit(){
     if (this.vel['x'] > 6) {
       this.vel['x'] = 6;
     }
     else if (this.vel['x'] < -6) {
       this.vel['x'] = -6;
     }
     if (this.vel['y'] > 6) {
       this.vel['y'] = 6;
     }
     else if (this.vel['y'] < -6) {
       this.vel['y'] = -6;
     }
   }

}
export default Slime;
