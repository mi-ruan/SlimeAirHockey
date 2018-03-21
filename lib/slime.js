import MovingObject from './moving_object';

function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
}
  const DEFAULTS = {
    COLOR: '#283095',
    RADIUS: 25,
    SPEED: 5
  };

  class Slime extends MovingObject {
    constructor(options){
      options.radius = DEFAULTS.RADIUS;
      options.vel = options.vel || {'x': 0, 'y': 0};
      options.color = options.color || randomColor();
      super(options);
    }

    acceleration(acc){
      if (Math.abs(this.vel['x']) < 5 && Math.abs(this.vel['y'] < 5)) {
        this.vel['x'] += acc['x']/2;
        this.vel['y'] += acc['y']/2;
      }
    }

    relocate(){
      this.vel = {'x': 0, 'y': 0};
    }
  }
export default Slime;
