  (function() {

      d3.json("./includes/total-literacy-resource.json", function(err, data) {
          if (err) {
              console.log("Error: " + err);
              return;
          }

          dataViz(data);
      });

      function dataViz(inputData) {

          

          var width = 1300,
              height = 500,
              radius = Math.min(width, height) / 2;

          var color = d3.scale.ordinal()
              .range(["#98abc5", "#7b6888", "#a05d56", "#ff8c00"]);

          var arc = d3.svg.arc()
              .outerRadius(radius - 10)
              .innerRadius(0);

          var labelArc = d3.svg.arc()
              .outerRadius(radius - 40)
              .innerRadius(radius - 40);

          var pie = d3.layout.pie()
              .sort(null)
              .value(function(d) {
                  return d.population;
              });

          var svg = d3.select(".row").append("svg")
              .attr("width", width)
              .attr("height", height)
              .append("g")
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

          var g = svg.selectAll(".arc")
              .data(pie(inputData))
              .enter().append("g")
              .attr("class", "arc");

          g.append("path")
              .attr("d", arc)
              .style("fill", function(d) {
                  return color(d.data.category);
              });

          g.append("text")
              .attr("id", "categoryText")
              .attr("transform", function(d) {
                  return "translate(" + labelArc.centroid(d) + ")";
              })
              .attr("dy", ".35em")
              .text(function(d) {
                  return d.data.category + " :" + d.data.population;
              });

      }

  })();