/**
 *Listing of common generic symbols that are often used for pattern matching in the rulesets.
 * @author Johnathan Pagnutti 
 */
define(["inheritance", "./grammarSymbol"], function(Inheritance, GrammarSymbol){
	var CommonSymbols = Class.extend();
	
	//a list of useful symbols
	CommonSymbols.genStrongSymbol = new GrammarSymbol(undefined, "strong", undefined, undefined);
	CommonSymbols.genAromaticSourSymbol = new GrammarSymbol(undefined, "aromatic-sour", undefined, undefined);
	CommonSymbols.genSweetSymbol = new GrammarSymbol(undefined, "sweet", undefined, undefined);
	CommonSymbols.genSourSymbol = new GrammarSymbol(undefined, "sour", undefined, undefined);
	CommonSymbols.genMildSymbol = new GrammarSymbol(undefined, "mild", undefined, undefined);
	CommonSymbols.genWeakSymbol = new GrammarSymbol(undefined, "weak", undefined, undefined);
	
	return CommonSymbols;
});