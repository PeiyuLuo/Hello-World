var ctracker;
var emotionData;
var ec;
var emotionValues = [];
var pxTarget = [];
var pyTarget = [];
var px = [];
var py = [];
var dots = [];
var dots2 = [];
var k=0;
var videoInput;

function setup() {
  frameRate(40);
  // setup camera capture
  videoInput = createCapture(VIDEO);
  videoInput.size(1000, 750);
  videoInput.position(0, 0);
  // videoInput.hide();

  // setup canvas
  var cnv = createCanvas(1000, 750);
  cnv.position(0, 0);

  // setup tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(videoInput.elt);


  ec = new emotionClassifier();
  ec.init(emotionModel);
  emotionData = ec.getBlank();

  textSize(20);

  /////
  for (var i = 0; i < 45; i++) {
    dots.push(new Jitter(300, 300));
  }
  for (var i = 0; i < 42; i++) {
    dots2.push(new Jitter(300, 300));
  }
  for (var i = 0; i < 71; i++) {
    px.push(0);
    py.push(220);
  }
  
}


function draw() {
  background(0,100);
  // clear();
  image(videoInput,0,0,200,150);
  
  var cp = ctracker.getCurrentParameters();
  var er = ec.meanPredict(cp);
  // print(er.length);
  // print(er);
  for (var i = 0; i < er.length; i++) {
    // text(er[i].emotion+' '+nfc(er[i].value, 2), 20, (i+1)*30);
    emotionValues[i] = nfc(er[i].value, 2)
  }
  // print(emotionValues);

  var positions = ctracker.getCurrentPosition();

  for (var i = 0; i < positions.length; i++) {
    // set the color of the ellipse based on position on screen
    // fill(map(positions[i][0], width * 0.33, width * 0.66, 0, 255), map(positions[i][1], height * 0.33, height * 0.66, 0, 255), 255);
    // draw ellipse at each position point
    // ellipse(positions[i][0], positions[i][1], 8, 8);
    pxTarget[i] = positions[i][0];
    pyTarget[i] = positions[i][1]- 50;
    px[i] += (pxTarget[i]-px[i])/10;
    py[i] += (pyTarget[i]- py[i])/10;
  }

  if (emotionValues[3] > 0.3){//////if smile~
  k=1;
  }
  else{ ////if not smile~
    text("Smile Please",30,75);
    filter(GRAY);
    for (var i = 0; i < 15; i++) {
      py[i] += k*k/3+random(-3,10);
    }
  for (var i = 15; i < pxTarget.length; i++) {
   py[i] += k*k+random(-3,10);
   if (py[i]>height){py[i]=height- random(0,10);}
  }
  k+=0.04;
  }
  ////////////////////
  for (var i = 0; i < 45; i++) {
    dots[i].x = px[int(i / 3)] + random(-5, 5);
    dots[i].y = py[int(i / 3)] + random(-5, 5);
    dots[i].display();
  }
  for (var i = 0; i < 42; i++) {
    dots2[i].x = (px[int(i / 3)] + px[int((i + 3) / 3)]) / 2 + random(-5, 5);
    dots2[i].y = (py[int(i / 3)] + py[int((i + 3) / 3)]) / 2 + random(-5, 5);
    dots2[i].display();
  }
  ////////draw lines
  stroke(255, 100);
  /////face
  for (var i = 0; i < 40; i+=3) {
    for (var j = 0; j < 3; j++) {
      for (var z=0; z<3; z++){
      line(dots[i+z].x, dots[i+z].y, dots2[i + j].x, dots2[i + j].y);
      line(dots[i + 3 +z].x, dots[i + 3+z].y, dots2[i + j].x, dots2[i + j].y);
      }///end for z
    }////end for j
  }////end for i
  ////////////////////mouth
  for (var s=0; s<5; s++){ 
  for (var i=0; i<12; i++){
     line(px[i+44]+random(-5,5),py[i+44]+random(-5,5),px[(i+1)%12 + 44]+random(-5,5),py[(i+1)%12 + 44]+random(-5,5));
  }
  }////end for mouth
  /////eye
  var r=(py[26]-py[24])/2;
  ellipse(px[27],py[27],r,r);
  ellipse(px[32],py[32],r,r);
  
  ////eye brow
  for (var s=0; s<5; s++){ ///5 times line of eye brow
  for (var j=0; j<5; j+=4){
    for (var i=15; i<18; i++){
    line(px[i+j]+random(-5,5),py[i+j]+random(-5,5),px[i+1+j]+random(-5,5),py[i+ 1+j]+random(-5,5));
    }
  }
  }///end for
  /////////nose
  for (var s=0; s<5; s++){ 
  line(px[41]+random(-5,5),py[41]+random(-5,5),px[42]+random(-5,5),py[42]+random(-5,5));
  line(px[42]+random(-5,5),py[42]+random(-5,5),px[37]+random(-5,5),py[37]+random(-5,5));
  line(px[37]+random(-5,5),py[37]+random(-5,5),px[43]+random(-5,5),py[43]+random(-5,5));
  }
}

function Jitter(x, y) {
  this.x = x;
  this.y = y;
  this.diameter = 3;
  this.speed = 8;

  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  };

  this.display = function() {
    noStroke();
    fill(255);
    // ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}