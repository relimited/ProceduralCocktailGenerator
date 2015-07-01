/**
 * Focused tab for the actual buttons and the recipe displays and such
 * 
 */
define(["inheritance"], function(Inheritance) {'use strict';
	var animals = "octopus okapi pheasant cobra amoeba capybara kangaroo chicken rooster boa-constrictor nematode sheep otter quail goat agoutis zebra giraffe yak corgi pomeranian rhinocerous skunk dolphin whale duck bullfrog okapi sloth monkey orangutan grizzly-bear moose elk dikdik ibis stork robin eagle hawk iguana tortoise panther lion tiger gnu reindeer raccoon opossum camel dromedary pigeon squirrel hamster leopard panda boar squid parakeet crocodile flamingo terrier cat wallaby wombat koala orangutan bonobo lion salamander".split(" ");
    var adjectives = "sultry rampaging flying sky flanged robotic vigilant happy sorrowful sinister willful brave wild lovely endless red silver blue obsidian black ivory steel striped iron orange cobalt golden copper ruby emerald purple violet sincere sleeping radioactive rad".split(" ");

	/**
	 * Helper function to get a top level parent from a symbol
	 */
	function getTopLevelSymbol(symbol) {
		var topLevel = symbol;
		while (topLevel.parent) {
			topLevel = topLevel.parent;
		}
		return topLevel;
	};
	
	var generatorUI = Class.extend({
		
		init : function(parentHolder, parentUI){
			this.boundGenerator = parentUI.boundGenerator;
			console.log("Generator: ");
			console.log(this.generator);
			this.parentHolder = parentHolder;
			
			this.buildMainUI();
		},
		
		buildMainUI : function(){
			var ui = this;
			this.parentHolder.empty();
			
			//lets make some divs
			this.mainDiv = $("<div />", {
				"class" : "appsize",
				"id" : "panel_holder"
			});
		
			this.buttonPanel = $("<div />", {
				"id" : "button_panel"
			});
		
			this.buttonColumn = $("<div />", {
				"class" : "button_column",
				"id" : "button_column"
			});
			
			this.recipePanel = $("<div />", {
				"class" : "presentation",
				"id" : "recipe_panel"
			});
			
			//set up the divs
			this.parentHolder.append(this.mainDiv);
			this.mainDiv.append(this.buttonPanel);
			this.mainDiv.append(this.recipePanel);
			this.buttonPanel.append(this.buttonColumn);
			
			//and add some labels
			this.oldFashionedLabel = $("<span />", {
				html : "Old Fashioned based cocktail",
				"class" : "generator_button_text",
				"id" : "old_fashioned_text"
			});
			
			this.margaritaLabel = $("<span />", {
				html : "Magarita based cocktail",
				"class" : "generator_button_text",
				"id" : "margarita_text"
			});
			
			this.whiteRussianLabel = $("<span />", {
				html : "White Russian based cocktail",
				"class" : "generator_button_text",
				"id" : "white_russian_text"
			});
			
			this.ginAndTonicLabel = $("<span />", {
				html : "Gin and Tonic based cocktail",
				"class" : "generator_button_text",
				"id" : "gin_and_tonic_text"
			});
			
			this.manhattanLabel = $("<span />", {
				html : "Manhattan based cocktail",
				"class" : "generator_button_text",
				"id" : "manhattan_text"
			});
			
			this.martiniLabel = $("<span />", {
				html : "Martini based cocktail",
				"class" : "generator_button_text",
				"id" : "martini_text"
			});
			
			this.muiTaiLabel = $("<span />", {
				html : "Mui Tai based cocktail",
				"class" : "generator_button_text",
				"id" : "mui_tai_text"	
			});
			
			this.daiquiriLabel = $("<span />", {
				html : "Daiquiri based cocktial",
				"class" : "generator_button_text",
				"id" : "daiquiri_text"
			});
			
			this.fizzLabel = $("<span />", {
				html : "Fizz based cocktail",
				"class" : "generator_button_text",
				"id" : "fizz_text"
			});
			
			//and some buttons
			var generateOldFashionedButton = $("<button />", {
				html : "Generate!"
			});
			var generateMargaritaButton = $("<button />", {
				html : "Generate!"
			});
			var generateWhiteRussianButton = $("<button />", {
				html : "Generate!"
			});
			var generateGinAndTonicButton = $("<button />", {
				html : "Generate!"
			});
			var generateManhattanButton = $("<button />", {
				html : "Generate!"
			});
			var generateMartiniButton = $("<button />", {
				html : "Generate!"
			});
			var generateMuiTaiButton = $("<button />", {
				html : "Generate!"
			});
			var generateDaiquiriButton = $("<button />", {
				html : "Generate!"
			});
			var generateFizzButton = $("<button />", {
				html : "Generate!"
			});
			
			//append all of this into the divs
			this.buttonColumn.append(this.oldFashionedLabel);
			this.buttonColumn.append("<br />");
			this.buttonColumn.append(generateOldFashionedButton);
			this.buttonColumn.append("<br />");
			this.buttonColumn.append(this.margaritaLabel);
			this.buttonColumn.append("<br />");
			this.buttonColumn.append(generateMargaritaButton);
			this.buttonColumn.append("<br />");
			this.buttonColumn.append(this.whiteRussianLabel);
			this.buttonColumn.append("<br />");
			this.buttonColumn.append(generateWhiteRussianButton);
			this.buttonColumn.append("<br />");
			this.buttonColumn.append(this.ginAndTonicLabel);
			this.buttonColumn.append("<br />");
			this.buttonColumn.append(generateGinAndTonicButton);
			this.buttonColumn.append("<br />");
			this.buttonColumn.append(this.manhattanLabel);
			this.buttonColumn.append("<br />");
			this.buttonColumn.append(generateManhattanButton);
			this.buttonColumn.append("<br />");
			this.buttonColumn.append(this.martiniLabel);
			this.buttonColumn.append("<br />");
			this.buttonColumn.append(generateMartiniButton);
			this.buttonColumn.append("<br />");
			this.buttonColumn.append(this.muiTaiLabel);
			this.buttonColumn.append("<br />");
			this.buttonColumn.append(generateMuiTaiButton);
			this.buttonColumn.append("<br />");
			this.buttonColumn.append(this.daiquiriLabel);
			this.buttonColumn.append("<br />");
			this.buttonColumn.append(generateDaiquiriButton);
			this.buttonColumn.append("<br />");
			this.buttonColumn.append(this.fizzLabel);
			this.buttonColumn.append("<br />");
			this.buttonColumn.append(generateFizzButton);
			this.buttonColumn.append("<br />");
			//this isn't exactly optimal.  I need to draw up some wireframes for cocktails
			//this.buttonColumn.append(graphViewButton);
			//this.buttonColumn.append(startRun);
			//this.buttonColumn.append("<br />");
			
			generateOldFashionedButton.click(function () {
				var cocktail = ui.boundGenerator.generate(0);
				ui.publish(cocktail, 0);
			});
			
			generateMargaritaButton.click(function () {
				var cocktail = ui.boundGenerator.generate(1);
				ui.publish(cocktail, 1);
			});
			
			generateWhiteRussianButton.click(function() {
				var cocktail = ui.boundGenerator.generate(2);
				ui.publish(cocktail, 2);
			});
			
			generateGinAndTonicButton.click(function() {
				var cocktail = ui.boundGenerator.generate(3);
				ui.publish(cocktail, 3);
			});
			
			generateManhattanButton.click(function(){
				var cocktail = ui.boundGenerator.generate(4);
				ui.publish(cocktail, 4);
			});
			
			generateMartiniButton.click(function(){
				var cocktail = ui.boundGenerator.generate(5);
				ui.publish(cocktail, 5);
			});
			
			generateMuiTaiButton.click(function(){
				var cocktail = ui.boundGenerator.generate(6);
				ui.publish(cocktail, 6);
			});
			
			generateDaiquiriButton.click(function(){
				var cocktail = ui.boundGenerator.generate(7);
				ui.publish(cocktail, 7);
			});
			
			generateFizzButton.click(function(){
				var cocktail = ui.boundGenerator.generate(8);
				ui.publish(cocktail, 8);
			});
		},
		
		generateName : function(){
			var randAnimal = Math.floor(Math.random() * animals.length);
			var randAdj = Math.floor(Math.random() * adjectives.length);
			var name = adjectives[randAdj] + " " + animals[randAnimal];
			return name;
		},
		
		generateMixingText : function(cocktail, type){
			switch(type){
				case 0:
					// Old fashioned Textrendering
					var muddleText="";
					var syrupText="";
					var text;
					for(var i = 0; i < cocktail.length; i++){
						var symbol = cocktail[i];
						var location;
						if((location = symbol.symbol.search("muddle")) > -1){
							var text = symbol.symbol.substring(0, location-1);
							if(muddleText === ""){
								muddleText = "Muddle the " + text;
							}else{
								muddleText = muddleText + ", " + text;	
							}
						}else if((location = symbol.symbol.search("syrup")) > -1){
							var text = symbol.symbol.substring(0, location-1);
							if(syrupText === ""){
								syrupText = "Pour in the " + text;
							}else{
								syrupText = syrupText + ", " + text;
							}
						}
					};
					syrupText += " syrup";
					var finalText = "";
					//two big variants.  Either we're muddling things or we're not
					if(muddleText != ""){
						finalText += muddleText + " and bitters in the bottom of an Old Fashioned glass.  " + syrupText + ".  " + "Add " + cocktail[0].symbol
							+ " and ice and stir.";
					}else{
						finalText = syrupText + " and bitters in an Old Fashioned glass.  Add " + cocktail[0].symbol + " and ice and stir.";
					}
					return finalText;
					
				break;
				case 1:
					//Margarita Text Rendering.  Probably the easiest so far, it's always the same string.
					var finalText = "Pour all ingredients into a cocktail shaker with ice and shake for about 15 seconds.  Pour into a chilled cocktail glass.";
					return finalText;
				break;
				case 2:
					//White Russian Text Rendering.  It's the same for all the cocktails of this catagory
					var finalText = "Pour all ingredients into a cocktail shaker with ice and shake for about 30 seconds.  Pour into a chilled cocktail glass.";
					return finalText;
				break;
				case 3:
					//Gin and Tonic Text Rendering
					//binary case: if the listing has a strong, we want to use a high ball glass and stir.  Otherwise, we want to use a cocktail
					//shaker and shake
					var finalText = "";
					var liquorText = "";
					var sodaText = "";
					var highball = false;
					//if we have a symbol decended from a strong, then we're using a high ball glass.  Otherwise, we're not.
					for(i = 0; i < cocktail.length; i++){
						var topLevel = getTopLevelSymbol(cocktail[i]);
						if(topLevel.symbol == "strong"){
							highball = true;
							break;
						}
					}
					
					if(highball){
						for(i = 1; i < cocktail.length; i++){
							if(sodaText === ""){
								sodaText += cocktail[i].symbol.replace("-", " ");
							}else{
								sodaText += ", " + cocktail[i].symbol.replace("-", " ");;
							}
						}
						finalText = "Pour the " + cocktail[0].symbol + " into a highball glass filled with ice.  Then add the " + sodaText + " and stir.";
					}else{
						finalText = "Pour all ingredients into a cocktial shaker with ice and shake for about 15 seconds.  Strain into a chilled cocktail glass.";
					}
					return finalText;
				break;
				case 4:
					//Manhattan Text Rendering
					//This is a much simpler case, as it really all comes down to one line of text
					var finalText = "";
					var ingredientListing = "";
					var spiritText = "";
					for(i = 0; i < cocktail.length; i++){
						var location;
						if((location = cocktail[i].symbol.search("spirit")) > -1){
							spiritText = cocktail[i].symbol.substring(0, location-1);
							if(ingredientListing === ""){
								ingredientListing = spiritText;
							}else{
								ingredientListing = ingredientListing + ", " + spiritText;
							}
						}else{
							if(ingredientListing === ""){
								ingredientListing = cocktail[i].symbol;
							}else{
								ingredientListing = ingredientListing + ", " + cocktail[i].symbol;
							}
						}
					}
					console.log(ingredientListing);
					finalText = "Stir the " + ingredientListing + " with ice, and then strain into a chilled cocktail glass.";
					return finalText;
				break;
				case 5:
					//Martini Text Rendering
					//This is a much simpler case, as it really all comes down to one line of text
					var finalText = "";
					var ingredientListing = "";
					var spiritText = "";
					for(i = 0; i < cocktail.length; i++){
						var location;
						if((location = cocktail[i].symbol.search("spirit")) > -1){
							spiritText = cocktail[i].symbol.substring(0, location-1);
							if(ingredientListing === ""){
								ingredientListing = spiritText;
							}else{
								ingredientListing = ingredientListing + ", " + spiritText;
							}
						}else{
							if(ingredientListing === ""){
								ingredientListing = cocktail[i].symbol;
							}else{
								ingredientListing = ingredientListing + ", " + cocktail[i].symbol;
							}
						}
					}
					console.log(ingredientListing);
					finalText = "Stir the " + ingredientListing + " with ice, and then strain into a chilled cocktail glass.";
					return finalText;
				break;
				case 6:
					//Mai Tai text rendering
					var finalText = "Pour all ingredients into a cocktail shaker with ice and shake for about 15 seconds.  ";
					if(cocktail.length <= 4){
						finalText += "Strain into an ice-filled highball glass.";
					}else if (cocktail.length < 6){
						finalText += "Strain into an ice-filled Old Fashioned glass.";
					}else if(cocktail.length >= 5){
						if(Math.random() > 0.5){
							finalText += "Strain into an ice-filled Old Fashioned glass.";
						}else{
							finalText += "Strain into an ice-filled Collins or Hurricane glass.";
						}
					}
					//TODO: And, just for fun, lets throw in the option to float the dark liquors.
					
					return finalText;
				break;
				case 7:
					//Daiquiri Rendering
					var finalText = "Pour all ingredients into a cocktail shaker with ice and shake for about 15 seconds.  Pour into a chilled cocktail glass.";
					return finalText;
				break;
				case 8:
					//Mojio Rendering
					//TODO: Mojitos need a complete overhaul to handle champane cocktails and bucks.  However, I don't think that night will be
					//tonight.
					var finalText = "Fill a Colins glass with ice and pour in all ingredients, one at a time.";
					return finalText;
				break;
				default:
					throw "Unable to generate cocktail mixing instructoins, " + type + " not supported.";
				break;
			}
		},
		
		publish : function(cocktail, type) {
			var ui = this;
			ui.recipePanel.empty();
			
			//generate a name
			var name = this.generateName();
			
			ui.recipePanel.append(name);
			ui.recipePanel.append("<br />");
			
			cocktail.forEach(function(symbol){
				var partText;
				var partNum;
				if(symbol.part == 0){
					partText = "dashes of";
					partNum = "2-3";
				}else if(symbol.part == 1){
					partText = "part";
					
					partNum = parseFloat(symbol.part.toFixed(2));
				}else{
					partText = "parts";
					partNum = parseFloat(symbol.part.toFixed(2));
				}
				
				var symbolText;
				symbolText = symbol.symbol.replace("-", " ");
				
				var ingredient = $("<span />", {
					html : (partNum + "		" + partText + " " + symbolText)
				});
				
				ui.recipePanel.append(ingredient);
				ui.recipePanel.append("<br />");
			});
			console.log("What are we even passing in?");
			console.log(cocktail);
			var mixingText = this.generateMixingText(cocktail, type);
			ui.recipePanel.append(mixingText);
		}
	});
	
	return generatorUI;
});
