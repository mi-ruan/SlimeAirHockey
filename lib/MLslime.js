import Brain from "brain.js";
import Slime from "./slime";

window.localStorage.trainingData = window.localStorage.trainingData || JSON.stringify([]);


class MLSlime extends Slime {
  constructor(options){
    super(options)
    this.otherSlime = this.game.slimes.filter((slime) => slime.startPos !== this.startPos)[0];
    this.trackMoves = [];
    this.interval = 1000/this.game.frames;
    this.time = 0;
    this.network = new Brain.NeuralNetwork();
  }

  move(timeDelta){
    this.time++;
    const NORMAL_FRAME_TIME_DELTA = 1000/this.game.frames;
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel['x'] * velocityScale,
      offsetY = this.vel['y'] * velocityScale;
    this.pos = {'x': this.pos['x'] + offsetX, 'y': this.pos['y'] + offsetY};
    if (this.time > this.interval && this.game.goalFlag){
      this.handleTrackMoves();
      this.time = 0;
    }
    if (!this.game.goalFlag){
      this.updateTrackMoves();
      this.time = 0;
    }
    this.getMoves();
  }

  handleTrackMoves() {
    this.trackMoves.push({
      input: {
        osPosX: this.otherSlime.pos['x'],
        osPosY: this.otherSlime.pos['y'],
        osVelX: this.otherSlime.vel['x'],
        osVelY: this.otherSlime.vel['y'],
        pPosX: this.puck.pos['x'],
        pPosY: this.puck.pos['y'],
        pVelX: this.puck.vel['x'],
        pVelY: this.puck.vel['y'],
        tsPosX: this.pos['x'],
        tsPosY: this.pos['y'],
        tsVelX: this.vel['x'],
        tsVelY: this.vel['y']
      },
      output: {
        score: 0.5
      }
    })
  };

  updateTrackMoves() {
    const data = JSON.parse(window.localStorage.trainingData);
    if (this.otherSlime.points < this.points) {
      this.trackMoves.forEach( (track) => {
        track.output.score = 1;
      });
    } else {
      this.trackMoves.forEach( (track) => {
        track.output.score = 0.5;
      });
    }
    this.trackMoves.forEach( (track) => {
      data.push(track);
    });
    window.localStorage.trainingData = JSON.stringify(data);
    this.trackMoves = [];
  }

  getMoves() {
    const data = JSON.parse(window.localStorage.trainingData);
    if(!data.length){
      this.vel['x'] = (Math.random() * 10) - 5;
      this.vel['y'] = (Math.random() * 10) - 5;
      return
    }
    this.network.train(data);
    let results = [];
    MOVE_MAP.map((move) => {
      const input = [
        this.otherSlime.pos['x'],
        this.otherSlime.pos['y'],
        this.otherSlime.vel['x'],
        this.otherSlime.vel['y'],
        this.puck.pos['x'],
        this.puck.pos['y'],
        this.puck.vel['x'],
        this.puck.vel['y'],
        this.pos['x'] + move[0],
        this.pos['y'] + move[1],
        this.vel['x'],
        this.vel['y']
      ];
      const calMove = this.network.run(input);
      results.push(calMove.score);
    });
    const bestMove = results.indexOf(Math.max(...results));
    this.vel['x'] += MOVE_MAP[bestMove][0];
    this.vel['y'] += MOVE_MAP[bestMove][1];
  }
}

const MOVE_MAP = [
  [0, 0], // center
  [1, 0], // right
  [-1, 0], // left
  [0, 1], // down
  [0, -1], // up
  [-1, -1], // up-left
  [-1, 1], // down-left
  [1, -1], // up-right
  [1, 1] // down-right
];



export default MLSlime;
