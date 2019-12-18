let table;
let bubbles;
let axiss;
function preload(){
  table = loadTable('data/population.csv', 'csv', 'header');
  //console.log(table)
}

function setup(){
  createCanvas(1000, 600);
  loadData();

}

function draw(){
	background(255);

	for(let i = 0; i < bars.length; i++){
		bars[i].display();
	}
	for(let i = 0; i < axiss.length; i++){
		axiss[i].display();
	}
	for(let i = 0; i < bubbles.length; i++){
		bubbles[i].display();
	}
}

function loadData(){
	bars = [];
	axiss = [];
	bubbles = [];

	for(let i = 0; i < table.getRowCount(); i++){
		let row =table.getRow(i);
		//year 
		let year1 = row.get('Year');
		let year = map(Number(year1),1960,2017,25,975)
		// population
		let russia = row.get('rpop');
		let ruspop = map(russia/10000000,12,33,0,200);
		let us = row.get('upop');
		let uspop = map(us/10000000,12,33,0,200);
		// education attatinment gross rate
		let russiaeud1 = row.get('redu_g');
		let rusedu = map(russiaeud1,0,125,50,200)
		let usedu1 = row.get('uedu_g')
		let usedu = map(usedu1,0,125,50,200)

		// number of tests each year
		let rtest1 = row.get('rtest');
		let utest1 = row.get('utest');
		let rtest = map(rtest1/2,0,10,0,12);
		let utest = map(utest1/2,0,10,0,12);

		//number of balls to represent the population
		let uspop1 = row.get('upop1');
		let ruspop1 = row.get('rpop1');

 		bars[i] = new Bar(year, utest, rtest);
 		axiss[i] = new Axis(year1, year );
 		bubbles[i] = new Bubble(year, utest, rtest, uspop, ruspop, usedu, rusedu,uspop1, ruspop1)
 		//console.log(uspop)
	}
}

//bars represent population of each year
class Bar{
	constructor(tempYear,tempUtest,tempRtest){
		this.year = tempYear;
		this.utest = tempUtest;
		this.rtest = tempRtest;
		//this.ussr = tempUssr;
		//this.ussr1 = tempUssr1;
		//this.usedu = tempUsedu;
		//this.rusedu = tempRusedu;
		//console.log(this.usedu,this.rusedu)
	}

	display(){
		noStroke();
		fill(100,149,237);
		rect(this.year, 290-this.utest, 15, this.utest)
		
		fill(178,34,34);
		rect(this.year, 310, 15, this.rtest);

	}
}

//bubbles represent number of bumbs
class Bubble{
	constructor(tempYear,tempUtest,tempRtest,tempUspop,tempRuspop,tempUsedu,tempRusedu,tempUspop1,tempRuspop1){
		this.year = tempYear
		this.utest = tempUtest;
		this.rtest = tempRtest;
		this.uspop = tempUspop;
		this.ruspop = tempRuspop;
		this.usedu = tempUsedu;
		this.rusedu = tempRusedu;
		this.uspop1 = tempUspop1;
		this.ruspop1 = tempRuspop1;

		//console.log(this.uspop,this,year)

	}

	display(){
		noStroke();
		fill(100,149,237,this.usedu);
		for(let i = 0; i<this.uspop1; i++){
			ellipse(this.year, 280-i*25, 12, 12)
		}
		
		fill(178,34,34,this.rusedu)
		for(let i = 0; i<this.ruspop1; i++){
			ellipse(this.year, 320+i*25, 12, 12)
		}
		// noFill();
		// stroke(100,149,237)
		// text(this.us,this.year1,100);
		// stroke(178,34,34)
		// text(this.ussr,this.year1,500);

		//console.log(this.uspop)
	}
}


// x axis show the year
class Axis{
	constructor(tempYear1,tempYear){

		this.year1 = tempYear1;
		this.year = tempYear
		//console.log(year)
	}
	display(){
		noFill();
		stroke(0);
		strokeWeight(0.5);
		line(0,300,1000,300);
		line(this.year, 295,this.year,305 )
		//stroke(255);
		noFill();
		// how to express text based on decades
		//textSize(3);
		//text(1940,this.year,300);		

	}
}