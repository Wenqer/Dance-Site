define([
  "backbone.layoutmanager"
], function() {

  //Patch Date to get month name
  Date.prototype.getMonthName = function() {
    var monthNames = [ "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December" ];
    return monthNames[this.getMonth()];
  };
  // Patch collection fetching to emit a `fetch` event.
  Backbone.Collection.prototype.fetch = function() {
    var fetch = Backbone.Collection.prototype.fetch;

    return function() {
      this.trigger("fetch");

      return fetch.apply(this, arguments);
    };
  }();

  // Provide a global location to place configuration settings and module
  // creation.
  app = {
    // The root path to run the application.
    root: "/"
  };

  // Localize or create a new JavaScript Template object.
  var JST = window.JST = window.JST || {};

  // Configure LayoutManager with Backbone Boilerplate defaults.
  Backbone.LayoutManager.configure({
    // Allow LayoutManager to augment Backbone.View.prototype.
    manage: true,

    prefix: "app/templates/",

    fetch: function(path) {
      // Concatenate the file extension.
      path = path + ".html";

      // If cached, use the compiled template.
      if (JST[path]) {
        return JST[path];
      }

      // Put fetch into `async-mode`.
      var done = this.async();

      // Seek out the template asynchronously.
      $.get(app.root + path, function(contents) {
        done(JST[path] = _.template(contents));
      });
    }
  });

  // Mix Backbone.Events, modules, and layout management into the app object.
  return _.extend(app, {
    debug: true,

    log: function(obj) {
      if (this.debug)
        return console.log(obj);
    },
    
    setLoading: function() {
     $("body").addClass("loading");
      // return this.log($("body"));
    },

    clearLoading: function() {
      $("body").removeClass("loading");
    },

    // Create a custom object with a nested Views object.
    module: function(additionalProps) {
      return _.extend({ Views: {} }, additionalProps);
    },

    // Helper for using layouts.
    useLayout: function(name, options) {
      // Enable variable arity by allowing the first argument to be the options
      // object and omitting the name argument.
      if (_.isObject(name)) {
        options = name;
      }

      // Ensure options is an object.
      options = options || {};

      // If a name property was specified use that as the template.
      if (_.isString(name)) {
        options.template = name;
      }

      // Create a new Layout with options.
      var layout = new Backbone.Layout(_.extend({
        el: "#main"
      }, options));

      // Cache the refererence.
      return this.layout = layout;
    }
  }, Backbone.Events);

});
