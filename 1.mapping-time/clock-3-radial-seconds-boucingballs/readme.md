# Bouncing Balls

## 1/ Concept & Sketch

Design3: Lines Clock changed to Bouncing Balls, 
1. imagin balls are trapped in a small room. 
2. it is bouncing based on the rhythum of the time
3. second ball change fast, and the hour ball change slowly
![0](https://github.com/tongtongluu/dvia-2019/1.mapping-time/process/1_timeClock3_lines.jpg)




## 2/ P5.js Code Implementation

```Javascript
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

```
## 3/ Feedbacks on Refinements
should use numbers not speed to reprent time

## 4/ Screenshot of Final Design
![0](https://github.com/tongtongluu/dvia-2019/1.mapping-time/clock-3-radial-seconds-boucingballs/show3.png)