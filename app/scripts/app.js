class App {
  init() {
    // Build Streamer Objects
    Streamer.createStreamers();
    // Create channel__card HTML using Template and append to DOM.
    Twitch.getTwitchAPI();
  }
}
