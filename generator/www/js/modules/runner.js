//A set of controls to run each grammar a zillion times and get the data back
//This is gonna make JavaScript cry.

define(["inheritance"],function(Inheritance){
	
	var runner = Class.extend({
		
		init : function(generator){
			this.boundGenerator = generator;
			this.collectedData = [];
			
			this.cocktailList = [];
		},
		
		//Fire off a test run.  Generate ALL the cocktails!
		run : function(numPerGrammar){
			this.curDataRange = numPerGrammar;
			
			for(var i = 0; i < 9; i++){
				if(i == 4){
					//skip Manhattans.
					continue;
				}
				
				var j = 0;
				var unique = 0;
				while(j < numPerGrammar){
					var curCocktail = this.boundGenerator.generate(i);
					for(var k = 0; k < curCocktail.length; k++){
						var foundSymbol = false;
						for(var l = 0; l < this.collectedData.length; l++){
							if(this.collectedData[l].name == curCocktail[k].symbol && this.collectedData[l].type == i){
								this.collectedData[l].amount++;
								foundSymbol = true;
								break;
							}
						}
						
						if(!foundSymbol){
							unique++;
							this.collectedData.push({"type" : i, "index" : unique, "name" : curCocktail[k].symbol, "amount" : 1});
						}
					}
					j++;
				}
			}
			
			//build up a master list of all ingredient names
			var nameList = [];
			for(var i = 0; i < this.collectedData.length; i++){
				var seenName = false;
				for (var j = 0; j < nameList.length; j++){
					if(nameList[j] === this.collectedData[i].name){
						seenName = true;
					}
					
					if(seenName){
						break;
					}
				}
				
				if(!seenName){
					nameList.push(this.collectedData[i].name);
				}
			}
			
			console.log("Master Listing: ");
			console.log(nameList);
			
			//we also want to go through and compare this master list with the ingredient table to find holes in the graph
			var differenceList = [];
			var masterIngredientList = this.boundGenerator.ingredientTable.list;
			for(var i = 0; i < nameList.length; i++){
				var foundIngredient = false;
				var nameType = "";
				var functType = "";
				if(nameList[i].indexOf("-") > -1){
					nameType = nameList[i].substring(0, nameList[i].indexOf("-"));
					functType = nameList[i].substring(nameList[i].indexOf("-") + 1, nameList[i].length);
				}else{
					nameType = nameList[i];
				}
				
				for(var j = 0; j < masterIngredientList.length; j++){
					if(nameType === masterIngredientList[j].type){
						if(functType !== "" && functType === masterIngredientList[j].form){
							foundIngredient = true;
							break;
						}else if(functType === ""){
							foundIngredient = true;
							break;
						}
					}	
				}
				
				if(!foundIngredient){
					differenceList.push(nameList[i]);
				}
			}
			
			console.log("Things in cocktails not in terminal table: ");
			console.log(differenceList);
			
			var inverseDifferenceList = [];
			//and the reverse
			for(var i = 0; i < masterIngredientList.length; i++){
				var foundIngredient = false;
				var construction = "";
				if(masterIngredientList[i].type === "rum" || masterIngredientList[i].type === "bourbon" || 
					masterIngredientList[i].type === "whiskey" || masterIngredientList[i].type === "brandy" || 
					masterIngredientList[i].type === "scotch" || masterIngredientList[i].type === "tequila" || 
					masterIngredientList[i].type === "gin" || masterIngredientList[i].type === "vodka"){
					construction = masterIngredientList[i].type;
				}else{
					construction = masterIngredientList[i].type + "-" + masterIngredientList[i].form;
				}
				
				for(var j = 0; j < nameList.length; j++){
					if(construction === nameList[j]){
						foundIngredient = true;
					}
				}
				
				if(!foundIngredient){
					inverseDifferenceList.push(construction);	
				}
			}
			
			console.log("Things in terminal table not in cocktails: ");
			console.log(inverseDifferenceList);
			
			//ok, break this master ingredient list into seperate lists based on type
			//compile...
			var sortingCollection = [[],[],[],[],[],[],[]];
			sortingCollection.push([]);		//weird Javascript hack
			for(var i = 0; i < this.collectedData.length; i++){
				var typeIndex = this.collectedData[i].type;
				if(typeIndex >= 4){
					typeIndex = typeIndex - 1;
				}

				sortingCollection[typeIndex].push(this.collectedData[i]);
			}
			
			//add any missing names to each collection as symbols that have amount 0.  
			for(var i = 0; i < sortingCollection.length; i++){
				for(var j = 0; j < nameList.length; j++){
					var seenSymbol = false;
					for(var k = 0; k < sortingCollection[i].length; k++){
						if(sortingCollection[i][k].name === nameList[j]){
							seenSymbol = true;
						}
						
						if(seenSymbol){
							break;
						}
					}
					
					if(!seenSymbol){
						var type = i;
						if(type >= 4){
							type = type + 1;
						}
						
						sortingCollection[i].push({"type" : type, "index" : sortingCollection[i].length, "name" : nameList[j], "ammount": 0});
					}
				}
			}
			
			//sort...
			for(var i = 0; i < sortingCollection.length; i++){
				sortingCollection[i] = sortingCollection[i].sort(function(element1, element2){
					return element1.name.localeCompare(element2.name);
				});
				
				//reindex
				for(var j = 0; j < sortingCollection[i].length; j++){
					sortingCollection[i][j].index = j;
				}
			}
			
			//build
			var sortedListing = [];
			for(var i = 0; i < sortingCollection.length; i++){
				for(var j = 0; j < sortingCollection[i].length; j++){
					sortedListing.push(sortingCollection[i][j]);
				}
			}
			
			console.log(sortedListing);
			return sortedListing;
		}
	});
	
	return runner;
});
