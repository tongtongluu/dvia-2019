# YinYang Clock

## 1/ Concept & Sketch
1. built on the camera view
2. want to add some difference bewteen day view and calendar view
3. inspired by the painting from Pace Gallery this past seasons
4. Also inspired by the Chinese Yin and Yang(negative and positive philosophy)
5. inspired by Chinese Yin and Yang Bagua 
6. divided it into two parts, black side is the clock part and the white part is the calendar part.
![0](https://github.com/tongtongluu/dvia-2019/blob/master/1.mapping-time/process/8_final_yinYangPhilosophy.png)



### second
the moving dots, and the number of sides is determined by the number of seconds.(a dot as second 1, line as second2, triangle as second3)
### minute
the moving circle from right side
### hour
the moving circle from the right side( inner circle)
### am or pm
the still shape from the right side, fill in white as am, black as pm
### weekdays 
the moving square from left side
### days
the moving circle from left side(inner circle)
### month 
the still shape from the right side, the number of lines represents the month (a dot as January, line as February, triangle as March)
### season 
the still shape from the right side, and the color of moving circles and squares, green as spring, yellow as summer, orange as autumn and blue as winter.



## 2/ P5.js Code Implementation

```Javascript
 //draw seconds:换个形状

push();
  fill(255)
  noStroke();
  rotate(210)
  //strokeWeight(5);
  var end1 = map(sec, 0,60,0,180);
  var secArc = map(1, 0,60,0,180);
  rectMode(CENTER);
  rotate(end1);

  polygon(80, -55, 30, sec/2);

  
  //line(0,0,end1,end1)
  //arc(end1, 0, width - gap, height - gap, 0, 90,OPEN );
pop();


// draw minutes
push();
	noFill()
  	stroke(0);
  	strokeWeight(4);
  	arc(100, 0, width - 2*gap, height - 2*gap, 0, 180,OPEN );
  	
  	fill(r,g,b,180);
  	noStroke()
  	var end2 = map(min, 0,60,0,180);
  	var minArc = map(1, 0,60,0,180);
  	rotate(end2);
  	rectMode(CENTER);
  	// circle 和轨道不一致
  	circle(400-gap, 0,60)
  	rotate(-end2)

pop();


  
 // draw hours
push();
  fill(r,g,b,150);
  var end3 = map(hr, 0,12,0,180);
  var hrArc = map(1, 0,12,0,180);
  rotate(end3);
  rectMode(CENTER);
  noStroke()
  circle(400-2*gap,0 ,40)
  rotate(-end3)
  noFill()
  stroke(0);
  strokeWeight(3);
  arc(0, 0, width - 4*gap, height - 4*gap, 0, 180 ,OPEN);
pop();


// draw week days
 push();
   
   stroke(255);
   strokeWeight(4)
   noFill()
   arc(-100, 0, width-2*gap , height-2*gap ,180, 0 ,OPEN);
   var end4 = map(weekday, 0,7,0,180);
   var weekArc = map(1, 0,7,0,180);
   fill(r,g,b,180);
   noStroke()
   rotate(end4+90);
   rectMode(CENTER);
   rect(0, 400-gap,60,60)
   
   
 pop();

// draw  day
 push();
    var end5 = map(day, 0,monLen,0,180);
   	var dayArc = map(1, 0,monLen,0,180);
   	stroke(255)
   	strokeWeight(4)
   	noFill()
   	arc(0, 0, width - 4*gap, height - 4*gap, 180, 0 ,OPEN);
   	rotate(end5);
   	rectMode(CENTER);
   	fill(r,g,b,200);
   	rotate(90)
	noStroke()
	rect(0, 400-2*gap,80,80)

 pop();

// draw  month,问题是月份1 是一个点，月份二是一条线
push();
if (pm == true) {
	fill(0,0,0);
}
else{
	fill(255)
}
console.log(pm)
stroke(r,g,b)
strokeWeight(20)
polygon(-50,70,30,month)
pop()
function polygon(x, y, radius, npoints) {
  let angle = 360 / npoints;
  console.log(angle)
  beginShape();
  for (let a = 0; a < 360; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
    //console.log(sx,sy)
  }
  endShape(CLOSE);
}

```
## 3/ Feedbacks on Refinements
minute do not move with the lines

## 4/ Screenshot of Final Design
![0](https://github.com/tongtongluu/dvia-2019/blob/master/1.mapping-time/Final-yin-yang-clock-calendar/finalshow.png)
![0](https://github.com/tongtongluu/dvia-2019/blob/master/1.mapping-time/Final-yin-yang-clock-calendar/p1v2.png)

