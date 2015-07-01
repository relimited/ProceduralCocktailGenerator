/**
 * This is the catloge of ingredients based on function
 * 
 * Each ingredient has a:
 * 		type (it's name in the graph)
 * 		expression (the actual form of the ingredient (syrup, juice, muddled, etc))
 * 		funct (what grammar symbols expand to it)
 * 		modifier (sub-function) 
 */
define(["inheritance"], function (Inheritance){"use strict";
	var Ingredient = Class.extend({
		
		init : function (type, funct, form, modifier) {
			this.type = type;
			this.form = form;
			this.funct = funct;
			this.modifier = modifier;
		}
	});
	
	var IngredientTable = Class.extend({
		init : function(){
			this.list = [];
			
			//get ready for the add method spam
			this.list.push(new Ingredient("grapefruit","sour", "syrup", "sweet"));
			this.list.push(new Ingredient("grapefruit","sour", "juice", "mild sweet"));
			this.list.push(new Ingredient("grapefruit","sour", "muddle", "mild sweet"));
			this.list.push(new Ingredient("grapefruit","sour", "infuse", "strong"));
			this.list.push(new Ingredient("kumquat", "sour", "puree", "mild bitterness"));
			this.list.push(new Ingredient("kumquat", "sour", "muddle", "mild bitterness"));
			this.list.push(new Ingredient("lemon", "sour", "juice", "true sour citrus"));
			this.list.push(new Ingredient("lemon", "sour", "infuse", "strong"));
			this.list.push(new Ingredient("lemon", "sour", "muddle", "true sour citrus"));
			this.list.push(new Ingredient("lemon", "sour", "liqueur", "mild sweet citrus"));
			this.list.push(new Ingredient("lime", "sour", "juice", "true sour citrus"));
			this.list.push(new Ingredient("lime", "sour", "infuse", "strong"));
			this.list.push(new Ingredient("lime", "sour", "muddle", "true sour citrus"));
			this.list.push(new Ingredient("lime", "sour", "liqueur", "mild sweet citrus"));
			this.list.push(new Ingredient("orange", "sour", "juice", "moderately sweet"));
			this.list.push(new Ingredient("orange", "sour", "infuse", "strong"));
			this.list.push(new Ingredient("orange", "sour", "muddle", "moderately sweet"));
			this.list.push(new Ingredient("orange", "sour", "liqueur", "sweet"));
			this.list.push(new Ingredient("rhubarb", "sour", "syrup", "herbal sweet"));
			this.list.push(new Ingredient("rhubarb", "sour", "juice", "herbal"));
			this.list.push(new Ingredient("rhubarb", "sour", "infuse", "herbal"));
			this.list.push(new Ingredient("yuzu", "sour", "juice", "true sour citrus"));
			this.list.push(new Ingredient("yuzu", "sour", "infuse", "strong"));
			this.list.push(new Ingredient("yuzu", "sour", "muddle", "true sour citrus"));
			this.list.push(new Ingredient("yuzu", "sour", "liqueur", "mild sweet citrus"));
			this.list.push(new Ingredient("red currant", "sour", "liqueur", "true sour non-citrus"));
			this.list.push(new Ingredient("red currant", "sour", "infuse", "strong"));
			this.list.push(new Ingredient("cranberry", "sour", "juice", "true sour non-citrus"));
			this.list.push(new Ingredient("cranberry", "sour", "infuse", "strong"));
			this.list.push(new Ingredient("cranberry", "sour", "puree", "true sour non-citrus"));
			this.list.push(new Ingredient("cranberry", "sour", "liqueur", "mild sweet"));
			this.list.push(new Ingredient("sweet vermouth", "aromatic-sour", "spirit", "slightly sweet"));
			this.list.push(new Ingredient("Debonnet", "aromatic-sour", "spirit", "slightly sweet"));
			this.list.push(new Ingredient("dry vermouth", "aromatic-sour", "spirit", "mild tart"));
			this.list.push(new Ingredient("Lillet", "aromatic-sour", "spirit", "slightly sweet"));
			this.list.push(new Ingredient("Campari", "aromatic-sour", "spirit", "bitter"));
			this.list.push(new Ingredient("Cynar", "aromatic-sour", "spirit", "bitter"));
			this.list.push(new Ingredient("amaro", "aromatic-sour", "spirit", "bitter"));
			this.list.push(new Ingredient("Galliano", "aromatic-sour", "spirit", "bitter"));
			this.list.push(new Ingredient("pisco", "aromatic-sour", "spirit", "bitter"));
			this.list.push(new Ingredient("Chartreuse", "aromatic-sour", "spirit", "bitter"));
			this.list.push(new Ingredient("bourbon", "strong", "spirit", "mild sweet"));
			this.list.push(new Ingredient("whiskey", "strong", "spirit", "spice"));
			this.list.push(new Ingredient("brandy", "strong", "spirit", "sweet"));
			this.list.push(new Ingredient("scotch", "strong", "spirit", "floral"));
			this.list.push(new Ingredient("rum", "strong", "spirit", "sweet"));
			this.list.push(new Ingredient("tequila", "strong", "spirit", "floral"));
			this.list.push(new Ingredient("gin", "strong", "spirit", "floral"));
			this.list.push(new Ingredient("vodka", "strong", "spirit", "light"));
			this.list.push(new Ingredient("Cognac", "strong", "spirit", "sweet"));
			this.list.push(new Ingredient("champagne", "strong", "spirit", "floral"));
			this.list.push(new Ingredient("cilantro", "sour", "muddle", "mild sweet")); 	//sour-herbal
			this.list.push(new Ingredient("ginger", "sour", "infuse", "strong")); 		//sour-spice
			this.list.push(new Ingredient("ginger", "sour", "syrup", "sweet"));	  		//sour-spice
			this.list.push(new Ingredient("ginger", "sour", "muddle", "aromatic")); 		//sour-spice
			this.list.push(new Ingredient("ginger", "sour", "liqueur", "mild sweet"));  	//sour-spice
			this.list.push(new Ingredient("blackberry", "sour", "syrup", "sweet"));  			//sour-sweet
			this.list.push(new Ingredient("blackberry", "sour", "muddle", "mild sweet"));		//sour-sweet
			this.list.push(new Ingredient("blackberry", "sour", "infuse", "strong"));			//sour-sweet
			this.list.push(new Ingredient("blackberry", "sour", "liqueur", "mild sweet"));	//sour-sweet
			this.list.push(new Ingredient("blueberry", "sour", "syrup", "sweet"));			//sour-sweet
			this.list.push(new Ingredient("blueberry", "sour", "muddle", "mild sweet"));		//sour-sweet
			this.list.push(new Ingredient("blueberry", "sour", "infuse", "strong"));			//sour-sweet
			this.list.push(new Ingredient("blueberry", "sour", "liqueur", "mild sweet"));		//sour-sweet
			this.list.push(new Ingredient("pomegranate", "sour", "syrup", "sweet"));			//sour-sweet
			this.list.push(new Ingredient("pomegranate", "sour", "infuse", "strong"));		//sour-sweet
			this.list.push(new Ingredient("pomegranate", "sour", "liqueur", "mild sweet"));	//sour-sweet
			this.list.push(new Ingredient("tomato", "sour", "juice", "mild sweet"));	//sour-sweet
			this.list.push(new Ingredient("tomato", "sour", "muddle", "mild sweet"));	//sour-sweet
			this.list.push(new Ingredient("tomato", "sour", "infuse", "strong"));		//sour-sweet
			this.list.push(new Ingredient("melon", "sweet", "liqueur", "mild sweet"));
			this.list.push(new Ingredient("melon", "sweet", "puree", "mild sweet"));
			this.list.push(new Ingredient("melon", "sweet", "infuse", "mild sweet"));
			this.list.push(new Ingredient("agave", "sweet", "syrup", "sweet"));
			this.list.push(new Ingredient("almond", "sweet", "syrup", "savory"));
			this.list.push(new Ingredient("almond", "sweet", "liqueur", "savory"));
			this.list.push(new Ingredient("apple", "sweet", "juice", "mild tart"));
			this.list.push(new Ingredient("apple", "sweet", "infuse", "strong"));
			this.list.push(new Ingredient("apricot", "sweet", "syrup", "light"));
			this.list.push(new Ingredient("apricot", "sweet", "puree", "light"));
			this.list.push(new Ingredient("apricot", "sweet", "muddle", "light"));
			this.list.push(new Ingredient("apricot", "sweet", "infuse", "strong"));
			this.list.push(new Ingredient("banana", "sweet", "infuse", "strong"));
			this.list.push(new Ingredient("banana", "sweet", "liqueur", "mild tart"));
			this.list.push(new Ingredient("banana", "sweet", "blended", "mild tart"));
			this.list.push(new Ingredient("bell pepper", "sweet", "muddle", "mild bitter"));
			this.list.push(new Ingredient("bell pepper", "sweet", "infuse", "strong"));
			this.list.push(new Ingredient("blackberry (wild)", "sweet", "syrup", "mild tart"));
			this.list.push(new Ingredient("blackberry (wild)", "sweet", "muddle", "mild tart"));
			this.list.push(new Ingredient("blackberry (wild)", "sweet", "infuse", "strong"));
			this.list.push(new Ingredient("blackberry (wild)", "sweet", "liqueur", "mild tart"));
			this.list.push(new Ingredient("cantaloupe", "sweet", "puree", "light"));
			this.list.push(new Ingredient("cantaloupe", "sweet", "muddle", "light"));
			this.list.push(new Ingredient("carrot", "sweet", "juice", "mild herbal"));
			this.list.push(new Ingredient("cherry", "sweet", "muddle", "mild tart"));
			this.list.push(new Ingredient("cherry", "sweet", "infuse", "mild tart"));
			this.list.push(new Ingredient("cherry", "sweet", "liqueur", "mild tart"));
			this.list.push(new Ingredient("cinnamon", "sweet", "syrup", "spice"));
			this.list.push(new Ingredient("cinnamon", "sweet", "infuse", "strong"));
			this.list.push(new Ingredient("cinnamon", "sweet", "liqueur", "spice"));
			this.list.push(new Ingredient("coconut", "sweet", "infuse", "strong"));
			this.list.push(new Ingredient("coconut", "sweet", "liqueur", "true sweet"));
			this.list.push(new Ingredient("coconut", "sweet", "cream", "true sweet"));
			this.list.push(new Ingredient("coconut", "sweet", "puree", "true sweet"));
			this.list.push(new Ingredient("cucumber", "sweet", "syrup", "mild tart"));
			this.list.push(new Ingredient("cucumber", "sweet", "infuse", "strong"));
			this.list.push(new Ingredient("elderflower", "sweet", "liqueur", "mild sweet"));
			this.list.push(new Ingredient("elderflower", "sweet", "infuse", "strong"));
			this.list.push(new Ingredient("elderflower", "sweet", "syrup", "mild sweet"));
			this.list.push(new Ingredient("falernum", "sweet", "syrup", "true sweet"));
			this.list.push(new Ingredient("fig", "sweet", "syrup", "mild tart"));
			this.list.push(new Ingredient("fig", "sweet", "infuse", "mild tart"));
			this.list.push(new Ingredient("grape", "sweet", "juice", "mild tart"));
			this.list.push(new Ingredient("grape", "sweet", "syrup", "mild tart"));
			this.list.push(new Ingredient("grape", "sweet", "muddle", "mild tart"));
			this.list.push(new Ingredient("guava", "sweet", "juice", "light"));
			this.list.push(new Ingredient("guava", "sweet", "syrup", "light"));
			this.list.push(new Ingredient("guava", "sweet", "puree", "light"));
			this.list.push(new Ingredient("guava", "sweet", "muddle", "light"));
			this.list.push(new Ingredient("honey", "sweet", "syrup", "floral"));
			this.list.push(new Ingredient("honey", "sweet", "liqueur", "floral"));
			this.list.push(new Ingredient("honeydew", "sweet", "puree", "light"));
			this.list.push(new Ingredient("honeydew", "sweet", "infuse", "strong"));
			this.list.push(new Ingredient("lychee", "sweet", "muddle", "true sweet"));
			this.list.push(new Ingredient("lychee", "sweet", "infuse", "strong"));
			this.list.push(new Ingredient("lychee", "sweet", "liqueur", "true sweet"));
			this.list.push(new Ingredient("lychee", "sweet", "syrup", "true sweet"));
			this.list.push(new Ingredient("lychee", "sweet", "puree", "true sweet"));
			this.list.push(new Ingredient("mango", "sweet", "muddle", "true sweet"));
			this.list.push(new Ingredient("mango", "sweet", "infuse", "strong"));
			this.list.push(new Ingredient("mango", "sweet", "puree", "true sweet"));
			this.list.push(new Ingredient("mango", "sweet", "liqueur", "true sweet"));
			this.list.push(new Ingredient("mango", "sweet", "syrup", "true sweet"));
			this.list.push(new Ingredient("maple syrup", "sweet", "syrup", "mild bitter"));
			this.list.push(new Ingredient("nectarine", "sweet", "muddle", "true sweet"));
			this.list.push(new Ingredient("nectarine", "sweet", "syrup", "true sweet"));
			this.list.push(new Ingredient("nectarine", "sweet", "infuse", "strong"));
			this.list.push(new Ingredient("nectarine", "sweet", "puree", "true sweet"));
			this.list.push(new Ingredient("papaya", "sweet", "puree", "mild savory"));
			this.list.push(new Ingredient("papaya", "sweet", "syrup", "mild savory"));
			this.list.push(new Ingredient("passion fruit", "sweet", "puree", "mild tart"));
			this.list.push(new Ingredient("passion fruit", "sweet", "syurp", "mild tart"));
			this.list.push(new Ingredient("peach", "sweet", "puree", "true sweet"));
			this.list.push(new Ingredient("peach", "sweet", "syrup", "true sweet"));
			this.list.push(new Ingredient("peach", "sweet", "muddle", "true sweet"));
			this.list.push(new Ingredient("peach", "sweet", "infuse", "strong"));
			this.list.push(new Ingredient("peach", "sweet", "liqueur", "true sweet"));
			this.list.push(new Ingredient("pear", "sweet", "syrup", "true sweet"));
			this.list.push(new Ingredient("pear", "sweet", "infuse", "strong"));
			this.list.push(new Ingredient("pear", "sweet", "liqueur", "true sweet"));
			this.list.push(new Ingredient("persimmon", "sweet", "juice", "mild sweet"));
			this.list.push(new Ingredient("persimmon", "sweet", "infuse", "strong"));
			this.list.push(new Ingredient("persimmon", "sweet", "syrup", "mild sweet"));
			this.list.push(new Ingredient("pineapple", "sweet", "syrup", "mild tart"));
			this.list.push(new Ingredient("pineapple", "sweet", "muddle", "mild tart"));
			this.list.push(new Ingredient("pineapple", "sweet", "infuse", "strong"));
			this.list.push(new Ingredient("pineapple", "sweet", "liqueur", "mild tart"));
			this.list.push(new Ingredient("pineapple", "sweet", "puree", "mild tart"));
			this.list.push(new Ingredient("plum", "sweet", "muddle", "mild tart"));
			this.list.push(new Ingredient("plum", "sweet", "syrup", "mild tart"));
			this.list.push(new Ingredient("plum", "sweet", "infuse", "mild tart"));
			this.list.push(new Ingredient("plum", "sweet", "puree", "mild tart"));
			this.list.push(new Ingredient("strawberry", "sweet", "syrup", "mild tart"));
			this.list.push(new Ingredient("strawberry", "sweet", "muddle", "mild tart"));
			this.list.push(new Ingredient("strawberry", "sweet", "infuse", "strong"));
			this.list.push(new Ingredient("strawberry", "sweet", "liqueur", "mild tart"));
			this.list.push(new Ingredient("strawberry", "sweet", "puree", "mild tart"));
			this.list.push(new Ingredient("tangerine", "sweet", "juice", "tart"));
			this.list.push(new Ingredient("tangerine", "sweet", "muddle", "tart"));
			this.list.push(new Ingredient("tangerine", "sweet", "infuse", "tart"));
			this.list.push(new Ingredient("tangerine", "sweet", "liqueur", "tart"));
			this.list.push(new Ingredient("vanilla", "sweet", "syrup", "true sweet"));
			this.list.push(new Ingredient("vanilla", "sweet", "infuse", "strong"));
			this.list.push(new Ingredient("vanilla", "sweet", "liqueur", "true sweet"));
			this.list.push(new Ingredient("watermelon", "sweet", "muddle", "light"));
			this.list.push(new Ingredient("watermelon", "sweet", "juice", "light"));
			this.list.push(new Ingredient("watermelon", "sweet", "puree", "light"));
			this.list.push(new Ingredient("watermelon", "sweet", "infuse", "strong"));
			this.list.push(new Ingredient("chocolate", "sweet", "liqueur", "true sweet"));
			this.list.push(new Ingredient("chocolate", "sweet", "creme", "true sweet"));
			this.list.push(new Ingredient("chocolate", "sweet", "cream", "true sweet"));
			this.list.push(new Ingredient("coffee", "sweet", "liqueur", "mild sweet"));
			this.list.push(new Ingredient("coffee", "sweet", "cream", "mild sweet"));
			this.list.push(new Ingredient("pumpkin", "sweet", "liqueur", "mild sweet"));
			this.list.push(new Ingredient("pumpkin", "sweet", "juice", "mild sweet"));
			this.list.push(new Ingredient("basil", "sweet", "muddle", "aromatic")); 	//sweet-herbal
			this.list.push(new Ingredient("basil", "sweet", "syrup", "aromatic"));		//sweet-herbal
			this.list.push(new Ingredient("basil", "sweet", "infuse", "strong"));		//sweet-herbal
			this.list.push(new Ingredient("fennel", "sweet", "muddle", "aromatic"));	//sweet-herbal
			this.list.push(new Ingredient("fennel", "sweet", "infuse", "strong"));		//sweet-herbal
			this.list.push(new Ingredient("lavender", "sweet", "syrup", "aromatic"));	//sweet-herbal	
			this.list.push(new Ingredient("lavender", "sweet", "infuse", "strong"));	//sweet-herbal
			this.list.push(new Ingredient("lavender", "sweet", "muddle", "aromatic"));	//sweet-herbal
			this.list.push(new Ingredient("mint", "sweet", "muddle", "aromatic"));		//sweet-herbal
			this.list.push(new Ingredient("mint", "sweet", "infuse", "strong"));		//sweet-herbal
			this.list.push(new Ingredient("mint", "sweet", "syrup", "aromatic"));		//sweet-herbal
			this.list.push(new Ingredient("mint", "sweet", "liqueur", "aromatic"));		//sweet-herbal
			this.list.push(new Ingredient("mint", "sweet", "creme", "aromatic"));		//sweet-herbal
			this.list.push(new Ingredient("rosemary", "sweet", "muddle", "aromatic"));	//sweet-herbal
			this.list.push(new Ingredient("rosemary", "sweet", "infuse", "strong"));		//sweet-herbal
			this.list.push(new Ingredient("kiwi", "sweet", "puree", "mild sweet"));			//sweet-sour
			this.list.push(new Ingredient("kiwi", "sweet", "muddle", "mild sweet"));		//sweet-sour
			this.list.push(new Ingredient("raspberry", "sweet", "syrup", "mild sweet"));	//sweet-sour
			this.list.push(new Ingredient("raspberry", "sweet", "muddle", "mild sweet"));	//sweet-sour
			this.list.push(new Ingredient("raspberry", "sweet", "infuse", "strong"));		//sweet-sour
			this.list.push(new Ingredient("raspberry", "sweet", "liqueur", "mild sweet"));	//sweet-sour
			this.list.push(new Ingredient("cream", "mild", "light cream", "special"));
			this.list.push(new Ingredient("cream", "mild", "half and half", "special"));
			this.list.push(new Ingredient("cream", "mild", "heavy cream", "special"));
			
			
			//For science purposes:
			//console.log("INGREDIENT LIST SIZE: ");
			//console.log(this.list.length);
		},
		
		//TODO: add in add/remove methods if needed, but I really don't think they'll be needed.  Most of the time, we're just going to want
		//to do a lookup.
		
		/**
		 * Search the table and return any ingredient that matches the key 
 		 * @param {Object} key search keyword
		 */
		search : function(key){
			var returnVal = {};
			returnVal["type"] = [];
			returnVal["form"] = [];
			returnVal["function"] = [];
			returnVal["modifier"] = [];
			
			this.list.forEach(function(ingredient){
				if(ingredient.type === key){
					returnVal["type"].push(ingredient);
				}
				if(ingredient.form === key) {
					returnVal["form"].push(ingredient);
				}
				if(ingredient.funct === key){
					returnVal["function"].push(ingredient);
				}
				if(ingredient.modifier === key){
					returnVal["modifier"].push(ingredient);
				}
			});
			
			return returnVal;
		},
		
		/**
		 * Function returns the entire list as a list, where elements form the set:
		 * 		type-form
		 */
		extern : function(){
			var ret = [];
			
			this.list.forEach(function(ingredient){
				ret.push(ingredient.type + "-" + ingredient.form);
			});
			
			return ret;
		}
		
	});
	
	return IngredientTable;
});
