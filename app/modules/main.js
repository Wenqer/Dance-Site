// Main module
define([
  // Application.
  "app",
  "backbone"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Main = app.module();

  // Default Model.
  Main.Model = Backbone.Model.extend({
  
  });

  // Default Collection.
  Main.Collection = Backbone.Collection.extend({
    model: Main.Model
  });

  // Default View.
  Main.Views.Index = Backbone.View.extend({
    template: "main",
    className: "main"
  });


  // Return the module for AMD compliance.
  return Main;

});
