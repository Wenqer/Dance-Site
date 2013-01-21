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
    template: "article/all",
    className: "window",

    initialize: function() {
      this.collection.on("reset", this.render, this);
    },

    serialize: function() {
      return {sectionName: this.options.sectionName};
    },

    beforeRender: function() {
      var collection = this.collection,
          lang = this.options.lang,
          catid = this.options.catid;

      //фильтруем язык
      if (!_(lang).isUndefined()){
        if (lang == "ru")
          lang = "ru-RU";
        else
          lang = "en-GB";
        collection = new Backbone.Collection(
          collection.where({
            "language": lang
          })
        ).
        add(
          collection.where({
            "language": "*"
          })
        );
      }
      //если указан параметр категории, то фильтруем выдачу
      if(!_(catid).isUndefined()){
        collection = new Backbone.Collection(
          collection.where({
            "catid": catid
          })
        );

        var childs = new Backbone.Collection(this.collection.filter(function(model) {
          var cat = model.get("category");
          return cat.parent == catid;
        }));
      }

      if (!_(childs).isUndefined()){
        childs.each(function(item) {
          this.insertView("section", new Article.Views.Item({
            model: item,
            tagName: "article",
            template: this.options.itemParentTemplate,
            className: this.options.itemClass
          }));
        }, this);
      }

      collection.each(function(item){
        this.insertView("section", new Article.Views.Item({
          model: item,
          tagName: "article",
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

      // initialize: function() {
      //     this.model.on('change', this.render, this);
      // },

      serialize: function() {
        return this.model.toJSON();
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
            this.insertView("ul", new Article.Views.Item({
              model: item,
              template: "article/windowItem",
              tagName: "li",
              className: "window-item"
            }));
          }, this);
      }
  });

  // Return the module for AMD compliance.
  return Article;

});