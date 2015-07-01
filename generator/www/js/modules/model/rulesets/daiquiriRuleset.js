/**
 *This class has the rules to make cocktails like a Daiquiri
 * 
 * This is going to take some explanation-- I'm talking about a classic cocktail here.  The frozen
 * concotion imbibed in New Orleans at a drive through IS NOT what you will get with this grammar. 
 */
define(["inheritance", "./ruleset", "./commonRuleset", "../commonSymbols", "../grammarSymbol", "../grammarRule"], function(Inheritance, Ruleset, CommonRuleset, CommonSymbols, GrammarSymbol, GrammarRule){
	var DaiquiriRuleset = Ruleset.extend({
		init : function (ingredientTable) {
			this._super(ingredientTable);
			
			var ingredientTable = this.ingredientTable;
			
			this.daiquiriRules = [];
			//This is going to be the hardest set of rules so far, probably.
			//There is a distinct focus on floral/herbal ingredients in the 2:1:1 ratio,
			//and that's not something we're focusing on.
			
			//anyway, working on the strongs
			this.daiquiriRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "strong", "function", undefined)),
				[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "apple", "ingredient", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "rum", "ingredient", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "gin", "ingredient", undefined))],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			this.daiquiriRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "apple", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "apple", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.daiquiriRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "rum", "ingredient", undefined)),
				[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "white-rum", "expression", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "light-rum", "expression", undefined))],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			this.daiquiriRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "gin", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "gin", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.daiquiriRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "apple", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "apple-liqueur", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.daiquiriRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "white rum", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "white-rum", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.daiquiriRules.push(new GrammarRule( 
				(new GrammarSymbol(undefined, "light rum", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "light-rum", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.daiquiriRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "gin", "expression", undefined)),
				[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "dry-gin", "terminal", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "genever-gin", "terminal", undefined))],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			//The sweet parts of the cocktail are the most interesting.  We need to allow for simple
			//syrup to get in on the action, despite pure sugar not being a node in the ingredient graph.
			this.daiquiriRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sweet", "function", undefined)),
				[(new GrammarSymbol(CommonSymbols.genSweetSymbol, "sweet", "ingredient", undefined)),
					[(new GrammarSymbol(CommonSymbols.genSweetSymbol, "sweet", "ingredient", undefined)), 
						(new GrammarSymbol(CommonSymbols.genSweetSymbol, "sweet", "ingredient", undefined))]],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			//Ok, so welcome to a rather fun custom rule.
			//if there is already a simple syrup symbol, use the standard to expressions form ignredients rule
			//otherwise, 1/4th the time, use simple syrup.  
			this.daiquiriRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sweet", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "simple syrup", "expression", undefined)),
				(function(context, replaceSymbol, defaultSymbol){
					//get the grammar
					var grammar = context[0];
					var syrupPresent = false;
					for(var i=0; i < grammar.length; i++){
						//do we currently have simple syrup being represented?
						if(grammar[i].symbol === "simple syrup"){
							syrupPresent = true;
							break;
						}
					}
					
					if(syrupPresent){
						grammar = CommonRuleset.toExpressionsFromIngredients(context, replaceSymbol, defaultSymbol);	
					}else{
						var rand = Math.random();
						if(rand <= 0.25){
							grammar = CommonRuleset.singleContextFreeReplacement(grammar, replaceSymbol, defaultSymbol);
						}else{
							grammar = CommonRuleset.toExpressionsFromIngredients(context, replaceSymbol, defaultSymbol);
						}
					}
					
					return grammar;	
				}),
				true
			));
			
			this.daiquiriRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "simple syrup", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "simple-syrup", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.daiquiriRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sweet", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "simple-syrup", "terminal", undefined)),
				(function(grammar, replaceSymbol, defaultSymbol){
					//liquor-syrup-juice
					
					for(var i = 0; i < grammar.length; i++){
						var done = false;
						var curSymbol = CommonRuleset.getTopLevelSymbol(grammar[i]);
						if(curSymbol.symbol === replaceSymbol.symbol && grammar[i].type === replaceSymbol.type){
							//cream check!
							if(grammar[i].symbol === "cream"){
								throw{
									name: "GeneratorError",
									message: "Unable to use creams for this grammar"
								};
							}
							var options = ingredientTable.search(grammar[i].symbol)["type"];
							var ret = CommonRuleset.expandFromPotentials(options, grammar, "liqueur", grammar[i], "terminal");
							grammar = ret[1];
							done = ret[0];
							if(done){
								break;
							}else{
								//syrup?
								var ret = CommonRuleset.expandFromPotentials(options, grammar, "syrup", grammar[i], "terminal");
								done = ret[0];
								grammar = ret[1];
								//done?
								if(done){
									break;
								}else{
									//Juice?
									var ret = CommonRuleset.expandFromPotentials(options, grammar, "juice", grammar[i], "terminal");
									done = ret[0];
									grammar = ret[1];
									//done?
									if(done){
										break;
									}else{
										throw {
											name: "GeneratorError",
											message: "Unable to get ingredients to expand out to juices, liqueurs, or syrups."
										};
									}
								}
							}
						}
					}
					return grammar;
				}),
				true
			));
			
			//and now for the sour rules
			this.daiquiriRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sour", "function", undefined)),
				(new GrammarSymbol(CommonSymbols.genSourSymbol, "sour", "ingredient", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.daiquiriRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sour", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genSourSymbol, "lemon", "expression", undefined)),
				CommonRuleset.toExpressionsFromIngredients,
				true
			));
			
			this.daiquiriRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sour", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genSourSymbol, "lemon-juice", "terminal", undefined)),
				(function(grammar, replaceSymbol, defaultSymbol){
					//try to expand to a juice.  If we can't, reroll
					for(var i = 0; i < grammar.length; i++){
						var curSymbol = CommonRuleset.getTopLevelSymbol(grammar[i]);
						if(curSymbol.symbol === replaceSymbol.symbol && grammar[i].type === replaceSymbol.type){
							var options = ingredientTable.search(grammar[i].symbol)["type"];
							var ret = CommonRuleset.expandFromPotentials(options, grammar, "juice", grammar[i], "terminal");
							grammar = ret[1];
							if(ret[0]){
								break;
							}else{
								throw{
									name: "GeneratorError",
									message: "Unable to expand selected sour into a juice"
								};
							}
						}
					}
					
					return grammar;
				}),
				false
			));
			
			this.ruleset = this.daiquiriRules;
		}
	});
	
	return DaiquiriRuleset;
});