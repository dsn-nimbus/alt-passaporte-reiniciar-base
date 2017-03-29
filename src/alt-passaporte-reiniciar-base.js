;(function(ng) {
  "use strict";

  ng.module('alt-passaporte-reiniciar-base', [])
    .service('GreetingService', [function GreetingService() {
        this.sayHello = function() {
           return "hello there!";
        };
    }]);
}(window.angular));
