define(['exports', 'lodash', 'aurelia-framework', 'aurelia-dependency-injection', 'aurelia-fetch-client', './collection'], function (exports, _lodash, _aureliaFramework, _aureliaDependencyInjection, _aureliaFetchClient, _collection) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Config = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  function ObjectCreator(data) {
    return _lodash._.cloneDeep(data);
  }

  var Config = exports.Config = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Aurelia, _aureliaFetchClient.HttpClient), _dec(_class = function () {
    function Config(aurelia, httpClient) {
      _classCallCheck(this, Config);

      this.collections = {};
      this.defaultCollection = null;

      this.aurelia = aurelia;
      this.container = _aureliaDependencyInjection.Container.instance;
      this.httpClient = httpClient;
    }

    Config.prototype.registerCollection = function registerCollection(key, defaultRoute) {
      var collection = arguments.length <= 2 || arguments[2] === undefined ? _collection.Collection : arguments[2];
      var modelClass = arguments.length <= 3 || arguments[3] === undefined ? ObjectCreator : arguments[3];
      var modelid = arguments.length <= 4 || arguments[4] === undefined ? '_id' : arguments[4];

      var c = this.container.invoke(collection);
      this.collections[key] = c;
      c.configure(key, modelClass, defaultRoute, modelid);

      this.collections[key]._setHttpClient(this.httpClient);

      return c;
    };

    Config.prototype.getCollection = function getCollection(key) {
      if (!key) {
        return this.defaultCollection || null;
      }

      return this.collections[key] || null;
    };

    Config.prototype.collectionExists = function collectionExists(key) {
      return !!this.collections[key];
    };

    Config.prototype.setDefaultCollection = function setDefaultCollection(key) {
      this.defaultCollection = this.getCollection(key);

      return this;
    };

    return Config;
  }()) || _class);
});