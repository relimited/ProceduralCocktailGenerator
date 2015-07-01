/**
 *Class to wrap up all the indvidual rulesets into one tight package so they can be accessed easily from the cocktailGenerator
 *@author Johnathan Pagnutti
 */
define(["inheritance", "./ruleset", "./oldFashionedRuleset", "./margaritaRuleset", "./whiteRussianRuleset", "./ginAndTonicRuleset", "./manhattanAndMartiniRuleset", "./muiTaiRuleset", "./daiquiriRuleset", "./fizzRuleset"], 
	function(Inheritance, Ruleset, OldFashionedRuleset, MargaritaRulset, WhiteRussianRuleset, GinAndTonicRuleset, ManhattanAndMartiniRuleset, MuiTaiRuleset, DaiquiriRuleset, FizzRuleset){ "use strict";
	Ruleset.OldFashionedRules = OldFashionedRuleset;
	Ruleset.MargaritaRules = MargaritaRulset;
	Ruleset.WhiteRussianRules = WhiteRussianRuleset;
	Ruleset.GinAndTonicRules = GinAndTonicRuleset;
	Ruleset.ManhattanAndMartiniRules = ManhattanAndMartiniRuleset;
	Ruleset.MuiTaiRules = MuiTaiRuleset;
	Ruleset.DaiquiriRules = DaiquiriRuleset;
	Ruleset.FizzRules = FizzRuleset;
	
	return Ruleset;
});