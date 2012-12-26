// News module
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var News = app.module();

  // Default Model.
  News.Model = Backbone.Model.extend({
  
  });

  // Default Collection.
  News.Collection = Backbone.Collection.extend({
    model: News.Model,
    url: "http://vanya-tanya.com/index2.php?option=com_k2&view=itemlist&layout=category&catid=1&format=json",
    parse: function(resp) {
      return resp.items;
    }
  });


  // All News View.
  News.Views.All = Backbone.View.extend({
    template: "news/all",
    className: "window",

    initialize: function() {
      this.collection.on("reset", this.render, this);
    },

    beforeRender: function() {
      //app.log(this.collection);
      this.collection.each(function(item){
        //app.log(item.toJSON());
        this.insertView("section", new News.Views.Preview({
          model: item
        }));
      }, this);
    }

  });
  // preview News
  News.Views.Preview = Backbone.View.extend({

      template: "news/preview",

      tagName: "article",

      className: "preview-item",
  
      events: {
      },

      serialize: function() {
        return this.model.toJSON();
      },
  
      initialize: function() {
          this.model.on('change', this.render, this);
          //app.log(this.model.toJSON());
          //this.render();
      },

      beforeRender: function() {
       //app.log(this.model.toJSON());
      }
  });

  // Return the module for AMD compliance.
  return News;

});
