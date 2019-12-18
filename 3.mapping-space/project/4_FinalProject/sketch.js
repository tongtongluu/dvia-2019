// set up variables
var x_left, y_top; // top left corner
var x_right, y_bot; // bottom right corner
var magnitudeMin1, magnitudeMax1,magnitudeMin2, magnitudeMax2,magnitudeMin3, magnitudeMax3;
var depthMin1,depthMax1,depthMin2,depthMax2,depthMin3,depthMax3;
var timeMin1, timeMax1,timeMin2, timeMax2,timeMin3, timeMax3;
var countMin1, countMax1,countMin2, countMax2,countMin3, countMax3;
var table1,table2,table3;// table as the data set
var times1,times2,times3; // an array for the time
var magnitudes1,magnitudes2,magnitudes3; // an array for the magnitude
var depth1,depth2,depth3;
var gap1,gap2,gap3;
var place1,place2,place3;
var colorNew = chroma.scale('Blues').mode('lch')
var colorNewMag = chroma.scale('Blues').mode('lch').domain([-1,13])
var colorMapAll = chroma.scale('Blues').mode('lch');
var colorMapAllMag = chroma.scale('Blues').mode('lch').domain([-1,13]);
var colorSig = chroma.scale('YlOrRd').mode('lch');
var colorSigMag = chroma.scale('YlOrRd').mode('lch').domain([3,8]);


var colorScaleAll = chroma.scale('Blues').mode('lch').domain([0,120]);
var colorMapAllCount = chroma.scale('Blues').mode('lch').domain([1,2644]);


var magnitudeInterval = 1.0;

// load tables and font
function preload() {
  table1 = loadTable("data/all_sig1.csv", "csv", "header");
  table2 = loadTable("data/all_month1.csv", "csv", "header")
  table3 = loadTable("data/all_place.csv", "csv", "header")
  table4 =loadTable("data/allnew.csv", "csv", "header")
  font1=loadFont('font.ttf');
}

// set up canvas and background
function setup() {
  textFont(font1)
  

  // define top left and bottom right corner of our plot
  x_left = 50;
  x_right = width - 80;
  y_top = 60;
  y_bot = height- 80;


  // draw a background rectangle for the plot
  fill(0);
  noStroke();
  rectMode(CORNERS);
  rect(x_left, y_top, x_right, y_bot);

  // get the  arrays of interest: 
  times1 = columnValues(table1, "timestamp")
  magnitudes1 = columnValues(table1, "mag");
  depth1 = columnValues(table1,"depth")
  gap1 = columnValues(table1,"gap")
  place1 = columnText(table1,"place")
  country3 = columnText(table3,"place")
  countryCount3 = columnValues(table3,"count")
  countryMag3 = columnValues(table3,"mag")
  countryDep3 = columnValues(table3,"depth")
  magnitudeMin1 = 0.0;
  magnitudeMax1 = ceil(columnMax(table1, "mag")) ;
  depthMin1 = 0;
  depthMax1= ceil(columnMax(table1,"depth"));
  countMin3 = 0
  countMax3 = ceil(columnMax(table3,"count"));
  depthMin3 = 0
  depthMax3 = ceil(columnMax(table3,"depth"));
  magMin3 = 0
  magMax3 = ceil(columnMax(table3,"mag"));
  

  // the time range should start at 00:00:00 on the first day and end at 23:59:59 on the last day
  timeMin1 = columnMin(table1, 'timestamp')
  timeMin1 = moment(timeMin1).startOf('day')

  timeMax1 = columnMax(table1, 'timestamp')
  timeMax1 = moment(timeMax1).endOf('day')


  setupMap()
  addCircles();
  addSigCircles()
  createCanvas(1280,1200);
  background(0);
  angleMode(DEGREES);
  fill(255);
  textSize(28);
  text(" Significant Earthquakes with its depth mag and region - Past 30 days", x_left, y_top-16);
  text("The Average Depth and Mag of The Top 44 Regions/Counties", x_right+350, 1200-y_top);
  text("Earthquake Regions/Countries by Frequency", x_left, y_top+350);
  textSize(18)
  text("Frequency",x_left+55, y_top+380)
  text("Mag/Dep",x_left+480, y_top+380)
  text("Frequency",x_left+670, y_top+380)
  text("Mag/Dep",x_left+1090, y_top+380)
  textSize(12)
  text("the comparasion of magnitude and depth indicates that those two variables are not necessarily associated with each other",x_left+470, y_top+280)
  text("the color here indicates the depth. the range is huge that not that clear to differentiate tiny differences",x_left+470, 1150-y_top)
  drawUFO();
  drawCircleLoop();
  //drawCountry()
  addLables()
  //drawCountryLables()
  //drawCountrymd()
  drawCountryTimetable()
  
}

//set up map
var mymap
function setupMap(){
  /*
  LEAFLET CODE
  In this case "L" is leaflet. So whenever you want to interact with the leaflet library
  you have to refer to L first.
  so for example L.map('mapid') or L.circle([lat, long])
  */

  // create your own map
  
  mymap = L.map('mapid').setView([35.834, -90.117], 2);

  // load a set of map tiles – choose from the different providers demoed here:
  // https://leaflet-extras.github.io/leaflet-providers/preview/

  L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 15,
      ext: 'png',
  }).addTo(mymap);
}

function addCircles(){
  // calculate minimum and maximum values for magnitude and depth
  magnitudeMin2 = 0.0
  magnitudeMax2 = columnMax(table4, 'mag');
  console.log('magnitude range:', [magnitudeMin2, magnitudeMax2])

  depthMin2 = 0.0;
  depthMax2 = columnMax(table4, 'depth');
  console.log('depth range:', [depthMin2, depthMax2])

  // step through the rows of the table and add a dot for each event
  for (var i=0; i<table4.getRowCount(); i++){
    var row2 = table4.getRow(i)
    //console.log(row)
      if (row2.get('mag')==''){
          continue}
      if (row2.get('mag')=='NaN'){
          continue}
      if (row2.get('depth')==''){
          continue}
          if (row2.get('mag')=='NaN'){
            continue}
      // create a new dot
      var circle = L.circle([row2.getNum('latitude'), row2.getNum('longitude')], {
          color: colorNewMag(row2.getNum('depth')).hex(),
          fillColor: colorNew(row2.getNum('depth')/10).hex(), 
          fillOpacity: 0.5,
          radius: row2.getNum('mag')*20000


      })
      circle.addTo(mymap);
}}

function addSigCircles(){
  // calculate minimum and maximum values for magnitude and depth
  magnitudeMin1 = 0.0
  magnitudeMax1 = columnMax(table1, 'mag');
  //console.log('magnitude range:', [magnitudeMin, magnitudeMax])

  depthMin1 = 0.0;
  depthMax1 = columnMax(table1, 'depth');
  //console.log('depth range:', [depthMin, depthMax])

  // step through the rows of the table and add a dot for each event
  for (var i=0; i<table1.getRowCount(); i++){
    var row1 = table1.getRow(i)
    //console.log(row)
      if (row1.get('mag')==''){
          continue}

      // create a new dot
      var circle1 = L.circle([row1.getNum('latitude'), row1.getNum('longitude')], {
          color: colorSigMag(row1.getNum('mag')).hex(),
          fillColor: colorSig(row1.getNum('depth')/15).hex(), 
          fillOpacity: 0.7,
          radius: row1.getNum('mag')*200000


      })
      circle1.addTo(mymap);
      var popup = L.popup()
    .setLatLng([row1.getNum('latitude'), row1.getNum('longitude')])
    .setContent(("significant"))
    .openOn(mymap);
  
}}
// plot the two data points per row as an x/y coordinate
// function drawDataPoints(){
//   strokeWeight(5);
//   stroke(255,0,0);
//   var numberOfShades = 9
//   var lowest = place[0]
//   var highest = place[9]
//   //var palette = Brewer.sequential('BuPu', numberOfShades, lowest, highest)
//   //console.log(palette)
//   // cycle through array
//   for(var i=0; i<times.length; i++){
//     //map the x position to the time
//     var dayTime = moment(times[i])
//     var x = map(dayTime,timeMin, timeMax, x_left, x_right);

//     // map the y position to magnitude
//     var y = map(magnitudes[i],magnitudeMin, magnitudeMax, y_bot, y_top);
//     point(x,y);
//   }
// }
function drawCountry(){
  //strokeWeight(1);
  noStroke();
  for(let i = 0; i<country3.length; i++){
    stroke(colorScaleAll(countryCount3[i]).rgb());
    fill(colorMapAllCount(countryCount3[i]).rgb());
    //map the x position to the time
    var x =  (1000/country3.length)*i
    //console.log(x)
    // map the y position to magnitude
    var h = map(countryCount3[i],countMin3,countMax3,1,150);
    rect(x+50,y_top+370,x+56, y_top+370+h)
    //,x,y_top+360+h
    //fill(255,0,0,100)
    //ellipse(x,y+50,d,10)
    //arc(x,y+50,30,g,0,180,CHORD)
  }
}

function drawCountryLables(){
  textSize(8)
  textAlign(CENTER, CENTER);
  for(let i = 0; i<10; i++){
    noStroke()
    fill(colorMapAllCount(countryCount3[i]).rgb());
    //map the x position to the time
    var x =  (1000/country3.length)*i
    //console.log(x)
    // map the y position to magnitude
    var h = map(countryCount3[i],countMin3,countMax3,1,100);
    text(country3[i],x_right,y_top+400+i*10)
  }
}

function drawCountryTimetable(){
  textSize(12)
  textAlign(CENTER,CENTER);
  var inbetween = 600
  var a = 0
  for(let i =0; i<44; i++){
    var h = map(countryCount3[i],countMin3,countMax3,1,150);
    var s = map(countryMag3[i],magMin3, magMax3,5,30)
    var y1 = y_top+570
    var dd = map(countryDep3[i],depthMin3,depthMax3,5,30)

    var yc = y_top+420+i*25
    var xc = 250
    if(yc >= 1000){
      yc = y_top+420 +a*25
      xc = xc+inbetween
      a = a+1
      if(a>22){
        a=0
      }
    
    }
    //console.log(xc,yc)
    fill(colorNew((countryDep3[i])/20).rgb());
    stroke(colorNew((countryDep3[i])/20).rgb())
    line(xc-100,yc,xc-100-h,yc)
    // fill(255)
    // stroke(255)
    textSize(16)
    text(country3[i],xc+100, yc )
    textSize(10)
    text(countryCount3[i],xc-50,yc)
    text(int(countryMag3[i])+ "/" + int(countryDep3[i]),xc+300,yc)
    //circle(xc+100,yc,s)
    stroke(2)
    ellipse(xc+350, yc, s,dd)
    //arc(xc+100,yc,s,dd,0,180,CHORD)
    
  }
  

}

function drawCircleLoop(){
  for(let i = 0; i<magnitudes1.length; i++){
    noFill()
    strokeWeight(0.7)
    stroke(colorSigMag(magnitudes1[i]).rgb());
    //fill(colorScaleSig(magnitudes[i]).rgb())
    //map the x position to the time
    var dayTime = moment(times1[i])
    var x = 100+ 125*i
    var y = map(magnitudes1[i],magnitudeMin1, magnitudeMax1, y_bot, y_top);
    // map the y position to magnitude
    var w = map(magnitudes1[i],magnitudeMin1,magnitudeMax1,1,70);
    var d = map(depth1[i],depthMin1,depthMax1,2,20)
    //var d = depth[i]
    var g = w/d
    //text(place[i],x,150)
    //console.log(d,g)
    //circle(x,y+50,w)
      for(let o = 0;o < d; o ++){
        circle( x,150, w - g)
        w = w-g
      }
    //fill(255,0,0,100)
    //ellipse(x,y+50,d,10)
    //arc(x,y+50,30,g,0,180,CHORD)
  }
}

function addLables(){
  textAlign(CENTER,CENTER)
  textSize(18)
  for(let i = 0; i<magnitudes1.length; i++){
    fill(colorSigMag(magnitudes1[i]).rgb());
    var x = 90+ 125*i
    text(place1[i],x,210)

  }
}

function drawCountrymd(){
  for(let i = 0; i<countryMag3.length; i++){
    stroke(colorSigMag(countryCount3[i]).rgb());
    //stroke(255)
    var y1 = y_top+570
    var y2 = map(countryDep3[i],depthMin3,depthMax3,0,150) + y1
    var x1 =(1000/country3.length)*i +50
    var s = map(countryMag3[i],magMin3, magMax3,1,12)
    strokeWeight(s)
    line(x1,y1,x1,y2)
    //console.log(x1,y1,y2)

  }
}
function drawUFO(){
  noStroke();
  for(var i=0; i<place1.length; i++){
    fill(colorSig((depth1[i])/15).rgb());
    var x = 100+ 125*i

    // map the y position to magnitude
    //var y = map(magnitudes[i],magnitudeMin, magnitudeMax, y_bot, y_top);
    var w = map(magnitudes1[i],magnitudeMin1,magnitudeMax1,0,100);
    var d = map(depth1[i],depthMin1,depthMax1,50,200)
    var g = gap1[i]
    //arc(x,250,30,w,180,360,CHORD)
    //fill(255,0,0,100)
    ellipse(x,251,w,10)
    stroke(2)
    arc(x,251,w,d,0,180,CHORD)
  }
}

// draw labels "Magnitude" and "Date" next to each of the axes
// function drawAxisLabels(){
//   fill(255);
//   textSize(13);
//   textAlign(CENTER, CENTER);
//   text("Magnitude", 50, (y_top+y_bot)/2);
//   textAlign(CENTER);
//   text("Date", (x_left+x_right)/2, y_bot+40);

// }

// draw labels for magnitude on the left
// function drawMagnitudeLabels(){
//   fill(128);
//   // we increase i by the interval, breaking the values into sections
//   for (var i=magnitudeMin; i<=magnitudeMax; i+=magnitudeInterval){
//     noStroke();
//     textSize(8);
//     textAlign(RIGHT, CENTER);
//     // map y to the plotting surface
//     var y = map(i, magnitudeMin, magnitudeMax, y_bot, y_top);

//     // write value
//     text(floor(i), x_left-10, y);

//     // add visual tick mark
//     stroke(128);
//     strokeWeight(1);
//     line(x_left-4, y, x_left-1, y);
//   }
// }

// draw date labels over the entire range of time
// function drawDateLabels(){
//   textSize(8);
//   textAlign(CENTER);
//   var firstDay = moment(timeMin)
//   var lastDay = moment(timeMax)
//   var totalDays = lastDay.diff(firstDay, 'days') + 1

//   for (var i=0; i<=totalDays; i++){
//     var today = moment(firstDay).add(i, 'days')
//     var x = map(today, timeMin, timeMax, x_left, x_right);
//     strokeWeight(0.5);
//     stroke(240);
//     line(x, y_top,x,y_bot);
//     var dateText = today.format('M/D')
//     noStroke();
//     text(dateText, x,y_bot+15);
//   }
// }
////////////////
// draw place labels over the entire range of time
// function drawPlaceLabels(){
//   textSize(8);
//   textAlign(CENTER);

//   for (let i=0; i< place.length; i++){
//     var x = 100+ 110*i
//     strokeWeight(0.5);
//     stroke(240);
//     text(place[i], x,y_bot+15);
//   }
// }
////////////////
// get the values of a given column as an array of numbers
function columnValues(tableObject, columnName){
  // get the array of strings in the specified column
  var colStrings = tableObject.getColumn(columnName)
  // convert to a list of numbers by running each element through the `float` function
  return _.map(colStrings, _.toNumber)
}
function columnText(tableObject, columnName){
  // get the array of strings in the specified column
  var colStrings = tableObject.getColumn(columnName)
  // convert to a list of numbers by running each element through the `float` function
  return _.map(colStrings, _.toString)
}
// get the maximum value within a column
function columnMax(tableObject, columnName){
    return _.max(columnValues(tableObject, columnName))
}

// get the minimum value within a column
function columnMin(tableObject, columnName){
    return _.min(columnValues(tableObject, columnName))
}
