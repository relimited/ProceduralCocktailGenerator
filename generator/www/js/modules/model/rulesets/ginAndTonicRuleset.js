/**
 * Ruleset for a gin and tonic cocktail
 * 
 * Note that the gin and tonic ruleset really wants to have logic for infusing stongs, which is not something I've written yet.
 * Sadly.
 * @author Johnatan Pagnutti 
 */
define(["inheritance", "./ruleset", "./commonRuleset", "../commonSymbols", "../grammarSymbol", "../grammarRule"], function(Inheritance, Ruleset, CommonRuleset, CommonSymbols, GrammarSymbol, GrammarRule){

	var GinAndTonicRuleset = Ruleset.extend({
		
		init : function(ingredientList){
			this._super(ingredientList);
			
			var ingredientTable = this.ingredientTable;
			
			//lets rock some rules
			this.ginAndTonicRules = [];
			
			//as per other rulesets, lets start with strongs
			
			//so, because fuck me, the ratio here also applies to things like amaretto sours.  Which means that the strong part of the cocktail
			//can shift to a sweet.
			//but we don't want to do this if there is already a sweet symbol in the grammar
			//and when we transition over to a sweet, we need to replace the heratige on the strong symbol.  Because fuck me.
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "strong", "function", undefined)),
				[(new GrammarSymbol(CommonSymbols.genSweetSymbol, "sweet", "function", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "strong'", "function", undefined))],
				(function(grammar, replaceSymbol, defaultSymbol){
					console.log("Default Symbol:");
					console.log(defaultSymbol);
					//so, there is a lot of logic here.  First, we need to check to make sure that there is not already a sweet symbol in the string
					var numSweet;
					for(var i = 0; i < grammar.length; i++){
						if(grammar[i].symbol === "sweet"){
							numSweet++;
						}
					}
					
					//if we have any sweet symbols, expand into a strong and we're done.  Otherwise, we'll either expand into a sweet
					//and do heriarchy replacement, or we'll expand into a strong
					if(numSweet > 0){
						//we have a sweet.  Expand into a strong.
						grammar = CommonRuleset.singleContextFreeReplacement(grammar, replaceSymbol, defaultSymbol[1]);
					}else{
						//we don't have a sweet.  Time to make a choice!
						var pick = Math.floor(Math.random() * defaultSymbol.length);
						switch(pick){
							case 0:
								//do heriarchy replacement and expand into a sweet
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
								
								console.log("Replace Symbol:");
								console.log(defSym);
		
								var defaultTopLevel = CommonRuleset.getTopLevelSymbol(defSym);
								for (var i = 0; i < grammar.length; i++) {
									if (grammar[i].matches(replaceSymbol)) {
										var ithTopLevel = CommonRuleset.getTopLevelSymbol(grammar[i]);
										//instead of checking for a match, merge in the part information to the default top level symbol
										defaultTopLevel.part = ithTopLevel.part;
										//instead of expanding the symbol like normal, we're going to outright rewrite it
										grammar[i] = defSym;
									}
								}
								break;
							case 1:
								//expand into a strong
								grammar = CommonRuleset.singleContextFreeReplacement(grammar, replaceSymbol, defaultSymbol[pick]);
								break;
							default:
								throw "Invalid choice";
								break;
						}
					}
					return grammar;
				}),
				true
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "strong'", "function", undefined)),
				[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "gin", "ingredient", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "vodka", "ingredient", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "tequila", "ingredient", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "rum", "ingredient", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "bourbon", "ingredient", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "scotch", "ingredient", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "whiskey", "ingredient", undefined))], //FUCK ME THAT'S A LOT OF POTENTIALS
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "gin", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "gin", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "vodka", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "vodka", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "tequila", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "tequila", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "rum", "ingredient", undefined)),
				[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "dark rum", "expression", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSmbol, "light rum", "expression", undefined))],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "bourbon", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "bourbon", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "scotch", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "scotch", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "whiskey", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "whiskey", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "gin", "expression", undefined)),
				[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "Dry Gin", "terminal", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "Plymouth Gin", "terminal", undefined))],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "vodka", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "vodka", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "tequila", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "tequila", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "dark rum", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "dark rum", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "light rum", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "light rum", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "bourbon", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "bourbon", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "scotch", "expression", undefined)),
				[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "scotch", "terminal", undefined)),
					[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "blended scotch", "terminal", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "Lowland scotch", "terminal", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "Speyside scotch", "terminal", undefined))]],
				(function(grammar, replaceSymbol, defaultSymbol){
					//So, the first thing we need to do is check to see if we're just using soda water
					var sodaWater = false;
					for(var i = 0; i < grammar.length; i++){
						if(grammar[i].symbol === "soda water" || grammar[i].symbol === "club soda" || grammar[i].symbol === "seltzer"){
							sodaWater = true;
							break;
						}
					}
					
					//if we're just using soda water, then use the generic scotch terminal as the extra smokiness from other scotches will only help us.
					if(sodaWater && grammar.length < 3){
						grammar = CommonRuleset.singleContextFreeReplacement(grammar, replaceSymbol, defaultSymbol[0]);
					}else{
						//otherwise, we need to pick one of the more mild scotches and use it as a replacement symbol
						grammar = CommonRuleset.stochasticContextFreeReplacement(grammar, replaceSymbol, defaultSymbol[1]);
					}
					
					return grammar;
				}),
				true
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "whiskey", "expression", undefined)),
				[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "whiskey", "terminal", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "Canadian whiskey", "terminal", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "Japanese whiskey", "terminal", undefined))],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			//now onto the weak rules
			//the weak symbol can change into a sour symbol or a sweet symbol or expand as a mild symbol
			//and yes, this has generational replacement
			//joy		
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "weak", "function", undefined)),
				[(new GrammarSymbol(CommonSymbols.genWeakSymbol, "weak'", "function", undefined)),
					(new GrammarSymbol(CommonSymbols.genSourSymbol, "sour", "function", undefined)),
					(new GrammarSymbol(CommonSymbols.genSweetSymbol, "sweet", "function", undefined))],
				(function(grammar, replaceSymbol, defaultSymbol){
					
					console.log("Default Symbol:");
					console.log(defaultSymbol);
					//if the strong symbol has already expanded into a sweet, this symbol will expand into a sour
					//AMARETTO SOURS!
					var sweetPresent = false;
					for(var i = 0; i < grammar.length; i++){
						if(grammar[i].symbol === "sweet"){
							sweetPresent = true;
							break;
						}
					}
					
					if(sweetPresent){
						//do heriarchy replacement and expand into a sour
						//this is essentally a single context free replacement step, with te added bonus of replacing the lineage of a symbol
						console.log("Simple replacement with a lineage rewrite.");
						console.log("Finding a match for: ");
						console.log(replaceSymbol);
						var defSym = defaultSymbol[1];
		
						var defaultTopLevel = CommonRuleset.getTopLevelSymbol(defSym);
						for (var i = 0; i < grammar.length; i++) {
							if (grammar[i].matches(replaceSymbol)) {
								var ithTopLevel = CommonRuleset.getTopLevelSymbol(grammar[i]);
								//instead of checking for a match, merge in the part information to the default top level symbol
								defaultTopLevel.part = ithTopLevel.part;
								//instead of expanding the symbol like normal, we're going to outright rewrite it
								grammar[i] = defSym;
							}
						}
					}else{
						//otherwise, it's a toss up between any of the three symbols
						var pick = Math.floor(Math.random() * defaultSymbol.length);
						
						if(pick == 0){
							// no lineage rewrite
							grammar = CommonRuleset.singleContextFreeReplacement(grammar, replaceSymbol, defaultSymbol[pick]);
						}else{
							// lineage rewrite
							//this is essentally a single context free replacement step, with te added bonus of replacing the lineage of a symbol
							console.log("Simple replacement with a lineage rewrite.");
							console.log("Finding a match for: ");
							console.log(replaceSymbol);
							var defSym = defaultSymbol[pick];
							
							var defaultTopLevel = CommonRuleset.getTopLevelSymbol(defSym);
							for (var i = 0; i < grammar.length; i++) {
								if (grammar[i].matches(replaceSymbol)) {
									var ithTopLevel = CommonRuleset.getTopLevelSymbol(grammar[i]);
									//instead of checking for a match, merge in the part information to the default top level symbol
									defaultTopLevel.part = ithTopLevel.part;
									//instead of expanding the symbol like normal, we're going to outright rewrite it
									grammar[i] = defSym;
								}
							}							
						}
					}
					
					return grammar;
				}),
				true
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "weak'", "function", undefined)),
				[(new GrammarSymbol(CommonSymbols.genWeakSymbol, "generic weak", "ingredient", undefined)),
					[(new GrammarSymbol(CommonSymbols.genWeakSymbol, "generic weak", "ingredient", undefined)),
						(new GrammarSymbol(CommonSymbols.genSweetSymbol, "generic sweet'", "ingredient", undefined))]],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "generic weak", "ingredient", undefined)),
				[(new GrammarSymbol(CommonSymbols.genWeakSymbol, "soda water", "expression", undefined)),
					(new GrammarSymbol(CommonSymbols.genWeakSymbol, "club soda", "expression", undefined)),
					(new GrammarSymbol(CommonSymbols.genWeakSymbol, "tonic water", "expression", undefined))],
				(function(context, replaceSymbol, defaultSymbol){
					var grammar = context[0];
					//if we're using a dark strong-- a dark rum or a whiskey, for example, we want to pair it with club soda or soda water
					//lighter liquors want to be pared with lighter spirits
					//and if we're using a syrup, we want to use soda water
					var sweetPresent = false;
					for(var i=0; i < grammar.length; i++){
						//the sweet might have expanded on us, so compare top level info
						var ithTopLevel = CommonRuleset.getTopLevelSymbol(grammar[i]);
						if(ithTopLevel.symbol === "sweet"){
							sweetPresent = true;
							break;
						}
					}
					
					if(sweetPresent){
						//we have a sweet, just use soda water
						grammar = CommonRuleset.singleContextFreeReplacement(grammar, replaceSymbol, defaultSymbol[0]);
						context[0] = grammar;
					}else{
						//ok, so if our strong is a dark strong-- dark rum or whiskey, looks like-- then use club soda or soda water
						//otherwise, we can use whatever set of bubbling awesome we want
						var darkLiquor = false;
						for(var i = 0; i < grammar.length; i++){
							if(grammar[i].symbol === "dark rum" || grammar[i].symbol === "whiskey" || grammar[i].symbol === "bourbon" || grammar[i].symbol === "scotch"){
								darkLiquor = true;
								break;
							}
						}
						
						if(darkLiquor){
							var pick = Math.floor(Math.random() * 2);
							grammar = CommonRuleset.singleContextFreeReplacement(grammar, replaceSymbol, defaultSymbol[pick]);
							context[0] = grammar;
						}else{
							grammar = CommonRuleset.stochasticContextFreeReplacement(grammar, replaceSymbol, defaultSymbol);
							context[0] = grammar;
						}
					}
					
					return context;
				}),
				true
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "soda water", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genWeakSymbol, "soda water", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "club soda", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genWeakSymbol, "club soda", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "tonic water", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genWeakSymbol, "tonic water", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			//now onto the sweet rules!  Because guess what, motherfucker, we've only begun the madness.
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sweet", "function", undefined)),
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "generic sweet", "ingredient", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			//this is a fun rule-- as we can have a sweet that's derived from a weak (generic sweet'), we need to edit 
			//this sweet's parent info so it can be derived from a generic sweet symbol
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "generic sweet'", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "generic sweet", "ingredient", undefined)),
				(function(grammar, replaceSymbol, defaultSymbol){
					//symbol overwrite rule
					//yes, this is me cheating the top level context sensativity in order to get the correct context
					for (var i = 0; i < grammar.length; i++) {
						if (grammar[i].matches(replaceSymbol)) {
							//make up a parent
							var parent = new GrammarSymbol(undefined, CommonSymbols.genSweetSymbol.symbol, "functional", 1);
							defaultSymbol.parent = parent;
							grammar[i] = defaultSymbol;
							
						}
					}
					
					return grammar;
				}),
				false
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "generic sweet", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "chocolate liqueur", "expression", undefined)),
				CommonRuleset.toExpressionsFromIngredients,
				true
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sweet", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "chocolate liqueur", "terminal", undefined)),
				(function(grammar, replaceSymbol, defaultSymbol){
					//try to expand to a liqueur.  If we can't, reroll!
					for(var i = 0; i < grammar.length; i++){
						var curSymbol = CommonRuleset.getTopLevelSymbol(grammar[i]);
						if(curSymbol.symbol === replaceSymbol.symbol && grammar[i].type === replaceSymbol.type){
							if(grammar[i].symbol === "cream"){
								throw{
									name: "GeneratorError",
									message: "Unable to use creams for this grammar"
								};
							}
							var options = ingredientTable.search(grammar[i].symbol)["type"];
							var ret = CommonRuleset.expandFromPotentials(options, grammar, "liqueur", grammar[i], "terminal");
							grammar = ret[1];
							if(ret[0]){
								break;
							}else{
								throw{
									name: "GeneratorError",
									message: "Unable to expand selected sweet into a liqueur"
								};
							}
						}
					}
					
					return grammar;
				}),
				true
			));
			
			//and finally onto the sour rules
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sour", "function", undefined)),
				(new GrammarSymbol(CommonSymbols.genSourSymbol, "generic sour", "ingredient", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "generic sour", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genSourSymbol, "lemon", "expression", undefined)),
				(function(context, replaceSymbol, defaultSymbol){
					//we actually need some advanced logic in here.  If we're stuck at ingredient-only level symbols because
					//we have two symbols that need context sensative information, force the grammar's hand by forcing this symbol
					//to be lemon juice.
					//FIXME: this hurts the generator's overall potential, but FUCKING HELL AMARETTO SOURS.  YOU SHOULDN'T BE THIS HARD.
					
					var grammar = context[0];
					var numIngredients = 0;
					for(var i = 0; i < grammar.length; i++){
						if(grammar[i].type === "ingredient"){
							numIngredients++;
						}
					}
					
					if(numIngredients == grammar.length){
						grammar = CommonRuleset.singleContextFreeReplacement(grammar, replaceSymbol, defaultSymbol);
						context[0] = grammar;
					}else{
						context = CommonRuleset.toExpressionsFromIngredients(context, replaceSymbol, defaultSymbol);
					}
					
					return context;
				}),
				true
			));
			
			this.ginAndTonicRules.push(new GrammarRule(
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
			
			this.ruleset = this.ginAndTonicRules;
		}
	});
	
	return GinAndTonicRuleset;
});

