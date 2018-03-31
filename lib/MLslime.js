import Slime from "./slime";
import trainedData from "./trained_data";


class MLSlime extends Slime {
  constructor(options){
    super(options)
    this.otherSlimeStartPoints = 0;
    this.startPoints = 0;
    this.testMoves = new Array(9).fill(0);
    this.trainedWeights = trainedData || new Array(9).fill(0)
    if (window.localStorage.trainingData === undefined) {
    window.localStorage.trainingData = JSON.stringify(trainedData);
  } else {
    window.localStorage.trainingData
    }
  }

  move(timeDelta){
    this.otherSlime = this.game.slimes.filter((slime) => slime.startPos !== this.startPos)[0];
    const NORMAL_FRAME_TIME_DELTA = 1000/this.game.frames;
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel['x'] * velocityScale,
      offsetY = this.vel['y'] * velocityScale;
    this.pos = {'x': this.pos['x'] + offsetX, 'y': this.pos['y'] + offsetY};
    const checkOtherScore = this.otherSlime.points > this.otherSlimeStartPoints;
    const checkOwnScore = this.points > this.startPoints;
    if (checkOwnScore || checkOtherScore){
      this.updateTrackMoves();
      this.otherSlimeStartPoints = this.otherSlime.points;
      this.startPoints = this.points;
    }
    this.handleTrackMoves();
    this.getMoves();
  }

  handleTrackMoves() {
    if (this.currentMove > -1) {
      this.testMoves[this.currentMove] += 1
    }
  };

  updateTrackMoves() {
    let normalizedTrack = this.testMoves.map((track) => {
      return (track - Math.min(...this.testMoves))/(Math.max(...this.testMoves) - Math.min(...this.testMoves));
    });
    if (this.otherSlimeStartPoints < this.otherSlime.points) {
      normalizedTrack = normalizedTrack.map((test) => {
        return test * -1
      })
    }
    let updateWeights = JSON.parse(window.localStorage.trainingData);
      for (let i=0; i < updateWeights.length; i++){
        updateWeights[i] *= Math.pow(2, normalizedTrack[i]);
        if (updateWeights[i] < 0) {
          updateWeights[i] = 0;
        } else if (updateWeights[i] > 1) {
          updateWeights[i] = 1;
        }
      }
    window.localStorage.trainingData = JSON.stringify(updateWeights);
    this.testMoves = new Array(9).fill(0);
  }

  getMoves(){
    const weights = JSON.parse(window.localStorage.trainingData);
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
    this.currentMove = randomChoice;
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
