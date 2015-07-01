/**
 *This class actually expands the grammar and looks up ingredients in the graph and does all the heavy lifting
 * for creating a cocktail.
 * This is 'model' side of the MVC pattern
 *
 * @author Johnathan Pagnutti
 */
define(["inheritance", "./ingredientGraph", "./ingredientTable", "./cocktailGrammar", "./grammarSymbol", "./grammarRule", "./rulesets/rulesets", "./symbolList"], function(Inheritance, IngredientGraph, IngredientTable, CocktailGrammar, GrammarSymbol, GrammarRule, Rulesets, SymbolList) {'use strict';
	/**
	 * Helper function to get a top level parent from a symbol	 *
	 */
	function getTopLevelSymbol(symbol) {
		//FIXME: yes, this function is defined twice.  I'll probably want to fix that at some point.
		var topLevel = symbol;
		while (topLevel.parent) {
			topLevel = topLevel.parent;
		}
		return topLevel;
	};

	var CocktailGenerator = Class.extend({

		init : function() {
			//initalize the two ingredient data structures so we can operate on several ingredient abstraction levels.
			this.ingredientGraph = new IngredientGraph();
			this.ingredientTable = new IngredientTable();
			
			//init our symbol limiters to null, so a bound UI can set them laters.
			this.blacklist = /*new SymbolList();*/ null;
			this.whitelist = /*new SymbolList();*/ null;
			
			var ingredientGraph = this.ingredientGraph;
			var ingredientTable = this.ingredientTable;
			
			//store the cocktail grammars
			this.cocktailGrammars = [];

			//lets generate some axiom symbols
			var oldFashionedAxiom = [];
			oldFashionedAxiom.push(new GrammarSymbol(undefined, "strong", "function", 9));
			oldFashionedAxiom.push(new GrammarSymbol(undefined, "sweet", "function", 1));
			oldFashionedAxiom.push(new GrammarSymbol(undefined, "bitters", "garnishing", 0));

			//axiom for a magraita based cocktail
			var margaritaAxiom = [];
			margaritaAxiom.push(new GrammarSymbol(undefined, "strong", "function", 3));
			margaritaAxiom.push(new GrammarSymbol(undefined, "sweet", "function", 2));
			margaritaAxiom.push(new GrammarSymbol(undefined, "sour", "function", 1));

			//axiom for a white russian based cocktail
			var whiteRussianAxiom = [];
			whiteRussianAxiom.push(new GrammarSymbol(undefined, "strong", "function", 1));
			whiteRussianAxiom.push(new GrammarSymbol(undefined, "sweet", "function", 1));
			whiteRussianAxiom.push(new GrammarSymbol(undefined, "mild", "function", 2));
							
			//axiom for a gin and tonic based cocktail
			var ginAndTonicAxiom = [];
			ginAndTonicAxiom.push(new GrammarSymbol(undefined, "strong", "function", 2));
			ginAndTonicAxiom.push(new GrammarSymbol(undefined, "weak", "function", 1));
			
			//axiom for a martini/manhattan
			var manhattanAxiom = [];
			manhattanAxiom.push(new GrammarSymbol(undefined, "strong", "function", 2));
			manhattanAxiom.push(new GrammarSymbol(undefined, "aromatic-sour", "function", 1));
			
			//axiom for a martini
			var martiniAxiom = [];
			martiniAxiom.push(new GrammarSymbol(undefined, "strong", "function", 4));
			martiniAxiom.push(new GrammarSymbol(undefined, "aromatic-sour", "function", 1));
			
			//axiom for a mui tai
			var muiTaiAxiom = [];
			muiTaiAxiom.push(new GrammarSymbol(undefined, "strong", "function", 4));
			muiTaiAxiom.push(new GrammarSymbol(undefined, "sweet", "function", 3));
			muiTaiAxiom.push(new GrammarSymbol(undefined, "sour", "function", 1));
			
			//axiom for a daquiri
			var daiquiriAxiom = [];
			daiquiriAxiom.push(new GrammarSymbol(undefined, "strong", "function", 2));
			daiquiriAxiom.push(new GrammarSymbol(undefined, "sweet", "function", 1));
			daiquiriAxiom.push(new GrammarSymbol(undefined, "sour", "function", 1));
			
			//axiom for a fizz
			var fizzAxiom = [];
			fizzAxiom.push(new GrammarSymbol(undefined, "strong", "function", 3));
			fizzAxiom.push(new GrammarSymbol(undefined, "sweet", "function", 2));
			fizzAxiom.push(new GrammarSymbol(undefined, "sour", "function", 1));
			fizzAxiom.push(new GrammarSymbol(undefined, "weak", "function", 8));
			
			//as per the new refactoring, we now have a ruleset that goes with an axiom to form a grammar
			var oldFashionedSet = new Rulesets.OldFashionedRules(ingredientTable);
			this.oldFashionedRules = oldFashionedSet.getRuleset();
			
			var margaritaSet = new Rulesets.MargaritaRules(ingredientTable);
			this.margaritaRules = margaritaSet.getRuleset();
			
			var whiteRussianSet = new Rulesets.WhiteRussianRules(ingredientTable);
			this.whiteRussianRules = whiteRussianSet.getRuleset();
			
			var ginAndTonicSet = new Rulesets.GinAndTonicRules(ingredientTable);
			this.ginAndTonicRules = ginAndTonicSet.getRuleset();
			
			var manhattanAndMartiniSet = new Rulesets.ManhattanAndMartiniRules(ingredientTable);
			this.manhattanAndMartiniRules = manhattanAndMartiniSet.getRuleset();
			
			var muiTaiSet = new Rulesets.MuiTaiRules(ingredientTable);
			this.muiTaiRules = muiTaiSet.getRuleset();
			
			var daiquiriSet = new Rulesets.DaiquiriRules(ingredientTable);
			this.daiquiriRules = daiquiriSet.getRuleset();
			
			var fizzSet = new Rulesets.FizzRules(ingredientTable);
			this.fizzRules = fizzSet.getRuleset();
			
			this.cocktailGrammars.push(new CocktailGrammar(oldFashionedAxiom, this.oldFashionedRules));
			this.cocktailGrammars.push(new CocktailGrammar(margaritaAxiom, this.margaritaRules));
			this.cocktailGrammars.push(new CocktailGrammar(whiteRussianAxiom, this.whiteRussianRules));
			this.cocktailGrammars.push(new CocktailGrammar(ginAndTonicAxiom, this.ginAndTonicRules));
			this.cocktailGrammars.push(new CocktailGrammar(manhattanAxiom, this.manhattanAndMartiniRules));
			this.cocktailGrammars.push(new CocktailGrammar(martiniAxiom, this.manhattanAndMartiniRules));
			this.cocktailGrammars.push(new CocktailGrammar(muiTaiAxiom, this.muiTaiRules));
			this.cocktailGrammars.push(new CocktailGrammar(daiquiriAxiom, this.daiquiriRules));
			this.cocktailGrammars.push(new CocktailGrammar(fizzAxiom, this.fizzRules));
		},
		
		/**
		 * Generation method 
		 */
		generate : function(pick){
			
			//just going to keep it at a particular cocktail for right now
			var done;
			var numRerolls = 0;
			do{
				try{
					done = true;	
					var generativeCocktail = this.generateCocktail(pick);
					var valid = this.checkTerminals(generativeCocktail);
					if(!valid){
						throw{
							name : "GeneratorError",
							message : "Cocktail used ingredients that were specified as no-fly by the user"
						};
					}
				}catch (e){
					numRerolls++;	
					console.log(e.message);
					this.resetAxioms();
					done = false;		
					if(e.name !== "GeneratorError"){
						console.log(e);
						throw e;  //TODO: for right now, reroll all errors.  I'll figure out how to fix this laters.
					}
				}
			}while(!done);
			
			this.resetAxioms();
			console.log("=============================");
			console.log("=============================");
			console.log("=============================");
			console.log("=============================");
			console.log("Made a cocktail!");
			console.log(generativeCocktail);	
			console.log("Took: ");
			console.log(numRerolls);
			
			return generativeCocktail;
		},

		/**
		 * Make a new cocktail!
		 */
		generateCocktail : function(pick) {
			//trying the new way out
			var storedCocktail = this.cocktailGrammars[pick].expandNew();
			console.log("The cocktail generated: ");
			console.log(storedCocktail);
			//TODO: handle (in a try catch statement, with maybe a go-to, but don't tell anyone), any errors that get thrown.
			
			//now, we need to flatten the resultant cocktail:
			storedCocktail = this.flattenCocktail(storedCocktail);
			
			return storedCocktail;
		},
		
		/**
		 *Flatten a cocktail, such that the final terms contain all the information needed to make it. 
		 */
		flattenCocktail : function(cocktail){
			//get the top level symbols of all symbols.
			var parents = [];
			for(var i = 0; i < cocktail.length; i++){
				parents.push(getTopLevelSymbol(cocktail[i]));
			}
			
			//consistency check-- we should have the same number of parents that we do symbols
			if(parents.length !== cocktail.length){
				console.log("Parent length: " + parents.length);
				console.log("Cocktail length: " + cocktail.length);
				throw "Badly sized parents.";
			}
			
			//now, for all symbols
			for(var i = 0; i < cocktail.length; i++){
				var curParent = getTopLevelSymbol(cocktail[i]);
				//now, figure out how many symbols share this parent
				var numSimilarParents = 0;
				for(var j = 0; j < parents.length; j++){
					if(parents[j].isTheSame(curParent)){
						numSimilarParents++;
					}
				}
				//now, set the parts number to the parent's number divided by the number of similar parents
				
				cocktail[i].part = curParent.part / numSimilarParents;
			}
			return cocktail;
		},
		
		/**
		 * Lets us reset the values for the axioms because they probably got overwritten.
		 * Tis a hard knock life.
		 */
		resetAxioms : function(){
			this.cocktailGrammars = [];
			
			//lets generate some axiom symbols
			var oldFashionedAxiom = [];
			oldFashionedAxiom.push(new GrammarSymbol(undefined, "strong", "function", 9));
			oldFashionedAxiom.push(new GrammarSymbol(undefined, "sweet", "function", 1));
			oldFashionedAxiom.push(new GrammarSymbol(undefined, "bitters", "garnishing", 0));

			//axiom for a magraita based cocktail
			var margaritaAxiom = [];
			margaritaAxiom.push(new GrammarSymbol(undefined, "strong", "function", 3));
			margaritaAxiom.push(new GrammarSymbol(undefined, "sweet", "function", 2));
			margaritaAxiom.push(new GrammarSymbol(undefined, "sour", "function", 1));
			
			//axiom for a white russian based cocktail
			var whiteRussianAxiom = [];
			whiteRussianAxiom.push(new GrammarSymbol(undefined, "strong", "function", 1));
			whiteRussianAxiom.push(new GrammarSymbol(undefined, "sweet", "function", 1));
			whiteRussianAxiom.push(new GrammarSymbol(undefined, "mild", "function", 2));
			
			//axiom for a gin and tonic based cocktail
			var ginAndTonicAxiom = [];
			ginAndTonicAxiom.push(new GrammarSymbol(undefined, "strong", "function", 2));
			ginAndTonicAxiom.push(new GrammarSymbol(undefined, "weak", "function", 1));
			
			//axiom for a martini/manhattan
			var manhattanAxiom = [];
			manhattanAxiom.push(new GrammarSymbol(undefined, "strong", "function", 2));
			manhattanAxiom.push(new GrammarSymbol(undefined, "aromatic-sour", "function", 1));
			
			//axiom for a martini
			var martiniAxiom = [];
			martiniAxiom.push(new GrammarSymbol(undefined, "strong", "function", 4));
			martiniAxiom.push(new GrammarSymbol(undefined, "aromatic-sour", "function", 1));
			
			//axiom for a mui tai
			var muiTaiAxiom = [];
			muiTaiAxiom.push(new GrammarSymbol(undefined, "strong", "function", 4));
			muiTaiAxiom.push(new GrammarSymbol(undefined, "sweet", "function", 3));
			muiTaiAxiom.push(new GrammarSymbol(undefined, "sour", "function", 1));

			//axiom for a daquiri
			var daiquiriAxiom = [];
			daiquiriAxiom.push(new GrammarSymbol(undefined, "strong", "function", 2));
			daiquiriAxiom.push(new GrammarSymbol(undefined, "sweet", "function", 1));
			daiquiriAxiom.push(new GrammarSymbol(undefined, "sour", "function", 1));
			
			//axiom for a fizz
			var fizzAxiom = [];
			fizzAxiom.push(new GrammarSymbol(undefined, "strong", "function", 3));
			fizzAxiom.push(new GrammarSymbol(undefined, "sweet", "function", 2));
			fizzAxiom.push(new GrammarSymbol(undefined, "sour", "function", 1));
			fizzAxiom.push(new GrammarSymbol(undefined, "weak", "function", 8));
			
			this.cocktailGrammars.push(new CocktailGrammar(oldFashionedAxiom, this.oldFashionedRules));
			this.cocktailGrammars.push(new CocktailGrammar(margaritaAxiom, this.margaritaRules));
			this.cocktailGrammars.push(new CocktailGrammar(whiteRussianAxiom, this.whiteRussianRules));
			this.cocktailGrammars.push(new CocktailGrammar(ginAndTonicAxiom, this.ginAndTonicRules));
			this.cocktailGrammars.push(new CocktailGrammar(manhattanAxiom, this.manhattanAndMartiniRules));
			this.cocktailGrammars.push(new CocktailGrammar(martiniAxiom, this.manhattanAndMartiniRules));
			this.cocktailGrammars.push(new CocktailGrammar(muiTaiAxiom, this.muiTaiRules));
			this.cocktailGrammars.push(new CocktailGrammar(daiquiriAxiom, this.daiquiriRules));
			this.cocktailGrammars.push(new CocktailGrammar(fizzAxiom, this.fizzRules));		
		},
		
		/**
		 * Check terminals for various bugs.  
		 * Right now, that's just a check against the blacklist / whitelist
		 * 
 		 * @param {Object} cocktail a cocktail grammar to check
		 */
		checkTerminals : function(cocktail){
			//check against the whitelist first (its more exclusive)
			if(this.whitelist != null){
				console.log("Checking the terminals in " + cocktail + " against the whitelist.");
				for(var i = 0; i < cocktail.length; i++){
					console.log("Checking: " + cocktail[i].symbol);
					if(!this.whitelist.search(cocktail[i].symbol)){
						return false;
					}
				}
			}
			
			
			if(this.blacklist != null){
				console.log("Checking the terminals in " + cocktail + " against the blacklist.");
				for(var i = 0; i < cocktail.length; i++){
					console.log("Checking: " + cocktail[i].symbol);
					if(this.blacklist.search(cocktail[i].symbol)){
						return false;
					}
				}
			}
			
			return true;
		}
	});

	return CocktailGenerator;
}); 