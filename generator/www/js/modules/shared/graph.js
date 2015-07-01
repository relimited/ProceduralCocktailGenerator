/**
 * Implementation of an undirected graph
 * 
 * @author Johnathan Pagnutti 
 */
define(["inheritance"], function (Inheritance) {
	/**
	 * A representation of a vertex.  These are nodes
	 * in the linked adjacency lists, so they have a value
	 * and a handle to the next element in their lists. 
	 */
	var Vertex = Class.extend({
		init : function(value) {
			this.value = value;
			this.next = undefined;
		}
	});
	
	/**
	 * The adjacency lists for my graph representation.
	 * Each vertex has a list of nodes that are linked to it 
	 */
	var AdjacencyList = Class.extend({
		
		init : function () {
			this.head = undefined;
			this.tail = undefined;
			this.size = 0;	
		},
		
		/**
		 * Add an element to an ajacency list.  If it's the first
		 * element, it gets added to the head.  Otherwise,  append
		 * it onto the tail. 
		 * 
 		 * @param {Object} value the element to add to the list
		 */
		add : function (value) {
			var vertex = new Vertex(value);
			this.size++;
			
			if(!this.head && !this.tail) {
				this.head = vertex;
			}else{
				this.tail.next = vertex;
			}
			this.tail = vertex;
		},
		
		/**
		 * Remove the element at the head of an ajacency list,
		 * and return it.
		 * Probably should call this pop or something... 
		 */
		remove : function () {
			this.size--;
			var detatched = undefined;
			if (this.head === this.tail) {
				return undefined; 
			} else {
				detached = this.head;
				this.head = this.head.next;
				detached.next = undefined;
				return detachted;
			}
		}
	});
	
	var Graph = Class.extend({
		
		init : function () {
			this.numOfEdges = 0;
			this.adjacencyLists = {};  //yep.  It's an object, rather than an Array.  
		},
		
		/**
		 * Adds an edge from vertex v to vertex w. 
 		 * @param {Object} v the vertex on the tail of the edge
 		 * @param {Object} w the vertex on the front of the edge
 		 * 		if w is a list, then add all edges v to every element in w
 		 * 
 		 * Note: if an edge already exsists in the graph, it is not added in twice
		 */
		addEdge : function (v, w) {
			if(w.pop != undefined){
				var tmp = w.pop();
				this.addEdge(v,tmp);
				if(w.length > 0){
					this.addEdge(v,w);
				}
			} else {
				var edgeAdded = false;
				this.adjacencyLists[v] = this.adjacencyLists[v] || new AdjacencyList();
				this.adjacencyLists[w] = this.adjacencyLists[w] || new AdjacencyList();
				
				if(this.adjacencyLists[v][w] === undefined){
					this.adjacencyLists[v].add(w);
					edgeAdded = true;	
				}
				
				if(this.adjacencyLists[w][v] === undefined){
					this.adjacencyLists[w].add(v);
					edgeAdded = true;	
				}
				
				if(edgeAdded){
					this.numOfEdges++;
				}
			}
		},
		
		/**
		 * Return all the verticies in the graph 
		 */
		getVertices : function () {
			return Object.keys(this.adjacencyLists); //Javascript, you so hacky
		},
		
		/**
		 * Get an interger index of an adjency list 
		 */
		getNodeByAdjIndex : function (i, j){
			throw "this function is not currently implemented";
		},
		/**
		 * toString overloaded for debugging purposes. 
		 */
		toString : function () {
			var returnString = "";
			var adjString = '';
			var currentNode = null;
			var vertices = this.getVertices();
			returnString = vertices.length + " vertices, " + this.numOfEdges + " edges\n";
			for (var i = 0; i < vertices.length; i++) {
				adjString = vertices[i] + ":";
				currentNode = this.adjacencyLists[vertices[i]].head;
				while (currentNode) {
					adjString += " " + currentNode.value;
					currentNode = currentNode.next;
				}
				returnString += adjString + "\n";
				adjString = '';
			}
			console.log(returnString);
			return returnString;
		},
		
		/**
		 * Convert the graph to a JSON representation
		 */
		toJSON : function(){
			var jsonObject = {
				nodes : [],
				links : []
			};
			
			var vertices = this.getVertices();
			for(var i = 0; i < vertices.length; i++){
				jsonObject.nodes.push({"name": vertices[i]});
				currentNode = this.adjacencyLists[vertices[i]].head;
				while(currentNode){
					jsonObject.links.push({"source": vertices[i], "target": currentNode.value, "value":1});
					currentNode = currentNode.next;
				}
			}
			console.log(jsonObject);
			return jsonObject;
		}	
	});
	
	return Graph;
});
