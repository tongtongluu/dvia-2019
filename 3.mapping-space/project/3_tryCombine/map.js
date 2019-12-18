// created variables
var table1;
var table2;
var mymap;
var x_left, y_top; // top left corner
var x_right, y_bot; // bottom right corner
var magnitudeMin, magnitudeMax;
var timeMin, timeMax;
var times; // an array for the time
var magnitudes; // an array for the magnitude
var depth;
var gap;
var place;
var magnitudeInterval = 1.0;

function preload() {
    table1 = loadTable("data/all_month1.csv", "csv", "header");
    table2 = loadTable("data/all_sig1.csv", "csv", "header");
    console.log(table1,table2)
}

function setup() {
    // setupMap();
    // addSigCircles();
    // addCircles();
    createCanvas(window.innerWidth, window.innerHeight)
    background(0)
    angleMode(CORNERS);
    fill(0)
    noStroke()
    x_left = 50;
    x_right = width - 80;
    y_top = 60;
    y_bot = height- 80;
    rect(x_left, y_top, x_right, y_bot);
    // get the  arrays of interest: 
  times = columnValues(table2, "timestamp")
  magnitudes = columnValues(table2, "mag");
  depth = columnValues(table2,"depth")
  gap = columnValues(table2,"gap")
  place = columnValues(table2,"place_2")
  // get minimum and maximum values for magnitude (rounding up the max value to leave a visual margin at the top)
  magnitudeMin = 0.0;
  magnitudeMax = ceil(columnMax(table2, "mag")) ;
  depthMin = 0;
  depthMax = ceil(columnMax(table2,"depth"));
  

  // the time range should start at 00:00:00 on the first day and end at 23:59:59 on the last day
  timeMin = columnMin(table2, 'timestamp')
  timeMin = moment(timeMin).startOf('day')

  timeMax = columnMax(table2, 'timestamp')
  timeMax = moment(timeMax).endOf('day')

  //draw the title for the current plot
  fill(255);
  textSize(16);
  text("Significant Earthquakes - Past 30 days", x_left, y_top-16);

  // draw the lables for magnitude on the left
  drawMagnitudeLabels();

  // draw the lables for date at the bottom
  drawDateLabels();

  // draw the labels for both axes
  drawAxisLabels();

  // draw the actual points
  drawDataPoints();
  //drawUFO();
  drawCircleLoop();


}



// plot the two data points per row as an x/y coordinate
function drawDataPoints(){
  strokeWeight(5);
  stroke(255,0,0);
  var numberOfShades = 9
  var lowest = place[0]
  var highest = place[9]
  //var palette = Brewer.sequential('BuPu', numberOfShades, lowest, highest)
  //console.log(palette)
  // cycle through array
  for(var i=0; i<times.length; i++){
    //map the x position to the time
    var dayTime = moment(times[i])
    var x = map(dayTime,timeMin, timeMax, x_left, x_right);

    // map the y position to magnitude
    var y = map(magnitudes[i],magnitudeMin, magnitudeMax, y_bot, y_top);
    point(x,y);
  }
}

function drawCircleLoop(){
  strokeWeight(1);
  stroke(255,0, 0);
  noFill();
  for(var i=0; i<times.length; i++){
    //map the x position to the time
    var dayTime = moment(times[i])
    var x = map(dayTime,timeMin, timeMax, x_left, x_right);
    // map the y position to magnitude
    var y = map(magnitudes[i],magnitudeMin, magnitudeMax, y_bot, y_top);
    var w = map(magnitudes[i],magnitudeMin,magnitudeMax,1,50);
    var d = map(depth[i],depthMin,depthMax,2,20)
    //var d = depth[i]
    var g = w/d
    //console.log(d,g)
    //circle(x,y+50,w)
    for(let i = 0; i<window.width; i+50){
      for(let o = 0;o < d; o ++){
        circle(50,i, w - g)
        w = w-g
      }
    }

    //fill(255,0,0,100)
    //ellipse(x,y+50,d,10)
    //arc(x,y+50,30,g,0,180,CHORD)
  }
}

function drawUFO(){
  strokeWeight(1);
  stroke(255,0, 0);
  noFill();
  for(var i=0; i<times.length; i++){
    //map the x position to the time
    var dayTime = moment(times[i])
    var x = map(dayTime,timeMin, timeMax, x_left, x_right);

    // map the y position to magnitude
    var y = map(magnitudes[i],magnitudeMin, magnitudeMax, y_bot, y_top);
    var w = map(magnitudes[i],magnitudeMin,magnitudeMax,0,50);
    var d = map(depth[i],depthMin,depthMax,50,200)
    var g = gap[i]
    arc(x,y+50,30,w,180,360,CHORD)
    fill(255,0,0,100)
    ellipse(x,y+50,d,10)
    arc(x,y+50,30,g,0,180,CHORD)
  }
}

// draw labels "Magnitude" and "Date" next to each of the axes
function drawAxisLabels(){
  fill(255);
  textSize(13);
  textAlign(CENTER, CENTER);
  text("Magnitude", 50, (y_top+y_bot)/2);
  textAlign(CENTER);
  text("Date", (x_left+x_right)/2, y_bot+40);

}

// draw labels for magnitude on the left
function drawMagnitudeLabels(){
  fill(128);
  // we increase i by the interval, breaking the values into sections
  for (var i=magnitudeMin; i<=magnitudeMax; i+=magnitudeInterval){
    noStroke();
    textSize(8);
    textAlign(RIGHT, CENTER);
    // map y to the plotting surface
    var y = map(i, magnitudeMin, magnitudeMax, y_bot, y_top);

    // write value
    text(floor(i), x_left-10, y);

    // add visual tick mark
    stroke(128);
    strokeWeight(1);
    line(x_left-4, y, x_left-1, y);
  }
}

// draw date labels over the entire range of time
function drawDateLabels(){
  textSize(8);
  textAlign(CENTER);

  // what are the beginning and ending dates for our data
  var firstDay = moment(timeMin)
  var lastDay = moment(timeMax)

  // how many days are we plotting total?
  var totalDays = lastDay.diff(firstDay, 'days') + 1

  for (var i=0; i<=totalDays; i++){
    // find the x position for each day
    var today = moment(firstDay).add(i, 'days')
    var x = map(today, timeMin, timeMax, x_left, x_right);

    // draw a line for each day
    strokeWeight(0.5);
    stroke(240);
    line(x, y_top,x,y_bot);

    // convert the timestamp to a text string and print the label on the canvas
    var dateText = today.format('M/D')
    noStroke();
    text(dateText, x,y_bot+15);
  }
}

// get the values of a given column as an array of numbers
function columnValues(tableObject, columnName){
  // get the array of strings in the specified column
  var colStrings = tableObject.getColumn(columnName)
  // convert to a list of numbers by running each element through the `float` function
  return _.map(colStrings, _.toNumber)
}

// get the maximum value within a column
function columnMax(tableObject, columnName){
    return _.max(columnValues(tableObject, columnName))
}

// get the minimum value within a column
function columnMin(tableObject, columnName){
    return _.min(columnValues(tableObject, columnName))
}


function setupMap(){
    

    // create your own map
    mymap = L.map('mapid').setView([51.505, -0.09], 1);
    var baseMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	    subdomains: 'abcd',
	    maxZoom: 19,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZHZpYTIwMTciLCJhIjoiY2o5NmsxNXIxMDU3eTMxbnN4bW03M3RsZyJ9.VN5cq0zpf-oep1n1OjRSEA'
    }).addTo(mymap);
}

function addCircles(){
    // calculate minimum and maximum values for magnitude and depth
    var magnitudeMin = 0.0;
    var magnitudeMax = columnMax(table1, "mag");
    console.log('magnitude range:', [magnitudeMin, magnitudeMax])

    var depthMin = 0.0;
    var depthMax = columnMax(table1, "depth");
    console.log('depth range:', [depthMin, depthMax])

    // step through the rows of the table and add a dot for each event
    for (var i=0; i<table1.getRowCount(); i++){
        var row = table1.getRow(i)

        // skip over any rows where the magnitude data is missing
        if (row.get('mag')==''){
            continue
        }
        

        // create a new dot
        var circle = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
            //color: 'blue',      // the dot stroke color
            fillColor: 'blue', // the dot fill color
            fillOpacity: 0.20,  // use some transparency so we can see overlaps
            radius: row.getNum('mag') * 400
        })

        // place the new dot on the map
        circle.addTo(mymap);
    }
}


//add sig dots
function addSigCircles(){
    // calculate minimum and maximum values for magnitude and depth
    var magnitudeMin = 0.0;
    var magnitudeMax = columnMax(table2, "mag");
    console.log('magnitude range:', [magnitudeMin, magnitudeMax])

    var depthMin = 0.0;
    var depthMax = columnMax(table2, "depth");
    console.log('depth range:', [depthMin, depthMax])

    // step through the rows of the table and add a dot for each event
    for (var i=0; i<table2.getRowCount(); i++){
        var row = table2.getRow(i)

        // skip over any rows where the magnitude data is missing
        if (row.get('mag')==''){
            continue
        }
        

        // create a new dot
        var circleSig = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
            color: 'red',      // the dot stroke color
            fillColor: 'red', // the dot fill color
            fillOpacity: 0.50,  // use some transparency so we can see overlaps
            radius: row.getNum('mag') * 80000
        })

        // place the new dot on the map
        circleSig.addTo(mymap);
    }
}

// removes any circles that have been added to the map
function removeAllCircles(){
    mymap.eachLayer(function(layer){
        if (layer instanceof L.Circle){
            mymap.removeLayer(layer)
        }
    })
}

// get the maximum value within a column
function columnMax(tableObject, columnName){
    // get the array of strings in the specified column
    var colStrings = tableObject.getColumn(columnName);

    // convert to a list of numbers by running each element through the `float` function
    var colValues = _.map(colStrings, float);

    // find the largest value in the column
    return _.max(colValues);
}

// get the minimum value within a column
function columnMin(tableObject, columnName){
    // get the array of strings in the specified column
    var colStrings = tableObject.getColumn(columnName);

    // convert to a list of numbers by running each element through the `float` function
    var colValues = _.map(colStrings, float);

    // find the largest value in the column
    return _.min(colValues);
}
