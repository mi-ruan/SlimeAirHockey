import Brain from "brain.js";
import Slime from "./slime";

const INITIAL_DATA = {
    input: {
      osPosX: 0,
      osPosY: 0,
      osVelX: 0,
      osVelY: 0,
      pPosX: 0,
      pPosY: 0,
      pVelX: 0,
      pVelY: 0,
      tsPosX: 0,
      tsPosY: 0,
      tsVelX: 0,
      tsVelY: 0
    },
    output: {
      score: 0
    }
  };

  window.localStorage.trainingData = window.localStorage.trainingData || JSON.stringify([
  INITIAL_DATA
  ]);

class MLSlime extends Slime {
  constructor(options){
    super(options)
    this.otherSlime = this.game.slimes.filter((slime) => slime.startPos !== this.startPos)[0];
    this.otherSlimeStartPoints = 0;
    this.startPoints = 0;
    this.trackMoves = [];
    this.network = new Brain.NeuralNetwork();
  }

  move(timeDelta){
    const NORMAL_FRAME_TIME_DELTA = 1000/this.game.frames;
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel['x'] * velocityScale,
      offsetY = this.vel['y'] * velocityScale;
    this.pos = {'x': this.pos['x'] + offsetX, 'y': this.pos['y'] + offsetY};

    if (!this.game.goalFlag){
      const checkOtherScore = this.otherSlime.points > this.otherSlimeStartPoints;
      const checkOwnScore = this.points > this.startPoints;
      if (checkOwnScore || checkOtherScore){
        this.handleTrackMoves();
        this.updateTrackMoves();
        this.otherSlimeStartPoints = this.otherSlime.points;
        this.startPoints = this.points;
      }
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
    const data = JSON.parse(window.localStorage.trainingData || INITIAL_DATA);
    if (this.otherSlime.points < this.points) {
      this.trackMoves.forEach( (track) => {
        track.output.score = 1;
      });
    } else {
      this.trackMoves.forEach( (track) => {
        track.output.score = 0;
      });
    }
    this.trackMoves.forEach( (track) => {
      data.push(track);
    });
    window.localStorage.trainingData = JSON.stringify(data);
    this.trackMoves = [];
  }

  getMoves() {
    const data = JSON.parse(window.localStorage.trainingData || INITIAL_DATA);
    if(data.length === 162){
      this.vel['x'] = (Math.random() * 10) - 5;
      this.vel['y'] = (Math.random() * 10) - 5;
      return;
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
    this.processMove(results);
  }

  processMove(results){
    let choices = [0];
    let max = 0;
    for (let i = 1; i < results.length; i++){
      if(results[i] > results[max]){
        choices = [i];
        max = i;
      } else if (results[i] === results[max]) {
        choices.push(i);
      }
    }
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    this.vel['x'] += MOVE_MAP[randomChoice][0];
    this.vel['y'] += MOVE_MAP[randomChoice][1];
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
