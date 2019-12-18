let table;
let mountains;
let axiss;
let gap = 100
let gap1 = 200

function preload(){
  table = loadTable('data/population.csv', 'csv', 'header');
  font1=loadFont('fontU.ttf');
  //console.log(table)
}

function setup(){
  createCanvas(1250, 2000);
  loadData();
  textFont(font1)
  save('project2.svg')

}

function draw(){
	background(40,44,49);

//white script
	fill(255,221,185);
	textSize(40);
	let t1 = 'United States V.S USSR: '
	let t2 = 'Is it a development of technology or just political decision';
	text(t1, gap1, 100);
	text(t2,gap1,150)
	textSize(30);
	let t3 = 'Number of tests, Population and Education gross rate from 1960 to 2010';
	text(t3,gap1,180);
	textSize(25);
	text('Number of Tests',0,310+gap);
	text('Population',0,910+gap);
	text('Education Rate',0,1510+gap);
	let t6 = 'The  developmment of nuclear industry in 1960s is a political driven result'
	text(t6,50+gap1,1950);
	textSize(18);
	let t8 = 'Throughout the years, the population for both counties increased'
	text(t8,100+gap1,800)

// blue script
	fill(79,88,98);
	textSize(18);
	let t4 = 'There were 96 tests in 1962 which is the peak '
	let t5 = 'The latest test conducted by United States was in 2006. more than a decade ago'
	text(t4, 500,180+gap)
	text(t5, 500,200+gap)
	textSize(20);
	text('United States',0,250+gap)
	text('United States',0,870+gap)
	text('United States',0,1400+gap)

//red script
	fill(79,88,98);
	textSize(20);
	text('USSR',0,150+3*gap)
	text('USSR',0,750+3*gap)
	text('USSR',0,1400+3*gap)
	textSize(18);
	let t7 = 'In the following two years, which are 1963 and 1964, the USSR had 72 and 79 tests accordingly'
	text(t7, 200+gap1, 500 +gap)

	for(let i = 0; i < dots.length; i++){
		dots[i].display();
	}
	for(let i = 0; i < axiss.length; i++){
		axiss[i].display();
	}
	for(let i = 0; i < mountains.length; i++){
		mountains[i].display();
	}
	for(let i = 0; i < blocks.length; i++){
		blocks[i].display();
	}
}

function loadData(){
	dots = [];
	axiss = [];
	mountains = [];
	blocks = [];

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
		let rusedu = map(russiaeud1,0,125,100,150)
		let usedu1 = row.get('uedu_g')
		let usedu = map(usedu1,0,125,100,150)
		//console.log(usedu)

		// number of tests each year
		let rustest1 = row.get('rtest');
		let ustest1 = row.get('utest');
		let rustest = map(rustest1/2,0,10,0,8);
		let ustest = map(ustest1/2,0,10,0,8);

		//number of balls to represent the population
		let uspop1 = row.get('upop1');
		let ruspop1 = row.get('rpop1');

		//draw separate arrays, do not forget!!!! 
 		dots[i] = new Dot(year, ustest, rustest);
 		axiss[i] = new Axis(year1, year );
 		mountains[i] = new Mountain(year, uspop, ruspop)
 		blocks[i] = new Block(year, usedu, rusedu)
	}
}

//dots represent population of each year and three comparasions.
class Dot{
	constructor(tempYear,tempUstest,tempRustest){
		this.year = tempYear;
		this.ustest = tempUstest;
		this.rustest= tempRustest;

	}

	display(){
		noStroke();
		fill(93,124,156);
		for(let i = 0; i<this.ustest; i++){
			ellipse(this.year+gap1, 290-i*5+gap, 2, 2)
		}
		//rect(this.year, 290-this.ustest, 15, this.ustest)
		
		fill(213,100,100);
		for(let i = 0; i<this.rustest; i++){
			ellipse(this.year+gap1, 310+i*5+gap, 2, 2)
		}
		//rect(this.year, 310, 15, this.rustest);

	}
}

//Mountain represent population
class Mountain{
	constructor(tempYear,tempRuspop,tempUspop){
		this.year = tempYear;
		this.ruspop = tempRuspop;
		this.uspop = tempUspop;
		//this.ussr = tempUssr;
		//this.ussr1 = tempUssr1;
		//this.usedu = tempUsedu;
		//this.rusedu = tempRusedu;
		//console.log(this.usedu,this.rusedu)
	}

	display(){
		noStroke();
		fill(93,124,156);
		rect(this.year+gap1, 900-this.uspop+gap-20, 20, this.uspop+10);
		fill(213,100,100);
		rect(this.year+gap1, 910+gap+20, 20, this.ruspop+gap);

	}
}

//blocks represent education gross rate
class Block{
	constructor(tempYear,tempRusedu,tempUsedu){
		this.year = tempYear;
		//this.ruspop = tempRuspop;
		//this.uspop = tempUspop;
		//this.ussr = tempUssr;
		//this.ussr1 = tempUssr1;
		this.usedu = tempUsedu;
		this.rusedu = tempRusedu;
		//console.log(blocks[100].usedu)
	}

	display(){
		noStroke();
		let dim = 12;
		let numberOfShades = Infinity;
		//let palette1 = Brewer.sequential('Blues', numberOfShades, 100, 150);
		var palette1 = chroma.scale('YlOrRd').mode('lch').domain([100,150]);
		var palette2 = chroma.scale('Blues').mode('lch');
		//stroke(colorSigMag(magnitudes1[i]).rgb())
		let edu1 = []
		let edu2 = []
		for(let i = 0 ; i<blocks.length; i++){
			//let edu1 = blocks[i].usedu
			edu1.push(blocks[i].usedu)
			edu2.push(blocks[i].rusedu)
			//let color = palette1.colorForValue(blocks[i].usedu);
			//fill(palette1((edu1[i]).rgb()));
			let color1 = palette1((edu1[i])).rgb()
			fill(color1);
			rect(this.year+gap1, 1480, dim, dim);
			let color2 = palette2((edu2[i])).rgb()
			fill(color2);
			rect(this.year+gap1, 1710, dim, dim);
			
			//console.log(edu1)

		}
			//console.log(color)
		// let palette2 = Brewer.sequential('Reds', numberOfShades, 100, 150);
		// for(let i = 0 ; i<blocks.length; i++){
		// 	let color = palette2.colorForValue(blocks[i].rusedu);
		// 	fill(color);
		// 	rect(this.year+gap1, 1710, dim, dim);
		// }


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
		//noFill();
		stroke(255,221,185);
		strokeWeight(0.05);
		// line(0,300+gap,1000,300+gap);
		// line(0,900+gap,1000,900+gap);
		// line(0,1500+gap,1000,1500+gap);
		// line(this.year+gap1, 295+gap,this.year,305+gap );
		// line(this.year+gap1, 895+gap,this.year,905+gap );
		// line(this.year+gap1, 1495+gap,this.year,1505+gap );
		textSize(6)
		fill(255,221,185)
		text(this.year1,this.year+gap1, 310+gap-5);
		text(this.year1,this.year+gap1,910+gap);
		text(this.year1,this.year+gap1,1510+gap);

		//stroke(255);
		noFill();
		// how to express text based on decades
		//textSize(3);
		//text(1940,this.year,300);		

	}
}