"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Twitch = function () {
  // 1. Constructor
  function Twitch() {
    _classCallCheck(this, Twitch);
  }
  // 2. Methods


  _createClass(Twitch, null, [{
    key: "url",
    value: function url() {
      return "https://wind-bow.gomix.me/twitch-api/streams/";
    }
    // Takes instance of Streamer Class and fetches stream info,
    // returned data builds out instance further with new properties.

  }, {
    key: "getTwitchAPI",
    value: function getTwitchAPI(cb) {
      var _this = this;

      var streamers = Streamer.all();

      var _loop = function _loop(streamer) {
        var streamerName = streamer.name.split(" ").join("").toLowerCase();
        $.getJSON(_this.url() + streamerName + '?callback=?', function (data) {
          if (data.stream) {
            // store response JSON Data
            var stream = data.stream;
            streamer.status = 'Live';
            streamer.followers = commaFormatted(stream.channel.followers);
            streamer.banner = stream.channel.profile_banner;
            streamer.preview = stream.preview.large;
            streamer.title = stream.channel.status;
            streamer.views = commaFormatted(stream.channel.views);
            streamer.logo = stream.channel.logo;
            streamer.url = stream.channel.url;
            streamer.game = stream.game;
          }
          // Calls TwitchApp Methods once the last Streamer Fetch has resolved
          if (streamer.id === 9) {
            cb.appendChannelCards();
            cb.getFeatured();
          }
        });
      };

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = streamers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var streamer = _step.value;

          _loop(streamer);
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
    }
  }]);

  return Twitch;
}();