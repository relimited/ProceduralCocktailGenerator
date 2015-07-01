/**
 *The ruleset for a Mui Tai based cocktail
 * 
 * @author Johnathan Pagnutti 
 */

define(["inheritance", "./ruleset", "./commonRuleset", "../commonSymbols", "../grammarSymbol", "../grammarRule"], function(Inheritance, Ruleset, CommonRuleset, CommonSymbols, GrammarSymbol, GrammarRule){
	var MuiTaiRuleset = Ruleset.extend({
		init : function(ingredientTable) {
			this._super(ingredientTable);
			
			var ingredientTable = this.ingredientTable;
			
			this.muiTaiRules = [];
			//starting with the strong rules as per usual
			this.muiTaiRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "strong", "function", undefined)),
				[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "rum'", "function", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "tequila'", "function", undefined))],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			//This looks grosser than it is.
			//rum' can either expand into 1 rum, 2 rums, 3 rums.
			//look, man, these drinks have a lot of rum.
			this.muiTaiRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "rum'", "function", undefined)),
				[[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "rum", "ingredient", undefined))],
					[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "rum", "ingredient", undefined)), 
						(new GrammarSymbol(CommonSymbols.genStrongSymbol, "rum", "ingredient", undefined))],
					[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "rum", "ingredient", undefined)), 
						(new GrammarSymbol(CommonSymbols.genStrongSymbol, "rum", "ingredient", undefined)),
						(new GrammarSymbol(CommonSymbols.genStrongSymbol, "rum", "ingredient", undefined))]],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			//I dunno about this...
			this.muiTaiRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "tequila'", "function", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "tequila", "ingredient", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.muiTaiRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "tequila", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "tequila", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.muiTaiRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "rum", "ingredient", undefined)),
				[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "dark rum", "expression", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "light rum", "expression", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "spiced rum", "expression", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "gold rum", "expression", undefined))],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			this.muiTaiRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "tequila", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "tequila", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.muiTaiRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "dark rum", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "dark rum", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.muiTaiRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "light rum", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "light rum", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.muiTaiRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "gold rum", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "gold rum", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.muiTaiRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "spiced rum", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "spiced rum", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			//now, onto sweet rules
			this.muiTaiRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sweet", "function", undefined)),
				[[(new GrammarSymbol(CommonSymbols.genSweetSymbol, "sweet", "ingredient", undefined)),
						(new GrammarSymbol(CommonSymbols.genSweetSymbol, "sweet", "ingredient", undefined))],
					[(new GrammarSymbol(CommonSymbols.genSweetSymbol, "sweet", "ingredient", undefined)),
						(new GrammarSymbol(CommonSymbols.genSweetSymbol, "sweet", "ingredient", undefined)),
						(new GrammarSymbol(CommonSymbols.genSweetSymbol, "sweet", "ingredient", undefined))]],
				CommonRuleset.stochasticContextFreeReplacement,
				false	
			));
			
			//The true test of my old assumptions lies here.  May the dream be real.
			this.muiTaiRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sweet", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "almond", "expression", undefined)),
				CommonRuleset.toExpressionsFromIngredients,
				true
			));
			
			//Ok, so for the special rule under the mui tai is that we want to have at least one syrup
			//or liqueur.
			//There is one acceptable cream, and that is coconut.
			this.muiTaiRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sweet", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "almond-syrup", "terminal", undefined)),
				(function(grammar, replaceSymbol, defaultSymbol){
					var loopChk = 0;
					for(var i = 0; i < grammar.length; i++) {
						
						//let us break out of loops that are probably infinate
						loopChk++;
						var done = false;
						
						var topLevel = CommonRuleset.getTopLevelSymbol(grammar[i]);
						//compare against the top level symbol and low level type
						if(topLevel.symbol == replaceSymbol.symbol && grammar[i].type == replaceSymbol.type) {
							//get potential expansions
							var options = ingredientTable.search(grammar[i].symbol)["type"];
							//ok, so we have a candidate symbol and potential expansions, we now check context
							var containsSyrupOrLiqueur = false;
							for (var j = 0; j < grammar.length; j++){
								if(!containsSyrupOrLiqueur){
									if(grammar[j].type == "terminal" && grammar[j].symbol.indexOf("syrup") > -1){
										containsSyrupOrLiqueur = true;
										break;
									}
								}
								//check for liqueur too
								if(!containsSyrupOrLiqueur){
									if(grammar[j].type == "terminal" && grammar[j].symbol.indexOf("liqueur") > -1){
										containsSyrupOrLiqueur = true;
										break;
									}
								}
							}
							
							if(containsSyrupOrLiqueur){
								//we already have a cream or a liqueur, so we no longer give any fucks.
								//try to expand into one of the 4 potential expansions
								//TODO: the ordering here is just me picking one that prioritizes the
								//non-liqueur non-syrup options.
								var ret = CommonRuleset.expandFromPotentials(options, grammar, "puree", grammar[i], "terminal");
								done = ret[0];
								grammar = ret[1];
								//done?
								if(done){
									continue;
								}else{
									//NOPE. Juice?
									var ret = CommonRuleset.expandFromPotentials(options, grammar, "juice", grammar[i], "terminal");
									done = ret[0];
									grammar = ret[1];
									//done?
									if(done){
										continue;
									} else { 
										//Still a giant can of nothing.  Liqueur?
										var ret = CommonRuleset.expandFromPotentials(options, grammar, "liqueur", grammar[i], "terminal");
										done = ret[0];
										grammar = ret[1];
										//done?
										if(done){
											continue;
										} else {
											//LAST CHANCE... syrup?
											var ret = CommonRuleset.expandFromPotentials(options, grammar, "syrup", grammar[i], "terminal");
											done = ret[0];
											grammar = ret[1];
											//done?
											if(done){
												continue;
											} else {
												// I DON'T EVEN KNOW HOW YOU DID THIS
												throw {
													name: "GeneratorError",
													message: "Unable to get ingredients to expand out to purees, juices, liqueurs, or syrups."
												};
											}
										}						
									}
								}
							//yeah, probably not the smoothest way to code the chain, but whelp, it happened.
							//TODO: fix this.  Someday.
							} else {
								//ok, so we don't have either a syrup or a liqueur, and we need one.  Try to expand into either of those, and fail if we
								//can't.
								//liqueur?
								var ret = CommonRuleset.expandFromPotentials(options, grammar, "liqueur", grammar[i], "terminal");
								done = ret[0];
								grammar = ret[1];
								//done?
								if(done){
									continue;
								} else {
									// soooooooo, syrup?
									var ret = CommonRuleset.expandFromPotentials(options, grammar, "syrup", grammar[i], "terminal");
									done = ret[0];
									grammar = ret[1];
									//done?
									if(done){
										continue;
									} else {
										//TODO: a couple of options here-- we can try to fall back on almonds, sugar or just fail.
										//I'm gonna have it fail hard here, because that fits more of what other things are doing.
										throw {
											name: "GeneratorError",
											message: "Unable to get ingredients to expand out into either a liqueur or a syrup"
										};
									}
								}
							}
							if (loopChk > 50) {
								throw "Trapped in a functional loop.";
							}
						}	
					}
					return grammar;
				}),
				true
			));
			
			//Luckly, the sours are WAY easier than the sweets.  We only deal with lemon and lime juice
			//due to all the sweets.
			this.muiTaiRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sour", "function", undefined)),
				(new GrammarSymbol(CommonSymbols.genSourSymbol, "sour", "ingredient", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.muiTaiRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sour", "ingredient", undefined)),
				[(new GrammarSymbol(CommonSymbols.genSourSymbol, "lemon", "expression", undefined)),
					(new GrammarSymbol(CommonSymbols.genSourSymbol, "lime", "expression", undefined))],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			this.muiTaiRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "lemon", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genSourSymbol, "lemon-juice", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.muiTaiRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "lime", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genSourSymbol, "lime-juice", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.ruleset = this.muiTaiRules;
			
		}
		
	});

	return MuiTaiRuleset;
});