/*
 * A basic list class to serve as a black / white list for cocktail symbols
 * These are saved as symbol strings in a list, and if they occur, cocktail is rerolled from the axiom
 */

define(["inheritance"], function(Inheritance){
	var list = Class.extend({
		
		init : function(){
			this.list = [];
		},
		
		//Add a new symbol to the list
		//no checking happens here, if we want to do sanity checks on added symbols (which we shouldn't have to do, because restricted UI)
		//then it needs to happen BEFORE this add function
		//this is actually closer to a set, as we want to ensure uniqueness of each element
		add : function(symbol){
			if(this.list.indexOf(symbol) > -1){
				this.list.push(symbol);	
			}
		},
		
		//remove a symbol from the list
		remove : function(symbol){
			index = this.list.indexOf(symbol);
			if(index > -1){
				this.list.splice(index, 1);	
			}	
		},
		
		//Searching the blacklist to see if a particular symbol is in it.  If it is, return true.  Otherwise, return false.
		search : function(symbol){
			if(this.list.indexOf(symbol) > -1){
				return true;
			}else{
				return false;
			}
		},
		
		//clear out the entire list
		clear : function (){
			this.list = [];
		}
	});
	
	return list;
});
