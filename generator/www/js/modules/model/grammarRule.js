/**
 * These are our grammar production rules.  They have a starting symbol, a default symbol(s) (which is the replacement symbol(s) for context free
 * replacements, and a function to handle replacement (which is simple for context free rules, harder for context sensative rules)
 */
define(["inheritance", "./ingredientGraph", "./ingredientTable", "./cocktailGrammar", "./grammarSymbol"], function(Inheritance, IngredientGraph, IngredientTable, CocktailGrammar, GrammarSymbol) {'use strict';
	var GrammarRule = Class.extend({
		
		init : function(startingSymbol, defaultSymbol, transformFunction, contextSensitive){
			this.startingSymbol = startingSymbol;
			this.defaultSymbol = defaultSymbol;
			this.transformFunction = transformFunction;
			this.contextSensitive = contextSensitive;
		},
		
		apply : function(argument){
			return this.transformFunction(argument, this.startingSymbol, this.defaultSymbol);	
		}
	});
	
	return GrammarRule;
});