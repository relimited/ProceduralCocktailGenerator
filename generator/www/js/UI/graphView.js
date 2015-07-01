//This is some code for loading in the ingredient graph and viewing it

define(["inheritance", "../modules/model/ingredientGraph", "d3", "fisheye"], function(Inherotance, IngredientGraph, D3, Fisheye){
	var graphView = Class.extend({
		init : function(parentHolder, creatingUI){
			//we probably should never have two entire ingredient graphs in memory.  But, eh, it be what it is.
			this.ingredientGraph = new IngredientGraph();
			this.creatingUI = creatingUI;
			this.parentHolder = parentHolder;
		},
		
		/**
		 * make a make graph button!
		 */
		initUI : function(){
			var view = this;
			
			this.mainDiv = $("<div />", {
				"class" : "appsize",
				"id" : "graph_holder"
			});
			
			this.parentHolder.append(this.mainDiv);
			this.buildMainUI();
		},
		
		buildMainUI : function(){
			//expose UI
			var view = this;
			
			//convert the graph to a json
			var json = this.ingredientGraph.toJSON();
			
			//to link by name, we're going to have to pull in some INSANE javascript from github.  I can't even read this.
			//from: http://stackoverflow.com/questions/23986466/d3-force-layout-linking-nodes-by-name-instead-of-index
			
			var edges = [];
			json.links.forEach(function(e) {
    			var sourceNode = json.nodes.filter(function(n) {
        			return n.name === e.source;
    			})[0],
        			targetNode = json.nodes.filter(function(n) {
            			return n.name === e.target;
        			})[0];

    			edges.push({
        			source: sourceNode,
        			target: targetNode,
        			value: e.value
    			});
			});
			
			//d3 things
			//prototype a moveToFront function
			d3.selection.prototype.moveToFront = function() {
  				console.log("in prototype");
  				var parentNode = this[0].parentNode; //deep magic
  				return this.each(function(){
  					console.log(this);
    				parentNode.appendChild(this);
  				});
			};
			
			var width = this.parentHolder.width(), height = this.parentHolder.height();
			var color = D3.scale.category20();
			//for some stupid reason, D3 doesn't automatically associate a domain.  Do that now.
			var elements = color.range().length;
			var domain = [];
			for(var i = 0; i < elements; i++){
				domain.push(i);
			}
			color.domain(domain);
	
			var force = D3.layout.force()
				.charge(-30)
				.linkDistance(350)
				.size([width, height]);
				
			force.nodes(json.nodes).links(edges).start();
						
			var svg = D3.select("#graph_holder").append("svg")
				.attr("width", width)
				.attr("height", height);
			
			var fisheye = D3.fisheye.circular()
    			.radius(100)
    			.distortion(4);		
			
			var link = svg.selectAll(".link")
				.data(edges)
				.enter().append("line")
					.attr("class", "link")
					.style("stroke-width", function(d) { return d.value * 2;});
						
			var node = svg.selectAll(".node")
      			.data(force.nodes())
    			.enter().append("circle")
      				.attr("class", "node")
      				.attr("r", 5)
      				.style("fill", function(d) { return color(8); }) //TODO: might make this look nicer laters
      				.call(force.drag); 
      			
      		node.append("title")
      			.text(function(d) { return d.name; });

			
  			force.on("tick", function() {
    			link.attr("x1", function(d) { return d.source.x; })
        			.attr("y1", function(d) { return d.source.y; })
        			.attr("x2", function(d) { return d.target.x; })
        			.attr("y2", function(d) { return d.target.y; });

    			node.attr("cx", function(d) { return d.x; })
        			.attr("cy", function(d) { return d.y; });
			});
			
			node.on("click", function(d) {
				
				var relevantLinks = [];
				link.style("stroke", function(l){
					if( d == l.source || d == l.target){
						relevantLinks.push(l);
						return color(5);
					}else{
						return '#999';
					}
				});
				
				//relevantLinks.map(function(l){
					//var sel = d3.select(l);
					//console.log("Selection: ");
					//console.log(sel);
					//sel.moveToFront();
				//});
				
				d3.select(this).style("fill", color(19));
			});
			
			node.on("mouseout", function(){
				link.style("stroke", '#999');
				d3.select(this).style("fill", color(8));
			});
			
			svg.on("mousemove", function(){
				fisheye.focus(D3.mouse(this));
				
				node.each(function(d) { d.fisheye = fisheye(d); })
      				.attr("cx", function(d) { return d.fisheye.x; })
      				.attr("cy", function(d) { return d.fisheye.y; })
      				.attr("r", function(d) { return d.fisheye.z * 4.5; });

  				link.attr("x1", function(d) { return d.source.fisheye.x; })
					.attr("y1", function(d) { return d.source.fisheye.y; })
      				.attr("x2", function(d) { return d.target.fisheye.x; })
      				.attr("y2", function(d) { return d.target.fisheye.y; });
			});
		},
		
		goBack : function(creatingUI){
			this.parentContainer.empty();
			this.creatingUI.buildMainUI();
		}
		
	});
	return graphView;
});
