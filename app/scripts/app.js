// Get Element Referneces from DOM
const channelsContainer = document.getElementById('channelsContainer');
const featuredSection = document.getElementById('featuredSection');

// Compile tempates
const featureSource = document.getElementById('featured-template');
let featureTemplate = Handlebars.compile(featureSource.innerHTML);
const channelSource = document.getElementById('channel-template');
let channelTemplate = Handlebars.compile(channelSource.innerHTML);

// Get HTML from evaluating Handlebars template
const content = {
  id: 9,
  title: 'Happy Stream',
  status: 'Live'
};
const html = channelTemplate(content);

// Append Compiled HTML into the DOM
channelsContainer.innerHTML = html

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
  "smoke"
]

// Streamer Class, building class instances of 'Streamer'
class Streamer {
  constructor(id, name) {
    this.name   = name;
    this.id     = id;
  }
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
      if (data.stream == null) {
        console.log('not live');
      } else {
        let streamData = data.stream;
        streamer.game = streamData.game;
        streamer.title = streamData.channel.status;
        streamer.logo = streamData.channel.logo;
        streamer.banner = streamData.channel.profile_banner;
        streamer.followers = streamData.channel.followers;
        streamer.views = streamData.channel.views;
        streamer.url = streamData.channel.url;

        console.log(streamer);
      }
    });
  }
}
runningManZ = new Streamer(1, twitchStreamers[1]);
TwitchApp.getStreamerInfo(runningManZ);
