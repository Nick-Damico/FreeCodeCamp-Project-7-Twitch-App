'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);
  }

  _createClass(App, [{
    key: 'init',
    value: function init() {
      // Build Streamer Objects
      Streamer.init();
      // Create channel__card HTML using Template and append to DOM.
      Twitch.getTwitchAPI({
        appendChannelCards: this.appendChannelCards,
        getFeatured: this.getFeatured
      });
    }

    // Append channel__cards to DOM using Streamers.all collection

  }, {
    key: 'appendChannelCards',
    value: function appendChannelCards() {
      var channelsContainer = document.getElementById('channelsContainer');
      var channelSource = document.getElementById('channel-template');
      var channelTemplate = Handlebars.compile(channelSource.innerHTML);
      var channelCardsHTML = channelTemplate({ streamers: Streamer.all() });

      channelsContainer.innerHTML = channelCardsHTML;
    }
  }, {
    key: 'getFeatured',
    value: function getFeatured() {
      var liveCounter = document.getElementById('liveCount');
      var featuredSection = document.getElementById('featuredSection');
      var featureSource = document.getElementById('featured-template');
      var featureTemplate = Handlebars.compile(featureSource.innerHTML);
      var liveStreams = Streamer.all().filter(function (streamer) {
        return streamer.status === 'Live';
      });
      var randNum = randomNumber(liveStreams.length);
      var featuredStreamer = liveStreams[randNum];

      var featureHTML = featureTemplate(featuredStreamer);
      featuredSection.innerHTML = featureHTML;
      // Setting Couter to number of live streams
      liveCounter.textContent = liveStreams.length;
    }
  }]);

  return App;
}();