var width = 500
var x = width*0.02 // starting x position to draw
var y = width*0.02  // starting y position to draw
var gap = 10

var secondBarHeight = 10// height of each bar
var minuteBarHeight = secondBarHeight *2
var hourBarHeight = minuteBarHeight * 2
var maxWidth = width - 100 // maximum width of each bar (the actual width will always be ≤ this)
var spacing = 10 // the vertical space to skip between bars

var discrete = true // flag whether to have the bars 'tick' from one value to the next or move smoothly,
                    // try setting it to false and see what happens...

//this gets called only once in the very beginning
function setup() {
	createCanvas(width*5, width*5)
}

//this gets called every frame (about 60 frames per second)
function draw() {
  background(0)
  noStroke()

  // measure the current time & calculate the width in pixels of each bar
  var now = clock()
  if (discrete){

    var secWidth = map(1, 0 ,15, 0, maxWidth )
    var secsWidth = now.sec * secWidth
    var minWidth = map(1, 0, 15, 0, 0.7*maxWidth)
    var minsWidth = now.min * minWidth
    var hourWidth = map(1,0,12,0,0.5*maxWidth)
    var r = now.hour * hourWidth
  }

  //draw 4 bars to indicate the seconds as a square
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
 //draw 4 bars to indicate the hours as a square
	fill("red")
	
	arc(x+2*gap+2*minuteBarHeight, y+secondBarHeight+minuteBarHeight+2*gap, r, r, 0, HALF_PI); 
}


  

//    if ((now.min > 15 )& (now.min <= 30)){

//    	rect(x + minuteBarHeight +gap + 0.7*maxWidth, y +secondBarHeight + gap + minuteBarHeight, -minuteBarHeight, minsWidth-0.7*maxWidth);
//  	rect(x+gap+minuteBarHeight, y+secondBarHeight+gap,0.7*maxWidth,minuteBarHeight);
//   	}

//   	if ((now.min > 30) & (now.min <= 45)){

//  	rect(x + minuteBarHeight + gap + 0.7* maxWidth, y + secondBarHeight + gap + minuteBarHeight + 0.7*maxWidth, -minsWidth + 2*0.7*maxWidth, minuteBarHeight);
//     rect(x+gap+minuteBarHeight, y+secondBarHeight+gap,0.7*maxWidth,minuteBarHeight);
//     rect(x + minuteBarHeight +gap + 0.7*maxWidth, y +secondBarHeight + gap + minuteBarHeight, -minuteBarHeight, 0.7*maxWidth)
//   	}

//    if (now.min > 45 & now.min <= 60){
//    	rect(x+gap+minuteBarHeight, y+secondBarHeight+gap,0.7*maxWidth,minuteBarHeight);
//     rect(x + minuteBarHeight +gap + 0.7*maxWidth, y +secondBarHeight + gap + minuteBarHeight, -minuteBarHeight, 0.7*maxWidth)
//    	rect(x + minuteBarHeight + gap + 0.7* maxWidth, y + secondBarHeight + gap + minuteBarHeight + 0.7*maxWidth, - 0.7*maxWidth, minuteBarHeight);
//    	rect(x  + gap + minuteBarHeight,  y+0.7*maxWidth + gap + secondBarHeight + minuteBarHeight, minuteBarHeight, - minsWidth + 3*0.7*maxWidth)
  
  
 