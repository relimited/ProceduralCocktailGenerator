/**
 *Generic Ruleset.  This should help with the amount of imports we're doing.
 * @author Johnathan Pagnutti 
 */

define(["inheritance"], function(Inheritance){
	var Ruleset = Class.extend({
		init : function(ingredientTable){
			this.ingredientTable = ingredientTable;
			this.ruleset = [];
		},
		
		/*
		 * Return a ruleset
		 */
		getRuleset : function (){
			return this.ruleset;
		},
	});
	
	return Ruleset;
});