# Square Clock

## 1/ Concept & Sketch

1. as shown before, round circle moves as second/minute/hour
2. but i changed the color
2.  use black and white as the main color
3.  circles that represent second hand
4.  minute hand and second hand are represented from outer square to inner square accordingly.
5.  hour is represented by the red quater circles as a growing sun
![0](https://github.com/tongtongluu/dvia-2019/blob/master/1.mapping-time/process/1_timeClock1_round.jpg)




## 2/ P5.js Code Implementation

```Javascript
fill("white")
  if (now.sec <= 15){
  rect(x, y, secsWidth,  secondBarHeight)
  }

  if ((now.sec > 15 )& (now.sec <= 30)){

  	rect(x, y, maxWidth, secondBarHeight);
  	rect(maxWidth + x ,y, secondBarHeight, secsWidth - maxWidth);
  }

   if ((now.sec > 30) & (now.sec <= 45)){

   	rect(x, y, maxWidth, secondBarHeight);
   	rect(x + maxWidth ,y, secondBarHeight , maxWidth)
   	rect(x + maxWidth , maxWidth , - (secsWidth - 2* maxWidth),secondBarHeight);
  }

   if (now.sec > 45 & now.sec <= 60){
   	rect(x, y, maxWidth, secondBarHeight);
   	rect(x + maxWidth ,y, secondBarHeight , maxWidth)
   	rect(x + maxWidth , maxWidth , - (maxWidth),secondBarHeight);
   	rect(x + secondBarHeight,  y+maxWidth, -secondBarHeight, -(secsWidth - 3*maxWidth))
  }
//**************************************************************
//draw 4 bars to indicate the minutes as a square
	fill("white")
	
	if (now.min <= 15){
	rect(x  +gap + minuteBarHeight, y +secondBarHeight + gap, minsWidth,  minuteBarHeight)
  }

   if ((now.min > 15 )& (now.min <= 30)){

   	rect(x + minuteBarHeight +gap + 0.7*maxWidth, y +secondBarHeight + gap + minuteBarHeight, -minuteBarHeight, minsWidth-0.7*maxWidth);
 	rect(x+gap+minuteBarHeight, y+secondBarHeight+gap,0.7*maxWidth,minuteBarHeight);
  	}

  	if ((now.min > 30) & (now.min <= 45)){

 	rect(x + minuteBarHeight + gap + 0.7* maxWidth, y + secondBarHeight + gap + minuteBarHeight + 0.7*maxWidth, -minsWidth + 2*0.7*maxWidth, minuteBarHeight);
    rect(x+gap+minuteBarHeight, y+secondBarHeight+gap,0.7*maxWidth,minuteBarHeight);
    rect(x + minuteBarHeight +gap + 0.7*maxWidth, y +secondBarHeight + gap + minuteBarHeight, -minuteBarHeight, 0.7*maxWidth)
  	}

   if (now.min > 45 & now.min <= 60){
   	rect(x+gap+minuteBarHeight, y+secondBarHeight+gap,0.7*maxWidth,minuteBarHeight);
    rect(x + minuteBarHeight +gap + 0.7*maxWidth, y +secondBarHeight + gap + minuteBarHeight, -minuteBarHeight, 0.7*maxWidth)
   	rect(x + minuteBarHeight + gap + 0.7* maxWidth, y + secondBarHeight + gap + minuteBarHeight + 0.7*maxWidth, - 0.7*maxWidth, minuteBarHeight);
   	rect(x  + gap + minuteBarHeight,  y+0.7*maxWidth + gap + secondBarHeight + minuteBarHeight, minuteBarHeight, - minsWidth + 3*0.7*maxWidth)
  }

```
## 3/ Feedbacks on Refinements
second and minute are not equally distributed

## 4/ Screenshot of Final Design
![0](https://github.com/tongtongluu/dvia-2019/blob/master/1.mapping-time/clock-2-radial-seconds-square/show2,png.png)

