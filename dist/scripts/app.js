'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Twitch = require('./Twitch');

var _Twitch2 = _interopRequireDefault(_Twitch);

var _Streamer = require('./Streamer');

var _Streamer2 = _interopRequireDefault(_Streamer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);
  }

  _createClass(App, [{
    key: 'init',
    value: function init() {
      // Build Streamer Objects
      _Streamer2.default.init();
      // Create channel__card HTML using Template and append to DOM.
      _Twitch2.default.getTwitchAPI();
    }
  }]);

  return App;
}();