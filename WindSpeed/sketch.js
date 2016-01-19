var url = 'http://api.openweathermap.org/data/2.5/weather?appid=010dd8ce83bf2e63803a5516e7cd3e65&q=';
var l = [];
var w=1;
var gap=90;
var row,lineNum;
var input;
var button;
var d;

function setup() {
  createCanvas(windowWidth, windowHeight);
  row=int(width / gap) - 1;
  lineNum= int(height / gap) -1;
  angleMode(DEGREES);
  // loadJSON(url, Weather);
  for (var j=0; j<lineNum; j++){
     for (var i=0; i<row; i++){
    l.push(new drawlines((i+1)*gap,30+(j+1)*gap,i*14+j*14));
     }
  }
  
  input = createInput('New York');
  input.position(windowWidth/2 - 180, 35);
  button = createButton('FIND WIND SPEED OF A CITY');
  button.position(windowWidth/2 - 10, 35);
  button.mousePressed(updateData);
  
  
}

function draw() {
  background(55);
  
  for (var i=0; i< row * lineNum ; i++){
    d=dist(l[i].x,l[i].y,mouseX,mouseY);
    // print(d);
    if (d<50){
      l[i].sWeight = 22;
    }
    else if (d<200 && d>=50){
      l[i].sWeight = 15;
    }
    else if (d>200) {
      l[i].sWeight = 5;
    }
    
    l[i].display();
  }
  
  
  
}

function updateData() {
  var city = input.value(); // text in the box
  // console.log(city);
  loadJSON(url+city, Weather);
}
function Weather(data) {
    w = data.wind.speed;
    print(w);
}


function drawlines(x,y,angle){
  this.r = 20;
  this.x=x;
  this.y=y
  this.x1;
  this.x2;
  this.y1;
  this.y2;
  this.angle=angle;
  this.sWeight=5;
  
  this.display=function(){
  this.x1= this.x + this.r * cos(this.angle);
  this.y1= this.y + this.r * sin(this.angle);
  this.x2= this.x - this.r * cos(this.angle);
  this.y2= this.y - this.r * sin(this.angle);
  stroke(255,100,100);
  // strokeWeight((200 -abs(180- this.angle))/20);
  strokeWeight(this.sWeight);
  line(this.x1, this.y1, this.x2, this.y2);
  if (this.angle >= 360){this.angle -= 360;}
  this.angle += w;
  }
}



