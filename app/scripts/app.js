class App {

  init() {
    // Build Streamer Objects
    Streamer.init();
    // Create channel__card HTML using Template and append to DOM.
    Twitch.getTwitchAPI({
      appendChannelCards: this.appendChannelCards,
      getFeatured: this.getFeatured
    });
  }

  // Append channel__cards to DOM using Streamers.all collection
  appendChannelCards() {
    const channelsContainer = document.getElementById('channelsContainer');
    const channelSource = document.getElementById('channel-template');
    const channelTemplate = Handlebars.compile(channelSource.innerHTML);
    const channelCardsHTML = channelTemplate({streamers: Streamer.all()});

    channelsContainer.innerHTML = channelCardsHTML;
  }

  getFeatured() {
    const liveCounter = document.getElementById('liveCount');
    const featuredSection = document.getElementById('featuredSection');
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
