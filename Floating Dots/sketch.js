var dots = []; // array of Jitter objects
var canvas1,slider1, slider2, slider3, b1;
var p = [];
var windspeed;
var h,s;
var sliderH = 650;
var lifeSpanIndex;

function setup() {
  canvas1 = createCanvas(800, 500);
  canvas1.position(100,100);
  slider1 = createSlider(0,300,250);
  slider1.position(200,sliderH);
  slider2 = createSlider(0,100,23);
  slider2.position(400,sliderH);
  slider3 = createSlider(0,100,75);
  slider3.position(600,sliderH);

  
  p[0] = createP("LIFE SPAN");
  p[0].position(235,sliderH+ 10);
  p[1] = createP("HUE");
  p[1].position(455,sliderH+ 10);
  p[2] = createP("BRIGHTNESS");
  p[2].position(635,sliderH+ 10);
  for (i=0; i<3; i++){
  p[i].style("font-size","12px");
  p[i].style("color","#878787");
  }
  // b1 = createButton("Remove Dots");
  // b1.position(800,sliderH);
}

function draw() {
   background(0, 100);
  if (dots.length <=0){
    fill(80);
    textAlign(CENTER);
    textSize(20);
    text("drag your mouse on canvas",400,250);
  }
  windspeed=1;
  lifeSpanIndex=slider1.value();
  h=slider2.value();
  s=slider3.value();

 for (var i=0; i<dots.length; i++) {
    dots[i].move();
    dots[i].display();
    if (dots[i].lifespan < 0){dots.splice(i,1);}
   }
  lineNearPoints();
  if (dots.length>150){dots.splice(0,1);}

  
}

function removedots(){
}


function lineNearPoints(){
  var d; //distance
  colorMode(HSB ,100);
  // stroke(h,s,100,50);
  for (var i=0; i<dots.length - 1; i++){
    for (var j=i+1; j<dots.length; j++){
      d=dist(dots[i].x,dots[i].y,dots[j].x,dots[j].y);
      if (d<80){
        stroke(h,s,100,dots[i].lifespan);
        line(dots[i].x,dots[i].y,dots[j].x,dots[j].y);}
    }
  }
}


function mouseDragged(){
   dots.push(new Jitter(mouseX,mouseY));
}

function Jitter(x,y) {
  this.x = x;
  this.y = y;
  this.diameter = 3;
  this.speed = 8;
  this.lifespan = lifeSpanIndex;

  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed+ windspeed, this.speed);
    this.lifespan -= 1.8;
  };
  this.display = function() {
    noStroke();
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}