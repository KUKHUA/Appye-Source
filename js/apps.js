appyeApi.createApp(
  "google",
  {
    title: "Google",
    url: "https://www.google.com/?igu=1",
    icon: "https://www.google.com/favicon.ico",
    background: "#bd8c91"
  },
  {
    vendor: "AppyeSYS",
    desc: "A defualt app, uses a iframable google page.",
    tags: ["google","apps","app","SystemApp","sys","sysapp"],  
    sys: true
  }
);

appyeApi.createApp(
  'piped',
  {
    title: "Piped",
    url: "https://piped.garudalinux.org",
    icon:"https://piped.garudalinux.org/favicon.ico",
    background:"#D03024"
  },
  {
    vendor: "luck",
    desc:`A youtube frontend; if it dose not load in Appye, try going to <a href="https://piped.garudalinux.org">here</a></p> in your browser.`
  }
);
// END OF STOCK API CALLS: DO NOT PUBLISH BEYOND THIS POINT

appyeApi.createApp(
  "subway",
  {
    title: "Subway Surfers",
    url: "https://rawcdn.githack.com/mark-deal/mark-deal.github.io/73bdb2d103ca2cae7b9274872da66de1c28404c6/subwaysurfers/index.html",
    icon:"https://play-lh.googleusercontent.com/O4QJhBZV0vLyuY0dYLVjX6PA83kGkdLzHIdcYcyWVrMN9Mdt3IQDLGiR7iJdTm3TRk4=w240-h480-rw",
    background: "#FFC600"
  },
  {
    vendor: "luck",
    desc: "Subway Surfers, it's a game.",
  }
);

appyeApi.createApp(
  "desmos",
  {
    title: "Desmos",
    url: "https://www.desmos.com/graphing",
    icon:"https://www.desmos.com/favicon.ico",
    background: "#2F72DC"
  },
  {
    vendor: "luck",
    desc: "You know what desmos is.",
  }
);

appyeApi.createApp(
  "chat",
  {
    title:"Chat Room",
    url:'https://chat.basicfan.eu.org/#Appye:441c57ac4c6b7ab602397cac66d321957dd2fda0',
    icon: "https://chat.basicfan.eu.org/gfx/icon_32x32.png",
    background:"#181A1D"
  },
  {
    vendor:"luck",
    desc:"It allows you to to chat."
    
  }
);

