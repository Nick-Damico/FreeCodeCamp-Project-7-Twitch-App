// Get Element Referneces from DOM
const channelsContainer = document.getElementById('channelsContainer');
const featuredSection = document.getElementById('featuredSection');

// Compile tempates
const featureSource = document.getElementById('featured-template');
const featureTemplate = Handlebars.compile(featureSource.innerHTML);
const channelSource = document.getElementById('channel-template');
const channelTemplate = Handlebars.compile(channelSource.innerHTML);

// Streamer Class, building class instances of 'Streamer'
class Streamer {
  constructor(id, name) {
    this.status = false;
    this.id     = id;
    this.name   = name;

    // Adding instance to the Streamer Class all collection.
    Streamer.all(this);
  };

  // Builds a Class array to keep track of all instances of the class
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
    for(let streamer of array) {
      new Streamer( count++, streamer);
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
  static getStreamerInfo(streamer) {
    $.getJSON(this.url() + streamer.name + '?callback=?', ( data ) => {
      if (!data.stream) {
        console.log('offline');
      } else {
        // store response JSON Data
        const stream = data.stream;

        streamer.status     = true;
        streamer.followers  = stream.channel.followers;
        streamer.banner     = stream.channel.profile_banner;
        streamer.title      = stream.channel.status;
        streamer.views      = stream.channel.views;
        streamer.game       = stream.game;
        streamer.logo       = stream.channel.logo;
        streamer.url        = stream.channel.url;

        console.log(streamer);
      }
    });
  };

  static buildChannelCards() {
    let streamers = Streamer.all();

    for (let streamer of streamers) {
      this.getStreamerInfo( streamer );
    }
    console.log( Streamer.all() );
  };
}

// Array of streamers tracked in this program
const twitchStreamers = [
  "freecodecamp",
  "therunningmanz",
  "kotton",
  "giantwaffle",
  "dakotaz",
  "geekandsundry",
  "anneMunition",
  "yogscast",
  "ninja"
];

Streamer.buildStreamers(twitchStreamers);

TwitchApp.buildChannelCards();
// runningManZ = new Streamer(1, twitchStreamers[1]);
// TwitchApp.getStreamerInfo(runningManZ);


// Get HTML from evaluating Handlebars template
const content = {
  id: 9,
  title: 'Happy Stream',
  status: 'Live'
};
const html = channelTemplate(content);

// Append Compiled HTML into the DOM
channelsContainer.innerHTML = html
