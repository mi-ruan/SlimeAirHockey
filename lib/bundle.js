/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(1);


class Slime extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
  constructor(options){
    super(options);
    this.puck = options.puck;
    this.side = options.side;
    this.points = 0;
    this.startPos = options.startPos;
  }

  draw(ctx) {
    ctx.moveTo(this.pos['x'], this.pos['y']);
    ctx.beginPath();
    ctx.arc(
      this.pos['x'], this.pos['y'], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
    if (this.side === 1){
      this.drawLeftEye(ctx, -1);
      // this.drawLeftEye(ctx, 1);
    } else if (this.side === 3) {
      this.drawRightEye(ctx, -1);
      // this.drawRightEye(ctx, 1);
    }

  }

  drawLeftEye(ctx, s){
    ctx.moveTo(this.pos['x'] + 2*this.radius/3, this.pos['y'] + s * this.radius/3);
    ctx.beginPath();
    ctx.arc(
      this.pos['x'] + 2*this.radius/3, this.pos['y'] + s * this.radius/2, 6, 0, 2 * Math.PI, true
    );
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
    ctx.moveTo(this.pos['x'] + 2*this.radius/3, this.pos['y'] + s * this.radius/3);
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(
      3 * Math.cos(this.angletoPuck()) + (this.pos['x'] + 2*this.radius/3),
      3 * Math.sin(this.angletoPuck()) + (this.pos['y'] + s * this.radius/2),
      3, 0, 2 * Math.PI, true
    );
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
  }

  drawRightEye(ctx, s){
    ctx.moveTo(this.pos['x'] - 2*this.radius/3, this.pos['y'] + s * this.radius/2);
    ctx.beginPath();
    ctx.arc(
      this.pos['x'] - 2*this.radius/3, this.pos['y'] + s * this.radius/2, 6, 0, 2 * Math.PI, true
    );

    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
    ctx.moveTo(this.pos['x'] - 2*this.radius/3, this.pos['y'] + s * this.radius/2);
    ctx.beginPath();
    ctx.arc(
      3 * Math.cos(this.angletoPuck()) + (this.pos['x'] - 2*this.radius/3),
      3 * Math.sin(this.angletoPuck()) + (this.pos['y'] + s * this.radius/2),
      3, 0, 2 * Math.PI, true
    );
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
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
     if (this.vel['x'] > 5) {
       this.vel['x'] = 5;
     }
     else if (this.vel['x'] < -5) {
       this.vel['x'] = -5;
     }
     if (this.vel['y'] > 5) {
       this.vel['y'] = 5;
     }
     else if (this.vel['y'] < -5) {
       this.vel['y'] = -5;
     }
   }

}
/* harmony default export */ __webpack_exports__["a"] = (Slime);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(5);



class MovingObject {
  constructor(options){
    this.pos = options.pos;
    this.vel = options.vel || {'x': 0, 'y': 0};
    this.radius = options.radius || 25;
    this.color = options.color || this.randomColor();
    this.game = options.game;
    this.field = options.field;
    this.collided = 0;
    this.mass = Math.pow(this.radius, 3);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(
      this.pos['x'], this.pos['y'], this.radius, 0, 2 * Math.PI, true
    );
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fill();
  }

  randomColor() {
    const colorArray = ['#E6194B', '#3CB44B', '#FFE119', '#0082C8', '#F58231',
  '#911EB4', '#46F0F0', '#F032E6', '#008080', '#AA6E28', '#800000',
  '#808000', "#000080", "#808080"]

    return colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  checkWallCollisions() {
    if(this.pos['x'] - this.radius - this.field.minimumSize + this.vel['x'] < 0 ||
      this.pos['x'] + this.radius + this.vel['x'] > this.field.width + this.field.minimumSize){
        this.vel['x'] *= -0.6;
    }
    if (this.pos['y'] - this.radius - this.field.minimumSize + this.vel['y'] < 0 ||
      this.pos['y'] + this.radius + this.vel['y'] > this.field.height + this.field.minimumSize){
        this.vel['y'] *= -0.6;
    }
    if (this.pos['y'] + this.radius > this.field.height + this.field.minimumSize) {
      this.pos['y'] = this.field.height + this.field.minimumSize - this.radius;
    }
    if (this.pos['y'] - this.radius - this.field.minimumSize < 0) {
      this.pos['y'] = this.radius + this.field.minimumSize;
    }
    if (this.pos['x'] + this.radius > this.field.width + this.field.minimumSize) {
      this.pos['x'] = this.field.width + this.field.minimumSize - this.radius;
    }
    if (this.pos['x'] - this.radius - this.field.minimumSize < 0) {
      this.pos['x'] = this.radius + this.field.minimumSize;
    }
  }

  collideWith(otherObj){
    if (otherObj.speed() < 0.1){
      this.staticCollision(otherObj);
    } else {
      this.elasticCollision(otherObj);
    }
  }

  staticCollision(otherObj){
    const theta1 = this.angle();
    const theta2 = otherObj.angle();
    const m1 = this.mass;
    const m2 = otherObj.mass;
    const v1 = this.speed();
    const v2 = otherObj.speed();
    const vel1dif = v1 * Math.sqrt(m1*m1 + m2*m2 + 2*m1*m2* Math.cos(theta1))/ (m1 + m2);
    const vel2dif = v1 * 2 * m1/(m1 + m2) * Math.sin(theta1/2);
    this.vel['x'] = vel1dif * Math.cos(theta1);
    this.vel['y'] = vel1dif * Math.sin(theta1);
    otherObj.vel['x'] = vel2dif * Math.cos(theta2);
    otherObj.vel['y'] = vel2dif * Math.sin(theta2);
  }

  elasticCollision(otherObj){
    const phi = Math.atan2(otherObj.vel['y'] - this.vel['y'],
    otherObj.vel['x'] - this.vel['x'] )
    const theta1 = this.angle();
    const theta2 = otherObj.angle();
    const m1 = this.mass;
    const m2 = otherObj.mass;
    const v1 = this.speed();
    const v2 = otherObj.speed();

    const velx1dif = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) /
    (m1+m2) * Math.cos(phi) + v1*Math.sin(theta1-phi) * Math.cos(phi+Math.PI/2);
    const vely1dif = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) /
    (m1+m2) * Math.sin(phi) + v1*Math.sin(theta1-phi) * Math.sin(phi+Math.PI/2);
    const velx2dif = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) /
    (m1+m2) * Math.cos(phi) + v2*Math.sin(theta2-phi) * Math.cos(phi+Math.PI/2);
    const vely2dif = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) /
    (m1+m2) * Math.sin(phi) + v2*Math.sin(theta2-phi) * Math.sin(phi+Math.PI/2);

    this.vel['x'] = velx1dif;
    this.vel['y'] = vely1dif;
    otherObj.vel['x'] = velx2dif;
    otherObj.vel['y'] = vely2dif;
  }

  isCollidedWith(otherObject) {
    const centerDist = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].dist(this.pos, otherObject.pos);

    if (centerDist <= (this.radius + otherObject.radius) && this.collided < 60) {
      otherObject.pos['x'] = otherObject.pos['x'] + Math.cos(this.angletoOtherObject(otherObject)) * ((this.radius + otherObject.radius) - centerDist);
      otherObject.pos['y'] = otherObject.pos['y'] + Math.sin(this.angletoOtherObject(otherObject)) * ((this.radius + otherObject.radius) - centerDist);
      this.collided += 1;
      return true;
    } else {
      this.collided = 0;
      return false;
    }
  }

  angletoOtherObject(otherObject){
    const xdiff = otherObject.pos['x'] - this.pos['x'];
    const ydiff = otherObject.pos['y'] - this.pos['y'];
    const angle = Math.atan2(ydiff, xdiff);
    return angle;
  }


  speed() {
    return Math.sqrt(this.vel['x'] * this.vel['x'] + this.vel['y'] * this.vel['y']);
  }

  angle() {
    return Math.atan2(this.vel['x'], this.vel['y']);
  }

  move(timeDelta){
    const NORMAL_FRAME_TIME_DELTA = 1000/this.game.frames;
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel['x'] * velocityScale,
      offsetY = this.vel['y'] * velocityScale;
    this.pos = {'x': this.pos['x'] + offsetX, 'y': this.pos['y'] + offsetY};
  }

  relocate(){
    this.vel = {'x': 0, 'y': 0};
  }

}

/* harmony default export */ __webpack_exports__["a"] = (MovingObject);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
    this.game.addGoals();
    this.puck = this.game.addPuck();
  }

  menu() {
    this.game.draw();
    const result = document.getElementById('result-screen');
    while (result.firstChild) {
      result.removeChild(result.firstChild);
    }
    result.style.display = "flex";
    const img = document.createElement('IMG');
    img.src = "images/LogoMakr_Title.png";
    img.alt = "Welcome to Slime Air Hockey";
    img.width = 200;
    const pvp = document.createElement("button");
    const pvpText = document.createTextNode("Player versus Player");
    pvp.appendChild(pvpText);
    const pvc = document.createElement("button");
    const pvcText = document.createTextNode("Player versus Computer");
    pvc.appendChild(pvcText);
    const cvc = document.createElement("button");
    const cvcText = document.createTextNode("Computer versus Computer");
    const training = document.createElement("button");
    const trainingText = document.createTextNode("Machine Learning Training");
    training.appendChild(trainingText);
    const options = document.createElement("button");
    const optionText = document.createTextNode("options");
    options.appendChild(optionText);
    cvc.appendChild(cvcText);
    result.appendChild(img);
    result.appendChild(pvp);
    result.appendChild(pvc);
    result.appendChild(cvc);
    result.appendChild(training);
    result.appendChild(options);
    pvp.addEventListener('click', () => {
      result.style.display = "none";
      this.start("pvp");
    });
    pvc.addEventListener('click', () => {
      this.versusComputerScreen();
    });
    cvc.addEventListener('click', () => {
      result.style.display = "none";
      this.start("cvc");
    });
    training.addEventListener('click', () => {
      result.style.display = "none";
      this.start("training");
    })
    options.addEventListener('click', () => {
      this.optionScreen();
    });
  }

  optionScreen() {
    const option = document.getElementById('result-screen');
    while (option.firstChild) {
      option.removeChild(option.firstChild);
    }
    const timerHText = document.createElement('H3');
    const timerText = document.createTextNode('Game Length');
    timerHText.appendChild(timerText);
    option.appendChild(timerHText);
    const spanTimer = document.createElement('SPAN');
    spanTimer.classList.add("spanTimer");
    const timer100 = document.createElement('button');
    const timer100text = document.createTextNode('1 MIN');
    timer100.appendChild(timer100text);
    spanTimer.appendChild(timer100);
    const timer200 = document.createElement('button');
    const timer200text = document.createTextNode('2 MIN');
    if (this.game.startTime === 60){
      timer100.classList.add("pressed");
    } else {
      timer200.classList.add("pressed");
    }
    timer200.appendChild(timer200text);
    spanTimer.appendChild(timer200);
    const back = document.createElement("button");
    back.id = "option-back";
    const backText = document.createTextNode("back");
    back.append(backText);
    timer100.addEventListener('click', () => {
      timer200.classList.remove("pressed");
      this.game.startTime = 60;
      this.game.time = 60;
      timer100.classList.add("pressed");
    });
    timer200.addEventListener('click', () => {
      timer100.classList.remove("pressed");
      this.game.startTime = 120;
      this.game.time = 120;
      timer200.classList.add("pressed");
    })
    back.addEventListener('click', () => {
      this.menu();
    });
    option.appendChild(spanTimer);
    option.appendChild(back);
  }


  versusComputerScreen(){
    const result = document.getElementById('result-screen');
    while (result.firstChild) {
      result.removeChild(result.firstChild);
    }
    const img = document.createElement('IMG');
    img.src = "images/LogoMakr_Title.png";
    img.alt = "Welcome to Slime Air Hockey";
    img.width = 200;
    const pvcRNG = document.createElement("button");
    const pvcRNGText = document.createTextNode("Random Slime");
    const pvcML = document.createElement("button");
    const pvcMLText = document.createTextNode("Machine Learning");
    const pvcR = document.createElement("button");
    const pvcRText = document.createTextNode("Drunk Slime");
    const pvcA = document.createElement("button");
    const pvcAText = document.createTextNode("Angry Slime");
    const pvcD = document.createElement("button");
    const pvcDText = document.createTextNode("Defensive Slime");
    const pvcB = document.createElement("button");
    const pvcBText = document.createTextNode("Bossy Slime");
    const back = document.createElement("button");
    const backText = document.createTextNode("back");
    pvcRNG.appendChild(pvcRNGText);
    pvcML.appendChild(pvcMLText);
    pvcR.appendChild(pvcRText);
    pvcA.appendChild(pvcAText);
    pvcD.appendChild(pvcDText);
    pvcB.appendChild(pvcBText);
    back.appendChild(backText);
    result.appendChild(img);
    result.appendChild(pvcRNG);
    result.appendChild(pvcML);
    result.appendChild(pvcR);
    result.appendChild(pvcA);
    result.appendChild(pvcD);
    result.appendChild(pvcB);
    result.appendChild(back);
    pvcRNG.addEventListener('click', () => {
    result.style.display = "none";
    this.start("pvcRNG");
    });
    pvcML.addEventListener('click', () => {
    result.style.display = "none";
    this.start("pvcML");
    });
    pvcR.addEventListener('click', () => {
      result.style.display = "none";
      this.start("pvcR");
    });
    pvcA.addEventListener('click', () => {
      result.style.display = "none";
      this.start("pvcA");
    });
    pvcD.addEventListener('click', () => {
      result.style.display = "none";
      this.start("pvcD");
    });
    pvcB.addEventListener('click', () => {
      result.style.display = "none";
      this.start("pvcB");
    });
    back.addEventListener('click', () => {
      this.menu();
    });
  }


  start(type) {
    if(type === "pvp"){
      this.pvpSlimes();
    } else if(type === "pvcRNG") {
      this.pvcRNGSlime();
    } else if (type ==="pvcML") {
      this.pvcMLSlime();
    } else if(type === "pvcR") {
      this.pvcRAISlime();
    } else if (type === "pvcA") {
      this.pvcAAISlime();
    } else if (type === "pvcD") {
      this.pvcDAISlime();
    } else if (type === "pvcB") {
      this.pvcBAISlime();
    } else if(type === "cvc"){
      this.cvcSlimes();
    } else if (type === "training"){
      this.trainingSlime();
    }
    this.lastTime = 0;
    this.game.handleTimer();
    this.game.handlePause();
    requestAnimationFrame(this.animate.bind(this));
  }

  trainingSlime() {
    this.slime1 = this.game.addDAISlime(1);
    this.slime2 = this.game.addMLSlime(3);
    this.game.time = 4000;
  }

  pvpSlimes(){
    this.slime1 = this.game.addSlime(1);
    this.slime2 = this.game.addSlime(3);
    this.slime1.keybind("player1");
    this.slime2.keybind("player2");
  }

  pvcRNGSlime() {
    this.slime1 = this.game.addSlime(1);
    this.slime2 = this.game.addRNGSlime(3);
    this.slime1.keybind("player1");
  }

  pvcMLSlime() {
    this.slime1 = this.game.addSlime(1);
    this.slime2 = this.game.addMLSlime(3);
    this.slime1.keybind("player1");
  }

  pvcRAISlime(){
    this.slime1 = this.game.addSlime(1);
    this.slime2 = this.game.addRAISlime(3);
    this.slime1.keybind("player1");
  }

  pvcAAISlime(){
    this.slime1 = this.game.addSlime(1);
    this.slime2 = this.game.addAAISlime(3);
    this.slime1.keybind("player1");
  }

  pvcDAISlime() {
    this.slime1 = this.game.addSlime(1);
    this.slime2 = this.game.addDAISlime(3);
    this.slime1.keybind("player1");
  }

  pvcBAISlime() {
    this.slime1 = this.game.addSlime(1);
    this.slime2 = this.game.addBAISlime(3);
    this.slime1.keybind("player1");
  }

  cvcSlimes() {
    this.slime1 = this.game.addRNGSlime(1);
    this.slime2 - this.game.addRNGSlime(3);
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    if (!this.game.stopDraw) {
      this.game.step(timeDelta);
      this.game.draw();
    }
    this.lastTime = time;
    if (!this.game.stopGame){
      requestAnimationFrame(this.animate.bind(this));
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view__ = __webpack_require__(2);




document.addEventListener('DOMContentLoaded', () => {
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.width = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].DIM_X;
  canvasEl.height = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].DIM_Y;

  let ctx = canvasEl.getContext('2d');
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](ctx);
  new __WEBPACK_IMPORTED_MODULE_1__game_view__["a" /* default */](game, ctx).menu();
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slime__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__RAIslime__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MLslime__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__AAIslime__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__DAIslime__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__BAIslime__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__puck__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__goals__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__game_view__ = __webpack_require__(2);










const FIELD ={
  minimumSize: 20,
  height: 360,
  width: 760,
}

class Game {
  constructor(ctx){
    this.ctx = ctx
    this.slimes = [];
    this.puck = [];
    this.goals = [];
    this.goalFlag = true;
    this.stopDraw = false;
    this.stopGame = false;
    this.field = FIELD;
    this.startTime = 60;
    this.time = 60;
    this.frames = 60;
    this.handlePauseScreen = this.handlePauseScreen.bind(this);
    this.removePause = this.removePause.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  add(object){
    if (object instanceof __WEBPACK_IMPORTED_MODULE_0__slime__["a" /* default */]){
      this.slimes.push(object);
    } else if (object instanceof __WEBPACK_IMPORTED_MODULE_6__puck__["a" /* default */]) {
      this.puck.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  }

  addPuck() {
    const puck = new __WEBPACK_IMPORTED_MODULE_6__puck__["a" /* default */]({
      pos: {'x': Game.DIM_X /2, 'y': Game.DIM_Y /2},
      radius: 10,
      game: this,
      field: this.field,
    });
    this.add(puck);
    return puck;
  }

  addSlime(s) {
    const slime = new __WEBPACK_IMPORTED_MODULE_0__slime__["a" /* default */]({
      startPos: Game.DIM_X * s/4,
      pos: {'x': Game.DIM_X * s/4, 'y': Game.DIM_Y / 2},
      game: this,
      field: this.field,
      side: s,
      puck: this.puck[0]
    });
    this.add(slime);
    return slime;
  }

  addMLSlime(s) {
    const slime = new __WEBPACK_IMPORTED_MODULE_2__MLslime__["a" /* default */]({
      startPos: Game.DIM_X * s/4,
      pos: {'x': Game.DIM_X * s/4, 'y': Game.DIM_Y / 2},
      game: this,
      field: this.field,
      side: s,
      puck: this.puck[0],
    });
    this.add(slime);
    return slime;
  }

  addRAISlime(s) {
    const slime = new __WEBPACK_IMPORTED_MODULE_1__RAIslime__["a" /* default */]({
      startPos: Game.DIM_X * s/4,
      pos: {'x': Game.DIM_X * s/4, 'y': Game.DIM_Y / 2},
      game: this,
      field: this.field,
      side: s,
      puck: this.puck[0]
    });
    this.add(slime);
    return slime;
  }

  addAAISlime(s) {
    const slime = new __WEBPACK_IMPORTED_MODULE_3__AAIslime__["a" /* default */]({
      startPos: Game.DIM_X * s/4,
      pos: {'x': Game.DIM_X * s/4, 'y': Game.DIM_Y / 2},
      game: this,
      field: this.field,
      side: s,
      puck: this.puck[0]
    });
    this.add(slime);
    return slime;
  }

  addDAISlime(s) {
    const slime = new __WEBPACK_IMPORTED_MODULE_4__DAIslime__["a" /* default */]({
      startPos: Game.DIM_X * s/4,
      pos: {'x': Game.DIM_X * s/4, 'y': Game.DIM_Y / 2},
      game: this,
      field: this.field,
      side: s,
      puck: this.puck[0],
    });
    this.add(slime);
    return slime;
  }

  addBAISlime(s) {
    const slime = new __WEBPACK_IMPORTED_MODULE_5__BAIslime__["a" /* default */]({
      startPos: Game.DIM_X * s/4,
      pos: {'x': Game.DIM_X * s/4, 'y': Game.DIM_Y / 2},
      game: this,
      field: this.field,
      side: s,
      puck: this.puck[0],
    });
    this.add(slime);
    return slime;
  }

  addRNGSlime(s) {
    const choice = Math.floor(Math.random() * 4);
    if (choice === 0){
      this.addRAISlime(s);
    } else if (choice === 1) {
      this.addAAISlime(s);
    } else if(choice === 2){
      this.addDAISlime(s);
    } else if (choice === 3){
      this.addBAISlime(s);
    }
  }

  addTrainSlime(s){
    const choice = Math.floor(Math.random() * 2);
    if (choice === 0){
      this.addDAISlime(s);
    } else if (choice === 1){
      this.addBAISlime(s);
    }
  }

  resetSlimes(dir) {
    this.allObjects().forEach((obj) => {
      obj.relocate();
    })
    this.slimes[0].pos = {
      'x': Game.DIM_X /6, 'y': Game.DIM_Y / 2
    }
    this.slimes[1].pos = {
      'x': Game.DIM_X * 5/6, 'y': Game.DIM_Y / 2
    }
    if(dir === 'left'){
      this.puck[0].pos = {
        'x': Game.DIM_X/4,
        'y': Math.random() * 2*this.field.height/3 + this.field.minimumSize + this.field.height/6
      }
    } else {
      this.puck[0].pos = {
        'x': Game.DIM_X * 3/4,
        'y': Math.random() * 2*this.field.height/3 + this.field.minimumSize + this.field.height/6
      }
    }

  }

  addGoals() {
    const goal1 = new __WEBPACK_IMPORTED_MODULE_7__goals__["a" /* default */]({
      posX: this.field.minimumSize,
      field: this.field
    });
    this.goals.push(goal1);
    const goal2 = new __WEBPACK_IMPORTED_MODULE_7__goals__["a" /* default */]({
      posX: this.field.width,
      field: this.field
    });
    this.goals.push(goal2);
  }


  allObjects() {
    return [].concat(this.slimes, this.puck);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];
        if (obj1 !== obj2 && obj1.isCollidedWith(obj2)) {
          const collision = obj1.collideWith(obj2);
          if (collision) return;
        }
        obj1.checkWallCollisions();
      }
    }
  }

  checkVelocity() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++){
      const obj = allObjects[i];
      obj.velocityLimit();
    }
  }

  checkGoal() {
    const puck = this.puck[0]
    if (puck.pos['y'] <= this.goals[0].pos['y'] + this.goals[0].height &&
        puck.pos['y'] >= this.goals[0].pos['y'] - 1){
          if (puck.pos['x'] <= this.field.minimumSize + this.goals[0].width){
            this.goalFlag = false;
            this.handleGoal('left');
          } else if (puck.pos['x'] >= this.field.width) {
            this.goalFlag = false;
            this.handleGoal('right');
          }
    }
  }

  handleGoal(dir){
    if(!this.stopGame){
      const goalWindow = document.getElementById('goal-screen');
      goalWindow.style.display = "flex";
      setTimeout(() => {
        goalWindow.style.display = "none";
        this.goalFlag = true;
        if(dir === "left") {
          this.resetSlimes('left');
          this.slimes[1].points += 1;
        } else {
          this.resetSlimes('right');
          this.slimes[0].points += 1;
        }
      }, 2000);
    }
  }

  handleTimer(){
    this.timer = setInterval(() => {
      this.time -= 1;
      if (this.time <= 0){
        this.goalFlag = false;
        this.resetTimer();
        this.winner();
        this.displayEndScreen();
      }
    }, 1000)
  }

  handlePause() {
    document.addEventListener('keypress',this.handlePauseScreen);
  }

  removePause(){
    document.removeEventListener('keypress', this.handlePauseScreen)
  }

  handlePauseScreen(e) {
    if (!this.goalFlag) {
      return;
    }
    if (e.keyCode === 32 && !this.stopDraw && !this.stopGame) { //space bar
      clearInterval(this.timer);
      this.stopDraw = true;
      const pause = document.getElementById("result-screen");
      while (pause.firstChild) {
        pause.removeChild(pause.firstChild);
      }
      pause.style.display = "flex";
      const pauseHead = document.createElement("H3");
      const pauseText = document.createTextNode("Game Paused");
      pauseHead.appendChild(pauseText);
      pause.appendChild(pauseHead);
      const continueButton = document.createElement("BUTTON");
      continueButton.id = "pause-screen";
      const continueText = document.createTextNode("Continue Game");
      continueButton.appendChild(continueText);
      pause.appendChild(continueButton);
      const goToMenu = document.createElement("BUTTON");
      goToMenu.id = "pause-screen";
      const menuText = document.createTextNode("Go to Menu");
      goToMenu.appendChild(menuText);
      pause.appendChild(goToMenu);
      const continueH3 = document.createElement("H3");
      const continuePress = document.createTextNode("Press Space to Continue")
      continueH3.appendChild(continuePress);
      pause.appendChild(continueH3);
      continueButton.addEventListener("click", (e) => {
        this.handleTimer();
        pause.style.display = "none";
        this.stopDraw = false;
      });
      goToMenu.addEventListener("click", (e) => {
        this.resetGame();
      });
      }
     else if (e.keyCode === 32 && this.stopDraw && !this.stopGame) {
      this.handleTimer();
      const pause = document.getElementById("result-screen");
      pause.style.display = "none";
      this.stopDraw = false;
    }
  }

  resetTimer() {
    clearInterval(this.timer);
    this.time = this.startTime;
    this.goalFlag = false;
    this.stopGame = true;
  }

  winner() {
    if (this.slimes[0].points > this.slimes[1].points) {
      this.winner = "Player 1 has won";
    } else if (this.slimes[0].points < this.slimes[1].points){
      this.winner = "Player 2 has won";
    } else {
      this.winner = "Tied Game";
    }
  }

  displayEndScreen(){
    const result = document.getElementById('result-screen');
    while (result.firstChild) {
      result.removeChild(result.firstChild);
    }
    result.style.display = "flex";
    const head = document.createElement('H3')
    const winner = document.createTextNode(this.winner);
    head.appendChild(winner);
    const toMenu = document.createElement("button");
    toMenu.id = "end-screen";
    const toMenuButton = document.createTextNode("Go to Menu");
    toMenu.appendChild(toMenuButton);
    const toMenuEnter = document.createElement('H3');
    const toMenuText = document.createTextNode("Or Press Enter");
    toMenuEnter.appendChild(toMenuText);
    result.appendChild(head);
    result.appendChild(toMenu);
    result.appendChild(toMenuEnter);
    toMenu.addEventListener('click', () => {
      this.resetGame();
    })
    document.addEventListener('keypress', this.handleKeyPress, true);
  }


  handleKeyPress(e) {
    if (e.keyCode === 13 && this.stopGame) {
      document.removeEventListener('keypress', this.handleKeyPress, true);
      this.resetGame();
    }
  }

  resetGame() {
    this.removePause();
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    const game = new Game(this.ctx);
    new __WEBPACK_IMPORTED_MODULE_8__game_view__["a" /* default */](game, this.ctx).menu();
  }


  displayTimer() {
    const min = Math.floor(this.time / 60).toString();
    let sec = (this.time % 60).toString();
    sec = sec.length < 2 ? "0" + sec : sec;
    this.ctx.font = "bold 16px Arial";
    this.time > 10 ? this.ctx.fillStyle = "blue" : this.ctx.fillStyle = "red";
    this.ctx.fillText(min + ":" + sec, this.field.width/2, this.field.minimumSize - 1 );
  }

  draw(){
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ctx.fillStyle = "#DDDDDD";
    this.ctx.fillRect(0,0, Game.DIM_X, Game.DIM_Y);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(this.field.minimumSize, this.field.minimumSize,
      this.field.width, this.field.height);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.strokeStyle = "red";
    this.ctx.moveTo(Game.DIM_X/2, Game.DIM_Y / 2);
    this.ctx.arc(
      Game.DIM_X/2, Game.DIM_Y / 2, Game.DIM_Y/4, 1.5 * Math.PI, 3.5 * Math.PI, false
    );
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(Game.DIM_X /2, this.field.minimumSize);
    this.ctx.lineTo(Game.DIM_X /2, Game.DIM_Y - this.field.minimumSize);
    this.ctx.stroke();
    this.goals.map((goal) => {
      goal.draw(this.ctx);
    });
    this.puck[0].draw(this.ctx);
    this.slimes.map((slime) => {
      slime.draw(this.ctx);
      slime.drawScore(this.ctx);
    });
    this.displayTimer();
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  }

  remove(object) {
    if (object instanceof __WEBPACK_IMPORTED_MODULE_0__slime__["a" /* default */]){
      this.slimes.splice(this.slimes.indexOf(object), 1);
    } else {
      throw new Error('unknown type of object');
    }
  }

  step(delta){
    this.checkVelocity();
    this.moveObjects(delta);
    if (this.goalFlag){
      this.checkGoal();
    }
    this.checkCollisions();
  }
}

Game.DIM_X = 800;
Game.DIM_Y = 400;

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Util = {
  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1['x'] - pos2['x'], 2) + Math.pow(pos1['y'] - pos2['y'], 2)
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Util);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slime__ = __webpack_require__(0);


class RAISlime extends __WEBPACK_IMPORTED_MODULE_0__slime__["a" /* default */] {
  constructor(options){
    super(options);
    this.antishake = 0;
  }

  move(timeDelta){
    const NORMAL_FRAME_TIME_DELTA = 1000/this.game.frames;
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel['x'] * velocityScale,
      offsetY = this.vel['y'] * velocityScale;
    this.pos = {'x': this.pos['x'] + offsetX, 'y': this.pos['y'] + offsetY};
    if (this.antishake === 0){
      this.checkMoves();
    }
    this.antishake += 1;
    this.checkShake();
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
      3 * this.vel['x']/5 + (this.pos['x'] + 2*this.radius/3),
      3 * this.vel['y']/5 + (this.pos['y'] - this.radius/2),
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
      3 * this.vel['x']/5 + (this.pos['x'] - 2*this.radius/3),
      3 * this.vel['y']/5 + (this.pos['y'] - this.radius/2),
      3, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }


  checkShake() {
    if(this.antishake > 25){
      this.antishake = 0;
    }
  }

  checkMoves() {
    this.vel['x'] = (Math.random() * 10) - 5;
    this.vel['y'] = (Math.random() * 10) - 5;
  }

}


/* harmony default export */ __webpack_exports__["a"] = (RAISlime);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slime__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__trained_data__ = __webpack_require__(8);




class MLSlime extends __WEBPACK_IMPORTED_MODULE_0__slime__["a" /* default */] {
  constructor(options){
    super(options)
    this.otherSlimeStartPoints = 0;
    this.startPoints = 0;
    this.testMoves = new Array(9).fill(0);
    this.trainedWeights = __WEBPACK_IMPORTED_MODULE_1__trained_data__["a" /* default */] || new Array(9).fill(0)
    if (window.localStorage.trainingData === undefined) {
    window.localStorage.trainingData = JSON.stringify(__WEBPACK_IMPORTED_MODULE_1__trained_data__["a" /* default */]);
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



/* harmony default export */ __webpack_exports__["a"] = (MLSlime);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const trainedData =
  [0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
/* harmony default export */ __webpack_exports__["a"] = (trainedData);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slime__ = __webpack_require__(0);


class AAISlime extends __WEBPACK_IMPORTED_MODULE_0__slime__["a" /* default */] {
  constructor(options){
    super(options);
  }

  move(timeDelta){
    const NORMAL_FRAME_TIME_DELTA = 1000/this.game.frames;
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel['x'] * velocityScale,
      offsetY = this.vel['y'] * velocityScale;
    this.pos = {'x': this.pos['x'] + offsetX, 'y': this.pos['y'] + offsetY};
    this.checkMoves();
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
    ctx.beginPath();
    ctx.moveTo(this.pos['x'] + this.radius/3, this.pos['y'] - this.radius );
    ctx.strokeStyle ="black";
    ctx.lineWidth = 3;
    ctx.lineTo(this.pos['x'] + this.radius, this.pos['y'] - this.radius/3);
    ctx.stroke();
  }

  drawRightEye(ctx) {
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
    ctx.beginPath();
    ctx.moveTo(this.pos['x'] - this.radius/3, this.pos['y'] - this.radius );
    ctx.strokeStyle ="black";
    ctx.lineWidth = 3;
    ctx.lineTo(this.pos['x'] - this.radius, this.pos['y'] - this.radius/3);
    ctx.stroke();
  }


  checkMoves() {
    const angle = this.angletoPuck();
    this.vel['x'] += Math.cos(angle)/2;
    this.vel['y'] += Math.sin(angle)/2;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AAISlime);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slime__ = __webpack_require__(0);



class DAISlime extends __WEBPACK_IMPORTED_MODULE_0__slime__["a" /* default */] {
  constructor(options){
    super(options)
  }

  move(timeDelta){
    const NORMAL_FRAME_TIME_DELTA = 1000/this.game.frames;
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel['x'] * velocityScale,
      offsetY = this.vel['y'] * velocityScale;
    this.pos = {'x': this.pos['x'] + offsetX, 'y': this.pos['y'] + offsetY};
    this.checkMoves();
  }

  checkMoves() {
    const midpoint = this.field.width/2 + this.field.minimumSize;
    if(this.game.puck[0].pos['x'] === midpoint){
      this.side === 1 ? this.vel['x'] += 1 : this.vel['x'] -= 1;
    }
    this.otherSlime = this.game.slimes.filter((slime) => slime.startPos !== this.startPos)[0];
    this.vel['y'] += Math.sin(this.angletoPuck())/3;
    if(this.side === 1){
      if (this.game.puck[0].pos['x'] > midpoint &&
      this.otherSlime.pos['x'] < midpoint) {
        this.vel['x'] += Math.cos(this.angletoPuck())/2;
      } else if (this.otherSlime.pos['x'] < midpoint ||
      this.pos['x'] > (midpoint - this.field.minimumSize)){
        this.moveToGoal();
      } else if (this.game.puck[0].pos['x'] < midpoint) {
        this.vel['x'] += Math.cos(this.angletoPuck())/2;
      }
    } else if (this.side === 3){
      if (this.game.puck[0].pos['x'] < midpoint &&
     this.otherSlime.pos['x'] > midpoint) {
       this.vel['x'] += Math.cos(this.angletoPuck())/2;
     } else if (this.otherSlime.pos['x'] > midpoint ||
      this.pos['x'] < (midpoint + this.field.minimumSize)) {
        this.moveToGoal();
      } else if (this.game.puck[0].pos['x'] > midpoint) {
        this.vel['x'] += Math.cos(this.angletoPuck())/2;
      }
    }
  }
  moveToGoal(){
    const goal = this.game.goals[0];
    if(this.side === 1){
      if(this.pos['x'] > (this.field.minimumSize + goal.width)){
        this.vel['x'] -= 2;
      }
    } else if (this.side === 3) {
      if (this.pos['x'] < (this.field.width - goal.width)) {
        this.vel['x'] += 2;
      }
    }
    if (this.pos['y'] > goal.height + goal.pos['y']) {
      this.vel['y'] -= 1;
    } else if (this.pos['y'] < goal.pos['y']) {
      this.vel['y'] += 1;
    }
  }


}


/* harmony default export */ __webpack_exports__["a"] = (DAISlime);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slime__ = __webpack_require__(0);


class BAISlime extends __WEBPACK_IMPORTED_MODULE_0__slime__["a" /* default */] {
  constructor(options){
    super(options);
  }

  move(timeDelta){
    const NORMAL_FRAME_TIME_DELTA = 1000/this.game.frames;
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel['x'] * velocityScale,
      offsetY = this.vel['y'] * velocityScale;
    this.pos = {'x': this.pos['x'] + offsetX, 'y': this.pos['y'] + offsetY};
    this.checkMoves();
  }

  drawLeftEye(ctx){
    ctx.moveTo(this.pos['x'] + 2*this.radius/3, this.pos['y'] - this.radius/3);
    ctx.fillStyle = 'red';
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(
      this.pos['x'] + 2*this.radius/3, this.pos['y'] - this.radius/2, 6, 0, 2 * Math.PI, true
    );
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.pos['x'] + this.radius/3, this.pos['y'] - this.radius );
    ctx.strokeStyle ="black";
    ctx.lineWidth = 3;
    ctx.lineTo(this.pos['x'] + this.radius, this.pos['y'] - this.radius/3);
    ctx.stroke();
  }

  drawRightEye(ctx) {
    ctx.moveTo(this.pos['x'] - 2*this.radius/3, this.pos['y'] - this.radius/2);
    ctx.fillStyle = 'red';
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(
      this.pos['x'] - 2*this.radius/3, this.pos['y'] - this.radius/2, 6, 0, 2 * Math.PI, true
    );
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.pos['x'] - this.radius/3, this.pos['y'] - this.radius );
    ctx.strokeStyle ="black";
    ctx.lineWidth = 3;
    ctx.lineTo(this.pos['x'] - this.radius, this.pos['y'] - this.radius/3);
    ctx.stroke();
  }

  checkMoves() {
    const angle = this.angletoSlime();
    this.vel['x'] += Math.cos(angle)/2;
    this.vel['y'] += Math.sin(angle)/2;
    if (this.isCollidedWith(this.otherSlime)){
      this.otherSlime.vel['x'] *= 1.2;
      this.otherSlime.vel['y'] *= 1.2;
    }
  }

  angletoSlime() {
    this.otherSlime = this.game.slimes.filter((slime) => slime.startPos !== this.startPos)[0];
    const xdiff = this.otherSlime.pos['x'] - this.pos['x'];
    const ydiff = this.otherSlime.pos['y'] - this.pos['y'];
    const angle = Math.atan2(ydiff, xdiff);
    return angle;
  }


}

/* harmony default export */ __webpack_exports__["a"] = (BAISlime);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(1);


class Puck extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
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

/* harmony default export */ __webpack_exports__["a"] = (Puck);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Goal);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map