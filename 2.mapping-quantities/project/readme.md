## Concept

I want to study the educational attatinment rate(better the data about nuclear industry education) to see if US and USSR during the Cold War ever put  emphasis on education for the bomb competition.
I find data from the United Nations for the population of the two countries from 1960s to 2010s.
Then I read the reports from the World Bank to extract the data about education.
The data I collected is the gross rate of primary educational rate. To my surprise, USSR during the cold war acctually have higer education rate than US.

Since I have three parts: the original nuclear tests, the population, educational attatinment rate,
I decided to make a long poster that contains three topics accordingly.Some more observations will be added to the poster as well.

## Design ideas
1. Use red to represent USSR and blue for US, the two representative colors for two idelogies.
2. Seperatly made graphs about tests, population and education. 
3. Make Conclusions in the end.
sketches are [here](https://github.com/tongtongluu/dvia-2019/blob/master/2.mapping-quantities/process)

## Other Data: population and education attainment rate
I want to study the educational attatinment rate(better the data about nuclear industry education) to see if US and USSR during the Cold War ever put  emphasis on education for the bomb competition.
I find data from the United Nations for the population of the two countries from 1960s to 2010s.
Then I read the reports from the World Bank to extract the data about education.
The data I collected is the gross rate of primary educational rate. To my surprise, USSR during the cold war acctually have higer education rate than US.
The data can be found in the folder [here](https://github.com/tongtongluu/dvia-2019/blob/master/2.mapping-quantities/project/04_final)



## Experimentations
I did three versions of bar graph and bubble charts first
1. one
[clickhere](https://github.com/tongtongluu/dvia-2019/blob/master/2.mapping-quantities/project/01_pieChart)
Results:
![0](https://github.com/tongtongluu/dvia-2019/blob/master/2.mapping-quantities/project/04_final/project1outcome.png)
2. two
[clickhere](https://github.com/tongtongluu/dvia-2019/blob/master/2.mapping-quantities/project/02_barChart)
Results:
![0](https://github.com/tongtongluu/dvia-2019/blob/master/2.mapping-quantities/project/04_final/project2outcome.png)
3. three
[clickhere](https://github.com/tongtongluu/dvia-2019/blob/master/2.mapping-quantities/project/03_bubbles)
Results:
![0](https://github.com/tongtongluu/dvia-2019/blob/master/2.mapping-quantities/project/04_final/project3outcome.png)


## Finals: First Part: number of tests
**The number of tests is not so clear:**
1. each dots is not one test, the maximum of data is almost 50 times as the minumum data. 
2. the time line is not so clear 
![0](https://github.com/tongtongluu/dvia-2019/blob/master/2.mapping-quantities/project/04_final/p1.png)


```
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

```
## Finals: Second Part: population
1. originally use seperate bar chart, which was misleading. its better to use the line graph
2. hard to make line graph so i just narrowed the gap between bars
3. the number for population is huge, even when i mapped it, the graph still looks boring, because they are just positive line graph that the population always grows.
4. should find a better way to map the population.
![0](https://github.com/tongtongluu/dvia-2019/blob/master/2.mapping-quantities/project/04_final/p2.png)

```
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

```

## Finals Third Part: Education Attainment Rate
1. its the gross rate here, so normally it is bigger than 1.
2. some of the data are missing, should leave it blank
3. the data is not perfect, should find data about educational attatinment rate of nuclear technology or mechenical engineer(some related subjects)
![0](https://github.com/tongtongluu/dvia-2019/blob/master/2.mapping-quantities/project/04_final/p3.png)

```
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
```

## Use SVG methods(illustrator) to add more comment
I created the SVG arguement to download a new svg each time , then I can add more observations

## JPG file
![](https://github.com/tongtongluu/dvia-2019/blob/master/2.mapping-quantities/project/04_final/finalversion6.jpg)


## PDF file
![](https://github.com/tongtongluu/dvia-2019/blob/master/2.mapping-quantities/project/04_final/finalversion6.pdf)