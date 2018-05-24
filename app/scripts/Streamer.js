class Streamer {
  // 1. Constructor
  constructor(id, streamer) {
    this.id = id;
    this.status     = 'Offline';
    this.name       = streamer.name;
    this.image      = streamer.image;
    this.summary    = streamer.summary;
    // Add newly instantiated Object to Streamer. all array
    Streamer.all(this);
  }

  // Class Methods
  static init(streamers) {
    if (streamers && Array.isArray(streamer) {
      this.createStreamers(streamers);
    } else {
      console.error('Must supply a collection of streamers of Type Array to initialize.');
    }
  }

  // Builds a Class scoped array to keep track of all instances of the class
  static all(streamer) {
    if (this.collection === undefined) {
      this.collection = [];
    }
    if (streamer) {
      this.collection.push(streamer);
    }
    return this.collection;
  }

  // Builds Streamer Objects with array of 'names'
  static createStreamers(streamers) {
    let count = 1;
    // iterates over array of strings instantiate them as Objects
    for (let streamer of streamers) {
      // count is incremented each iteration to supply id for Streamer Objects
      new Streamer(count++, streamer);
    }
  }

}
