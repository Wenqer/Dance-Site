define([
  // Application.
  "app",

  // Modules.
  //"modules/example",
  "modules/main",
  "modules/news"
],

function(app, Main, News) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    initialize: function() {
      var collections = {
        news: new News.Collection()
      };

      _(this).extend(collections);
    },

    routes: {
      "": "index",
      "news": "showNews",
      "news/:id": "getNews",
      "help": "help"
    },

    index: function() {
      // Create a layout and associate it with the #main div.
      // var layout = new Backbone.Layout({
      //   el: "#main"
      // });

      // Insert the tutorial into the layout.
      // layout.insertView(new Example.Views.Tutorial());
      $("#window").empty();
      app.useLayout("main").setView(new Main.Views.Index()).render();


      
      // Render the layout into the DOM.
    },

    showNews: function(id) {
      var windowLayout = new Backbone.Layout({
        el: "#window"
      });


      this.news.fetch();
      app.useLayout("main").
      //setView(new Main.Views.Index()).
      //setView(new News.Views.All()).
      render();

      windowLayout.setView(new News.Views.All({
        collection: this.news
      })).render();

    }// ,

    // help: function() {
    //   app.useLayout("main").setView(new Example.Views.Tutorial()).render();
    // }
  });

  return Router;

});
