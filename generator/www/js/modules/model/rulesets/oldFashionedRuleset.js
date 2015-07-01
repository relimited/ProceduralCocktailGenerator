/**
 *The ruleset for an old fashioned based cocktail
 * 
 * @author Johnathan Pagnutti 
 */

define(["inheritance", "./ruleset", "./commonRuleset", "../commonSymbols", "../grammarSymbol", "../grammarRule"], function(Inheritance, Ruleset, CommonRuleset, CommonSymbols, GrammarSymbol, GrammarRule){
	var OldFashionedRuleset = Ruleset.extend({
		init : function(ingredientTable) {
			this._super(ingredientTable);
			
			var ingredientTable = this.ingredientTable;
						
			this.oldFashionedRules = [];
			this.oldFashionedRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "strong", "function", undefined)), //symbol pattern to replace
				[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "whiskey", "ingredient", undefined)), 
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "gin", "ingredient", undefined)), 
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "rum", "ingredient", undefined)), 
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "scotch", "ingredient", undefined)), 
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "bourbon", "ingredient", undefined))], //symbol to replace the pattern with
				CommonRuleset.stochasticContextFreeReplacement, //replacement function
				false	//context sensativity flag
			));
			
			this.oldFashionedRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "whiskey", "ingredient", undefined)), 
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "whiskey", "expression", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
			
			this.oldFashionedRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "gin", "ingredient", undefined)), 
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "gin", "expression", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
			
			this.oldFashionedRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "rum", "ingredient", undefined)), 
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "rum", "expression", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
				
			this.oldFashionedRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "scotch", "ingredient", undefined)), 
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "scotch", "expression", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
				
			this.oldFashionedRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "bourbon", "ingredient", undefined)), 
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "bourbon", "expression", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
				
			this.oldFashionedRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "whiskey", "expression", undefined)), 
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "whiskey", "terminal", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
				
			this.oldFashionedRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "gin", "expression", undefined)), 
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "gin", "terminal", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
				
			this.oldFashionedRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "rum", "expression", undefined)), 
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "rum", "terminal", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
				
			this.oldFashionedRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "scotch", "expression", undefined)), 
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "scotch", "terminal", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
				
			this.oldFashionedRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "bourbon", "expression", undefined)), 
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "bourbon", "terminal", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
				
			this.oldFashionedRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sweet", "function", undefined)), 
				[(new GrammarSymbol(CommonSymbols.genSweetSymbol, "generic-sweet", "ingredient", undefined)), 
					[(new GrammarSymbol(CommonSymbols.genSweetSymbol, "generic-sweet", "ingredient", undefined)), 
					(new GrammarSymbol(CommonSymbols.genSweetSymbol, "sweet'", "function", undefined))]], 
				CommonRuleset.stochasticContextFreeReplacement, 
				false));
				
			this.oldFashionedRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sweet'", "function", undefined)), 
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "generic-sweet", "ingredient", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
				
			this.oldFashionedRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "simple syrup", "expression", undefined)), 
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "simple syrup", "terminal", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
				
			this.oldFashionedRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "bitters", "garnishing", undefined)), 
				[(new GrammarSymbol(undefined, "Peychaud's Bitters", "terminal", undefined)), 
					(new GrammarSymbol(undefined, "Angostura Bitters", "terminal", undefined))], 
				CommonRuleset.stochasticContextFreeReplacement, 
				false));

			//time for the tricky-er context sensative rule.  I'm going to define this inline, because aparently I hate myself
			this.oldFashionedRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "generic-sweet", "ingredient", undefined)), 
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "simple syrup", "expression", undefined)), 
				CommonRuleset.toExpressionsFromIngredients, 
				true));

			//context sensative rule-- this one is for expressing sweet ingredients
			//doesn't use outside knowledge, and as written, the algorithm is going to have a strong preference towards flavored
			//syrups.  Just making a note here when I get irritated about that laters.
			//this shows how to use a multi-part terminal
			//note the more generic replacement symbol.  This is why we piggyback a function into the arguments.
			this.oldFashionedRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sweet", "expression", undefined)), 
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "simple syrup", "terminal", undefined)), 
				(function(grammar, replaceSymbol, defaultSymbol) {
					var loopChk = 0;
					//iterate through the grammar, getting the root function of the various expression level symbols still left in the list
					for (var i = 0; i < grammar.length; i++) {
						loopChk++;
						var done = false;
						//allow for us to break out of logic.
						var topLevel = CommonRuleset.getTopLevelSymbol(grammar[i]);
						//compare against the top level symbol and the low level type
						if (topLevel.symbol == replaceSymbol.symbol && grammar[i].type == replaceSymbol.type) {
							//get the potentials for this symbol
							var options = ingredientTable.search(grammar[i].symbol)["type"];
							//now we need to scan the grammar to see if it has any qualities which influence how this symbol should expand.
							var containsSyrup = false;
							//if the grammar already contains a syrup terminal, then we don't want to expand
							for (var j = 0; j < grammar.length; j++) {
								if (grammar[j].type == "terminal" && grammar[j].symbol.indexOf("syrup") > -1) {
									containsSyrup = true;
									break;
								}
							}
							if (containsSyrup) {
								//we want to try to expand this symbol to a muddle of sorts.
								var ret = CommonRuleset.expandFromPotentials(options, grammar, "muddle", grammar[i], "terminal");
								done = ret[0];
								grammar = ret[1];
								//check to see if we're done
								if (done) {
									continue;
								} else {
									//we couldn't expand this symbol into a muddle symbol.  Try to expand into a syrup symbol to keep
									//the sweet part of the cocktail sweet
									var ret = CommonRuleset.expandFromPotentials(options, grammar, "syrup", grammar[i], "terminal");
									done = ret[0];
									grammar = ret[1];
									//check to see if we're done
									if (done) {
										continue;
									} else {
										throw{
											name: "GeneratorError",
											message: "Unable to get ingredients to expand out to syrups or muddles, giving up..."
										}; 
									}
								}
							} else {
								//the cocktail in question doesn't contain a syrup terminal.  Try to get the current symbol to expand to a
								//syrup terminal, and if we can't then bust out our fallback
								var ret = CommonRuleset.expandFromPotentials(options, grammar, "syrup", grammar[i], "terminal");
								done = ret[0];
								grammar = ret[1];
								if (done) {
									continue;
								} else {
									//debugger;
									console.log("Firing backup.");
									//go with the backup
									done = true;
									grammar = CommonRuleset.singleContextFreeReplacement(grammar, grammar[i], [defaultSymbol, grammar[i]]);
								}
							}
						}
						
						if (loopChk > 50) {
							throw{
								name: "GeneratorError",
								message: "Trapped in a Functional loop."
							};
						}
					}
					return grammar;
				}), true //this is the loneliest statement of all.
			));
			
			this.ruleset = this.oldFashionedRules;
		}
	});

	return OldFashionedRuleset;
});