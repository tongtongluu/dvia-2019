# flowers

## 1/ Concept & Sketch
Design1: Black and white,
1. different from the original design
2. draw flows on the screen 
3. number of leaves shows the number of month
this is the original design:
![0](https://github.com/tongtongluu/dvia-2019/blob/master/1.mapping-time/process/4_calendarClock1_dayofmonth_season.jpg)



## 2/ P5.js Code Implementation

```Javascript
 function draw() {
	var k = 12;

	background(0);
	translate(width/2, height/2);

	beginShape();
	stroke(255);
	noFill();
	strokeWeight(1);

	for (var a = 0; a<TWO_PI*10; a+= 0.02){
		var r = 200* cos(k*a);
		var x = r * cos(a);
		var y = r * sin(a);
		var now = clock();
		var k = now.season;
		//console.log(k);
		//point(x,y)
		vertex(x,y);
	}
	endShape(CLOSE);

```
## 3/ Feedbacks on Refinements
some of the function do not fully working

## 4/ Screenshot of Final Design
![0](https://github.com/tongtongluu/dvia-2019/blob/master/1.mapping-time/date-2-flower-days-months/show5.png)