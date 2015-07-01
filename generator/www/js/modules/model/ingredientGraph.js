/**
 * The ingredient graph!
 * This is where we insert all ingredients into a graph in order to see which ones work well together
 * The way this works is that edges are an ingredient catagory (like orange or basil) and ingredients that
 * work well together have an edge between them
 * 
 * Thus, by looking for tight cycles in the graph (or even better, tight clusters), we can come up with ingredients that
 * work as a team 
 */
define(["inheritance", "../shared/graph"], function (Inheritance, Graph) {'use strict';
	
	var IngredientGraph = Class.extend({
		
		init : function(){
			this.graph = new Graph();
			this.vertexList;
			this.triangles = [];
							
			//TODO: add in aliasing.  Ogreat/Amaretto is really almond syrup/liqueur, for example.
			//This is the part where we need to build the graph.
			//get ready for the add method spam.
			this.graph.addEdge("grapefruit", ["Campari", "champagne", "coconut", "gin", "vodka", "ginger", "honey", "lemon", "lime", "melon", "mint", "orange", "papaya", "pineapple", "pomegranate", "raspberry", "strawberry", "vanilla"]);
			this.graph.addEdge("kumquat",["cranberry", "strawberry", "cinnamon", "coconut", "ginger", "honey", "lemon", "lime", "mango", "mint", "orange", "papaya", "persimmon", "pineapple", "pomegranate", "rum", "vodka", "vanilla"]);
			this.graph.addEdge("rhubarb", ["apple","raspberry","strawberry","cinnamon","orange","lemon","lime","ginger", "gin","vodka","tequila","mint","plum"]);
			this.graph.addEdge("yuzu",["apricot","carrot","gin","ginger","grapefruit","lemon","mango","orange","vodka"]);
			this.graph.addEdge("cranberry",["almond","apple","cinnamon","Cognac","brandy","vodka","gin","ginger","honey","lemon","lime","orange","maple syrup","peach","pear","pumpkin","vanilla"]);
			this.graph.addEdge("sweet vermouth", ["whiskey","bourbon", "scotch", "rum", "gin", "Campari", "chocolate", "coconut"]);
			this.graph.addEdge("Debonnet", ["whiskey","bourbon", "fig", "cherry"]);
			this.graph.addEdge("dry vermouth", ["gin","vodka", "tomato", "Lillet"]);
			this.graph.addEdge("Lillet", ["gin","vodka", "tomato", "dry vermouth"]);
			this.graph.addEdge("Campari", ["Galliano","grapefruit","orange","pineapple","ginger","lemon","vodka", "gin", "sweet vermouth"]);
			this.graph.addEdge("Cynar", ["orange","dry vermouth","sweet vermouth", "grapefruit"]);
			this.graph.addEdge("amaro", ["strawberry","orange","vodka","brandy"]);
			this.graph.addEdge("cilantro", ["cucumber","ginger","lemon","lime","mint","orange","mango"]);
			this.graph.addEdge("ginger",["apple","apricot","basil","bell pepper","cilantro","coconut","cranberry","fig","grapefruit","lemon","lime","guava","honey","kumquat","lavender","lychee","mango","melon","mint","papaya","passion fruit","pear","plum","pumpkin","raspberry","rhubarb","vanilla"]);
			this.graph.addEdge("blackberry", ["apricot","banana","apple","brandy","honey","lemon","lime","mango","melon","mint","nectarine","peach","orange","raspberry","strawberry","vanilla","watermelon"]);
			this.graph.addEdge("blueberry", ["apricot","banana","blackberry","Cognac","honey","lemon","lime","mango","mint","nectarine","peach","pear","raspberry","rhubarb","watermelon"]);
			this.graph.addEdge("pomegranate", ["apricot","banana","blackberry","Cognac","honey","lemon","lime","mango","mint","nectarine","peach","pear","raspberry","rhubarb","watermelon"]);
			this.graph.addEdge("tomato", ["basil","gin","vodka","tequila","bell pepper","cilantro","cucumber","fennel","ginger","honey","lavender","lemon","lime","mango","mint","orange","pineapple","rosemary","strawberry","watermelon"]);
			this.graph.addEdge("almond", ["brandy","champagne","cherry","Cognac","falernum","fig","lemon","lime","peach","pear","rum"]);
			this.graph.addEdge("apple", ["cinnamon","whiskey","lemon","rum","ginger","vanilla","Cognac","honey","vodka"]);
			this.graph.addEdge("apricot", ["apple","brandy","scotch","blackberry","blueberry","cherry","cinnamon","Cognac","cranberry","lemon","honey","orange","peach","raspberry","rosemary","strawberry"]);
			this.graph.addEdge("banana", ["blueberry","blackberry","brandy","Cognac","cinnamon","coconut","coffee","honey","guava","lemon","lime","mango","papaya","pineapple","rum","raspberry","pomegranate","strawberry","vanilla"]);
			this.graph.addEdge("bell pepper", ["basil","cilantro","ginger","honey","lemon","gin","vodka","lime","mint", "tomato"]);
			this.graph.addEdge("blackberry (wild)", ["tequila","gin","mint","basil","lemon","lime","orange","bourbon","whiskey","cherry","apricot","peach","pineapple"]);
			this.graph.addEdge("cantaloupe", ["basil","ginger","grapefruit","lemon","lime","watermelon","mint","raspberry","champagne"]);
			this.graph.addEdge("carrot", ["apple","basil","gin","vodka","ginger","cinnamon","lemon","lime","orange"]);
			this.graph.addEdge("cherry", ["apricot","brandy","Cognac","whiskey","bourbon","cinnamon","fig","honey","lemon","lime","nectarine","orange","peach","plum","raspberry","vanilla","vodka"]);
			this.graph.addEdge("cinnamon", ["fig","honey","peach","maple syrup","vodka","whiskey","bourbon","scotch","pear","pineapple"]);
			this.graph.addEdge("coconut", ["banana","basil","cilantro","grapefruit","guava","lemon","lime","kiwi","mango","orange","papaya","passion fruit","pineapple","vanilla","strawberry"]);
			this.graph.addEdge("cucumber", ["bell pepper","cilantro","gin","vodka","lemon","lime","melon","watermelon","pineapple","tomato"]);
			this.graph.addEdge("fig", ["almond","apple","cherry","cinnamon","ginger","grape","honey","lavender","lemon","lime","raspberry","mango","mint","orange","pear","vanilla"]);
			this.graph.addEdge("grape", ["apple","brandy","Cognac","honey","mint","lemon","pear","cranberry","raspberry","strawberry"]);
			this.graph.addEdge("guava", ["banana","coconut","ginger","honey","lemon","lime","orange","passion fruit","pineapple","strawberry","rum","vanilla"]);
			this.graph.addEdge("honey", ["almond","apple","apricot","banana","brandy","Cognac","cinnamon","coconut","coffee","red currant","ginger","grapefruit","guava","kiwi","kumquat","lemon","lime","orange","lavender","lychee","melon","mint","papaya","peach","pear","persimmon","plum","pomegranate","pumpkin","rum","rhubarb","tequila","vanilla","whiskey","bourbon","gin","vodka"]);
			this.graph.addEdge("honeydew", ["basil","blackberry","champagne","fig","ginger","grapefruit","honey","lemon","lime","melon","mint","nectarine","peach","strawberry"]);
			this.graph.addEdge("lychee", ["blackberry","blueberry","strawberry","ginger","melon", "kiwi","lemon","lime", "mango","orange","tangerine","pear","pineapple","plum","vodka","raspberry"]);
			this.graph.addEdge("mango", ["banana","bell pepper","cilantro","blackberry","blueberry","strawberry","rum","vodka","pisco","champagne","cinnamon","coconut","ginger","grapefruit","honey","kiwi","kumquat","lemon","lime", "mint","orange","pineapple","passion fruit","papaya","raspberry","strawberry","vanilla","vodka","basil"]);
			this.graph.addEdge("maple syrup", ["banana","apple","apricot","blueberry","whiskey","bourbon","cinnamon","fig","ginger","lemon","lime","nectarine","peach","orange","persimmon","plum","pumpkin","strawberry","raspberry","rum","vanilla"]);
			this.graph.addEdge("nectarine", ["apricot","blackberry","blueberry","strawberry","orange","lemon","lime","cherry","champagne","vodka","ginger","fig","maple syrup","mint","brandy","peach","plum","raspberry","vanilla"]);
			this.graph.addEdge("papaya", ["banana","cilantro","lemon","lime","orange","ginger","grapefruit","kiwi","honey","mango","melon","mint","nectarine","peach","passion fruit","raspberry","strawberry","vanilla","pineapple"]);
			this.graph.addEdge("passion fruit", ["banana","cilantro","lemon","lime","orange","ginger","kiwi","mango","peach","papaya","pear","pineapple","tangerine","rum","strawberry","tequila"]);
			this.graph.addEdge("peach", ["almond","apple","apricot","basil","blueberry","champagne","whiskey","bourbon","blackberry","brandy","rum","cherry","cinnamon","Cognac","red currant","fig","ginger","honey","lavender","mint","lemon", "lime","orange","nectarine","orange","rum","papaya","passion fruit","pineapple","plum","raspberry","strawberry","vanilla"]);
			this.graph.addEdge("pear", ["almond","apple","apricot","bourbon","basil","blackberry","blueberry","brandy","whiskey","champagne","cherry","cinnamon","cranberry","fig","ginger","fennel","honey", "lemon","lime", "orange","maple syrup","mint","passion fruit","plum","rhubarb","rosemary","rum","vanilla"]);
			this.graph.addEdge("pineapple", ["apricot","banana","basil","brandy","rum","cilantro","cinnamon","coconut", "Cognac","ginger","grapefruit","lemon","lime","orange","honey","kiwi","kumquat","mango","mint","papaya","passion fruit","pomegranate","strawberry"]);
			this.graph.addEdge("plum", ["apricot","brandy","cherry","cinnamon","gin","ginger","honey","lavender","nectarine","peach","mint","orange","lemon","lime","raspberry","rum","strawberry","vanilla","whiskey"]);
			this.graph.addEdge("strawberry", ["almond","apricot","banana","blackberry","raspberry","blueberry","brandy", "tequila","rum","gin","vodka","champagne","Chartreuse","cinnamon","chocolate","Cognac","elderflower","ginger","grape","grapefruit","guava","kiwi","lemon","lime","orange","mango","melon","mint","pineapple","plum","pomegranate","rhubarb","vanilla"]);
			this.graph.addEdge("tangerine", ["apricot","banana","Campari","ginger","honey","lavender","lemon","lime","grapefruit","melon","mint","passion fruit","raspberry","pomegranate"]);
			this.graph.addEdge("vanilla", ["apple","apricot","brandy","chocolate","fig","cherry","ginger","honey","lavender","lemon","mint","orange","peach","pear","plum","rhubarb","strawberry","tomato","whiskey","bourbon","scotch"]);
			this.graph.addEdge("watermelon", ["basil","mint","blackberry","blueberry","cilantro","fennel","lemon","lime","orange", "melon","pomegranate","raspberry","tequila","vodka"]);
			this.graph.addEdge("basil", ["strawberry","raspberry","blueberry","blackberry","coconut","cucumber","lemon","lime","mint","nectarine","orange","peach","watermelon","vodka","gin"]);
			this.graph.addEdge("fennel", ["apple","bell pepper","ginger","honey","lemon","lime","mint","orange","pear","tomato","watermelon"]);
			this.graph.addEdge("lavender", ["apple","almond","blackberry","blueberry","cherry","fig","ginger","honey","mint","orange","peach","plum","pear","raspberry","strawberry","vanilla","tangerine"]);
			this.graph.addEdge("kiwi", ["banana","strawberry","blackberry","coconut","grapefruit","honey","lemon","lime","lychee","orange","mango","papaya","pineapple","passion fruit","vodka","rum"]);
			this.graph.addEdge("raspberry", ["apricot","blackberry","blueberry","strawberry","brandy","vodka","champagne","Cognac","fig","grape","grapefruit","honey","lemon","lime"]);
			this.graph.addEdge("lemon", ["rhubarb", "yuzu", "cranberry", "sweet vermouth", "Debonnet", "dry vermouth", "Lillet", "Campari", "Cynar", "amaro", "cilantro", "ginger", "blackberry", "blueberry", "pomegranate", "tomato", "almond", "apple", "apricot", "banana", "bell pepper", "blackberry (wild)", "cantaloupe", "carrot", "cherry", "cinnamon", "coconut", "cucumber", "fig", "grape", "guava", "honey", "honeydew", "lychee", "mango", "maple syrup", "nectarine", "papaya", "passion fruit", "peach", "pear", "pineapple", "plum", "strawberry", "tangerine", "vanilla", "watermelon", "basil", "fennel", "lavender", "mint", "kiwi", "raspberry", "lime", "orange", "mint", "vodka", "whiskey", "brandy", "rum", "tequila", "bourbon", "scotch", "agave"]);
			this.graph.addEdge("lime", ["rhubarb", "yuzu", "cranberry", "sweet vermouth", "Debonnet", "dry vermouth", "Lillet", "Campari", "Cynar", "amaro", "cilantro", "ginger", "blackberry", "blueberry", "pomegranate", "tomato", "almond", "apple", "apricot", "banana", "bell pepper", "blackberry (wild)", "cantaloupe", "carrot", "cherry", "cinnamon", "coconut", "cucumber", "fig", "grape", "guava", "honey", "honeydew", "lychee", "mango", "maple syrup", "nectarine", "papaya", "passion fruit", "peach", "pear", "pineapple", "plum", "strawberry", "tangerine", "vanilla", "watermelon", "basil", "fennel", "lavender", "mint", "kiwi", "raspberry", "lemon", "orange", "mint", "vodka", "whiskey", "brandy", "rum", "tequila", "bourbon", "scotch", "agave"]);
			this.graph.addEdge("mint", ["rhubarb", "yuzu", "cranberry", "sweet vermouth", "Debonnet", "dry vermouth", "Lillet", "Campari", "Cynar", "amaro", "cilantro", "ginger", "blackberry", "blueberry", "pomegranate", "tomato", "almond", "apple", "apricot", "banana", "bell pepper", "blackberry (wild)", "cantaloupe", "carrot", "cherry", "cinnamon", "coconut", "cucumber", "fig", "grape", "guava", "honey", "honeydew", "lychee", "mango", "maple syrup", "nectarine", "papaya", "passion fruit", "peach", "pear", "pineapple", "plum", "strawberry", "tangerine", "vanilla", "watermelon", "basil", "fennel", "lavender", "mint", "kiwi", "raspberry", "lime", "orange", "lemon", "vodka", "whiskey", "brandy", "rum", "tequila", "bourbon", "scotch", "agave"]);
			this.graph.addEdge("orange", ["rhubarb", "yuzu", "cranberry", "sweet vermouth", "Debonnet", "dry vermouth", "Lillet", "Campari", "Cynar", "amaro", "cilantro", "ginger", "blackberry", "blueberry", "pomegranate", "tomato", "almond", "apple", "apricot", "banana", "bell pepper", "blackberry (wild)", "cantaloupe", "carrot", "cherry", "cinnamon", "coconut", "cucumber", "fig", "grape", "guava", "honey", "honeydew", "lychee", "mango", "maple syrup", "nectarine", "papaya", "passion fruit", "peach", "pear", "pineapple", "plum", "strawberry", "tangerine", "vanilla", "watermelon", "basil", "fennel", "lavender", "mint", "kiwi", "raspberry", "lime", "lemon", "mint", "vodka", "whiskey", "brandy", "rum", "tequila", "bourbon", "scotch", "agave"]);
			this.graph.addEdge("cream", ["banana", "chocolate", "mango", "mint", "strawberry", "almond", "cherry", "pineapple", "honey"]);
			this.graph.addEdge("coffee", ["chocolate", "cream", "vanilla"]);
			this.graph.addEdge("chocolate", ["coffee", "vanilla", "cream", "banana", "strawberry", "mint"]);
			this.graph.addEdge("vodka", ["peach", "tomato"]);
			this.graph.addEdge("tequila", ["agave", "grapefruit", "ginger"]);
			this.graph.addEdge("bourbon", ["Debonnet", "fig", "cherry", "mint"]);

			//console.log("==============================");
			//console.log("==============================");
			//console.log("Graph: ");
			//console.log(this.graph);
			//console.log("==============================");
			//console.log("==============================");
		},
				
		/**
		 * Starting from a random point, search the graph for a dense cluster of the provided size
		 *  
 		 * @param {Object} number the amount of nodes in the cluster
		 */
		poll : function (number) {
			if(number <= 0)
				throw "Must poll for at least one element";
			
			var returnVal = [];
			var rand = Math.floor(Math.random() * (this.graph.getVertices().length - 1));
			
			var nextIngredient = this.graph.getVertices()[0];
			returnVal.push(nextIngredient);
			
			for(var i = 1; i < number; i++){
				//generate a list of ingredients I can go from here
				var nextNodes = [];
				var currentNode = this.graph.adjacencyLists[nextIngredient].head;
				while(currentNode){
					nextNodes.push(currentNode.value);
					currentNode = currentNode.next;
				}
				
				var rand2 = Math.floor(Math.random() * nextNodes.length);
				nextIngredient = nextNodes[rand2];
				returnVal.push(nextNodes[rand2]);
			}
			
			return returnVal;
		},
		
		/**
		 * Starting from a given point, search the graph for neighbors.
		 *  
 		 * @param {Object} number the amount of nodes in the cluster
		 */
		pollNeighbors : function (base, number) {
			if(number <= 0)
				throw "Must poll for at least one element";
			
			console.log("Looking for ingredients near:");
			console.log(base);
			//compile options
			var nearbyIngredients = [];
			
			//check the symbol we've passed in-- if it's a two part phrase, than the last word is the ingredient
			if(base.indexOf(" ") > -1){
				base = base.substring(base.lastIndexOf(" ") + 1);
			}
			
			var currentNode = this.graph.adjacencyLists[base].head;
			
			while(currentNode){
				nearbyIngredients.push(currentNode.value);
				currentNode = currentNode.next;
			}
			
			var returnVal = [];
			//get as many nearby options as possible
			for(var i = 0; i < number && i < nearbyIngredients.length - 1; i++){
				var rand = Math.floor(Math.random() * nearbyIngredients.length);
				returnVal.push(nearbyIngredients.splice(rand, 1));
			}
			
			return returnVal;
		},
		
		toString : function () {
			return this.graph.toString();
		},
		
		toJSON : function () {
			return this.graph.toJSON();
		}
	});
	
	return IngredientGraph;
});
