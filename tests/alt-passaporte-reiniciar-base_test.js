"use strict";

describe('alt.passaporte-reiniciar-base', function() {
  var _rootScope, _httpBackend;
  var _AltPassaporteReiniciadorBase;

  beforeEach(module('alt.passaporte-reiniciar-base'));

  beforeEach(inject(function($injector) {
    _rootScope = $injector.get('$rootScope');
    _httpBackend = $injector.get('$httpBackend');

    _AltPassaporteReiniciadorBase = $injector.get('AltPassaporteReiniciadorBasePassaporte');
  }));

  describe('provider', function() {
    it('deve ter URL_BASE com a informação correta', function() {
      expect(_AltPassaporteReiniciadorBase.URL_BASE).toEqual('https://passaporte2-dev.alterdata.com.br');
    })
  })

  describe('service', function() {
    describe('reiniciar', function() {
      it('deve', function() {

      })
    })
  });
});
