'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Get Element Referneces from DOM
var channelsContainer = document.getElementById('channelsContainer');
var featuredSection = document.getElementById('featuredSection');
var liveCounter = document.getElementById('liveCount');

// Compile tempates
var featureSource = document.getElementById('featured-template');
var featureTemplate = Handlebars.compile(featureSource.innerHTML);
var channelSource = document.getElementById('channel-template');
var channelTemplate = Handlebars.compile(channelSource.innerHTML);
var fetchStatus = false;

// Random Number based on a supplied Max number, return will be a num 0 - max
function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

function addCommas(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

// Streamer Class, building class instances of 'Streamer'

var Streamer = function () {
  function Streamer(id, streamer) {
    _classCallCheck(this, Streamer);

    this.id = id;
    this.status = 'Offline';
    this.name = streamer.name;
    this.image = streamer.image;
    this.summary = streamer.summary;

    // Adding instance to the Streamer Class all collection.
    Streamer.all(this);
  }

  _createClass(Streamer, null, [{
    key: 'all',


    // Builds a Class scoped array to keep track of all instances of the class
    value: function all(streamer) {
      if (this.collection === undefined) {
        this.collection = [];
      }
      if (streamer) {
        this.collection.push(streamer);
      }
      return this.collection;
    }
  }, {
    key: 'buildStreamers',


    // Builds Streamer Objects with array of 'names'
    value: function buildStreamers(array) {
      var count = 1;
      // iterates over array of strings instantiate them as Objects
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var streamer = _step.value;

          // count is incremented each iteration to supply id for Streamer Objects
          new Streamer(count++, streamer);
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

  return Streamer;
}();

// Twitch Class, functions as Class object 'Static'


var TwitchApp = function () {
  function TwitchApp() {
    _classCallCheck(this, TwitchApp);
  }

  _createClass(TwitchApp, null, [{
    key: 'url',
    value: function url() {
      return "https://wind-bow.gomix.me/twitch-api/streams/";
    }

    // Takes instance of Streamer Class and fetches stream info,
    // returned data builds out instance further with new properties.

  }, {
    key: 'callTwitchAPI',
    value: function callTwitchAPI() {
      var _this = this;

      var streamers = Streamer.all();

      var _loop = function _loop(streamer) {
        var streamerName = streamer.name.split(" ").join("").toLowerCase();
        $.getJSON(_this.url() + streamerName + '?callback=?', function (data) {
          if (data.stream) {
            // store response JSON Data
            var stream = data.stream;
            streamer.status = 'Live';
            streamer.followers = addCommas(stream.channel.followers);
            streamer.banner = stream.channel.profile_banner;
            streamer.preview = stream.preview.large;
            streamer.title = stream.channel.status;
            streamer.views = addCommas(stream.channel.views);
            streamer.logo = stream.channel.logo;
            streamer.url = stream.channel.url;
            streamer.game = stream.game;
          }
          // Calls TwitchApp Methods once the last Streamer Fetch has resolved
          if (streamer.id === 9) {
            _this.appendChannelCards();
            _this.getFeatured();
          }
        });
      };

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = streamers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var streamer = _step2.value;

          _loop(streamer);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: 'appendChannelCards',


    // Append channel__cards to DOM using Streamers.all collection
    value: function appendChannelCards() {
      var channelCardsHTML = channelTemplate({ streamers: Streamer.all() });
      channelsContainer.innerHTML = channelCardsHTML;
    }

    // Randomly selects a streamer thats status is 'Live',
    // Appends it to the DOM using template

  }, {
    key: 'getFeatured',
    value: function getFeatured() {
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

  return TwitchApp;
}();

// Array of streamers tracked in this program


var twitchStreamers = [{
  name: "Free Code Camp",
  image: 'images/fcc__card.png',
  summary: "Learn to code, then practice by building projects for nonprofits. We're free, self-paced, and browser-based. After you complete the first 900 hours of our curriculum, you'll build 4 projects for nonprofits. By the time you finish, you'll have the skills, connections, and portfolio of production apps you need to get a coding job."
}, {
  name: "Kotton",
  image: 'images/kotton__card.png',
  summary: "Survival , War , Maybe Even some Roleplay. Let's laugh while we do it. Kotton has been a Youtuber and Streamer on Twitch since 2014. He is best known for streaming 'Escape From Tarkov'."
}, {
  name: "the Running Man Z",
  image: 'images/runningz__card.png',
  summary: "I've been a gamer for a long time! I'm 38 (forever) with 2 daughters. I have really enjoyed producing content for YouTube, Twitch is so great for me to allow further interaction with the community we are growing from YouTube as well as reach new people too! I got Twitch partnered on June 12th 2015 and decided to give this a go for a living as of May 15th 2016. It will be a real challenge to try and keep my channel growing in the right direction. Thanks for being here! ;)"
}, {
  name: "Giant Waffle",
  image: 'images/waffle__card.png',
  summary: "I play a lot of game and I'm pretty bad at all of them. I mainly stream on Twitch but will soon bring more and more content to YouTube. Giant Waffle has been a content creator since 2006, best known for playing Minecraft mods."
}, {
  name: "Dakotaz",
  image: 'images/dakotaz__card.png',
  summary: "Dakotaz started lurking on Twitch.tv​ in 2011 and began to stream himself in 2012. He became well known within within the survival game community, playing titles such as WarZ​ and Infestation. In more recent years, he made the switch to Battle Royale​ and started playing Fortnite​ since the day it came out."
}, {
  name: "Geek and Sundry",
  image: 'images/gs__card.png',
  summary: "Geek & Sundry is a commercial YouTube channel and multimedia production company. It was launched on April 2, 2012 by actress Felicia Day with Kim Evey and Sheri Bryant as part of YouTube's 100 million dollar original channel initiative. In June 2012, Forbes suggested that 'if successful, it could help blaze a trail for the future of network television.'"
}, {
  name: "AnneMunition",
  image: 'images/annemunition__card.png',
  summary: "When I started streaming, it was in the evening hours late when I got off work. I'd stream for only a few hours on weekdays, and then for long hours on weekends. But right away, I was hooked. It was amazing. It was exciting. It was refreshing. And I couldn't get enough."
}, {
  name: "Ninja",
  image: 'images/ninja__card.png',
  summary: "Ninja has over 9 million subscribers on YouTube as of April 2018. He earns over $500,000 per month from streaming Fortnite and credited the game's free-to-play business model as a growth factor."
}, {
  name: "Yogscast",
  image: 'images/yogs__card.png',
  summary: "The Yogscast, incorporated as Yogscast Ltd, are a group of YouTube content creators who produce gaming-related video content, focused around their main YouTube channel, YOGSCAST Lewis & Simon (formerly BlueXephos), with additional content syndicated through a wider network of YouTube channels."
}];

// Build Streamer Objects
Streamer.buildStreamers(twitchStreamers);

// Create channel__card HTML using Template and append to DOM.
TwitchApp.callTwitchAPI();