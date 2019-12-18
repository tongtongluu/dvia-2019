// var now = clock();
// var k = now.month
function setup() {
	createCanvas(400,400);
}

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

	
}

  