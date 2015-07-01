define(["inheritance", "./ruleset", "./commonRuleset", "../commonSymbols", "../grammarSymbol", "../grammarRule"], function(Inheritance, Ruleset, CommonRuleset, CommonSymbols, GrammarSymbol, GrammarRule){

	var ManhattanAndMartiniRuleset = Ruleset.extend({
		
		init : function(ingredientList){
			this._super(ingredientList);
			
			var ingredientTable = this.ingredientTable;
			
			//it's rule time
			this.manhattanAndMartiniRules = [];
			
			//start with the strongs, as per usual
			
			//TODO: I'm pretty exhausted today, so I'll probably want to review any of this
			this.manhattanAndMartiniRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "strong", "function", undefined)),
				[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "gin", "ingredient", undefined)),
					(new GrammarSymbol(CommonSymbols.genStongSymbol, "bourbon", "ingredient", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "whiskey", "ingredient", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "rum", "ingredient", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "scotch", "ingredient", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "brandy", "ingredient", undefined))],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			this.manhattanAndMartiniRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "gin", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "gin", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.manhattanAndMartiniRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "bourbon", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "bourbon", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.manhattanAndMartiniRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "whiskey", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "whiskey", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.manhattanAndMartiniRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "rum", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "rum", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.manhattanAndMartiniRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "scotch", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "scotch", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.manhattanAndMartiniRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "brandy", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "brandy", "expression", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.manhattanAndMartiniRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "gin", "expression", undefined)),
				[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "gin", "terminal", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "Dry gin", undefined))],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			this.manhattanAndMartiniRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "bourbon", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "bourbon", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.manhattanAndMartiniRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "whiskey", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "whiskey", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.manhattanAndMartiniRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "rum", "expression", undefined)),
				[(new GrammarSymbol(CommonSymbols.genStrongSymbol, "rum", "terminal", undefined)),
					(new GrammarSymbol(CommonSymbols.genStrongSymbol, "rhum agricole", "terminal", undefined))],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			this.manhattanAndMartiniRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "scotch", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "scotch", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.manhattanAndMartiniRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "brandy", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genStrongSymbol, "brandy", "terminal", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			//the core of the cocktail is simple.  Onto the aromatic sours!
			//this grammar also handles things like strong + sweet combinations.  Which means we need a generational replacement step.
			//but can you hear how excited I am?  Are you sure?  Because I'm not excited.  At all.  Period
			this.manhattanAndMartiniRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "aromatic-sour", "function", undefined)),
				[(new GrammarSymbol(CommonSymbols.genSweetSymbol, "sweet", "function", undefined)),
					(new GrammarSymbol(CommonSymbols.genAromaticSourSymbol, "aromatic-sour'", "function", undefined))],
				(function(grammar, replaceSymbol, defaultSymbol){
					console.log("________STARTING POTENTIAL LINEAGE REWRITE_______");
					console.log("grammar:");
					console.log(grammar);
					console.log("Default Symbol:");
					console.log(defaultSymbol);
					
					//pick between either a sweet (with a lineage rewrite) or expanding into some aromatic sours
					var pick = Math.floor(Math.random() * defaultSymbol.length);
					switch(pick){
						case 0:
							console.log("expanding into a sweet");
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
							//expand into an aromatic sour
							console.log("Expanding into an aromatic-sour");
							grammar = CommonRuleset.singleContextFreeReplacement(grammar, replaceSymbol, defaultSymbol[pick]);
							break;
						default:
							throw "Invalid choice";
							break;
					}
					
					console.log("++++++++++++++++++++++");
					console.log("After rewrite step");
					console.log(grammar);
					return grammar;
				}),
				false
			));
			this.manhattanAndMartiniRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "aromatic-sour'", "function", undefined)),
				[(new GrammarSymbol(CommonSymbols.genAromaticSourSymbol, "aromatic-sour", "ingredient", undefined)),
					[(new GrammarSymbol(CommonSymbols.genAromaticSourSymbol, "aromatic-sour", "ingredient", undefined)),
						(new GrammarSymbol(CommonSymbols.genAromaticSourSymbol, "aromatic-sour", "ingredient", undefined))]],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			this.manhattanAndMartiniRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "aromatic-sour", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genAromaticSourSymbol, "sweet vermouth", "expression", undefined)),
				CommonRuleset.toExpressionsFromIngredients,
				true
			));
			
			//expand into a spirit!  After all, vermouth has alcohol in it.
			this.manhattanAndMartiniRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "aromatic-sour", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genAromaticSourSymbol, "sweet vermouth", "terminal", undefined)),
				(function(grammar, replaceSymbol, defaultSymbol){
					//expand into a spirit, otherwise reroll.
					for(var i = 0; i < grammar.length; i++){
						var curSymbol = CommonRuleset.getTopLevelSymbol(grammar[i]);
						if(curSymbol.symbol === replaceSymbol.symbol && grammar[i].type === replaceSymbol.type){
							var options = ingredientTable.search(grammar[i].symbol)["type"];
							var ret = CommonRuleset.expandFromPotentials(options, grammar, "spirit", grammar[i], "terminal");
							grammar = ret[1];
							if(ret[0]){
								break;
							}else{
								throw{
									name: "GeneratorError",
									message: "Unable to expand selected aromatic sour into a spirit"
								};
							}
						}
					}
					
					return grammar;
				}),
				true
			));
			
			//And now the sweet symbols.  Which can happen.  Because joy.
			//the way these sweets work is by either using a syrup, or muddling with simple syrup
			this.manhattanAndMartiniRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "sweet", "function", undefined)),
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "generic sweet", "ingredient", undefined)),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			
			this.manhattanAndMartiniRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "generic sweet", "ingredient", undefined)),
				[(new GrammarSymbol(CommonSymbols.genSweetSymbol, "generic sweet'", "ingredient", undefined)),
					[(new GrammarSymbol(CommonSymbols.genSweetSymbol, "generic sweet'", "ingredient", undefined)), 
						(new GrammarSymbol(CommonSymbols.genSweetSymbol, "generic sweet'", "ingredient", undefined))]],
				CommonRuleset.stochasticContextFreeReplacement,
				false
			));
			
			//the context sensative kicker to really bring all of this together.  If we have one sweet symbol, than it expands into potentials
			//as normal.  If we have two, than one becomes simple syrup and the other expands into potentials
			this.manhattanAndMartiniRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "generic sweet'", "ingredient", undefined)),
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "simple syrup", "expression", undefined)),
				(function(context, replaceSymbol, defaultSymbol){
					//count the number of sweet symbols we have in the grammar
					//while I'm here, also mark if we've seen a simple syrup symbol
					console.log("____________CONTEXT SENSATIVE RULE_____________");
					console.log("Passing in context: ");
					console.log(context);
					var grammar = context[0];
					console.log("Grammar: ");
					console.log(grammar);
					var numSweet = 0;
					var simpleSyrupSeen = false;
					for(var i = 0; i < grammar.length; i++){
						var ithTopLevel = CommonRuleset.getTopLevelSymbol(grammar[i]);
						if(ithTopLevel.symbol === "sweet"){
							numSweet = numSweet + 1;
							if(grammar[i].symbol === "simple syrup" && !simpleSyrupSeen){
								simpleSyrupSeen = true;
							}
						}
					}
					
					//ok, so three cases: we have 2 or more sweet' symbols and have not seen simple syrup yet, we have 2 sweet' symbols and have seen
					//simple syrup, we have 1 sweet' symbol.
					//also we need to do all expansion in this step, because of weirdness.  I think.
					while(numSweet != 0){
						if(numSweet < 2){
							//we have one sweet symbol.  Just expand it as normal
							grammar = CommonRuleset.toExpressionsFromIngredients(context, replaceSymbol, defaultSymbol);
							context[0] = grammar;
							numSweet = numSweet - 1;
						}else if(simpleSyrupSeen && numSweet === 2){
							//we have seen simple syrup and now we need to expand the other sweet symbol as normal
							grammar = CommonRuleset.toExpressionsFromIngredients(context, replaceSymbol, defaultSymbol);
							context[0] = grammar;
							numSweet = numSweet - 1;
						}else if(numSweet === 2){
							//we have two sweet symbols, but haven't expanded to simple syrup yet.  Do so.
							grammar = CommonRuleset.singleContextFreeReplacement(grammar, replaceSymbol, new GrammarSymbol(CommonSymbols.genSweetSymbol, "simple syrup", "expression", undefined));
							context[0] = grammar;
							numSweet = numSweet - 1;
							simpleSyrupSeen = true;
						}else{
							console.log("EEEEEERRRRRRRROOOOOOOOORRRRRRRR");
						}
					}
					
					return grammar;
				}),
				true
			));
			
			this.manhattanAndMartiniRules.push(new GrammarRule (
				(new GrammarSymbol(undefined, "sweet", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "simple syrup", "terminal", undefined)),
				(function(grammar, replaceSymbol, defaultSymbol){
					//if simple syrup is present, expand into a muddle.  Otherwise, expand into a syrup.  Otherwise, reroll.
					var hasSimpleSyrup = false;
					for(var i = 0; i < grammar.length; i++){
						if(grammar[i].symbol.indexOf("simple syrup") > -1){
							hasSimpleSyrup = true;
						}
					}
					
					for(var i = 0; i < grammar.length; i++){
						var curSymbol = CommonRuleset.getTopLevelSymbol(grammar[i]);
						if(curSymbol.symbol === replaceSymbol.symbol && grammar[i].type === replaceSymbol.type){
							var options = ingredientTable.search(grammar[i].symbol)["type"];
							if(hasSimpleSyrup){
								var ret = CommonRuleset.expandFromPotentials(options, grammar, "muddle", grammar[i], "terminal");
							}else{
								var ret = CommonRuleset.expandFromPotentials(options, grammar, "syrup", grammar[i], "terminal");
							}
							grammar = ret[1];
							if(ret[0]){
								break;
							}else{
								throw{
									name: "GeneratorError",
									message: "Unable to expand sweet into a muddle"
								};
							}
						}
					}
					
					return grammar;
				}),
				false
			));
			
			this.manhattanAndMartiniRules.push(new GrammarRule(
				(new GrammarSymbol(undefined, "simple syrup", "expression", undefined)),
				(new GrammarSymbol(CommonSymbols.genSweetSymbol, "simple syrup", "terminal")),
				CommonRuleset.singleContextFreeReplacement,
				false
			));
			this.ruleset = this.manhattanAndMartiniRules;
		}
	});
	
	return ManhattanAndMartiniRuleset;
});