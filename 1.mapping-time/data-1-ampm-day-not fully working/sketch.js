
// Try phyllotaxis calendar
var now = clock();
// 	var pm = now.pm;
// 	var am = now.am;
 	//var n = now.day;
 	//var c = now.hour;
	//var n = 0;
	//var c = 2;

function setup() {
	createCanvas(400,400);
	angleMode(DEGREES);
	//colorMode(HSB);
	//background(0);
  }

function draw() {
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
 
}
	
   if(am == true){
  	//console.log(am);
  	background(255);
  	fill(0);
	noStroke();
	ellipse(x,y,8,8);
	//n++;
  }	
}





