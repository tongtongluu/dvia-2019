# changing color from black to white

## 1/ Concept & Sketch
Design1: Black and white,
1. different from the original design
2. build the black and white view, differentiate seassons by for colors,
3. dots moving like flowers to show the date of the month. 
4. black and white changes as am and pm switches
this is the original design:
![0](https://github.com/tongtongluu/dvia-2019/blob/master/1.mapping-time/process/4_calendarClock1_dayofmonth_season.jpg)



## 2/ P5.js Code Implementation

```Javascript
 	var now = clock();
	//console.log(now);
	var pm = now.pm;
	var am = now.am;
	var n = now.hour;
	var c = now.day;
	var a = n* 137.5;
	var r = c* sqrt(n);

	var x = r* cos(a) + width/2;
	var y = r* sin(a) + height/2;
	if(pm == true){
		
				background(0);
				fill(255);
				noStroke();
				ellipse(x,y,8,8);
	//n++;

```
## 3/ Feedbacks on Refinements
some of the function do not fully working

## 4/ Screenshot of Final Design
![0](https://github.com/tongtongluu/dvia-2019/blob/master/1.mapping-time/date-1-ampm-day-not fully working/show4.png)