## Concept
want to create a 3D version
the radius of each swril can be the magnitude, and the deeper the earthquake, the more the circles inside the circle.also the idea of bowls

## Explorations
### used excel
** 1. **
This chart indicates that there rms and horizontal error are highly related with each other
![0](https://github.com/tongtongluu/dvia-2019/blob/master/3.mapping-space/process/explo1.png)

**2.**
Alaska has the most frequency of earthquake
![0](https://github.com/tongtongluu/dvia-2019/blob/master/3.mapping-space/process/explo2.png)

**3. **
latitude can be an interesting finding, but it is hard for me to do any visuals besides map about lat and long
![0](https://github.com/tongtongluu/dvia-2019/blob/master/3.mapping-space/process/explo3.png)


## Design ideas
Map: 
1. bubbles that differentiate from each other with significant ones in red and normal ones in blue.
2. filled the color by depth
3. the stroke color is decided by magnitidu.
4. Also the size of the bubbles represent the magnitude

Visuals:
1. swrils with its radius shows the magnitude, numbers of loops inside shows the depth.
2. Bowls shows the same idea
3. filled the color by depth
4. the stroke color is decided by magnitidu.
5. show the frequency of each places and its earthquake data accordingly
6. need to do some clean of data
![0](https://github.com/tongtongluu/dvia-2019/blob/master/3.mapping-space/process/d3.png)

##  Data processing
Besides magnitude and depth, I want to study the frequency of counties that have earthquake in the past month. 
I create a new variable called "place" that parsed out the last word of the original location as the rough place spot.
for those places that are in the middle of nowhere has no location at all. I reserved the orginal place and hard coded it.
The data can be found in the folder [here](https://github.com/tongtongluu/dvia-2019/blob/master/3.mapping-space/project/data)



## Experiments
When i use timestamp as XY , the earthquakes are overlapped with each other, I need to make the graph very large
![0](https://github.com/tongtongluu/dvia-2019/blob/master/3.mapping-space/process/trys.png)

Also i lost my ideas of map, cannot think any create ways to show earthquake, besides bubbles on the map
The details can be found in the folder 
[visuals](https://github.com/tongtongluu/dvia-2019/blob/master/3.mapping-space/project/1_tryGraph)
[map](https://github.com/tongtongluu/dvia-2019/blob/master/3.mapping-space/project/2_tryMap)
[trycombine](https://github.com/tongtongluu/dvia-2019/blob/master/3.mapping-space/project/3_tryCombine)



## Finals: First Part: swrils
1. each circles represent one significant earthquake in the past month
2. radius as magnitude
3. numbers of loops inside the circle as depth
4. color coded with magnitude(shades of yellow/orange/red)
![0](https://github.com/tongtongluu/dvia-2019/blob/master/3.mapping-space/project/4_FinalProject/final1.png)

Some javascript codes

```
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
```
## Finals: Second Part: bowls: horizontal version(originally they were my UFOs)
1. each bowls represent one significant earthquake in the past month
2. radius as magnitude
3. the depth of the bowls as depth
4. color coded with magnitude(shades of yellow/orange/red)
![0](https://github.com/tongtongluu/dvia-2019/blob/master/3.mapping-space/project/4_FinalProject/final2.png)

```
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

```


## Finals: Third Part: lists of countries and its average mag and dep
1. printed out the top 44 countries/regions
2. lines shows the frequency of earthquake for each country
3. the depth of the ecllipse as depth
4. the width of the ecllipse as magnitude
4. color coded with magnitude(shades of blues)
![0](https://github.com/tongtongluu/dvia-2019/blob/master/3.mapping-space/project/4_FinalProject/final3.png)

```
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
```
## Finals: Fourth Part: map
1. use bubbles
2. color coded with the graph above
3. red-ish as significant
4. blue-ish as normal
3. filled by depth
4.  magnitude decided the stroke
5.  make the significant ones larger to be easier related with the graph below
![0](https://github.com/tongtongluu/dvia-2019/blob/master/3.mapping-space/project/4_FinalProject/final4.png)


## final screen shots
![0](https://github.com/tongtongluu/dvia-2019/blob/master/3.mapping-space/project/4_FinalProject/final_all.png)

