function setup(){
  createCanvas(800,800);
  angleMode(DEGREES);

}

function draw(){
  var gap = 100;
  var r,g,b;
  var now = clock();
  //console.log(now)
  var sec = now.sec;
  var min = now.min;
  var hr = now.hour;
  var weekday = now.weekday;
  var day = now.day;
  var month = now.month;
  var year = now.year - 2000
  var pm = now.pm

  //var min = now.
 
  var season = now.season;
  var monLen

  // define month and the month length
  var month = now.month;
  if(month == 1){
    monLen = 31
  }
  if(month == 2){
    monLen = 28
  }
  if(month == 3){
    monLen = 31
  }
  if(month == 4){
    monLen = 30
  }
  if(month == 5){
    monLen = 31
  }
  if(month == 6){
    monLen = 30
  }
  if(month == 7){
    monLen = 31
  }
  if(month == 8){
    monLen = 31
  }
  if(month == 9){
    monLen = 30
  }
  if(month == 10){
    monLen = 31
  }
  if(month == 11){
    monLen = 30
  }
  if(month == 12){
    monLen = 31
  }


    //console.log(now.day)

  //define season 
  if(season == 1){
    r =  162, g = 205,b = 90
  }
  if(season == 2){
    r = 255,g = 193,b = 37
  }
  if(season == 3){
    r = 238,g = 118,b = 33
  }
  if(season == 4){
    r = 92,g = 172,b = 238
  }

  // define month, especially the month

  var hr = now.hour;
  var day = now.day;
  //var sec = now.sec;
  background(0);
   //draw half rectangular
  fill(255)
  rect(400,0,400,800)
  translate(400, 400);
  rotate(-90);


  
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


   //stroke(255)
   //var monthRadius = map(month, 0,12,0,width-5*gap);
// //   //stroke(255,0,0,180);
// 	stroke(255,0,0,80);
//     //noStroke();
//    var end6 = map(month, 0,12,0,360);
// //   //console.log(end3)
//    var monthArc = map(1, 0,12,0,360);
// //   //console.log(hrArc)
//    rotate(end6);
//    rectMode(CENTER);
//    arc(0, 0, width - 6*gap, height - 6*gap, 0, -monthArc, PIE );
// //   //console.log(end1)
//  pop();

// // draw the center circle
 
// ellipse(0, 0, 70, 70);
// stroke(r,g,b);
// fill(11,21,31,50)
// }


 }
