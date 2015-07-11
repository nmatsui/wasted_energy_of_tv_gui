requirejs.config({
  "baseUrl": "js/lib",
  "paths": {
    "app": "../app",
    "jquery": "jquery-1.11.3.min",
    "bootstrap": "bootstrap-3.3.5.min",
    "datepicker": "bootstrap-datepicker.min",
    "jcanvas": "jcanvas.min"
  },
  "shim": {
    "bootstrap": ["jquery"],
    "datepicker" : ["bootstrap"],
    "jcanvas" : ["jquery"]
  }
});

requirejs(["app/main"]);
