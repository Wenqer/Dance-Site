// Article module
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Article = app.module();

  // Default Model.
  Article.Model = Backbone.Model.extend({

  });

  // Default Collection.
  Article.Collection = Backbone.Collection.extend({
    model: Article.Model,
    url: "http://vanya-tanya.com/index2.php?option=com_k2&view=itemlist&layout=category&format=json",
    initialize: function() {
      this.on("fetch", app.setLoading);
      this.on("reset", app.clearLoading);
    },

    parse: function(response) {
      var resp = response.items;
      //чистим видео от тегов ютуба
      _(resp).map( function( value, key, resp ) {
        if (!_(value.video).isNull())
          value.video = value.video.replace(/\{\/?youtube\}/g, "");
        return value;
      });
      return resp;
    }
  });


  // All Article View.
  Article.Views.All = Backbone.View.extend({
    //template: "article/all",
    className: "window",

    initialize: function() {
      this.collection.on("reset", this.render, this);
    },

    beforeRender: function() {
      var collection = this.collection;

      //если указан параметр категории, то фильтруем выдачу
      if(!_(app.router.option.get("catid")).isUndefined()){
        collection = new Backbone.Collection(
          this.collection.where({
            "catid":app.router.option.get("catid")
          })
        );
      }

      collection.each(function(item){
        this.insertView("section", new Article.Views.Preview({
          model: item,
          template: this.options.itemTemplate,
          className: this.options.itemClass
        }));
      }, this);
    }

  });
  // Article Item View
  Article.Views.Item = Backbone.View.extend({
      // template: "article/item",
      className: "window",
  
      initialize: function() {
        this.collection.on("reset", this.render, this);
        
        //if (this.collection.length > 0){
          //app.router.option.on("change", function() {return app.log(this);});
          // app.router.on("route:showNewsId", this.render, this);
          //this.render();
        //}
        // app.log(this.template);
      },

      serialize: function() {
        // var video = this.collection.get(app.router.option.get("itemid")).toJSON().video,
        //     videoId = video.replace(/\{\/?youtube\}/g, "");
        //app.log(videoId);
        return this.collection.get(app.router.option.get("itemid")).toJSON();
      }
  });
  // preview Article
  Article.Views.Preview = Backbone.View.extend({

      //template: "article/preview",

      tagName: "article",

      className: "preview-item",
  
      serialize: function() {
        return this.model.toJSON();
      },
  
      initialize: function() {
          this.model.on('change', this.render, this);
          //app.log(this.model.toJSON());
          //this.render();
      }
  });


  // Article Window View
  Article.Views.Window = Backbone.View.extend({
      template: "article/window",

      className: "window-inner",
  
      initialize: function() {
          this.collection.on('reset', this.render, this);
      },
  
      beforeRender: function() {
        var collection = new Backbone.Collection(_(this.collection.toJSON()).chain().where({"catid":"1"}).first(3).value());
          collection.each(function(item) {
            this.insertView("ul", new Article.Views.WindowItem({
              model: item
            }));
          }, this);
      }
  });

  // Article Window Item View
  Article.Views.WindowItem = Backbone.View.extend({
    
      template: "article/windowItem",

      tagName: "li",
  
      initialize: function() {
          this.model.on('change', this.render, this);
      },

      serialize: function() {
        return this.model.toJSON();
      }
  });

  // Return the module for AMD compliance.
  return Article;

});