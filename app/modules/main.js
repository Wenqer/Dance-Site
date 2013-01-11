// Main module
define([
  // Application.
  "app",
  "backbone"
  // ,"module/news"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Main = app.module();

  // Default Model.
  Main.Model = Backbone.Model.extend({
    initialize: function() {
      var now = new Date().getMonthName();
      this.set("month", now);
    }
  });

  // Default Collection.
  Main.Collection = Backbone.Collection.extend({
    model: Main.Model
  });

  // Default View.
  Main.Views.Index = Backbone.View.extend({
    template: "main",
    className: "main",

    serialize: function() {
      return this.model.toJSON();
    },

    afterRender: function() {
      var now = new Date().getMonthName();
      app.log(now);
      $("#month").text(now);
    }
  });


  // Return the module for AMD compliance.
  return Main;

});
