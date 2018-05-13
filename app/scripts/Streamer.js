// Streamer Class, building class instances of 'Streamer'
const STREAMERS = [
  {
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
    summary: "I've been a gamer for a long time! I'm 38 (forever) with 2 daughters. I have really enjoyed producing content for YouTube, Twitch is so great for me to allow further interaction with the community we are growing from YouTube as well as reach new people too! I got Twitch partnered on June 12th 2015 and decided to give this a go for a living as of May 15th 2016. It will be a real challenge to try and keep my channel growing in the right direction. Thanks for being here! ;)",
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
  }
];

class Streamer {
  constructor(id, streamer) {
    this.id = id;
    this.status = 'Offline';
    this.name = streamer.name;
    this.image = streamer.image;
    this.summary = streamer.summary;

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
  static createStreamers() {
    let count = 1;
    // iterates over array of strings instantiate them as Objects
    for (let streamer of STREAMERS) {
      // count is incremented each iteration to supply id for Streamer Objects
      new Streamer(count++, streamer);
    }
  };
}
