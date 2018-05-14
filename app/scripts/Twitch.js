class Twitch {
  static url() {
    return "https://wind-bow.gomix.me/twitch-api/streams/";
  }
  // Takes instance of Streamer Class and fetches stream info,
  // returned data builds out instance further with new properties.
  static getTwitchAPI() {
    const streamers = Streamer.all();
    for (let streamer of streamers) {
      let streamerName = streamer.name.split(" ").join("").toLowerCase();
      $.getJSON(this.url() + streamerName + '?callback=?', (data) => {
        if (data.stream) {
          // store response JSON Data
          const stream = data.stream;
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
          this.appendChannelCards();
          this.getFeatured();
        }
      });
    }
  };

  // Append channel__cards to DOM using Streamers.all collection
  static appendChannelCards() {
    const channelsContainer = document.getElementById('channelsContainer');
    const channelSource = document.getElementById('channel-template');

    const channelTemplate = Handlebars.compile(channelSource.innerHTML);
    const channelCardsHTML = channelTemplate({streamers: Streamer.all()});

    channelsContainer.innerHTML = channelCardsHTML;
  }

  // Randomly selects a streamer thats status is 'Live',
  // Appends it to the DOM using template
  static getFeatured() {
    const featuredSection = document.getElementById('featuredSection');
    const liveCounter = document.getElementById('liveCount');

    const featureSource = document.getElementById('featured-template');
    const featureTemplate = Handlebars.compile(featureSource.innerHTML);

    const liveStreams = Streamer.all().filter((streamer) => streamer.status === 'Live');
    const randNum = randomNumber(liveStreams.length);
    const featuredStreamer = liveStreams[randNum];

    const featureHTML = featureTemplate(featuredStreamer);
    featuredSection.innerHTML = featureHTML;
    // Setting Couter to number of live streams
    liveCounter.textContent = liveStreams.length;
  }
}
