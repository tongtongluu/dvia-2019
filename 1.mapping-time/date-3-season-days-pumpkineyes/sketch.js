function setup(){
	createCanvas(800,800);
	angleMode(DEGREES);

}

function draw(){
	var now = clock();
	var r,g,b
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
	translate(400, 400);
	rotate(-90);
	
	//console.log(now);
	
	// noFill();
	// stroke(255);
	// strokeWeight(4);
	// ellipse(200, 200, 300, 300);

	
// draw hours, the eye 
	noFill();
	stroke(255,0,0,80);
	strokeWeight(1);
	ellipse(0, 0, 300, 400);


	
	strokeWeight(5);
	stroke(r,g,b,100);
	noFill();
	var end1 = map(hr, 0,12,0,360);
	arc(0, 0, 300, 400, 0, end1);
	
//console.log(end1)
//console.log(r,g,b)


// draw days, the middle eye
	noFill();
	stroke(255,0,0,80);
	strokeWeight(1);
	ellipse(0, 0, 300, 200);

	strokeWeight(7);
	stroke(r,g,b,150);
	noFill();
	var end2 = map(day, 0,monLen,0,360);
	arc(0, 0, 300, 200, 0, end2);


// draw season, the center eye
	strokeWeight(9);
	noStroke();
	fill(r,g,b,75);
	//var end3 = map(hr%12, 0,12,0,360);
	 ellipse(0, 0, 300, 100);

// draw the pointer( only draw the hour point here
	push();	
	rotate(end1);
	//console.log(end3);
	stroke(255);
	line(0,0,50,0);
	pop();

	// fill(255);
	// noStroke();

}


































