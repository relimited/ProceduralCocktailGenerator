// View for showing data from the runner.js
// Right now, the runner is only keeping track of how many symbols each grammar is using
// We can add more things laters

define(["inheritance", "d3"], function(Inheritance, D3){
	
	var testView = Class.extend({
		init : function(parentHolder, creatingUI, data, downloadLink){
			this.parentHolder = parentHolder;
			this.creatingUI = creatingUI;
			this.data = data;
			this.downloadLink = downloadLink;
			this.buildStartingUI();
		},
		
		buildStartingUI : function(){
			var view = this;
				
			this.mainDiv = $("<div />", {
				"class" : "graphsize",
				"id" : "graph_holder"
			});
			
			var runTest = $("<button />", {
				html : "Run Test"
			});
		},
		
		buildMainUI : function(){
			//expose UI
			var view = this;
			
			
			var backButton = $("<button />", {
				html : "Back to App"
			});
			
			backButton.click(function() {
				view.parentHolder.empty();
				view.creatingUI.buildMainUI();
			});
			
			this.parentHolder.append(this.mainDiv);
			this.parentHolder.append(backButton);
			this.parentHolder.append(this.downloadLink);
			
			//d3 things
			//TODO: change some of these hardcoded constants to be derived from CSS stuff
			var margin = {top: 30, right:30, bottom:20, left:40};
			var width = 1280 - margin.left - margin.right, height = 800 - margin.top - margin.bottom;
			
			var xScale = D3.scale.ordinal()
				.rangeBands([0, width], .1);
				
			var yScale = D3.scale.ordinal()
				.rangeRoundBands([0, height], .1);
				
			var xAxis = D3.svg.axis()
				.scale(xScale)
				.ticks(0)
				.orient("bottom");
				
			var yAxis = D3.svg.axis()
				.scale(yScale)
				.ticks(0)
				.orient("left");
			
			var chart = D3.select("#graph_holder").append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
					
			xScale.domain(this.data.map(function(d) { return d.index; }));
			yScale.domain(this.data.map(function(d) { return d.type; }));
			
			var color = D3.scale.linear()
				.domain(xScale.rangeExtent())
				.range(["purple", "white"])
				.interpolate(D3.interpolateLab);
			
			var heatMap = chart.selectAll(".heatmap")
					.data(this.data, function(d) {return d.index + ":" + d.type; })
				.enter().append("svg:rect")
					.attr("x", function(d){ return xScale(d.index); })
					.attr("y", function(d){ return yScale(d.type); })
					.attr("width", function(d) { return xScale.rangeBand(); })
					.attr("height", function(d) { return yScale.rangeBand(); })
					.style("fill", function(d) { return color((d.amount)); })
					.attr("transform", "translate(" + margin.left + ", 0)")
					.append("svg:title").text(function(d){return d.name;});

			
			//chart.append("g")
				//.attr("class", "x axis")
				//.attr("transform", "translate(" + margin.left + "," + height + ")")
				//.call(xAxis);
				
			//chart.append("g")
				//.attr("class", "y axis")
				//.attr("transform", "translate(" + margin.left + ", 0)")
				//.call(yAxis);
				
			chart.append("text")
    			.attr("class", "x label")
    			.attr("text-anchor", "end")
    			.attr("x", width)
    			.attr("y", height + 6)
    			.text("Terminal Symbols");
    			
    		chart.append("text")
    			.attr("class", "y label")
    			.attr("text-anchor", "end")
    			.attr("y", 12)
    			.attr("x", -36)
    			.attr("dy", ".75em")
   				.attr("transform", "rotate(-90)")
    			.text("Cocktail Grammars");
			
		}
	});
	return testView;
});
