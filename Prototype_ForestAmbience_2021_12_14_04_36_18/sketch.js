// Code Final Design 
// //Inspired by:
// //https://experiments.withgoogle.com/ai/bird-sounds/view/

// //Ambience Music Source:
// //https://youtu.be/eLGGUDNf52g

// //Code references:
// //- https://editor.p5js.org/son/sketches/rJcVOAI0Q //(Posenet by son)
// //- https://editor.p5js.org/loulli/sketches/sPhbO5_Bf //(Body Tracking Color Changing by loulli )

// //Animated Gif:
// - //https://static.tumblr.com/cb1bef90995f8c70ff21e8db0f27f6cb/fmc6rxh/Mlgo18amh/tumblr_static_s8ehh1kso2ok0w8g4w088oco.gif


var br;
var gif_loadImg, gif_createImg;
var gif_loadImg2, gif_createImg2;
var song;

let snow = [];
let gravity;
let flow = 0;


function preload() {
 // bg = loadImage('test.JPEG');
  gif_createImg = createImg("deerwalk.gif");
  gif_createImg2 = createImg("sparkles.gif");
  song = loadSound("Ambience.mp3");

}
function setup() {
  bg = loadImage('test.JPEG');
  createCanvas(windowWidth, windowHeight);
  song.play();
  
  //gif_createImg.resize(20,20);
  gravity = createVector(0, 0.3);

  for (let i = 0; i < 400; i++) {
    let x = random(width);
    let y = random(height);
    snow.push(new Snowflake(x, y));
  }
  
}

function draw() {
background(42, 73, 48);

  // updates animation frames by using an html
  // img element, positioning it over top of
  // the canvas.
  gif_createImg.position(400, 200);
  gif_createImg2.position(5, 30);

   for (flake of snow) {
    flake.applyForce(gravity);
    flake.update();
    flake.render();
  }
  
//Reference to how to move the gif from https://editor.p5js.org/chjno/sketches/H1ZtuJ0Yb
//     push();
//     translate(flow, 0);
//     flow++;
//     image(gif_createImg, 20, 100);
//      if(flow + 80 > width){
//         flow = -145;
//      }
 
// pop();
 

}
function getRandomSize() {

  let r = pow(random(0, 1), 3);
  return constrain(r * 32, 2, 32);

}

class Snowflake {

  constructor(sx, sy) {
    let x = sx;
    let y = sy;
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.angle = random(TWO_PI);
    this.dir = (random(1) > 0.5) ? 1 : -1;
    this.xOff = 0;
    this.r = getRandomSize();
  }

  applyForce(force) {
    // Parallax Effect hack
    let f = force.copy();
    f.mult(this.r);

    this.acc.add(f);
  }

  randomize() {
    let x = random(width);
    let y = random(-100, -10);
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.r = getRandomSize();
  }

  update() {

    this.xOff = sin(this.angle * 2) * 2 * this.r;

    this.vel.add(this.acc);
    this.vel.limit(this.r * 0.2);

    if (this.vel.mag() < 1) {
      this.vel.normalize();
    }

    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.pos.y > height + this.r) {
      this.randomize();
    }

    // Wrapping Left and Right
    if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    }

    this.angle += this.dir * this.vel.mag() / 200;
  }

  render() {
    push();
    translate(this.pos.x + this.xOff, this.pos.y);
		ellipse(this.pos.x, this.pos.y, this.r, this.r)
    pop();
  }

}
