(function(){


	d3.json("./includes/resource.json" , function(err , data){
		if(err){
			console.log("Error: "+ err);
			return;
		}
		
		//var extent = d3.extent(data , function(el){ return el.illiterateMales});
		//console.log(extent);
		dataViz(data);
		

});

	function dataViz(inputData){

		// d3.select("body").selectAll("div.cities")
		// .data(inputData)
		// .enter()
		// .append("div")
		// .attr("class" , "cities")
		// .html(function(d,i){return d.areaName});

		var illiterateMalesMax = d3.max(inputData , function(el){ return el.illiterateMales});
		//console.log("illiterateMalesMax :"+ illiterateMalesMax);
		var domainArray = [1200 , illiterateMalesMax];

		// var yScale = d3.scale.linear().domain(domainArray).range([0,100]);
		
		// d3.select("svg")
		// .selectAll("rect")
		// .data(inputData)
		// .enter()
		// .append("rect")
		// .attr("width", 20)
		// .attr("height", function(d) {return yScale(d.illiterateMales);})
		// .style("fill", "blue")
		// .style("stroke", "red")
		// .style("stroke-width", "1px")
		// .style("opacity", .25)
		// .attr("x", function(d,i) {return i * 5;})
		// .attr("y", function(d) {return 100 - yScale(d.illiterateMales);});

		var yScale = d3.scale.linear().domain([ , 24500]).range([0,100]);
		
		d3.select("svg")
		.selectAll("rect")
		.data([14, 68, 24500, 430, 19, 1000, 5555])
		.enter()
		.append("rect")
		.attr("width", 20)
		.attr("height", function(d) {return yScale(d);})
		.style("fill", "blue")
		.style("stroke", "red")
		.style("stroke-width", "1px")
		.style("opacity", .25)
		.attr("x", function(d,i) {return i * 10;})
		.attr("y", function(d) {return 100 - yScale(d);});

	}
}());