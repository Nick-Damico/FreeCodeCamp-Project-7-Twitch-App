class Twitch {
  // 2. Methods
  static url() {
    return "https://wind-bow.gomix.me/twitch-api/streams/";
  }
  // Takes instance of Streamer Class and fetches stream info,
  // returned data builds out instance further with new properties.
  static getTwitchAPI(cb) {
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
          cb.appendChannelCards();
          cb.getFeatured();
          cb.updateLiveCounter();
        }
      });
    }
  };

}
