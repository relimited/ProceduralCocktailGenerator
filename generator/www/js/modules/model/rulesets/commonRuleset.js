/**
 * A common ruleset used in many of the drink rulesets.
 * Seperated for modularity.
 * 
 * @author Johnathan Pagnutti 
 */
define(["inheritance", "../grammarSymbol"], function(Inheritance, GrammarSymbol){
	/**
	 * Symbol replacement helper function
	 */
	function expandSymbol(grammar, index, newSymbol) {
		var parentSymbol = grammar.splice(index, 1)[0];
		if (newSymbol.length !== undefined) {
			for (var j = 0; j < newSymbol.length; j++) {
				var finalSymbol = new GrammarSymbol(parentSymbol, newSymbol[j].symbol, newSymbol[j].type, undefined);
				grammar.splice(index + j, 0, finalSymbol);
			}
		} else {
			var finalSymbol = new GrammarSymbol(parentSymbol, newSymbol.symbol, newSymbol.type, undefined);
			grammar.splice(index, 0, finalSymbol);
		}

		return grammar;
	};

	/**
	 * Helper function to get a top level parent from a symbol
	 */
	function getTopLevelSymbol(symbol) {
		var topLevel = symbol;
		while (topLevel.parent) {
			topLevel = topLevel.parent;
		}
		return topLevel;
	};

	/**
	 * Helper function for context sensitive replacement, given a set of options to pick from
	 * Also, generates a symbol that follows the form:
	 * 		symbol-form
	 * 
	 * Returns a list, where the first element is a flag (if this operation actually replaced something) andthe second is the resulting grammar
	 */
	function expandFromPotentials(options, grammar, expression, symbol, type) {
		console.log("Expanding from potentials");
		var done = false;
		for (var j = 0; j < options.length; j++) {
			if (options[j].form == expression) {
				done = true;
				grammar = singleContextFreeReplacement(grammar, symbol, (new GrammarSymbol((new GrammarSymbol(undefined, options[j].funct, undefined, undefined)), symbol.symbol + "-" + options[j].form, type, undefined)));
				break;
			}
		}

		return [done, grammar];
	}

	/**
	 * This is the most basic form of replacement-- no matter what context, replace one symbol with another.
	 * Each instance of replaceSymbol in the current grammar string is replaced with the defaultSymbol.
	 *
	 * If defaultSymbol is a list, then each symbol is added to the grammar after the default symbol is removed
	 */
	function singleContextFreeReplacement(grammar, replaceSymbol, defaultSymbol) {
		//going to add a check in here to allow this to be more flexable-- also checks against potential parents before rocking the
		//replacement by getting top level constructs.

		console.log("Trying simple replacement with some parent information.");
		console.log("Finding a match for: ");
		console.log(replaceSymbol);
		var defSym;
		if(defaultSymbol.length > 0){
				defSym = defaultSymbol[0];
		}else{
			defSym = defaultSymbol;
		}
		
		var defaultTopLevel = getTopLevelSymbol(defSym);
		for (var i = 0; i < grammar.length; i++) {
			if (grammar[i].matches(replaceSymbol)) {
				console.log("Checking Heratiage...");
				var ithTopLevel = getTopLevelSymbol(grammar[i]);
				console.log(ithTopLevel);
				console.log(defaultTopLevel);
				if (ithTopLevel.symbol === defaultTopLevel.symbol) {
					console.log("Match, replacing...");
					grammar = expandSymbol(grammar, i, defaultSymbol);
					break;
				}
			}
		}

		return grammar;
	};

	/**
	 * This is a more complex form of replacement-- no matter what context, replace one symbol with a choice of
	 * others.  This would be our stochastic context free replacement rule.
	 *
	 * In this case, defaultSymbol is a list of ptential expansions, each may or may not be a list of rules.  As of
	 * right now, there is no weighting on this.  For each replace symbol in the grammar, pick a match and go to town.
	 */
	function stochasticContextFreeReplacement(grammar, replaceSymbol, defaultSymbolSet) {
		console.log("Stochastic Replacement does not check lineage.");
		for (var i = 0; i < grammar.length; i++) {
			if (grammar[i].matches(replaceSymbol)) {
				//lets get a random index
				var choice = Math.floor(Math.random() * defaultSymbolSet.length);
				var expansion = defaultSymbolSet[choice];
				grammar = expandSymbol(grammar, i, expansion);
				break;
			}
		}

		return grammar;
	};

	/**
	 * Function to use pulled in data from the graph in order to do things with it.
	 */
	function toExpressionsFromIngredients(argument, replaceSymbol, defaultSymbol) {
		//argument is both the current grammar and the known data.
		var context = argument[0];
		var knownData = argument[1];
		//TODO: this is bad.
		var ingredientTable = argument[2];
		
		console.log("=========================================");
		console.log("Symbol we are trying to expand:");
		console.log(replaceSymbol);
		console.log("Backup:");
		console.log(defaultSymbol);
		console.log("=========================================");
		
		//known data is a list of potential ingredients to expand this symbol into.
		//context is the current symbols in the grammar
		//TODO: enforcing a uniqueness constraint here.  Just be warned when it blows up.
		var done = false;
		var loopChk = 0;
		do {
			loopChk++;
			if (knownData.length <= 0) {
				throw{
					name: "GeneratorError",
					message: "Didn't get enough data, unable to ensure a uniqueness constraint."
				};
			}
			//pick a random choice from the context
			var pick = Math.floor(Math.random() * knownData.length);
			//check to see if the choice is currently being represented in the grammar
			var unique = true;
			for (var i = 0; i < context.length; i++) {
				if (context[i].symbol === knownData[pick]) {
					unique = false;
					knownData.splice(pick, 1);
					break;
				}
			}
			//console the ingredient table for the "unique" element we got, and create a generic parent for it from it's type
			if (unique) {
				console.log("Looking up: ");
				console.log(knownData[pick]);
				var result = ingredientTable.search(knownData[pick])["type"][0];
				console.log("Result:");
				console.log(result);
				//all expressions have the same funct
				//and now the problem looks like simple replacement!
				context = singleContextFreeReplacement(context, replaceSymbol, (new GrammarSymbol((new GrammarSymbol(undefined, result.funct, undefined, undefined)), knownData[pick], "expression", undefined)));
				
				//check to see if we've used the symbol
				for(var j = 0; j < context.length; j++){
					if(knownData[pick] === context[j].symbol){
						//after we've used a symbol, splice it out of the potentials
						knownData.splice(pick, 1);		
					}
				}
			}

			//check to see if we're done
			done = true;
			for (var i = 0; i < context.length; i++) {
				if (context[i].type === replaceSymbol.type && context[i].symbol === replaceSymbol.symbol) {
					done = false;
				}
			}
			if (loopChk > 50) {
				throw{
					name: "GeneratorError",
					message: "Didn't Poll well-- ended up being unable to expand and fell into an infinate loop."
				};
			}
		} while(!done);
		return context;
	};
	
	var CommonRuleset = Class.extend();
	
	CommonRuleset.expandSymbol = expandSymbol;
	CommonRuleset.getTopLevelSymbol = getTopLevelSymbol;
	CommonRuleset.expandFromPotentials = expandFromPotentials;
	CommonRuleset.singleContextFreeReplacement = singleContextFreeReplacement;
	CommonRuleset.stochasticContextFreeReplacement = stochasticContextFreeReplacement;
	CommonRuleset.toExpressionsFromIngredients = toExpressionsFromIngredients;
	
	return CommonRuleset;
});