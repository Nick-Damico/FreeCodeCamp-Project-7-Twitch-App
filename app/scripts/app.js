// Get Element Referneces from DOM
const channelsContainer = document.getElementById('channelsContainer');
const featuredSection = document.getElementById('featuredSection');

// Compile tempates
const featureSource = document.getElementById('featured-template');
const featureTemplate = Handlebars.compile(featureSource.innerHTML);
const channelSource = document.getElementById('channel-template');
const channelTemplate = Handlebars.compile(channelSource.innerHTML);
let fetchStatus = false;

// Random Number based on a supplied Max number, return will be a num 0 - max
function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

// Streamer Class, building class instances of 'Streamer'
class Streamer {
  constructor(id, streamer) {
    this.id = id;
    this.status = 'Offline';
    this.name = streamer.name;
    this.image = streamer.image;

    // Adding instance to the Streamer Class all collection.
    Streamer.all(this);
  };

  // Builds a Class scoped array to keep track of all instances of the class
  static all(streamer) {
    if (this.collection === undefined) {
      this.collection = [];
    }
    if (streamer) {
      this.collection.push(streamer);
    }
    return this.collection;
  };

  // Builds Streamer Objects with array of 'names'
  static buildStreamers(array) {
    let count = 1;
    // iterates over array of strings instantiate them as Objects
    for (let streamer of array) {
      // count is incremented each iteration to supply id for Streamer Objects
      new Streamer(count++, streamer);
    }
  };
}

// Twitch Class, functions as Class object 'Static'
class TwitchApp {
  static url() {
    return "https://wind-bow.gomix.me/twitch-api/streams/";
  }

  // Takes instance of Streamer Class and fetches stream info,
  // returned data builds out instance further with new properties.
  static callTwitchAPI() {

    const streamers = Streamer.all();

    for (let streamer of streamers) {
      $.getJSON(this.url() + streamer.name + '?callback=?', (data) => {
        // debugger;
        if (data.stream) {
          // store response JSON Data
          const stream = data.stream;
          streamer.status = 'Live';
          streamer.followers = stream.channel.followers;
          streamer.banner = stream.channel.profile_banner;
          streamer.preview = stream.preview.large;
          streamer.title = stream.channel.status;
          streamer.views = stream.channel.views;
          streamer.game = stream.game;
          streamer.logo = stream.channel.logo;
          streamer.url = stream.channel.url;
        }
        // Calls TwitchApp Methods once the last Streamer Fetch has resolved
        if (streamer.id === 9) {
          this.appendChannelCards();
          this.getFeatured();
        }
      });
    }
  };

  // Append channel__cards to DOM using Streamers.all collection
  static appendChannelCards() {
    const channelCardsHTML = channelTemplate({streamers: Streamer.all()});
    channelsContainer.innerHTML = channelCardsHTML;
  }

  // Randomly selects a streamer thats status is 'Live',
  // Appends it to the DOM using template
  static getFeatured() {
    const liveStreams = Streamer.all().filter((streamer) => streamer.status === 'Live');
    const randNum = randomNumber(liveStreams.length);
    const featuredStreamer = liveStreams[randNum];
    const featureHTML = featureTemplate(featuredStreamer);
    featuredSection.innerHTML = featureHTML;
  }
}

// Array of streamers tracked in this program
const twitchStreamers = [
  {
    name: "freecodecamp",
    image: 'images/fcc__card.png'
  }, {
    name: "therunningmanz",
    image: 'images/runningz__card.png'
  }, {
    name: "kotton",
    image: 'images/kotton__card.png'
  }, {
    name: "giantwaffle",
    image: 'images/waffle__card.png'
  }, {
    name: "dakotaz",
    image: 'images/dakotaz__card.png'
  }, {
    name: "geekandsundry",
    image: 'images/gs__card.png'
  }, {
    name: "anneMunition",
    image: 'images/annemunition__card.png'
  }, {
    name: "ninja",
    image: 'images/ninja__card.png'
  }, {
    name: "yogscast",
    image: 'images/yogs__card.png'
  }
];

// Build Streamer Objects
Streamer.buildStreamers(twitchStreamers);

// Create channel__card HTML using Template and append to DOM.
TwitchApp.callTwitchAPI();
