/**
 * Recursive Data structure to hold on to cocktail grammar symbols.
 * 
 * @author Johnathan Pagnutti 
*/
define(["inheritance"], function(Inheritance){
	var CocktailGrammarSymbol = Class.extend({
		init : function(parent, symbol, type, part){
			this.symbol = symbol;			// the symbol in the grammar 
			this.type = type;				// the type of symbol we have.  Changes how/when a symbol can expand
			this.parent = undefined;		// top level symbols have no parents, otherwise a symbol's parent is where it came from.
			this.part = undefined;			// top level symbols have a part attached to them, for calculating amount
			
			if(parent === undefined){
				this.part = part;
			}else{
				this.parent = parent;
			}
		},
		
		/**
		 * Checks to see if this symbol (the caller) matches the argument by checking the
		 * symbol and type of the argument match the caller's symbol and type.
		 * 
		 * returns true if there is a match.  False if otherwise. 
 		 * @param {Object} otherSymbol symbol to check for a match
		 */
		matches : function(otherSymbol){
			
			if(this.symbol === otherSymbol.symbol && this.type === otherSymbol.type){
				console.log("Match:");
				console.log(this);
				console.log(otherSymbol);
				return true;
			}else{
				return false;
			}
		},
		
		/**
		 *Checks to see if this symbol is exactly the same as another symbol, in everything except lineage
		 * 
		 * @param {Object} otherSymbl symbol to check against
		 */
		isTheSame : function (otherSymbol){
			if(this.symbol === otherSymbol.symbol && this.type === otherSymbol.type && this.part === otherSymbol.part){
				return true;
			}else{
				return false;
			}
		},
		
		/**
		 * Basic setter for the parent property of a symbol
		 * @param {object} symbol the symbol to make the parent of this symbol  
		 */	
		 setParent : function(symbol){
		 	this.parent = symbol;
		 }
	});
	
	return CocktailGrammarSymbol;
});