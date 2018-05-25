class App {
  init(streamers) {
    if (streamers && Array.isArray(streamers)) {
      // Build Streamer Objects
      Streamer.init(streamers);
      // Create channel__card HTML using Template and append to DOM.
      Twitch.getTwitchAPI({
        appendChannelCards: this.appendChannelCards,
        getFeatured: this.getFeatured,
        updateLiveCounter: this.updateLiveCounter
      });
    } else {
      console.error('You must supply a collection of streamers to initialize.');
    }
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
    const featuredSection = document.getElementById('featuredSection');
    const featureSource = document.getElementById('featured-template');
    const featureTemplate = Handlebars.compile(featureSource.innerHTML);
    // Filter all Streamer channels with a status of 'Live'
    const liveStreams = Streamer.all().filter((streamer) => streamer.status === 'Live');
    // Randomly select of the 'Live' Streamers to spotlight in Featured area
    const randNum = randomNumber(liveStreams.length);
    const featuredStreamer = liveStreams[randNum];
    const featureHTML = featureTemplate(featuredStreamer);
    featuredSection.innerHTML = featureHTML;
  }

  updateLiveCounter() {
    const liveCounter = document.getElementById('liveCount');
    const liveStreams = Streamer.all().filter((streamer) => streamer.status === 'Live');
    // Setting Couter to number of live streams
    liveCounter.textContent = liveStreams.length;
  }

}
