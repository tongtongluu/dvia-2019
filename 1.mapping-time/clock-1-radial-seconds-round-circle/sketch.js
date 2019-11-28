

var cx, cy; // center position of canvas

// Radius for hands of the clock
var secondsRadius
var minutesRadius
var hoursRadius
var clockDiameter
//var dotRadius
//var tickRadius

var discrete = true

function setup() {
  createCanvas(640, 640)
  stroke(255)

  var radius = min(width, height) / 2; // this is the maximum possible radius
  secondsRadius = radius
  minutesRadius = radius * 0.40
  hoursRadius = radius * 0.20
  //tickRadius = radius * .7
  //dotRadius = radius * .75
  clockDiameter = radius * 1.666

  cx = width / 2
  cy = height / 2
}

function draw() {
  background(255)

  // Draw the clock background
  strokeWeight(2)
  noFill()
  ellipse(cx, cy, clockDiameter, clockDiameter)
  ellipse(cx, cy, secondsRadius*2)
  ellipse(cx, cy, minutesRadius*2)


  // Angles for sin() and cos() start at 3 o'clock
  // subtract HALF_PI to make them start at the top
  var now = clock()
  var s = (now.progress.min * TWO_PI) - HALF_PI
  var m = (now.progress.hour * TWO_PI) - HALF_PI
  var h = (now.progress.halfday * TWO_PI) - HALF_PI

  if (discrete){
    // L[inearly] [int]ERP[olate] from the current fraction of a minute to a
    // proportional value in the range 0–2π (for a 'ticking' effect)
    s = lerp(0, TWO_PI, now.sec/60) - HALF_PI
  }
// need to change color later

  fill('lightblue')
  strokeWeight(3)
  //line(cx, cy, cx + cos(s)*secondsRadius, cy + sin(s)*secondsRadius)
   arc(cx, cy, secondsRadius * 2, secondsRadius * 2, 0, s); 
   noStroke();

  // minute
  fill('blue')
  arc(cx, cy, minutesRadius * 2, minutesRadius * 2, 0, m); 
  noStroke();

  // draw the hour hand (thicker still)
  //strokeWeight(6)
  //line(cx, cy, cx + cos(h)*hoursRadius, cy + sin(h)*hoursRadius)
  fill('darkblue')
  arc(cx, cy, hoursRadius * 2, hoursRadius * 2, 0, h); 
  noStroke();

}