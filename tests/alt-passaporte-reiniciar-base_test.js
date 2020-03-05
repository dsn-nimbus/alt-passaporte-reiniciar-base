"use strict";

describe('alt.passaporte-reiniciar-base', function() {
  var _rootScope, _httpBackend, _locationMock;
  var _AltPassaporteReiniciarBase;
  var _AltPassaporteReiniciarBaseProvider;
  var URL_DEV = 'https://erpforme-dev.alterdata.com.br/passaporte-rest-api/rest/assinantes/123/reiniciar-base/abc123'
  var URL_HML = 'https://erpforme-hml.alterdata.com.br/passaporte-rest-api/rest/assinantes/123/reiniciar-base/abc123'

  beforeEach(module('alt.passaporte-reiniciar-base', function(AltPassaporteReiniciarBaseProvider) {
    _AltPassaporteReiniciarBaseProvider = AltPassaporteReiniciarBaseProvider;
    _AltPassaporteReiniciarBaseProvider.CHAVE_PRODUTO = 'abc123';
  }));

  beforeEach(inject(function($injector) {
    _rootScope = $injector.get('$rootScope');
    _httpBackend = $injector.get('$httpBackend');
    _locationMock = $injector.get('$location');

    _AltPassaporteReiniciarBase = $injector.get('AltPassaporteReiniciarBase');
  }));

  describe('provider', function() {
    it('deve ter URL_BASE com a informação correta', function() {
      expect(_AltPassaporteReiniciarBaseProvider.URL_BASE).toEqual('https://erpforme-dev.alterdata.com.br');
    })

    it('deve ter CHAVE_PRODUTO com a informação correta', function() {
      expect(_AltPassaporteReiniciarBaseProvider.CHAVE_PRODUTO).toEqual('abc123');
    })
  })

  describe('service', function() {
    describe('reiniciar', function() {
      it('deve tentar enviar as informações, mas service retorna erro - idAssinante não informado', function() {
        var _idAssinante = undefined;

        _AltPassaporteReiniciarBase.reiniciar(_idAssinante)
          .then(function() {
            expect(true).toBe(false)
          })
          .catch(function(erro) {
            expect(erro).toBeDefined()
            expect(erro.message).toBe('Id do assinante deve ser informado.')
            expect(erro instanceof TypeError).toBe(true)
          })

        _rootScope.$digest()
      })

      it('deve tentar enviar as informações, mas service retorna erro - url do passaporte é de produção - só deve funcionar em hml ou dev', function() {
        var _idAssinante = 123;

        _AltPassaporteReiniciarBaseProvider.URL_BASE = 'https://erpforme.alterdata.com.br';

        _AltPassaporteReiniciarBase.reiniciar(_idAssinante)
          .then(function() {
            expect(true).toBe(false)
          })
          .catch(function(erro) {
            expect(erro).toBeDefined()
            expect(erro.message).toBe('Só é possível usar esta funcionalidade em dev ou hml.')
            expect(erro instanceof Error).toBe(true)
          })

        _rootScope.$digest()
      })

      it('deve enviar as informações corretamente - mas servidor retorna erro', function() {
        var _idAssinante = 123;

        _AltPassaporteReiniciarBaseProvider.URL_BASE = 'https://erpforme-dev.alterdata.com.br';

        _httpBackend.expectDELETE(URL_DEV).respond(403, {msg: 'a'})

        _AltPassaporteReiniciarBase.reiniciar(_idAssinante)
          .then(function() {
            expect(true).toBe(false)
          })
          .catch(function(erro) {
            expect(erro).toBeDefined()
            expect(erro.data.msg).toEqual('a')
          })

        _httpBackend.flush()
      })

      it('deve enviar as informações corretamente - dev', function() {
        var _idAssinante = 123;

        _AltPassaporteReiniciarBaseProvider.URL_BASE = 'https://erpforme-dev.alterdata.com.br';

        _httpBackend.expectDELETE(URL_DEV).respond(200)

        _AltPassaporteReiniciarBase.reiniciar(_idAssinante)
          .then(function() {
            expect(true).toBe(true)
          })
          .catch(function(erro) {
            expect(true).toBe(false)
          })

        _httpBackend.flush()
      })

      it('deve enviar as informações corretamente - hml', function() {
        var _idAssinante = 123;

        _AltPassaporteReiniciarBaseProvider.URL_BASE = 'https://erpforme-hml.alterdata.com.br';

        _httpBackend.expectDELETE(URL_HML).respond(200)

        _AltPassaporteReiniciarBase.reiniciar(_idAssinante)
          .then(function() {
            expect(true).toBe(true)
          })
          .catch(function(erro) {
            expect(true).toBe(false)
          })

        _httpBackend.flush()
      })
    })
  });
});
