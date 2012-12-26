// Window module
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Window = app.module();

  // Default Model.
  Window.Model = Backbone.Model.extend({
  
  });

  // Default Collection.
  Window.Collection = Backbone.Collection.extend({
    model: Window.Model
  });

  // Default View.
  Window.Views.Layout = Backbone.Layout.extend({
    template: "window",
    className: "window"
  });

  // Return the module for AMD compliance.
  return Window;

});
