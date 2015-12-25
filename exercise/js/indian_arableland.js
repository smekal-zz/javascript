(function() {
  d3.json("./includes/arableland_India.json", function(err, data) {
    if (err) {
      console.log("Error: " + err);
      return;
    }

    dataViz(data);
  });

  function dataViz(inputData) {

    var inputData = inputData["Arable land (% of land area)"];

    var margin = {top: 10, right: 20, bottom: 40, left: 90},
        width = 1360 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    x.domain(inputData.map(function(d) { return d.year; }));

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var y = d3.scale.linear()
        .range([height, height/2 , 0]);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickPadding(6)
        .tickFormat(d3.format(",.2f%"));

    
    yMax = d3.max(inputData, function(d) { return d.landAreaPercentage; });
    y.domain([0, yMax/1.05 ,yMax] );

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          return "<strong>Land Area (%):</strong> <span style='color:red'>" + d3.format(".5r")(d.landAreaPercentage) + "</span>";
        });

    var svg = d3.select(".row").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);
        
    svg.append("g")
      .attr("class", "x axis")
      .call(xAxis)
      .attr("transform", "translate(0," + height + ")")
      .selectAll("text").style("text-anchor", "end")
      .attr("transform", function(d) {  return "rotate(-45)"}) ;

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -65)
        .style("text-anchor", "end")
        .text("Population (%)");

    svg.selectAll(".bar")
        .data(inputData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.year); })
        .attr("width", 15)
        .attr("y", function(d) { return y(d.landAreaPercentage); })
        .attr("height", function(d) { return height - y(d.landAreaPercentage); })
        .on('mouseover', tip.show)
      .on('mouseout', tip.hide);


  }
})();