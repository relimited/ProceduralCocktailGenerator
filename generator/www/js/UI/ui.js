/**
 * User interface for my website thing
 * 
 * @author Johnathan Pagnutti 
 */
define(["inheritance", "./graphView", "./testView", "./generatorView", "jQueryUI"], function(Inheritance, GraphView, TestView, GeneratorView, jQueryUI) {'use strict';
	
	var UI = Class.extend({
		
		/**
		 * Build the UI
		 */
		init : function(parentHolder, generator) {
			console.log("BUILDING UI");
			
			this.boundGenerator = generator;
			this.parentHolder = parentHolder;
			
		},
		
		/**
		 * Bind a runner to this UI
 		 * @param {Object} runner the runner to bind
		 */
		bindRunner : function(runner) {
			this.boundRunner = runner;
		},
		
		buildGraphView : function(){
			this.graphDiv.empty();
			var graphView = new GraphView(this.graphDiv, this);
			graphView.initUI();
		},
		
		buildTestView : function(data, link){
			this.testDiv.empty();
			var testView = new TestView(this.testDiv, this, data, link);
		},
		
		buildGeneratorView : function(){
			this.generatorDiv.empty();
			var generatorView = new GeneratorView(this.generatorDiv, this);
		},
		
		buildBlackListView : function(){
			this.blackListDiv.empty();
			var blackListView = new blackListView(this.blacklistDiv, this);
		},
		
		/*
		 * put it all together
		 */
		buildMainUI : function(){
			var tabs = $("<div />", {
				id : "tabs"
			});
			
			this.generatorDiv = $("<div />", {
				"id" : "tabs-1"	
			});
			
			this.blacklistDiv = $("<div />", {
				"id" : "tabs-2"
			});
			
			this.graphDiv = $("<div />", {
				"id" : "tabs-3"
			});
			
			var generatorLink = $("<a />", {
				"html" : "Generator",
				"href" : "#tabs-1"
			});
			var blacklistLink = $("<a />", {
				"html" : "Blacklist",
				"href" : "#tabs-2"
			});
			var graphLink = $("<a />", {
				"html" : "Graph",
				"href" : "#tabs-3"
			});
			var list = $("<ul />");
			
			var generatorLineItem = $("<li />");
			generatorLineItem.append(generatorLink);
			list.append(generatorLineItem);
			
			//var blacklistLineItem = $("<li />");
			//blacklistLineItem = blacklistLineItem.append(blacklistLink);
			//list.append(blacklistLineItem);
			
			var graphLineItem = $("<li />");
			graphLineItem.append(graphLink);
			list.append(graphLineItem);
			
			tabs.append(list);
			tabs.append(this.generatorDiv);
			tabs.append(this.graphDiv);
			//tabs.append(this.blacklistDiv);
			
			this.parentHolder.append(tabs);
			this.buildGeneratorView();
			this.buildGraphView();
			$("#tabs").tabs();
			
		}
		
	});
	 
	return UI;
});
