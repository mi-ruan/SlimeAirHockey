import Brain from "brain.js";
import Slime from "./slime";

const INITIAL_DATA = {
    input: {
      osPosX: 0,
      osPosY: 0,
      pPosX: 0,
      pPosY: 0,
      tsPosX: 0,
      tsPosY: 0,
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
    this.network = new Brain.NeuralNetwork({timeout: 16});
    this.moveWeights = new Array(9).fill(0);
    this.handleTrackMoves();
    this.updateTrackMoves();
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
        pPosX: this.puck.pos['x'],
        pPosY: this.puck.pos['y'],
        tsPosX: this.pos['x'],
        tsPosY: this.pos['y'],
      },
      output: {
        score: 0.5
      }
    })
  };

  updateTrackMoves() {
    const data = JSON.parse(window.localStorage.trainingData || INITIAL_DATA);
    if (this.startPoints < this.points) {
      this.trackMoves[0].output.score = 1;
    } else {
      this.trackMoves[0].output.score = 0;
      }
    data.push(this.trackMoves[0]);
    window.localStorage.trainingData = JSON.stringify(data);
    this.trackMoves = [];
    const moves = [];
    this.network.train(data);
    MOVE_MAP.map((move) => {
      const input = [
        this.otherSlime.pos['x'],
        this.otherSlime.pos['y'],
        this.puck.pos['x'],
        this.puck.pos['y'],
        this.pos['x'] + move[0],
        this.pos['y'] + move[1],
      ];
      const calMove = this.network.run(input);
      moves.push(calMove.score);
    });
    for (let i = 0; i < this.moveWeights.length; i++) {
      this.moveWeights[i] = (this.moveWeights[i] + moves[i])/2;
    }
  }

  getMoves() {
    const data = JSON.parse(window.localStorage.trainingData || INITIAL_DATA);
    if(data.length === 162){
      this.vel['x'] = (Math.random() * 10) - 5;
      this.vel['y'] = (Math.random() * 10) - 5;
      return;
    }
    this.processMove(this.moveWeights);
  }

  processMove(weights){
    let cumulativeWeights = [];
    for (let i = 0; i < weights.length; i++){
      let sum = weights[i];
      for (let j = 0; j < i; j++){
        sum += weights[j];
      }
      cumulativeWeights.push(sum);
    };
    const choice = Math.random() * Math.max(...cumulativeWeights);
    let randomChoice = 0;
    for (let i = 0; i < cumulativeWeights.length; i++){
      if (choice < cumulativeWeights[i]){
        randomChoice = i;
        break
      }
    }
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
