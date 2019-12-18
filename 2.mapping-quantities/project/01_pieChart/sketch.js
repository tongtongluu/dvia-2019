let table;
let bubbles;
let axiss;
let arcs;
function preload(){
  table = loadTable('data/education.csv', 'csv', 'header');
  //console.log(table)
}

function setup(){
  createCanvas(1000, 600);
  loadData();

}

function draw(){
	background(0);

	for(let i = 0; i < bubbles.length; i++){
		bubbles[i].display();
	}
	for(let i = 0; i < axiss.length; i++){
		axiss[i].display();
	}
	for(let i = 0; i < arcs.length; i++){
		arcs[i].display();
	}
}

function loadData(){
	bubbles = [];
	axiss = [];
	arcs = [];

	for(let i = 0; i < table.getRowCount(); i++){
		let row =table.getRow(i);
		let year = row.get('year');
		let yearmid = row.get('yearmid')
		let year1 = map(Number(yearmid),1940,2000,0,800)
		let us = row.get('US');
		let us1 = map(us,1,478,15,100);
		let ussr = row.get('USSR');
		let ussr1 = map(ussr,1,478,15,100);
		let usedu = row.get('EDU_US');
		let useduori = row.get('EDU_ORI_US')
		let ussredu = row.get('EDU_USSR');
		let ussreduori = row.get('EDU_ORI_USSR')

		bubbles[i] = new Bubble(us,us1,ussr,ussr1,year1,yearmid );
		axiss[i] = new Axis(year1, year );
		arcs[i] = new Arc(us1,ussr1,usedu,ussredu,useduori,ussreduori,year1)
		//console.log(us1)
	}
}

//bubbles represent number of bumbs
class Bubble{
	constructor(tempUs,tempUs1,tempUssr,tempUssr1,tempYear1,tempYearmid){
		//this.x = tempX;
		//this.y = tempY;
		//this.r = tempR;
		//this.total = tempTotal;
		//this.year = tempYear;
		this.yearmid = tempYearmid;
		this.year1 = tempYear1
		this.us = tempUs;
		this.us1 = tempUs1;
		this.ussr = tempUssr;
		this.ussr1 = tempUssr1;
		//this.usedu = tempUsedu;
		//this.ussredu = tempUssredu;
		//console.log(this.us)

	}

	display(){
		noStroke();
		fill(100,149,237,150);
		ellipse(this.year1, 150, this.us1, this.us1)
		fill(178,34,34,150)
		ellipse(this.year1, 450, this.ussr1, this.ussr1)
		noFill();
		stroke(100,149,237)
		text(this.us,this.year1,100);
		stroke(178,34,34)
		text(this.ussr,this.year1,500);

		//console.log(this.us)
	}
}

class Arc{
	constructor(tempUs1,tempUssr1,tempUsedu,tempUssredu,tempUseduori,tempUssreduori,tempYear1){
		this.us1 = tempUs1;
		this.ussr1 = tempUssr1;
		this.usedu = tempUsedu;
		this.useduori = tempUseduori;
		this.ussredu = tempUssredu;
		this.ussreduori = tempUssreduori;
		this.year1 = tempYear1

		//this.x = tempX;
		//this.y = tempY;
		//this.r = tempR;
		//this.total = tempTotal;
		//this.year = tempYear;
		//this.yearmid = tempYearmid;
		
		//this.us = tempUs;
		
		//console.log(this.usedu)

	}

	display(){
		noStroke();
		fill(100,149,237,200);
		arc(this.year1, 150, 1.2*this.us1, 1.2*this.us1, 0, this.usedu*TWO_PI)
		fill(178,34,34,200)
		arc(this.year1, 450, 1.2*this.ussr1, 1.2*this.ussr1, 0, this.ussredu*TWO_PI)
		noFill();
		stroke(100,149,237)
		text(this.useduori + '%',this.year1+30,150);
		stroke(178,34,34)
		text(this.ussreduori + '%',this.year1+30,450);

		//console.log(this.us)
	}
}


class Axis{
	constructor(tempYear1,tempYear){

		this.year1 = tempYear1;
		this.year = tempYear
		console.log(year)
	}
	display(){
		noFill();
		stroke(255,255,255,50);
		line(50,300,800,300);
		line(this.year1, 250,this.year1,350 )
		//stroke(255);
		noFill();
		//noStroke();
		textSize(18);
		text(this.year,this.year1,280);		
		//strokeWeight(5);
		//console.log(this.year,this.year1)
	}
}





//   // pick one of the three data files to work with and call it 'table'
//   var table = totals

//   // log the whole dataset to the console so we can poke around in it
//   print(table)

//   // set up typography
//   textFont("Rokkitt")
//   textSize(16)
//   fill(30)
//   noStroke()

//   var x = 200
//   var y = 100
//   var rowHeight = 60
//   var colWidth = 40

//   // draw country name labels on the left edge of the table
//   textStyle(BOLD)
//   textAlign(RIGHT)
//   for (var c=1; c<table.getColumnCount(); c++){
//     text(table.columns[c], x-colWidth, y)
//     y += rowHeight
//   }


//   // draw year labels in the header row
//   x = 200
//   y = 100
//   textStyle(NORMAL)
//   textAlign(BOLD)
//   for (var r=0; r<table.getRowCount(); r++){
//     var year = table.getString(r, 0)
//     text(year, x, y-rowHeight)
//     x += colWidth
//   }

//   // print out the total for each country, one column at a time
//   x = 200
//   for (var r=0; r<table.getRowCount(); r++){
//     y = 100
//     for (var c=1; c<table.getColumnCount(); c++){
//       var value = table.getNum(r, c)
//       text(value, x, y)
//       y += rowHeight
//     }
//     x += colWidth
//   }

// }