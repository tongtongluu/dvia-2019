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

 		bars[i] = new Bar(year, ruspop, uspop, usedu, rusedu);
 		axiss[i] = new Axis(year1, year );
 		bubbles[i] = new Bubble(year, utest, rtest, uspop, ruspop)
 		//console.log(uspop)
	}
}

//bars represent population of each year
class Bar{
	constructor(tempYear,tempRuspop,tempUspop,tempUsedu,tempRusedu){
		this.year = tempYear;
		this.ruspop = tempRuspop;
		this.uspop = tempUspop;
		//this.ussr = tempUssr;
		//this.ussr1 = tempUssr1;
		this.usedu = tempUsedu;
		this.rusedu = tempRusedu;
		console.log(this.usedu,this.rusedu)
	}

	display(){
		noStroke();
		fill(100,149,237,this.usedu);
		rect(this.year, 300-this.uspop, 12, this.uspop);
		fill(178,34,34,this.rusedu);
		rect(this.year, 300, 12, this.ruspop);

	}
}

//bubbles represent number of bumbs
class Bubble{
	constructor(tempYear,tempUtest,tempRtest,tempUspop,tempRuspop){
		this.year = tempYear
		this.utest = tempUtest;
		this.rtest = tempRtest;
		this.uspop = tempUspop;
		this.ruspop = tempRuspop;
		//this.usedu = tempUsedu;
		//this.ussredu = tempUssredu;
		//console.log(this.uspop,this,year)

	}

	display(){
		//noStroke();
		fill(100,149,237,150);
		ellipse(this.year+6, 300-this.utest-this.uspop, this.utest, this.utest)
		fill(178,34,34,150)
		ellipse(this.year+6, 300+this.ruspop+this.rtest, this.rtest, this.rtest)
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