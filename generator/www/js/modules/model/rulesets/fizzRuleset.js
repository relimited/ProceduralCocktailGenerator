/**
 *The ruleset for a fizz based drink.
 * 
 * YAY FIZZY DRINKS.
 *  
 * 
 * TODO: Unlike most of the other grammars, this one is driven by the weak ingredient.  Which makes this the only grammar that we want 
 * to change the traditional axiom ordering on.  From there, we can get _way_ more expressive with this drink
 */
define(["inheritance", "./ruleset", "./commonRuleset", "../commonSymbols", "../grammarSymbol", "../grammarRule"], function(Inheritance, Ruleset, CommonRuleset, CommonSymbols, GrammarSymbol, GrammarRule){
	var FizzRuleset = Ruleset.extend({
		init : function(ingredientList){
			this._super(ingredientList);
			
			var ingredientTable = this.ingredientTable;
			
			//RULE TIME, MUTHER****
			this.fizzRules = [];
			
			//as per usual, we'll start with strongs.
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "strong", "function", undefined)),
				[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "rum", "ingredient", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "bourbon", "ingredient", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "gin", "ingredient", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "tequila", "ingredient", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "vodka", "ingredient", undefined))],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "rum", "ingredient", undefined)),
				[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "white rum", "expression", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "light rum", "expression", undefined))],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "bourbon", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "bourbon", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "gin", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "gin", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "tequila", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "tequila", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "vodka", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "vodka", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "white rum", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "white rum", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "light rum", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "light rum", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "bourbon", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "bourbon", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "gin", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "dry gin", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "tequila", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "silver tequila", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "vodka", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "vodka", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sweet", "function", undefined)),
				[(new GrammarSymbol(CommonSymbols.genSweetSymbol, "sweet", "ingredient", undefined)),
					[(new GrammarSymbol(CommonSymbols.genSweetSymbol, "sweet", "ingredient", undefined)),
						(new GrammarSymbol(CommonSymbols.genSweetSymbol, "sweet", "ingredient", undefined))]],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sweet", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "simple syrup", "expression", undefined)),
				CommonRuleset.toExpressionsFromIngredients,
				true
			));
			
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sweet", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "simple syrup", "terminal", undefined)),
				(function(grammar, replaceSymbol, defaultSymbol){
					for(var i = 0; i < grammar.length; i++){
						var done = false;
						
						var curSymbol = CommonRuleset.getTopLevelSymbol(grammar[i]);
						if(curSymbol.symbol === replaceSymbol.symbol && grammar[i].type === replaceSymbol.type){
							if(grammar[i].symbol === "cream"){
								throw{
									name: "GeneratorError",
									message: "Unable to use creams for this grammar"
								};
							}
							
							var options = ingredientTable.search(grammar[i].symbol)["type"];
							var ret = CommonRuleset.expandFromPotentials(options, grammar, "juice", grammar[i], "terminal");
							grammar = ret[1];
							done = ret[0];
							
							if(done){
								break;
							}else{
								ret = CommonRuleset.expandFromPotentials(options, grammar, "syrup", grammar[i], "terminal");
								grammar = ret[1];
								done = ret[0];									
								
								if(done){
									break;
								}else{
									throw{
										name: "GeneratorError",
										message: "Unable to expand selected sweet into a juice or syrup"
									};
								}
							}
						}
					}
					
					return grammar;
				}),
				false
			));
			
			//and now onto the sour rules
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sour", "function", undefined)),
				(new GrammarSymbol(CommonSymbols.genSourSymbol, "sour", "ingredient", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sour", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genSourSymbol, "lemon", "expression", undefined)),
				CommonRuleset.toExpressionsFromIngredients,
				true
			));
			
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sour", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genSourSymbol, "lemon juice", "terminal", undefined)),
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
			
			//and finally, the fizzy rules!
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "weak", "function", undefined)),
				(new GrammarSymbol(CommonSymbols.genWeakSymbol, "weak", "ingredient", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "weak", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genWeakSymbol, "weak", "expression", undefined)),
				(function(context, replaceSymbol, defaultSymbol){
					var grammar = context[0];
					
					var choice;
					//alrighty, lets see what kinda strongs we got going on in this here string.
					for(var i=0; i < grammar.length; i++){
						if(grammar[i].symbol === "tequila"){
							var rand = Math.random();
							if(rand < 0.5){
								choice = "seltzer";
							}else{
								choice = "ginger";
							}
							break;
						}else if(grammar[i].symbol === "gin"){
							var rand = Math.random();
							if(rand < 0.33){
								choice = "ginger";
							}else if (rand < 0.66){
								choice = "wine";
							}else{
								choice = "seltzer";
							}
							break;
						}else if(grammar[i].symbol === "vodka"){
							coice = "seltzer";
							break;
						}else if (grammar[i].symbol === "light rum"){
							var rand = Math.random();
							if(rand < 0.5){
								choice = "wine";	
							}else{
								choice = "seltzer";
							}
							break;
						}else if (grammar[i].symbol === "white rum"){
							var rand = Math.random();
							if(rand < 0.5){
								choice = "wine";	
							}else{
								choice = "seltzer";
							}
							break;
						}else if (grammar[i].symbol === "bourbon"){
							var rand = Math.random();
							if(rand < 0.33){
								choice = "wine";
							}else if (rand < 0.66){
								choice = "ginger";
							}else{
								choice = "seltzer";
							}
							break;
						}
					}
					
					//do the actual replacement.
					if(choice === "ginger"){
						var rand = Math.random();
						if(rand < 0.5){
							grammar = CommonRuleset.singleContextFreeReplacement(grammar, replaceSymbol, new GrammarSymbol(CommonSymbols.genWeakSymbol, "ginger beer", "expression", undefined));
						}else{
							grammar = CommonRuleset.singleContextFreeReplacement(grammar, replaceSymbol, new GrammarSymbol(CommonSymbols.genWeakSymbol, "ginger ale", "expression", undefined));
						}
					}else if(choice === "wine"){
						grammar = CommonRuleset.singleContextFreeReplacement(grammar, replaceSymbol, new GrammarSymbol(CommonSymbols.genWeakSymbol, "sparkling wine", "expression", undefined));
					}else if(choice === "seltzer"){
						grammar = CommonRuleset.singleContextFreeReplacement(grammar, replaceSymbol, new GrammarSymbol(CommonSymbols.genWeakSymbol, "seltzer", "expression", undefined));
					}else{
						throw{
							name: "GeneratorError",
							message: "Unable to expand the weak."
						};
					}
					return grammar;
				}),
				true
			));

			//all the terminals
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "ginger ale", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genWeakSymbol, "ginger ale", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "ginger beer", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genWeakSymbol, "ginger beer", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			/**
			 * This one is special-- a fizz only has 4 parts of it's weak, a standard fizzy cocktail has 8 parts.
			 */
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "seltzer", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genWeakSymbol, "seltzer", "terminal", undefined)),
				(function(grammar, replaceSymbol, defaultSymbol){
					var choice = Math.random();
					if(choice > 0.5){
						grammar = CommonRuleset.singleContextFreeReplacement(grammar, replaceSymbol, defaultSymbol);
					}else{
						//we need to do a lineage rewrite here-- rewrite the part amount upstream, then do the symbol replacement
						//so, lets go get a match
						var symbol;
						for(var i = 0; i < grammar.length; i++){
							if(grammar[i].matches(replaceSymbol)){
								symbol = grammar[i];
								//get the top level part of the symbol we're going to replace
								var topLevel = CommonRuleset.getTopLevelSymbol(symbol);
								//and rewrite the part information
								topLevel.part = 4;
								grammar[i] = symbol;
								break;
							}
						}
						
						//now do the silly context thingy
						grammar = CommonRuleset.singleContextFreeReplacement(grammar, replaceSymbol, defaultSymbol);
					}
					
					return grammar;
				}),
				false
			));
			
			this.fizzRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sparkling wine", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genWeakSymbol, "sparkling wine", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			this.ruleset = this.fizzRules;	
		}
	});
	
	return FizzRuleset;
});