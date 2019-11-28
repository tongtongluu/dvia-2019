

let radHour = 50; // Width of the shape
let radMin = 25; // Width of the shape
let radSec = 12.5; // Width of the shape
let xposHour, yposHour,xposMin,yposMin,xposSec,yposSec; // Starting position of shape
var now = clock()

let xspeedHour = now.hours/60; // Speed of the shape
let yspeedHour = now.hours/60; // Speed of the shape
let xspeedMin = now.min/12; // Speed of the shape
let yspeedMin = now.min/12; // Speed of the shape
let xspeedSec = now.sec; // Speed of the shape
let yspeedSec = now.sec; // Speed of the shape


let xdirectionHour = 1; // Left or Right
let ydirectionHour = 1; // Top to Bottom
let xdirectionMin = 1; // Left or Right
let ydirectionMin = 1; // Top to Bottom
let xdirectionSec = 1; // Left or Right
let ydirectionSec = 1; // Top to Bottom

function setup() {
  createCanvas(720, 400);
  noStroke();
  frameRate(60);
  ellipseMode(RADIUS);
  // Set the starting position of the shape
  xposHour = (width)/3-100;
  yposHour = (height)/3-50;
  xposMin = 2*(width)/3-100;
  yposMin = 2*(height)/3-100;
  xposSec = width-100;
  yposSec = height-100;
}

function draw() {
  background(50);
  // break the screen into three parts: hour, minute and seconds
  line(0.33*width,0,0.33*width,height)
  line(0.66*width,0,0.66*width,height)
  //line(0.75*width,0,0.75*width,height)
  stroke(3)

  // Update the position of the shape
  xposHour = xposHour + xspeedHour * xdirectionHour;
  yposHour = yposHour + yspeedHour * ydirectionHour;
  xposMin = xposMin + xspeedMin * xdirectionMin;
  yposMin = yposMin + yspeedMin * ydirectionMin;
  xposSec = xposSec + xspeedSec * xdirectionSec;
  yposSec = yposSec + yspeedSec * ydirectionSec;
  // Test to see if the shape exceeds the boundaries of the screen
  // If it does, reverse its direction by multiplying by -1
  if (xposHour > 0.33*width - radHour || xposHour < radHour) {
    xdirectionHour *= -1;
  }
  if (yposHour > height - radHour || yposHour < radHour) {
    ydirectionHour *= -1;
  }
  if (xposMin > 0.66*width - radMin || xposMin < radMin) {
    xdirectionMin *= -1;
  }
  if (xposMin < 0.33*width + radMin || xposMin < radMin) {
    xdirectionMin *= -1;
  }
  if (yposMin > height - radMin|| yposMin < radMin) {
    ydirectionMin *= -1;
  }
  if (xposSec > width - radSec || xposSec < radSec) {
    xdirectionSec *= -1;
  }
  if (xposSec < 0.66*width + radSec || xposSec < radSec) {
    xdirectionSec *= -1;
  }
  if (yposSec > height - radSec|| yposSec < radSec) {
    ydirectionSec *= -1;
  }

  // Draw the shape
  ellipse(xposHour, yposHour, radHour, radHour);
  ellipse(xposMin, yposMin, radMin, radMin);
  ellipse(xposSec, yposSec, radSec, radSec);
}








