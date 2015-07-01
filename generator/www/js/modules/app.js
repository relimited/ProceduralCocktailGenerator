/**
 * This is the core class of the app-- this works as sort of the controller in the MVC pattern
 * 
 *@author Johnathan Pagnutti 
 */

define(["inheritance", "./model/cocktailGenerator", "../UI/ui", "./runner"], function(Inheritance, CocktailGenerator, UI, Runner) {'use strict';
	
	var App = Class.extend({
		
		init : function () {
			console.log("App init");
			var app = this;
			
			//for debugging, to see where errors are being thrown S
			this.className = "App";
			
			//This is the 'view'
			app.mainCanvas = $("#app");
			
			//Instantiate the generator
			this.cocktailGenerator = new CocktailGenerator();
			
			//Instaniate the UI
			this.ui = new UI(app.mainCanvas, this.cocktailGenerator);
			
			//create a runner
			this.runner = new Runner(this.cocktailGenerator);
			
			this.ui.bindRunner(this.runner);
		},
		
		/**
		 *Starts the web app.  The objects needed to run should have been initalized by now, so this more or less just fires off
		 * run methods.
		 * 
		 * Or, rather, it would if we had any.  Right now, this is mostly just a placeholder method...
		 * @author Johnathan Pagnutti 
		 */
		start : function() {
			console.log("Started the madness");
			this.ui.buildMainUI();
		},	
	});
	
	return App;
}); 
