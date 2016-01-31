var bugs = []; // array of Jitter objects
var hit;
var showText = [];
// Declare a "SerialPort" object
var deadCount = 0;
var diameter = 0;
var count = 0;
var bigger = 0;
var page=0;
var t=" ";
var alpdown=200;
var start;
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 40; i++) {
    bugs.push(new Jitter());
  }
     ball = {
    x: windowWidth / 2,
    y: windowHeight / 2,
    rangeMax: 100,
    increment: 20,
    display: function() {
      fill(167, 220, 50 );
      noStroke();
      var d = dist(mouseX, mouseY, windowWidth / 2, windowHeight / 2);
      if (d < 60 && page==0){
        fill(255);
        drawBoy();
        start=millis();
        page=1; //start game
        deadCount=0;
      }
      else {ellipse(this.x, this.y, 30 + this.increment, 30 + this.increment);}
    },
    move: function() {
      this.increment = this.increment + 1;
      if (this.increment > this.rangeMax) {
        this.increment = this.increment - 80;
      }
    }
  };
}

function draw() {
  frameRate(60);
  boyX = mouseX;
  boyY = mouseY;
  if (page==0){    /////start
    background(0,0,0,20);
    ball.display();
    ball.move();
  }
  else if(page==1){
  background(4, 12, 70, 150);
  drawBoy();
  //////ballssssss!!!!!/////
  for (var i = 0; i < bugs.length; i++) {
    bugs[i].move();
    bugs[i].display();
    if (bugs[i].x < 0 || bugs[i].x > width || bugs[i].y < 0 || bugs[i].y > height) {
      bugs[i].update();
      bugs[i].diameter += bigger;
    }
    bigger += 0.0005;
    hit = dist(boyX, boyY, bugs[i].x, bugs[i].y);
    if (hit <= 40 + bugs[i].diameter/2) {loss();}  //if ball hits Mike
    }
    showtimes();
    }
    if (deadCount >= 10){die25(); }
}

function mouseClicked() {
  var d = dist(mouseX, mouseY, windowWidth / 2, windowHeight / 2);
  if (d < 80) {
    ///reset every index
  page = 1;
  start=millis();
  deadCount=0;
  alpdown=200;
  for (var i = 0; i < bugs.length; i++) {
    bugs[i].diameter = random(10,40);
    bigger=0;
    if (bugs[i].xx <= 0) {
      bugs[i].x = 0;
    }
    if (bugs[i].xx > 0) {
      bugs[i].x = width;
    }
  }
  }
}

function showtimes(){
  var end = int(millis());
  var timeSpent = int((end - start) / 1000); // Seconds spent
  var h = int(timeSpent / 3600);
  timeSpent -= h * 3600;
  var m = int(timeSpent / 60);
  timeSpent -= m * 60;
  var timetext =( m + " m, " +	timeSpent + " s");
  textSize(20);
  text(timetext,width- 100, 50);
}  

function loss(){
      background(250,0,0,150);
      textSize(100);
      deadCount++;
      fill(0);
      textAlign(CENTER);
      t= "x" + deadCount;
      text("You're Dead:", width / 2, height / 2 +100);
      textSize(100+deadCount *10);
      stroke(255);
      strokeWeight(deadCount);
      fill(0);
      text(t, width/2, height/2- 50);
      frameRate(2);
}

function die25(){
   background(0,10);
   textAlign(CENTER);
   page=3;
   strokeWeight(1);
   fill(255,alpdown);
   alpdown--;
   textSize(100);
   text("OMG,You die 10 times!!",width / 2, height / 2 +200);
   ball.display();
   ball.move();
   fill(255);
   textSize(20);
   text("Try Again", width / 2, height / 2 + 5);

}

function showDead() {
  textSize(100);
  fill(0);
  this.x = width / 2 - 250 + random(-300, 300);
  this.y = height / 2 + random(-300, 300)
    // background(255, 0, 0, 100);
  this.display = function() {
    text("You're Dead:", this.x, this.y);
  }
}

function Jitter() { ///ballssss///////

  this.xx = random(-1, 1);
  if (this.xx <= 0) {
    this.x = 0;
  }
  if (this.xx > 0) {
    this.x = width;
  }
  this.y = random(height);
  this.diameter = random(10, 40);
  this.moveX = random(-5, 5);
  this.moveY = random(-5, 5);
  this.speed = 1;
  this.c = color(random(200, 255), random(200, 245), random(200, 245));

  this.move = function() {
    this.x += this.moveX * this.speed;
    this.y += this.moveY * this.speed;
  };

  this.display = function() {
    stroke(20);
    strokeWeight(1);
    fill(this.c);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
  this.update = function() {
    this.xx = random(-1, 1);
    if (this.xx <= 0) {
      this.x = 0;
    }
    if (this.xx > 0) {
      this.x = width;
    }
    this.y = random(height);
    this.moveX = random(-5, 5);
    this.moveY = random(-5, 5);
  }
}

function drawBoy() {
  stroke(0);
  strokeWeight(4);
  //Legs
  stroke(250);
  line(boyX - 20, boyY + 30, boyX - 23 + random(-2, 2), boyY + 42);
  line(boyX + 20, boyY + 30, boyX + 23 + random(-2, 2), boyY + 42);

  fill(200, 200, 200);
  //Body
  noStroke();
  fill(167, 220, 50);
  ellipse(boyX, boyY, 80, 80); //radious=40

  //Mouth
  stroke(0);
  strokeWeight(2);
  arc(boyX, boyY, 50, 60, 0.1 * PI, 0.6 * PI);

  //Eyes
  fill(255);
  strokeWeight(0.5);
  ellipse(boyX, boyY - 9, 30, 30);
  fill(160, 200, 50);
  ellipse(boyX, boyY - 6, 19, 19);
  fill(0);
  ellipse(boyX, boyY - 6, 16, 16);
  fill(255);
  noStroke();
  ellipse(boyX + 7, boyY - 6, 6, 6);
}