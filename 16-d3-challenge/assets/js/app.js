// @TODO: YOUR CODE HERE!
// D3js Scatter Plot
// get width of the containing box
var width = parseInt(d3.select("#draw_scatter_plot").style("width"));
// set height of graph
var height = width - width / 3.9;
// margin spacing
var margin = 20;
// space for placing words
var labelArea = 110;
// padding
var txtBottomPadd = 40;
var txtLeftPadd = 40;
// create the actual canvas for the graph
var svg = d3.select("#draw_scatter_plot").append("svg")
  .attr("width", width).attr("height", height).attr("class", "chart");
// set the radius forcircle in graph
var circRadius;
  if (width <= 540) {
    circRadius = 6;
  }
  else {
    circRadius = 11;
  }
// labels for Axes
svg.append("g").attr("class", "xText");
var xAxisTxt = d3.select(".xText");
xAxisTxt.attr(
    "transform",
    "translate(" +
      ((width - labelArea) / 2 + labelArea) +
      ", " +
      (height - margin - txtBottomPadd) +
      ")"
  );
xAxisTxt.append("text").attr("y", -26).attr("data-name", "poverty")
  .attr("data-axis", "x").attr("class", "aText active x").text("In Poverty (%)");
var leftTextX = margin + txtLeftPadd;
var leftTextY = (height + labelArea) / 2 - labelArea;
// label on Y axis
svg.append("g").attr("class", "yText");
var yAxisTxt = d3.select(".yText");
yAxisTxt.attr(
    "transform",
    "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
  );
// append text
yAxisTxt.append("text").attr("y", 26)
  .attr("data-name", "healthcare").attr("data-axis", "y")
  .attr("class", "aText active y").text("Lacks Healthcare (%)");
// get data from csv 
d3.csv("assets/data/data.csv").then(function(data) {
  // show data
  showScatterPlotGraph(data);
});
// def funct
function showScatterPlotGraph(theData) {
  var showXAxisLabel = "poverty";
  var showYAxisLabel = "healthcare";
  // create tooltip 
  var toolTip = d3.tip().attr("class", "d3-tip").offset([40, -60])
    .html(function(d) {

      var xKey;
      //  state name
      var theState = "<div>" + d.state + "</div>";
      var yKeyV = "<div>" + showYAxisLabel + ": " + d[showYAxisLabel] + "%</div>";
     
        xKey = "<div>" + showXAxisLabel + ": " + d[showXAxisLabel] + "%</div>";
      // display
      return theState + xKey + yKeyV;
                     });
  // call toolTip function
  svg.call(toolTip);
    // min function  & max function
  
  var  xMin = d3.min(theData, function(d) {
      return parseFloat(d[showXAxisLabel]) * 0.90;
    });
  var  xMax = d3.max(theData, function(d) {
      return parseFloat(d[showXAxisLabel]) * 1.10;
    });
  var  yMin = d3.min(theData, function(d) {
      return parseFloat(d[showYAxisLabel]) * 0.90;
    });
   var  yMax = d3.max(theData, function(d) {
      return parseFloat(d[showYAxisLabel]) * 1.10;
    });
  // place circles
  var xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin + labelArea, width - margin]);
  var yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    
    .range([height - margin - labelArea, margin]);

  // create axes
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);
    if (width <= 500) {
      xAxis.ticks(5);
      yAxis.ticks(5);
    }
    else {
      xAxis.ticks(10);
      yAxis.ticks(10);
    }
  // show axes
  svg.append("g").call(xAxis).attr("class", "xAxis")
    .attr("transform", "translate(0," + (height - margin - labelArea) + ")");
  svg.append("g").call(yAxis).attr("class", "yAxis")
    .attr("transform", "translate(" + (margin + labelArea) + ", 0)");
  var theCircles = svg.selectAll("g theCircles").data(theData).enter();
  theCircles.append("circle")
    // locaion, size
    .attr("cx", function(d) {
      return xScale(d[showXAxisLabel]);
    }).attr("cy", function(d) {
      return yScale(d[showYAxisLabel]);
    }).attr("r", circRadius).attr("class", function(d) {
      return "stateCircle " + d.abbr;})
    // hover rules
    .on("mouseover", function(d) {
      // Show the tooltip
      toolTip.show(d, this);
      //hHighlight state circle's border
      d3.select(this).style("stroke", "#323232");
    })
    .on("mouseout", function(d) {
      // remove tooltip
      toolTip.hide(d);
      // remove highlight
      d3.select(this).style("stroke", "#e3e3e3");
    });
// show text on circles
  theCircles.append("text")
    // show abbreviation
    .text(function(d) {
      return d.abbr;
    })
    // show text according to scale
    .attr("dx", function(d) {
      return xScale(d[showXAxisLabel]);
    }).attr("dy", function(d) {
      // when the size of the text is the radius, adding a third of the radius to the height pushes it into the middle of the circle
      return yScale(d[showYAxisLabel]) + circRadius / 2.5;
    }).attr("font-size", circRadius).attr("class", "stateText")
    .on("mouseover", function(d) {
      // show  tooltip
      toolTip.show(d);
      d3.select("." + d.abbr).style("stroke", "#323232");
    })
    .on("mouseout", function(d) {
      // remove tooltip
      toolTip.hide(d);
      // remove stroke
      d3.select("." + d.abbr).style("stroke", "#e3e3e3");
    });
}
