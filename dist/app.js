'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _reactSimpleDi = require('react-simple-di');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function () {
  function App(context) {
    (0, _classCallCheck3.default)(this, App);

    if (!context) {
      var message = 'Context is required when creating a new app.';
      throw new Error(message);
    }

    this.context = context;
    this.actions = {};
    this.services = {};
    this._routeFns = [];
  }

  (0, _createClass3.default)(App, [{
    key: 'loadModule',
    value: function loadModule(module) {
      this._checkForInit();

      if (!module) {
        var message = 'Should provide a module to load.';
        throw new Error(message);
      }

      if (module.__loaded) {
        var _message = 'This module is already loaded.';
        throw new Error(_message);
      }

      if (module.routes) {
        if (typeof module.routes !== 'function') {
          var _message2 = 'Module\'s routes field should be a function.';
          throw new Error(_message2);
        }

        this._routeFns.push(module.routes);
      }

      var actions = module.actions || {};
      this.actions = (0, _extends3.default)({}, this.actions, actions);

      var services = module.services || {};
      this.services = (0, _extends3.default)({}, this.services, services);

      if (module.load) {
        if (typeof module.load !== 'function') {
          var _message3 = 'module.load should be a function';
          throw new Error(_message3);
        }
        module.load(this.context);
      }

      module.__loaded = true;
    }
  }, {
    key: 'init',
    value: function init() {
      var _this = this;

      this._checkForInit();

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(this._routeFns), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var routeFn = _step.value;

          var inject = function inject(comp) {
            return (0, _reactSimpleDi.injectDeps)(_this.context, _this.actions, _this.services)(comp);
          };

          routeFn(inject, this.context, this.actions, this.services);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this._routeFns = [];
      this.__initialized = true;
    }
  }, {
    key: '_checkForInit',
    value: function _checkForInit() {
      if (this.__initialized) {
        var message = 'App is already initialized';
        throw new Error(message);
      }
    }
  }]);
  return App;
}();

exports.default = App;
