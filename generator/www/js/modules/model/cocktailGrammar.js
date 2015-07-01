/**
 *This is where the magic happens.
 * 
 * Expands symbols provided in the constructor.  
 * 
 * TODO: add the ability to also supply the grammar with production weights and rules
 * 
 * @author Johnathan Pagnutti
/ */
define(["inheritance", "./ingredientGraph", "./ingredientTable", "./grammarSymbol"], function(Inheritance, IngredientGraph, IngredientTable, GrammarSymbol) {'use strict';
		
	/**
	 *The actual cocktail gramamar class 
	 */
	var CocktailGrammar = Class.extend({
		
		init : function(axiom, ruleList) {
			this.axiom = axiom;
			this.currentSymbols = axiom; 	//TODO: change this to a deep copy.
			
			this.rules = ruleList;
			this.ingredientGraph = new IngredientGraph();
			this.ingredientTable = new IngredientTable();
		},
		
		
		/**
		 *	New way of handling cocktail expansion.  We apply rules from the rule list, and the rules handle all the expansion stuffs. 
		 */
		expandNew : function() {
			//just a test step to make sure I've got everything figured out.
			//the core idea is that at each rule phase, we apply the non-stochacstic context free rules first, then the stochasitic ones,
			//then the context sensative ones
			var currentSymbols = this.currentSymbols;
			console.log("Starting snapshot: ");
			console.log(this.generateSnapshotString(currentSymbols));
			//for each rule...
			var loopChk = 0;
			while (this.symbolsContainsType("function")) {
				loopChk++;
				//first pass over the rules, look for rules that have funtion type symbols on input, but are not context sensitive
				console.log("Rule list:");
				console.log(this.rules);
				for (var i = 0; i < this.rules.length; i++) {
					var currentRule = this.rules[i];
					if (!currentRule.contextSensitive && currentRule.startingSymbol.type === "function") {
						console.log("Applying rule...");
						console.log(currentRule);
						currentSymbols = currentRule.apply(currentSymbols);
						console.log("Current Symbols: ");
						console.log(this.generateSnapshotString(currentSymbols));
					}
				}
				//next pass looks for context sensitive functional rules to apply
				for (var i = 0; i < this.rules.length; i++) {
					var currentRule = this.rules[i];
					if (currentRule.contextSensitive && currentRule.startingSymbol.type === "function") {
						console.log("Applying rule...");
						console.log(currentRule);
						currentSymbols = currentRule.apply(currentSymbols);
						console.log("Current Symbols: ");
						console.log(this.generateSnapshotString(currentSymbols));
					}
				}
				console.log("After this pass: ");
				console.log(this.generateSnapshotString(currentSymbols));
				this.currentSymbols = currentSymbols;
				if(loopChk > 50){
					throw "Trapped in a never ending loop, send help.";
				}
			}
			loopChk = 0;
			console.log("Current symbols after functional passes: ");
			console.log(this.generateSnapshotString(this.currentSymbols));
			
			//make sure that the current symbols are updated
			currentSymbols = this.currentSymbols;
			
			//next round of passes handles the ingredient level logic
			var check = 0;
			while (this.symbolsContainsType("ingredient")){
				check++;
				//first pass over the rules, look for rules that have ingredient type symbols, but are not context sensitive
				for(var i = 0; i < this.rules.length; i++) {
					var currentRule = this.rules[i];
					if(!currentRule.contextSensitive && currentRule.startingSymbol.type === "ingredient"){
						console.log("Applying rule...");
						console.log(currentRule);
						currentSymbols = currentRule.apply(currentSymbols);
						console.log("Current Symbols: ");
						console.log(this.generateSnapshotString(currentSymbols));
					}
				}
				
				//now, we need to a) figure out how many ingredients to poll for and b) figure out what our starting poll point is.
				//poll for the needed number, plus one more for funsies.
				var numIngredients = 2;
				for(var i = 0; i < this.currentSymbols.length; i++){
					if(this.currentSymbols[i].symbol.indexOf("generic") > -1){
						numIngredients++;
					}	
				}
				//we should have a symbol on the expression level that we can use as a target point for a graph poll
				var pollTarget;
				for(var i = 0; i < this.currentSymbols.length; i++){
					if(this.currentSymbols[i].type.indexOf("expression") > -1){
						pollTarget = this.currentSymbols[i].symbol;
						break; 
					}
				}
				
				//lets poll!
				var potentialExpansions = [];
					
				if(pollTarget === undefined){
					//FIXME: can't find a poll target?  POLL AT RANDOM.
					//maybe.
					console.log("Unable to find a poll target");
					console.log("Polling randomly");
					potentialExpansions = potentialExpansions.concat.apply(potentialExpansions, this.ingredientGraph.poll(10));
					console.log("=======================================");
					console.log("Potential Expansions: ");
					console.log(potentialExpansions);
					console.log("=======================================");
				}else{	
					//just get all neighbors.
					potentialExpansions = potentialExpansions.concat.apply(potentialExpansions, this.ingredientGraph.pollNeighbors(pollTarget, 75));
					console.log("=======================================");
					console.log("Potential Expansions: ");
					console.log(potentialExpansions);
					console.log("=======================================");
				}
				
				//pack up both the current set of symbols and the potential expansions into one array
				var context = [];
				context.push(this.currentSymbols);
				context.push(potentialExpansions);
				context.push(this.ingredientTable);
				
				//next pass looks for context sensitive functional rules to apply
				for (var i = 0; i < this.rules.length; i++) {
					var currentRule = this.rules[i];
					if (currentRule.contextSensitive && currentRule.startingSymbol.type === "ingredient") {
						console.log("Applying rule...");
						console.log(currentRule);
						currentSymbols = currentRule.apply(context);
						console.log("Current Symbols: ");
						console.log(this.generateSnapshotString(currentSymbols));
					}
				}
				
				console.log("After this pass: ");
				console.log(this.generateSnapshotString(currentSymbols));
				this.currentSymbols = currentSymbols;
				if(loopChk > 50){
					throw "Trapped in a never ending loop, send help.";
				}
			}
			loopChk = 0;
			console.log("Current symbols after ingredient passes: ");
			console.log(this.generateSnapshotString(this.currentSymbols));
			
			//make sure that the current symbols are updated
			currentSymbols = this.currentSymbols;
			
			//now, lets do it for expression symbols!
			//for each rule...
			while (this.symbolsContainsType("expression")) {
				loopChk++;
				//first pass over the rules, look for rules that have funtion type symbols on input, but are not context sensitive
				for (var i = 0; i < this.rules.length; i++) {
					var currentRule = this.rules[i];
					if (!currentRule.contextSensitive && currentRule.startingSymbol.type === "expression") {
						console.log("Applying rule...");
						console.log(currentRule);
						currentSymbols = currentRule.apply(currentSymbols);
						console.log("Current Symbols: ");
						console.log(this.generateSnapshotString(currentSymbols));
					}
				}
				
				//there is no 'outside data' needed (well, there might be if I need to do a table lookup here first.)
				//so, we can go right on to context sensitive step.
				
				//next pass looks for context sensitive functional rules to apply
				for (var i = 0; i < this.rules.length; i++) {
					var currentRule = this.rules[i];
					if (currentRule.contextSensitive && currentRule.startingSymbol.type === "expression") {
						console.log("Applying rule...");
						console.log(currentRule);
						currentSymbols = currentRule.apply(currentSymbols);
						console.log("Current Symbols: ");
						console.log(this.generateSnapshotString(currentSymbols));
					}
				}
				console.log("After this pass: ");
				console.log(this.generateSnapshotString(currentSymbols));
				this.currentSymbols = currentSymbols;
				if(loopChk > 50){
					throw "Trapped in a never ending loop, send help.";
				}
			}
			loopChk = 0;
			console.log("Current symbols after expression passes: ");
			console.log(this.generateSnapshotString(this.currentSymbols));
			
			//make sure that the current symbols are updated
			currentSymbols = this.currentSymbols;
			
			//final pass looks for garnishing rules
			var loopChk = 0;
			while (this.symbolsContainsType("garnishing")) {
				loopChk++;
				//first pass over the rules, look for rules that have funtion type symbols on input, but are not context sensitive
				for (var i = 0; i < this.rules.length; i++) {
					var currentRule = this.rules[i];
					if (!currentRule.contextSensitive && currentRule.startingSymbol.type === "garnishing") {
						console.log("Applying rule...");
						console.log(currentRule);
						currentSymbols = currentRule.apply(currentSymbols);
						console.log("Current Symbols: ");
						console.log(this.generateSnapshotString(currentSymbols));
					}
				}
				//next pass looks for context sensitive functional rules to apply
				for (var i = 0; i < this.rules.length; i++) {
					var currentRule = this.rules[i];
					if (currentRule.contextSensitive && currentRule.startingSymbol.type === "garnishing") {
						console.log("Applying rule...");
						console.log(currentRule);
						currentSymbols = currentRule.apply(currentSymbols);
						console.log("Current Symbols: ");
						console.log(this.generateSnapshotString(currentSymbols));
					}
				}
				console.log("After this pass: ");
				console.log(this.generateSnapshotString(currentSymbols));
				this.currentSymbols = currentSymbols;
				if(loopChk > 50){
					throw "Trapped in a never ending loop, send help.";
				}
			}
			loopChk = 0;
			console.log("Final symbols: ");
			console.log(this.generateSnapshotString(this.currentSymbols));
			
			return this.currentSymbols;
			
		},

		/**
		 * For debugging-ish.  Lets me get a snapshot string of what the grammar looks like at a particular point in expansion. 
		 * No way to see where symbols come from though.
		 */
		generateSnapshotString : function (symbols){
			for(var i = 0; i < symbols.length; i++){
				console.log(i + ") " +  "	Symbol: " + symbols[i].symbol + "\n" +
							"	Type: " + symbols[i].type);
			}
		},
		
		/**
		 *Passes through the current symbols and checks to see if any symbols have the type of the argument 
		 */
		symbolsContainsType : function(type){
			var contains = false;
			for(var i = 0; i < this.currentSymbols.length; i++){
				if(type === this.currentSymbols[i].type){
					contains = true;
				}
			}
			
			return contains;
		},
	});
	
	return CocktailGrammar;
});
