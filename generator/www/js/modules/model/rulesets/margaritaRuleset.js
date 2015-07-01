/**
 * Ruleset for margarita based rules
 * @author Johnathan Pagnutti 
 */
define(["inheritance", "./ruleset", "./commonRuleset", "../commonSymbols", "../grammarSymbol", "../grammarRule"], function(Inheritance, Ruleset, CommonRuleset, CommonSymbols, GrammarSymbol, GrammarRule){
	var MargaritaRuleset = Ruleset.extend({
		
		init : function(ingredientList){
			this._super(ingredientList);
			
			var ingredientTable = this.ingredientTable;
			//and rules for it
			this.margaritaRules = [];
			this.margaritaRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "strong", "function", undefined)),
				[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "vodka", "ingredient", undefined)), 
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "tequila", "ingredient", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "brandy", "ingredient", undefined)), 
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "bourbon", "ingredient", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "rum", "ingredient", undefined))],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			this.margaritaRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "vodka", "ingredient", undefined)), 
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "vodka", "expression", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
				
			this.margaritaRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "tequila", "ingredient", undefined)), 
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "tequila", "expression", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
				
			this.margaritaRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "bourbon", "ingredient", undefined)), 
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "bourbon", "expression", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
				
			this.margaritaRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "rum", "ingredient", undefined)), 
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "rum", "expression", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
				
			this.margaritaRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "brandy", "ingredient", undefined)), 
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "brandy", "expression", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
				
			this.margaritaRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "vodka", "expression", undefined)), 
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "vodka", "terminal", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
				
			this.margaritaRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "tequila", "expression", undefined)), 
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "tequila", "terminal", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
				
			this.margaritaRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "bourbon", "expression", undefined)), 
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "bourbon", "terminal", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
				
			this.margaritaRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "rum", "expression", undefined)), 
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "rum", "terminal", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
				
			this.margaritaRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "brandy", "expression", undefined)), 
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "brandy", "terminal", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
			
			this.margaritaRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sweet", "function", undefined)), 
				[(new GrammarSymbol(CommonSymbols.genSweetSymbol, "generic-sweet", "ingredient", undefined)), 
					[(new GrammarSymbol(CommonSymbols.genSweetSymbol, "generic-sweet", "ingredient", undefined)), 
						(new GrammarSymbol(CommonSymbols.genSweetSymbol, "sweet'", "function", undefined))]], 
				CommonRuleset.stochasticContextFreeReplacement, 
				false));
			this.margaritaRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sweet'", "function", undefined)), 
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "generic-sweet", "ingredient", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
			
			this.margaritaRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sour", "function", undefined)), 
				(new GrammarSymbol(CommonSymbols.genSourSymbol, "generic-sour", "ingredient", undefined)), 
				CommonRuleset.singleContextFreeReplacement, 
				false));
				
			this.margaritaRules.push(new GrammarRule(
				(new GrammarSymbol (undefined, "sour", "expression", undefined)),
				(new GrammarSymbol (undefined, "lemon juice", "terminal", undefined)),
				(function(grammar, replaceSymbol, defaultSymbol){
					//this is actually going to be pretty easy.  Just pick a juice expansion, baring that, a liqueur expansion,
					//baring that, just whatever the goddamn thing can expand into.
					//TODO: expand logic here
					for(var i = 0; i < grammar.length; i++){
						var curSymbol = CommonRuleset.getTopLevelSymbol(grammar[i]);
						if(curSymbol.symbol === replaceSymbol.symbol && grammar[i].type === replaceSymbol.type){
							var options = ingredientTable.search(grammar[i].symbol)["type"];
							var ret = CommonRuleset.expandFromPotentials(options, grammar, "juice", grammar[i], "terminal");
							grammar = ret[1];
							if(ret[0]){
								break;
							}else{
								ret = CommonRuleset.expandFromPotentials(options, grammar, "liqueur", grammar[i], "terminal");
								grammar = ret[1];
								if(ret[0]){
									break;
								}else{
									//TODO: as we've done in other edge cases-- reroll rather than expand into something that doesn't quite fit
									throw{
										name: "GeneratorError",
										message: "Unable to expand selected sour, reroll."
									};
								}
							}
						}
					}
					return grammar;
				}),
				false
			));
			this.margaritaRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "generic-sweet", "ingredient", undefined)), 
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "simple syrup", "expression", undefined)), 
				CommonRuleset.toExpressionsFromIngredients, 
				true
			));
			this.margaritaRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "generic-sour", "ingredient", undefined)), 
				(new GrammarSymbol(CommonSymbols.genSourSymbol, "lemon", "expression", undefined)), 
				CommonRuleset.toExpressionsFromIngredients, 
				true
			));
			//time for the individual expression rules of margarita-ish drinks.  Strongs always express themselves, sours seem pretty basic (stick with juice if you can)
			//sweets, for this ratio, are gonna get hard.
			this.margaritaRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sweet", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "orange liqueur", "terminal", undefined)),
				(function(grammar, replaceSymbol, defaultSymbol){
					//so, the context senstative expression rule for the magarita based drink is as such:
					//If we've selected for two sweet based components, we have three ways of expressing those components.
					//1) 2 liqueuers
					//2) 1 liqueuer, 1 juice
					//3) 1 liqueuer, 1 syrup
					//so, first things first, lets see how many sweet derivites we have
					var numSweet = 0;
					var replaceableSymbols = [];
					console.log("Matching against: ");
					console.log(replaceSymbol);
					for(var i = 0; i < grammar.length; i++){
						var curSymbol = CommonRuleset.getTopLevelSymbol(grammar[i]);
						if(curSymbol.symbol === replaceSymbol.symbol && grammar[i].type === replaceSymbol.type){
							numSweet++;
							replaceableSymbols.push(grammar[i]);
						}
					}

					console.log("Symbols this rule can replace: ");
					console.log(replaceableSymbols);
					
					//do we have more than one?
					if(numSweet > 1){
						//so, the first option always expands into a liqueur
						//TODO: I can probably refactor this with the else statement down there....
						//attempt to expand the first symbol into a liqueur...
						var firstOptions = ingredientTable.search(replaceableSymbols[0].symbol)["type"];
						var ret = CommonRuleset.expandFromPotentials(firstOptions, grammar, "liqueur", replaceableSymbols[0], "terminal");
						done = ret[0];
						grammar = ret[1];
							
						if(done){
							//ok, lets make a choice
							var pick = Math.floor(Math.random() * 3);
							var loopChk = 0;
							do{
								loopChk++;
								switch(pick){
									case 0:
										var secondOptions = ingredientTable.search(replaceableSymbols[1].symbol)["type"];
										ret = CommonRuleset.expandFromPotentials(secondOptions, grammar, "liqueur", replaceableSymbols[1], "terminal");
										done = ret[0];
										grammar = ret[1];
								
										//ok, so a lot could have happened.
										if(done){
											//both the first and second symbol successfully expanded.  Yay!  Just return
											break;
 										}else{
 											//the first symbol successfully expanded, but the second one didn't.
 											pick = (pick + 1) % 3; //so, try another option
											break;				
 										}
									case 1:
										var secondOptions = ingredientTable.search(replaceableSymbols[1].symbol)["type"];
										ret = CommonRuleset.expandFromPotentials(secondOptions, grammar, "juice", replaceableSymbols[1], "terminal");
										done = ret[0];
										grammar = ret[1];
								
										//ok, so a lot could have happened.
										if(done){
											//both the first and second symbol successfully expanded.  Yay!  Just return
											break;
 										}else{
 											//the first symbol successfully expanded, but the second one didn't.
 											pick = (pick + 1) % 3; //so, try another option
											break;				
 										}
									case 2:
										var secondOptions = ingredientTable.search(replaceableSymbols[1].symbol)["type"];
										ret = CommonRuleset.expandFromPotentials(secondOptions, grammar, "syrup", replaceableSymbols[1], "terminal");
										done = ret[0];
										grammar = ret[1];
								
										//ok, so a lot could have happened.
										if(done){
											//both the first and second symbol successfully expanded.  Yay!  Just return
											break;
 										}else{
 											//the first symbol successfully expanded, but the second one didn't.
 											pick = (pick + 1) % 3; //so, try another option
											break;				
 										}
									default:
										throw new Error("Invalid Choice.");
								}
								if(loopChk > 50){
									throw{
										name: "GeneratorError",
										message: "Trapped in a forever loop."	
									};
								}
							}while(!done);
						}else{
							//The first symbol couldn't expand out to a liqueur.  I'm not really sure what to do here, so I'll fail
							//and we'll see how long it takes for me to recover.
							throw{
								name: "GeneratorError",
								message: "Unable to start swaps, first term didn't expand well."	
							};
						}
					}else if(numSweet == 0){
						//our work here is done?
						return grammar;
					}else{
						//we don't.  So, lets take the one symbol that pattern matches and expand it into a liqueur.
						var options = ingredientTable.search(replaceableSymbols[0].symbol)["type"];
						var ret = CommonRuleset.expandFromPotentials(options, grammar, "liqueur", replaceableSymbols[0], "terminal");
						var done = ret[0];
						grammar = ret[1];
						if(done){
							return grammar;
						}else{
							//if we can't, then append on the triple sec default and hope that this sucker can either expand into a juice
							//or a syrup.
							//TODO: if we need to pull the backup, right now we're overwriting an ingredient, which might look weird
							//if we ever need to see the middle of the chain.
							console.log("Firing backup");
							grammar = CommonRuleset.singleContextFreeReplacement(grammar, replaceableSymbols[0], defaultSymbol);
						}
					}
					
					return grammar;	
				}),
				true
			));
			
			this.ruleset = this.margaritaRules;
		}
	});
	
	return MargaritaRuleset;
});
