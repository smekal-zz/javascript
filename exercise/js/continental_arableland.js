(function() {
  d3.json("./includes/arableland_Aggregated_Continent.json", function(err, data) {
    if (err) {
      console.log("Error: " + err);
      return;
    }

    dataViz(data);
  });

  function dataViz(inputData) {

    var margin = {top: 10, right: 50, bottom: 30, left: 80},
        width = 1330 - margin.left - margin.right,
        height = 520 - margin.top - margin.bottom;

    var x = d3.scale.linear().range([0, width], .1);

    x.domain(d3.extent(inputData, function(d) { return d.year; }));

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickPadding(6)
        .tickFormat(d3.format(""));

    var y = d3.scale.linear()
        .range([height, height/1.5 ,  0]);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickPadding(6)
        .tickFormat(d3.format(".2s"));

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.arableland); });    

    var svg = d3.select(".row").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var color = d3.scale.category10();
    color.domain(d3.keys(inputData[0]).filter(function(key) { return key !== "year"; }));

    var continents = color.domain().map(function(name) {
        return {
          name: name,
          values: inputData.map(function(d) {
            return {year: d.year, arableland: +d[name]};
          })
        };
      });

    var yMin = d3.min(continents, function(c) { return d3.min(c.values, function(v) { return v.arableland; }); });
    var yMax = d3.max(continents, function(c) { return d3.max(c.values, function(v) { return v.arableland; }); });
    y.domain([yMin , yMax/5 , yMax]);
        
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -60)
        .style("text-anchor", "end")
        .text("Arable land (in Millions)");

    var continent = svg.selectAll(".continent")
      .data(continents)
      .enter().append("g")
      .attr("class", "continent");

    continent.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });

    continent.append("text")
      .attr("class" , "lineText")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.arableland) + ")"; })
      .attr("x", -55)
      .attr("dy", "-0.4em")
      .text(function(d) { return d.name; });


  }
})();