/**
 *Using require.js for module loading
 * 
 * @author Johnathan Pagnutti 
 */

require.config({
    paths : {
        'jQuery' : 'vendor/jquery-1.11.0.min',
        'jQueryUI' : 'vendor/jquery-ui',
        'inheritance' : 'vendor/inheritance',
        'd3' : 'vendor/d3.min',
        'fisheye' : 'vendor/fisheye'
    },
    shim : {
        'jQueryUI' : {
            exports : '$',
            deps : ['jQuery']
        },
        'd3' : {
        	exports : 'd3'
        },
        'fisheye' : {
        	exports : 'fisheye',
        	deps: ['d3']
        }
    }
});

require(["./index", "./modules/app"], function(App, InnerApp) {
    App.initialize();
    //It seems like, at this point, we'll need to write some way to fire up the app for browsers.
    //Because Cordova doesn't always play nice, aparently.
    console.log("Cordova loaded");
    //FIXME: in the future, this is probably how I'll load sepearte UIs for the web version and the cell version
    //If cordova never built the dom because we're in a browser, then LETS BUILD A COCKTAIL APP 
    if($(".button_pannel").length == 0){
        var webVersion = new InnerApp();
        webVersion.start();
    }
});
