define([
  // Application.
  "app",

  // Modules.
  //"modules/example",
  "modules/main",
  "modules/article"//,
  //"modules/news"
],

function(app, Main, Article) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    initialize: function() {
      var collections = {
        //news: new News.Collection(),
        articles: new Article.Collection(),
        option: new Main.Model()
      };

      _(this).extend(collections); //разширяем роутер колекциями

      //this.news.fetch();

      this.promise = $.when(this.articles.fetch());
      // app.log(this.promise);
      // this.promise.done(function() {app.log("test!");});
      // this.promise.done(function() {app.log(this.promise);});

      app.
      useLayout("main").
      setView(new Main.Views.Index({
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
    },

    routes: {
      "": "index",
      "vanya": "showVanya",
      "tanya": "showTanya",

      "news": "showNews",
      "news/:id": "showNewsId",

      "video": "showVideo",
      "video/:id": "showVideoId",
      
      "help": "help"
    },

    //options: {},

    index: function() {
      // Create a layout and associate it with the #main div.
      // var layout = new Backbone.Layout({
      //   el: "#main"
      // });

      // Insert the tutorial into the layout.
      // layout.insertView(new Example.Views.Tutorial());
      $("#window").empty();
    },

    showVanya: function() {
      this.option.set({"itemid": 2});
      this.windowLayout.setView(new Article.Views.Item({
        collection: this.articles,
        template: "article/item"
      }));
      var self = this;
      this.promise.done(function() {
          self.windowLayout.render();
      });
    },

    showTanya: function() {
      this.option.set({"itemid": 3});
      this.windowLayout.setView(new Article.Views.Item({
        collection: this.articles,
        template: "article/item"
      }));
      var self = this;
      this.promise.done(function() {
          self.windowLayout.render();
      });
    },

    showNews: function() {
      this.option.set({"catid": "1"});
      this.windowLayout.setView(new Article.Views.All({
        collection: this.articles,
        template: "article/all",
        itemTemplate: "article/preview"
      })).render();
    },

    showNewsId: function(id) {
      //app.log(this.news.get(id));
      this.option.set("itemid",id);
      this.windowLayout.setView(new Article.Views.Item({
        collection: this.articles,
        template: "article/item"
      }));
      var self = this;
      this.promise.done(function() {
          self.windowLayout.render();
      });

    },

    showVideo: function() {
      this.option.set({"catid": "3"});
      this.windowLayout.setView(new Article.Views.All({
        collection: this.articles,
        template: "article/videos",
        itemTemplate: "article/videoItem",
        itemClass: "preview-video"
      })).render();
    },

    showVideoId: function(id) {
      //app.log(this.news.get(id));
      this.option.set("itemid",id);
      this.windowLayout.setView(new Article.Views.Item({
        collection: this.articles,
        template: "article/item",
        className: "window-small"
      }));
      var self = this;
      this.promise.done(function() {
          self.windowLayout.render();
      });
    },

    admin: function() {
      window.location = "http://vanya-tanya.com/administrator/index.php";
    }

    // help: function() {
    //   app.useLayout("main").setView(new Example.Views.Tutorial()).render();
    // }
  });

  return Router;

});
