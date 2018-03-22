class Goal {
  constructor(options){
    this.field = options.field;
    this.width = 20;
    this.height = 100;
    this.pos = {'x': options.posX, 'y': this.field.minimumSize + (this.field.height - this.height) / 2 }
  }

  draw(ctx){
    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.pos['x'], this.pos['y'], this.width, this.height);
  }

}

export default Goal;
