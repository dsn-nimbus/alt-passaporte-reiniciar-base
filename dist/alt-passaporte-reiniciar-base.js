;(function(ng) {
  "use strict";

  ng.module('alt.passaporte-reiniciar-base', [])
    .provider('AltPassaporteReiniciarBase', [function() {
      var self = this;

      self.URL_BASE = 'https://erpforme-dev.alterdata.com.br';
      self.CHAVE_PRODUTO = '';

      this.$get = ['$http', '$q', function($http, $q) {
        return {
          reiniciar: function(idAssinante) {
            var URL_DEL = self.URL_BASE + '/passaporte-rest-api/rest/assinantes/' + idAssinante + '/reiniciar-base/' + self.CHAVE_PRODUTO;

            if (ng.isUndefined(idAssinante)) {
              return $q.reject(new TypeError('Id do assinante deve ser informado.'));
            }

            if (!(/erpforme(-dev|-hml)/.test(self.URL_BASE))) {
              return $q.reject(new Error('Só é possível usar esta funcionalidade em dev ou hml.'));
            }

            return $http['delete'](URL_DEL);
          }
        };
      }];
    }]);
}(window.angular));
