;(function(ng) {
  "use strict";

  // DELETE
  // /passaporte-rest-api/assinantes/:idAssinante/reiniciar-base/:chaveProduto

  ng.module('alt.passaporte-reiniciar-base', [])
    .provider('AltPassaporteReiniciadorBasePassaporte', [function() {
      this.URL_BASE = 'https://passaporte2-dev.alterdata.com.br';

      this.$get = [function() {
        
      }];
    }]);
}(window.angular));
