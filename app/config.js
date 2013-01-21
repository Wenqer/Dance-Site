// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file and the JamJS
  // generated configuration file.
  deps: ["../vendor/jam/require.config", "main"],

  paths: {
    moment: "../vendor/js/libs/moment",
    rudate: "../vendor/js/libs/lang/ru",
    lightbox: "../vendor/js/lightbox"
  },

  shim: {
    lightbox: {
      deps: ['jquery']
    },
    rudate: {
      deps: ['moment']
    }
  }

});
