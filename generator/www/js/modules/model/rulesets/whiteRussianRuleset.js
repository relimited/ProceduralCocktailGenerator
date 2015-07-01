/**
 * Ruleset for a white russian based cocktail
 * @author Johnathan Pagnutti 
 */

define(["inheritance", "./ruleset", "./commonRuleset", "../commonSymbols", "../grammarSymbol", "../grammarRule"], function(Inheritance, Ruleset, CommonRuleset, CommonSymbols, GrammarSymbol, GrammarRule){
	
	var WhiteRussianRuleset = Ruleset.extend({
		init : function(ingredientTable){
			this._super(ingredientTable);
			
			var ingredientTable = this.ingredientTable;
			
			//gotta define the ruleset that goes white rusians
			this.whiteRussianRules = [];
			//as per above rulesets, lets start with the easy bits
			//well, this is actually more interesting than expected-- drinks from this catagory
			//can ditch the base spirit all together and just become sweet drinkable desert.
			//I hope the codebase is flexable enough to handle a pair of sweet ingredients.
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "strong", "function", undefined)),
				[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "strong'", "function", undefined)), 
					(new GrammarSymbol(CommonSymbols.genSweetSymbol, "sweet'", "function", undefined))],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "strong'", "function", undefined)),
				[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "vodka", "ingredient", undefined)), (new GrammarSymbol(CommonSymbols.genStrongSymbol, "rum", "ingredient", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "brandy", "ingredient", undefined)), (new GrammarSymbol(CommonSymbols.genStrongSymbol, "bourbon", "ingredient", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "scotch", "ingredient", undefined)), (new GrammarSymbol(CommonSymbols.genStrongSymbol, "whiskey", "ingredient", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "gin", "ingredient", undefined))],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			//strong ingredient rules
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "vodka", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "vodka", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "rum", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "dark rum", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "brandy", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "brandy", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "bourbon", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "bourbon", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "scotch", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "scotch", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "whiskey", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "irish whiskey", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "gin", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "genever-style gin", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			//strong based terminals
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "vodka", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "vodka", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "dark rum", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "dark rum", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "brandy", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "brandy", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "bourbon", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "bourbon", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "scotch", "expression", undefined)),
				[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "scotch", "terminal", undefined)), 
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "scotch", "terminal", undefined))],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "irish whiskey", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "whiskey", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "genever-style gin", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "genever-style gin", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));

			//now it gets hard.  Because these drinks allow for friggin' lineage replacement, we need to write that.  Essentally,
			//there is an extra special transform rule from sweet' to a generic sweet expression rule with the generic sweet symbol
			//as a parent.
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sweet'", "function", undefined)),
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "generic-sweet", "ingredient", undefined)),
				(function(grammar, replaceSymbol, defaultSymbol){
					//this is essentally a single context free replacement step, with te added bonus of replacing the lineage of a symbol
					console.log("Simple replacement with a lineage rewrite.");
					console.log("Finding a match for: ");
					console.log(replaceSymbol);
					var defSym;
					if(defaultSymbol.length > 0){
						defSym = defaultSymbol[0];
					}else{
						defSym = defaultSymbol;
					}
		
					var defaultTopLevel = CommonRuleset.getTopLevelSymbol(defaultSymbol);
					for (var i = 0; i < grammar.length; i++) {
						if (grammar[i].matches(replaceSymbol)) {
							var ithTopLevel = CommonRuleset.getTopLevelSymbol(grammar[i]);
							//instead of checking for a match, merge in the part information to the default top level symbol
							defaultTopLevel.part = ithTopLevel.part;
							//instead of expanding the symbol like normal, we're going to outright rewrite it
							grammar[i] = defaultSymbol;
						}
					}
					
					return grammar;
				}),
				false
			));
			
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sweet", "function", undefined)),
				[(new GrammarSymbol(CommonSymbols.genSweetSymbol, "generic-sweet", "ingredient", undefined)), 
					[(new GrammarSymbol(CommonSymbols.genSweetSymbol, "generic-sweet", "ingredient", undefined)), 
						(new GrammarSymbol(CommonSymbols.genSweetSymbol, "sweet''", "function", undefined))]],
				(function(grammar, replaceSymbol, defaultSymbol){
					//yep.  We have an edge case here.  Because a strong element _could_ swap in as a sweet
					//element, we need to see if any other sweet elements exist before expanding.
					
					var numSweet = 0;
					for(var i = 0; i < grammar.length; i++){
						var ithTopLevel = CommonRuleset.getTopLevelSymbol(grammar[i]);
						if(ithTopLevel.symbol === "sweet"){
							numSweet++;
						}
					}
					
					if(numSweet < 2){
						//cool.  Just do stochastic replacement like normal.  Either 1 or 2 sweet elements.
						grammar = CommonRuleset.stochasticContextFreeReplacement(grammar, replaceSymbol, defaultSymbol);	
					}else{
						//we already have one other sweet symbol in the grammar.
						grammar = CommonRuleset.singleContextFreeReplacement(grammar, replaceSymbol, defaultSymbol[0]);
					}
					
					return grammar;
				}),
				true
			));
			
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sweet''", "function", undefined)),
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "generic-sweet", "ingredient", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "generic-sweet", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "chocolate", "expression", undefined)),
				CommonRuleset.toExpressionsFromIngredients,
				true
			));
			
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sweet", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "chocolate-cream", "terminal", undefined)),
				(function(grammar, replaceSymbol, defaultSymbol){
					//for white russian drinks, we want to push more towards creams (which might not be encoded as terminals) and liqueurs
					//above all, stay the fuck away from citrus.
					//There are a few patterns here, the first check is if we have two sweet symbols in the grammar
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
					
					console.log("Potential symbols to replace:");
					console.log(replaceableSymbols);
					
					if(numSweet < 2){
						//we have one sweet symbol.  This is the easiest configuration, we just use a liqueur, creme, cream or, if we can't find any of that
						// a syrup
						var done = false;
						var list = ["liqueur", "creme", "cream"];
						while(list.length > 0){
							if(!done){
								var rand = Math.floor(Math.random() * list.length - 1);
								var choice = list[rand];
							
								if(choice === "liqueur"){
									var options = ingredientTable.search(replaceableSymbols[0].symbol)["type"];
									var ret = CommonRuleset.expandFromPotentials(options, grammar, "liqueur", replaceableSymbols[0], "terminal");
									done = ret[0];
									grammar = ret[1];
								}else if(choice === "creme"){
									var options = ingredientTable.search(replaceableSymbols[0].symbol)["type"];
									var ret = CommonRuleset.expandFromPotentials(options, grammar, "creme", replaceableSymbols[0], "terminal");
									done = ret[0];
									grammar = ret[1];
								}else if(choice === "cream"){
									var options = ingredientTable.search(replaceableSymbols[0].symbol)["type"];
									var ret = CommonRuleset.expandFromPotentials(options, grammar, "cream", replaceableSymbols[0], "terminal");
									done = ret[0];
									grammar = ret[1];
								}
								
								if(!done){
									list.splice(rand, 1);
								}
							}
							
							if(done){
								break;
							}	
						}
						
						//try for a syrup
						if(!done){
							var options = ingredientTable.search(replaceableSymbols[0].symbol)["type"];
							var ret = CommonRuleset.expandFromPotentials(options, grammar, "syrup", replaceableSymbols[0], "terminal");
							done = ret[0];
							grammar = ret[1];
						}
						
						if(!done){
							//unable to expand the second potential
							throw{
								name: "GeneratorError",
								message: "Unable to expand a sweet into a liqueur, cream, creme or syrup"	
							};
						}
					}else{
						//ok, this is where things get tricky.  We have several potenials.  Look for a strong in the grammar
						var strongPresent = false;
						for(var i = 0; i <  grammar.length; i++){
							var ithTopLevel = CommonRuleset.getTopLevelSymbol(grammar[i]);
							if(ithTopLevel.symbol === "strong"){
								strongPresent = true;
								break;
							}
						}
						
						//ok, we have two real options-- either there isn't a strong present and we must use two liqueurs/creams/cremes
						//or there is a strong present and we have the potential to muddle a fruit.
						var choice;
						if(!strongPresent){
							choice = 1;
						}else{
							choice = Math.floor(Math.random() * 2);
						}
						
						if(choice == 0){
							//gonna try to muddle the first potential sweet
							var options = ingredientTable.search(replaceableSymbols[0].symbol)["type"];
							var ret = CommonRuleset.expandFromPotentials(options, grammar, "muddle", replaceableSymbols[0], "terminal");
							var done = ret[0];
							grammar = ret[1];
							
							if(done){
								//pull the above code strategy and try to find something that the second symbol can expnd into
								done = false;
								var list = ["liqueur", "creme", "cream"];
								while(list.length > 0){
									if(!done){
										var rand = Math.floor(Math.random() * list.length - 1);
										var choice = list[rand];
							
										if(choice === "liqueur"){
											var options = ingredientTable.search(replaceableSymbols[1].symbol)["type"];
											var ret = CommonRuleset.expandFromPotentials(options, grammar, "liqueur", replaceableSymbols[1], "terminal");
											done = ret[0];
											grammar = ret[1];
										}else if(choice === "creme"){
											var options = ingredientTable.search(replaceableSymbols[1].symbol)["type"];
											var ret = CommonRuleset.expandFromPotentials(options, grammar, "creme", replaceableSymbols[1], "terminal");
											done = ret[0];
											grammar = ret[1];
										}else if(choice === "cream"){
											var options = ingredientTable.search(replaceableSymbols[1].symbol)["type"];
											var ret = CommonRuleset.expandFromPotentials(options, grammar, "cream", replaceableSymbols[1], "terminal");
											done = ret[0];
											grammar = ret[1];
										}
								
										if(!done){
											list.splice(rand, 1);
										}
									}
							
									if(done){
										break;
									}	
								}
						
								//try for a syrup
								if(!done){
									var options = ingredientTable.search(replaceableSymbols[1].symbol)["type"];
									var ret = CommonRuleset.expandFromPotentials(options, grammar, "syrup", replaceableSymbols[1], "terminal");
									done = ret[0];
									grammar = ret[1];
								}
								
								if(!done){
									//unable to expand the second potential
									throw{
										name: "GeneratorError",
										message: "Unable to expand a sweet into a liqueur,cream,creme or syrup"	
									};
								}		
							}else{
								//couldn't muddle the first ingredient.  Reroll time.
								//FIXME: gotos would be nice here-- I could jump down and try the two liqueur strategy.  But alas, CS common practices.
								throw{
									name: "GeneratorError",
									message:"Unable to muddle ingredient when muddling was selected"	
								};
							}						 
						}else{
							//gonna use two liqueurs
							//pretty streight forward... just lots of code
							var done = false;
							var list = ["liqueur", "creme", "cream"];
							while(list.length > 0){
								if(!done){
									var rand = Math.floor(Math.random() * list.length - 1);
									var choice = list[rand];
							
									if(choice === "liqueur"){
										var options = ingredientTable.search(replaceableSymbols[0].symbol)["type"];
										var ret = CommonRuleset.expandFromPotentials(options, grammar, "liqueur", replaceableSymbols[0], "terminal");
										done = ret[0];
										grammar = ret[1];
									}else if(choice === "creme"){
										var options = ingredientTable.search(replaceableSymbols[0].symbol)["type"];
										var ret = CommonRuleset.expandFromPotentials(options, grammar, "creme", replaceableSymbols[0], "terminal");
										done = ret[0];
										grammar = ret[1];
									}else if(choice === "cream"){
										var options = ingredientTable.search(replaceableSymbols[0].symbol)["type"];
										var ret = CommonRuleset.expandFromPotentials(options, grammar, "cream", replaceableSymbols[0], "terminal");
										done = ret[0];
										grammar = ret[1];
									}
								
									if(!done){
										list.splice(rand, 1);
									}
								}
							
								if(done){
									break;
								}	
							}
						
							//try for a syrup
							if(!done){
								var options = ingredientTable.search(replaceableSymbols[0].symbol)["type"];
								var ret = CommonRuleset.expandFromPotentials(options, grammar, "syrup", replaceableSymbols[0], "terminal");
								done = ret[0];
								grammar = ret[1];
							}
								
							if(done){
								done = false;
								var list = ["liqueur", "creme", "cream"];
								var loopChk;
								while(list.length > 0){
									loopChk++;
									if(loopChk > 50){
										throw{
											name: "GeneratorError",
											message: "Trapped in infinate loop"	
										};
									}
									if(!done){
										var rand = Math.floor(Math.random() * list.length - 1);
										var choice = list[rand];
							
										if(choice === "liqueur"){
											var options = ingredientTable.search(replaceableSymbols[1].symbol)["type"];
											var ret = CommonRuleset.expandFromPotentials(options, grammar, "liqueur", replaceableSymbols[1], "terminal");
											done = ret[0];
											grammar = ret[1];
										}else if(choice === "creme"){
											var options = ingredientTable.search(replaceableSymbols[1].symbol)["type"];
											var ret = CommonRuleset.expandFromPotentials(options, grammar, "creme", replaceableSymbols[1], "terminal");
											done = ret[0];
											grammar = ret[1];
										}else if(choice === "cream"){
											var options = ingredientTable.search(replaceableSymbols[1].symbol)["type"];
											var ret = CommonRuleset.expandFromPotentials(options, grammar, "cream", replaceableSymbols[1], "terminal");
											done = ret[0];
											grammar = ret[1];
										}
									
										if(!done){
											list.splice(rand, 1);
										}
									}
								
									if(done){
										break;
									}	
								}
						
								//try for a syrup
								if(!done){
									var options = ingredientTable.search(replaceableSymbols[1].symbol)["type"];
									var ret = CommonRuleset.expandFromPotentials(options, grammar, "syrup", replaceableSymbols[1], "terminal");
									done = ret[0];
									grammar = ret[1];
								}
								
								if(!done){
									//we tried
									throw{
										name: "GeneratorError",
										message: "Unable to expand a sweet unto a liqueur, cream, creme, or syrup"	
									};
								}
							}else{
								//unable to expand the first the potential
								throw{
									name: "GeneratorError",
									message: "Unable to expand a sweet into a liqueur, cream, creme or syrup"
								}; 
							}
						}
					}
					
					return grammar;
				}),
				true
			));
			
			//mild rules
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "mild", "function", undefined)),
				(new GrammarSymbol(CommonSymbols.genMildSymbol, "generic-mild", "ingredient", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "generic-mild", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genMildSymbol, "cream", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.whiteRussianRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "cream", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genMildSymbol, "heavy cream", "terminal", undefined)),
				(function(grammar, replaceSymbol, defaultSymbol){
					//under most circumstances, we'll want to use half-and-half, but! there doesn't
					//seem to be any hard rules for use of light cream rather than half and half
					//at any rate, when we use two creme liqueurs we'll def use heavy cream
					
					//so, lets see how many creme/cream based liqueurs we have in the grammar
					var cremeLiqueurs = 0;
					for(var i = 0; i < grammar.length; i++){
						if(grammar[i].symbol.indexOf("creme") > -1 || grammar[i].symbol.indexOf("cream") > -1){
							console.log("found...");
							console.log(grammar[i].symbol);
							cremeLiqueurs++;
						}
					}
					
					console.log(cremeLiqueurs);
					//alrighty, lets do this
					if(cremeLiqueurs < 2){
						//use either half and half or light cream
						//weoghted towards half and half
						var repSym = new GrammarSymbol(CommonSymbols.genMildSymbol, "", "terminal", undefined);
						var rand = Math.random();
						if(rand > 0.3){
							repSym.symbol = "half-and-half";
						}else{
							repSym.symbol = "light creme";
						}
						//search for the symbol we want to replace
						for(var i = 0; i < grammar.length; i++){
							//FIXME: didn't not check symbol lineage.  For when it blows up in your face.
							if(grammar[i].matches(replaceSymbol)){
								grammar = CommonRuleset.singleContextFreeReplacement(grammar, grammar[i], repSym);
							}
						}
					}else{
						console.log("using heavy cream");
						//use heavy cream
						//search for the symbol we want to replace
						for(var i = 0; i < grammar.length; i++){
							//FIXME: didn't not check symbol lineage.  For when it blows up in your face.
							if(grammar[i].matches(replaceSymbol)){
								grammar = CommonRuleset.singleContextFreeReplacement(grammar, grammar[i], defaultSymbol);
							}
						}
					}
					
					return grammar;
				}),
				true
			));
			
			this.ruleset = this.whiteRussianRules;
		}
	});
	
	return WhiteRussianRuleset;
});