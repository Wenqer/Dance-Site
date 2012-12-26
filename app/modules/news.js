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
    url: "/index2.php?option=com_k2&view=itemlist&task=category&id=1&format=json",
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
      this.collection.each(function(item){
        this.insertView("section", new News.Views.Preview({
          model: item
        }));
      }, this);
    }

  });
  // News Item View
  News.Views.Item = Backbone.View.extend({
      template: "news/item",
      className: "window",
  
      initialize: {
        //this.collection.on("reset", this.)
      },
  
      serialize: function() {
        //return this.model.toJSON();
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


  // News Window View
  News.Views.Window = Backbone.View.extend({
      template: "news/window",

      className: "window-inner",
  
      initialize: function() {
          this.collection.on('reset', this.render, this);
      },
  
      beforeRender: function() {
        var collection = new Backbone.Collection(this.collection.first(3));
          collection.each(function(item) {
            this.insertView("ul", new News.Views.WindowItem({
              model: item
            }));
          }, this);
      }
  });

  // News Window Item View
  News.Views.WindowItem = Backbone.View.extend({
    
      template: "news/windowItem",

      tagName: "li",

      events: {
      },
  
      initialize: function() {
          this.model.on('change', this.render, this);
      },

      serialize: function() {
        return this.model.toJSON();
      }
  });

  // Return the module for AMD compliance.
  return News;

});
