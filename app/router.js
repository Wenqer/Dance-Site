define([
  // Application.
  "app",

  // Modules.
  "modules/main",
  "modules/article"
],

function(app, Main, Article) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    initialize: function() {
      var collections = {
        articles: new Article.Collection()
      };

      _(this).extend(collections); //разширяем роутер колекциями


      this.promise = $.when(this.articles.fetch());

      app.
      useLayout("main").
      setView(new Main.Views.Index({
        model: new Main.Model(),
        views: {
          "#news-player": new Article.Views.Window({
            collection: this.articles
          })
        }
      })).
      render();

      this.windowLayout = new Backbone.Layout({
        el: "#window"
      });

      this.lateRenderItem = function(id, options) {
        var self = this;
        return this.promise.done(function() {
          var model = {model: self.articles.get(id)};
          _(options).extend(model);
          self.windowLayout.setView(new Article.Views.Item(options)).render();
        });
      };

      this.renderItems = function(id, options) {
        var  self = this;
        return this.promise.done(function() {
        var defaults = {
            catid: id,
            collection: self.articles
          };
          _(options).extend(defaults);
          app.log(options);
          self.windowLayout.setView(new Article.Views.All(options)).render();
        });
      };
    },

    routes: {
      "": "index",
      "vanya": "showVanya",
      "tanya": "showTanya",
      "contacts": "showContacts",

      "news": "showNews",
      "news/:id": "showNewsId",

      "video": "showVideo",
      "video/:id": "showVideoId",

      "gallery": "showGallery",
      "gallery/:id": "showGalleryId"
    },

    index: function() {
      //cleaning previous views
      $("#window").empty();
    },

    showVanya: function() {
      this.lateRenderItem(
        2,
        {
          template: "article/item"
        }
      );
    },

    showTanya: function() {
      this.lateRenderItem(
        3,
        {
          template: "article/item"
        }
      );
    },

    showContacts: function() {
      this.lateRenderItem(
        17,
        {
          template: "article/item"
        }
      );
    },

    showNews: function() {
      // this.windowLayout.setView(new Article.Views.All({
      //   collection: this.articles,
      //   template: "article/all",
      //   sectionName: "Новости",
      //   itemTemplate: "article/preview",
      //   itemClass: "preview-item",
      //   catid: "1"
      // })).render();
      this.renderItems(
        "1",
        {
          sectionName: "Новости",
          itemTemplate: "article/preview",
          itemClass: "preview-item"
        }
      );
    },

    showNewsId: function(id) {
      // var self = this;
      // this.promise.done(function() {
      //   self.windowLayout.setView(new Article.Views.Item({
      //     model: self.articles.get(id),
      //     template: "article/item"
      //   })).render();
      // });
      this.lateRenderItem(
        id,
        {
          template: "article/item"
        }
      );
    },

    showVideo: function() {
      this.renderItems(
        "3",
        {
          sectionName: "Видео",
          itemTemplate: "article/videoItem",
          itemClass: "preview-video"
        }
      );
    },

    showVideoId: function(id) {
      this.lateRenderItem(
        id,
        {
          template: "article/item",
          className: "window-small"
        }
      );
    },

    showGallery: function() {
      this.renderItems(
        "4",
        {
          sectionName: "Галерея",
          itemTemplate: "article/imageItem",
          itemClass: "preview-image"
        }
      );
    },

    showGalleryId: function(id) {
      this.lateRenderItem(
        id,
        {
          template: "article/imageBox",
          className: "window-sized"
        }
      );
    }
  });

  return Router;

});
