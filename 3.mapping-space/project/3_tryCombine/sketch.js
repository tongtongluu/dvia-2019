
function setup() {
  createCanvas(3000,1000);
  background(0);
 




  

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
    var x = 20
    // map the y position to magnitude
    var y = map(magnitudes[i],magnitudeMin, magnitudeMax, y_bot, y_top);
    var w = map(magnitudes[i],magnitudeMin,magnitudeMax,1,10);
    var d = map(depth[i],depthMin,depthMax,2,20)
    //var d = depth[i]
    var g = w/d
    //console.log(d,g)
    //circle(x,y+50,w)
    for(let o = 0;o < d; o ++){
      circle(x,y, w - g)
      w = w-g
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

