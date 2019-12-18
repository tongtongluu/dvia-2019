# Round Clock

## 1/ Concept & Sketch

1. as shown before, round circle moves as second/minute/hour
2.  use green as the main color
3.  circles that represent second hand
4.  minute hand and hour hand are represented from outer circle to inner circle accordingly.
![0](https://github.com/tongtongluu/dvia-2019/1.mapping-time/process/1_timeClock1_round.jpg)




## 2/ P5.js Code Implementation

```Javascript
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

```
## 3/ Feedbacks on Refinements
keep it that way

## 4/ Screenshot of Final Design
![0](https://github.com/tongtongluu/dvia-2019/1.mapping-time/clock-1-radial-seconds-round-circle/show1.png)
