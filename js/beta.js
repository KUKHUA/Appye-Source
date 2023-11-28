/// <reference path="types.d.ts" />

// load winbox
fetch('https://rawcdn.githack.com/nextapps-de/winbox/0.2.6/dist/winbox.bundle.min.js')
  .then(response => response.text())
  .then(data => {
    eval(data);
  });

//set the version
const ver = "Private+2.3.1";
updateUrl = "https://agasallo-1-w7654132.deta.app/api/share/g9t9k9gru5iw"; 

//event listeners & consts
jsonAppObject = { apps: {}, commands: {}, metadata: {}, flags: {} };

// set functions for plugins
const appyeApi = {
  createApp(name, info, metadata) {
    //check for dupliucates
    if (name in jsonAppObject.apps) {
      throw new Error("Duplicate app " + name);
    } else if (name in jsonAppObject.metadata){
      throw new Error("Duplicate metadata " + name);
    }
    jsonAppObject.apps[name] = info;
    jsonAppObject.metadata[name] = metadata;
  },
  createCommand(command, js, metadata){
    if (command in jsonAppObject.commands) {
      throw new Error("Duplicate command " + command);
    } else if (command in jsonAppObject.metadata){
      throw new Error("Duplicate metadata " + command);
    }
  jsonAppObject.commands[command] = js;
  jsonAppObject.metadata[command] = metadata;
  }
  };

//load in plugins here
if(localStorage.getItem('imaEvalThis')){
  localObjects = JSON.parse(localStorage.getItem('imaEvalThis'));
 for (var dymObjects in localObjects){
 eval(localObjects[dymObjects].code);
 }
}

// default apps & commands

appyeApi.createCommand(
  'app-load',
  (commandIn) => {
    parseApp = commandIn.replace("app-load ", "");
    const cachedApp = jsonAppObject.apps[parseApp];
    if (cachedApp) {
      void new WinBox(cachedApp);
    }else {
      alert(
        'Could not find the app "' +
          parseApp +
          '" in the database, please check "ls apps" to see if you misspelled it.'
      );
    }
  },
  {
    humanName: "App Loader",
    vendor: "AppyeSYS",
    desc: "A default comamnd, it loads apps.",
    tags: ["app","loader","apploader","APP","LOADER","games","apps","system","systemapps","Sys","SysApps"],
    examples: ["app-load google"],
    sys: true
  }
);

appyeApi.createCommand(
  'cloak-it',
  (commandIn) => {
    const win = window.open();
    const doc = win.document;
    const iframe = doc.createElement("iframe");
    let defTitle = "Desmos | Testing";
    let defIcon = "https://www.desmos.com/favicon.ico";
    let parsedUrl = commandIn.replace("cloak-it ", "");
    function jsonAppCheck(url) {
      const app = jsonAppObject.apps[url];
      if (app && !app.html) {
        return app.url;
      } else if (app && app.html) {
        iframe.srcdoc = app.html;
      }
      return url;
    }
  
    // Parse input
    if (parsedUrl.startsWith("drive ")) {
      defTitle = "My Drive - Google Drive";
      defIcon = "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png";
      parsedUrl = parsedUrl.replace("drive ", "");
      parsedUrl = jsonAppCheck(parsedUrl);
    } else if (parsedUrl.startsWith("canvas ")) {
      defTitle = "Dashboard";
      defIcon = "https://learn.canvas.net/favicon.ico";
      parsedUrl = parsedUrl.replace("canvas ", "");
      parsedUrl = jsonAppCheck(parsedUrl);
    } else if (parsedUrl.startsWith("clever ")) {
      defTitle = "Clever | Portal";
      defIcon = "https://clever.com/favicon.ico";
      parsedUrl = parsedUrl.replace("clever ", "");
      parsedUrl = jsonAppCheck(parsedUrl);
    } else if (parsedUrl.startsWith("self ")) {
      defTitle = document.title;
      defIcon = "https://s2.googleusercontent.com/s2/favicons?domain_url=" + window.location.href;
      parsedUrl = parsedUrl.replace("self ", "");
      parsedUrl = jsonAppCheck(parsedUrl);
    } else {
      parsedUrl = jsonAppCheck(parsedUrl);
    }
  
    // Open window
    iframe.style.width = "100vw";
    iframe.style.height = "100vh";
    iframe.style.border = "none";
    iframe.style.position = "absolute";
    iframe.style.top = "0";
    iframe.style.left = "0";
    if (parsedUrl) iframe.src = parsedUrl;
    doc.body.appendChild(iframe);
    doc.title = defTitle;
  
    // Set favicon
    let link = doc.querySelector("link[rel~='icon']");
    if (!link) {
      link = doc.createElement("link");
      link.rel = "icon";
      doc.head.appendChild(link);
    }
    link.href = defIcon;
  },
  {
    humanName: "Cloaker",
    vendor: "AppyeSYS",
    desc: "A default comamnd, it cloaks apps/urls.",
    tags: ["app","cloak","cloaker","cloak","system","systemapps","Sys","SysApps"],
    examples: ["cloak-it google", "cloak-it clever google", "cloak-it https://www.somerandomgamewebsite.com"],
    sys: true
  });

  appyeApi.createCommand(
    'load-url',
    (commandIn) => {
      function getTitleFromDomain(str) {
        if (str.startsWith('www.')) {
          str = str.substring(4);
        }
        var lastIndex = str.lastIndexOf(".");
        if (lastIndex !== -1) {
          var result = str.substring(0, lastIndex);
          result = result.charAt(0).toUpperCase() + result.slice(1);
          return result;
        } else {
          return str;
        }
      }
      
      newUrl = commandIn.replace("load-url ","");
      const urlInfo = new URL(newUrl);
      void new WinBox({
        title: getTitleFromDomain(urlInfo.hostname),
        icon: "https://s2.googleusercontent.com/s2/favicons?domain_url=" + newUrl,
        background: "#00000",
        url: newUrl,
      }); 
    },
    {
      humanName: "URL Loader",
      vendor: "AppyeSYS",
      desc: "A default comamnd, it loads a URL as a app.",
      tags: ["URL","load url","sys","sys Command","systemCommand","SysCommands", "sysapp"],
      examples: ["load-url https://www.google.com/?igu=1"],
      sys: true
    }
  );

appyeApi.createCommand(
  'search',
  (commandIn) => {
    searchEngineName = "SearX";
    baseSearchURL = "https://searx.garudalinux.org/search?q=";
    let searchTerm = commandIn.replace("search ", "");
    inputURI = encodeURI(searchTerm);
    void new WinBox({
      title: `${searchEngineName} - ${searchTerm}`,
      icon: 'https://searx.garudalinux.org/favicon.ico',
      background: '#3d68ad',
      url: baseSearchURL + searchTerm,
    });
  },
  {
    humanName: "Search",
    vendor: "AppyeSYS",
    desc: "Default command. Allows you to search using SearX by default.",
    tags: ["searx","google","search","sys"],
    examples: ["search free Anti-Virus for ChromeOS"],
    sys: true
  }
);

appyeApi.createCommand(
  'ls',
  (commandIn) => {
    commandIn = commandIn.replace('ls ','');
  
    if(commandIn == "app" || commandIn == "apps"){
    let appHtml = "";

    for (var apps in jsonAppObject.apps){

    humanName = jsonAppObject.apps[apps].title;

    vendor = jsonAppObject.metadata[apps].vendor;
    
    desc = jsonAppObject.metadata[apps].desc;

    tags = jsonAppObject.metadata[apps].tags;
 
    if(jsonAppObject.apps[apps].icon){
     icon = jsonAppObject.apps[apps].icon;
    } else if (!jsonAppObject.apps[apps].icon || jsonAppObject.apps[apps].icon == null || jsonAppObject.apps[apps].icon == ""){
      icon = "https://openclipart.org/image/800px/301359";
    }


    appHtml += `<h2><img src="${icon}" alt= “${humanName} Icon” width="30" height="30"> ${humanName}</h2>
    <h3 id="by-vendor-">by ${vendor}</h3>
    <p>${desc}</p>
    <p>Id: ${apps}</p> <button onclick="intCmd('app-load ${apps}')">Open</button>
    <hr>
    `;
    }
   
    void new WinBox({
      title: "App List",
      background: "#00000",
      html: appHtml
    }); 

    } else if (commandIn == "commands" || commandIn == "command"){
      cmdHtml = "";
    for (var commands in jsonAppObject.commands){
      humanName = jsonAppObject.metadata[commands].humanName;

      vendor = jsonAppObject.metadata[commands].vendor;
      
      desc = jsonAppObject.metadata[commands].desc;

      examples = jsonAppObject.metadata[commands].examples;
      tags = jsonAppObject.metadata[commands].tags;
   
      if(jsonAppObject.metadata.icon){
       icon = jsonAppObject.metadata.icon;
      } else if (!jsonAppObject.metadata[commands].icon || jsonAppObject.metadata[commands].icon == null || jsonAppObject.metadata[commands].icon == ""){
        icon = "https://openclipart.org/image/800px/301359";
      }
  
  
      cmdHtml += `<h2><img src="${icon}" alt= “${humanName} Icon” width="30" height="30"> ${humanName}</h2>
      <h3 id="by-vendor-">by ${vendor}</h3>
      <p>${desc}</p>
      <h2>Examples:</h2>
      <p>${examples}</p>
      <hr>
      `;
    }
    void new WinBox({
      title: "Command List",
      background: "#00000",
      html: cmdHtml
    }); 
    } else if (commandIn == "eval" || commandIn == "evals"){
      evalHtml = "";
      localObjects = JSON.parse(localStorage.getItem('imaEvalThis'));
      for (var dynamicObjects in localObjects){
        humanName = dynamicObjects;
        code = localObjects[dynamicObjects].code;
        evalHtml += `<h2>${humanName} </h2> <button onclick="intCmd('eval del ${dynamicObjects}')"> Remove eval</button>
        <h3>Code: </h3>
        <p>${code}</p>
        <hr>
        `;
      }
      void new WinBox({
        title: "List of Set Evals",
        background: "#00000",
        html: evalHtml
      }); 
    }
    else{
     alert("Incorrect command syntax, please provide what to list. (apps, or commands)");
    } 

  },
{
    humanName: "List",
    vendor: "AppyeSYS",
    desc: "Defualt command, lists command/apps.",
    tags: ["ls","dir","list","commands","apps",'eval','evals'],
    examples: ["ls commands", "ls apps","ls evals"],
    sys: true
  }

);

appyeApi.createCommand(
'shell',
(commandIn) => {
javaScript = commandIn.replace('shell ', '');
eval(javaScript);
},
  {
    humanName: "Shell",
    vendor: "AppyeSYS",
    desc: "A defualt command, allows you to run JavaScript on the page. In case you don't have devtools.",
    tags: ["shell","javascript","code"], 
    examples: ["shell alert('Hello World')"], 
    sys: true
  }
);

appyeApi.createCommand(
  'eval',
  (commandIn) => {
  if(!localStorage.getItem('imaEvalThis')){
    localStorage.setItem('imaEvalThis','{}');
  }
  localObjects = JSON.parse(localStorage.getItem('imaEvalThis'));
    commandIn = commandIn.replace("eval ", "");
    if (commandIn.startsWith("set ")) {
      commandIn = commandIn.replace("set ", "");
      localObjID = commandIn.split(" ")[0];
      commandIn = commandIn.replace(`${localObjID} `, "");
            if (!localObjects[localObjID]) {
        localObjects[localObjID] = {};
      }
      localObjects[localObjID].code = commandIn;
      localStorage.setItem('imaEvalThis', JSON.stringify(localObjects));
    } else if (commandIn.startsWith("del ")) {
      commandIn = commandIn.replace("del ", "");
      localObjID = commandIn.split(" ")[0];
      localObjects[localObjID] = undefined;
      localStorage.setItem('imaEvalThis', JSON.stringify(localObjects));
      alert(`The eval ${localObjID} has been removed.`);
    }
  },
  {
    humanName:"Eval",
    vendor:"Luck",
    desc:"Allows you to run JavaScript snippets on launch of Appye.",
    tags: ["eval","javascript","js","set eval","snippets"],
    examples: ['eval set test alert("test");']
  }
);

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

appyeApi.createApp(
  "retrobowl",
  {
    title:"Retro Bowl",
    url:"https://rawcdn.githack.com/KUKHUA/a-v-c-blk/5cb61b353cff0365c082c9309e82bb561c027201/retro-bowl/index.html",
    icon:"https://play-lh.googleusercontent.com/-BT8C-1UPYWouyjVvWYgaar_-xV4IQvX4Bvib3koGEGiy6UsHlt0RgYpUrdTDfC2y0ct",
    background: "#4F8F23"
  },
  {
    vendor:"luck",
    desc:"A retro 2D football game."
  }
);

appyeApi.createApp(
  'paperio',
  {
  title:"Paper.io",
  url:"https://rawcdn.githack.com/KUKHUA/a-v-c-blk/5cb61b353cff0365c082c9309e82bb561c027201/paperio2/index.html",
  icon:"https://rawcdn.githack.com/KUKHUA/a-v-c-blk/5cb61b353cff0365c082c9309e82bb561c027201/paperio2/images/icon512.png?raw=true",
  },
  {
    vendor:"luck",
    desc:"kill other paper"
  }
);

appyeApi.createApp(
  'slope',
  {
    title:"Slope",
    url:"https://rawcdn.githack.com/KUKHUA/a-v-c-blk/5cb61b353cff0365c082c9309e82bb561c027201/slope/index.html#L14",
    icon:"https://raw.githubusercontent.com/KUKHUA/a-v-c-blk/5cb61b353cff0365c082c9309e82bb561c027201/slope/slope4.jpeg",
    background:"#00FF00",
    width: "100%",
    height: "100%"
  },
  {
vendor:"luck",
desc:"A game where you control a rolling ball and try to dodge obstacles while staying on the platform."
  }
);

appyeApi.createApp(
  'idle_breakout',
  {
    title:"Idle Breakout",
    url:"https://rawcdn.githack.com/KUKHUA/a-v-c-blk/5cb61b353cff0365c082c9309e82bb561c027201/idle-breakout/index.html",
    icon:"https://raw.githubusercontent.com/KUKHUA/a-v-c-blk/5cb61b353cff0365c082c9309e82bb561c027201/idle-breakout/img/favicon.png",
    background:"#EADEB1"
  },
  {
    vendor:"luck",
    desc:"A game where the balls break the walls."
  }
);

appyeApi.createApp(
 'jetpack_joyride',
 {
  title:"Jetpack Joyride",
  url:"https://raw.githack.com/KUKHUA/a-v-c-blk/5cb61b353cff0365c082c9309e82bb561c027201/jetpack-joyride/index.html",
  icon:"https://imgs.search.brave.com/m9PZUPj0AHlVzEFaZBSNVB5pWPMnNO80pP5hmMTK8lQ/rs:fit:560:320:1/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vOS85MC9K/ZXRwYWNrX0pveXJp/ZGVfaU9TLnBuZw",
  background:"#ADA88C"

 },
 {
  vendor:"luck",
  desc:"An endless side-scroll action runner."
 }

);

appyeApi.createApp(
  'duck_life',
  {
    title:"Duck Life: 3",
    url:"https://rawcdn.githack.com/KUKHUA/a-v-c-blk/5cb61b353cff0365c082c9309e82bb561c027201/ducklife3/index.html#L6",
    icon:"https://imgs.search.brave.com/CdIvSpF4xdb9is0llWDRgWBY5DuZNlSIOTCpLI9FRxA/rs:fit:32:32:1/g:ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvYjY2ZjU4N2Q0/MWM3N2M4NTc4N2Iw/ZDhmOGVhNGYxM2Iy/NWZiYjQxMWQ0MDJm/OGZhNzhhNDI4NmMw/MDU2ZDZjYS9kdWNr/LWxpZmU0LmNvbS8",
    background:"#FFEB50"
  },
  {
    vendor:"luck",
    desc:"You do stuff with ducks, like feed them."
  }
);
appyeApi.createApp(
  'cookie_clicker',
  {
    title:"Cookie Clicker",
    url:"https://rawcdn.githack.com/KUKHUA/a-v-c-blk/5cb61b353cff0365c082c9309e82bb561c027201/cookie-clicker/index.html#L5",
    icon:"https://raw.githubusercontent.com/KUKHUA/a-v-c-blk/5cb61b353cff0365c082c9309e82bb561c027201/cookie-clicker/img/favicon.ico",
    background:"#A47E4B"
  },
  {
    vendor: "luck",
    desc:"You click cookies for more and more cookies."
  }
);
appyeApi.createApp(
  'death_run',
  {
    title: "Death RUN 3D",
    url:"https://raw.githack.com/KUKHUA/a-v-c-blk/5cb61b353cff0365c082c9309e82bb561c027201/death-run-3d/index.html",
    icon:"https://play-lh.googleusercontent.com/dEu4Lrs5Ke5ZHDMedRkjjtYq1G22gGccxeIU_ZJNqqwLeSYshuUxBU0KCrSG7lEEwBo",
    background:"#C00E0A",
    width: "100%",
    height: "100%"
  },
  {
    vendor: "luck",
    desc:"Try not to die as you run through the colorful tunnels. Reaction speed is key."
  }
);
appyeApi.createApp(
  'cobalt',
  {
    title: "Cobalt Proxy",
    url: "https://cobalt-1-k7256692.deta.app/",
    icon: "https://cobalt-1-k7256692.deta.app/logos/logo512.png",
    background:"#104972" 
  },
  {
    vendor: "luck",
    desc: "It's a proxy. Unblock your hotspot for better compatilty (contact luck)."
  }
)


// END OF PRIVATE API CALLS: YOU CAN PUBLISH BELOW


document.addEventListener("keydown", (event) => {
  switch (event.key.toUpperCase()) {
    case "M":
      var winboxes = document.querySelectorAll('.winbox');
      for (var i = 0; i < winboxes.length; i++) {
        winboxes[i].style.display = 'none';
      }
      break;
    case "G":
      var winboxes = document.querySelectorAll('.winbox');
      for (var i = 0; i < winboxes.length; i++) {
        winboxes[i].style.display = 'block';
      }
      break;
    case "Q":
      var winboxes = document.querySelectorAll('.winbox');
      for (var i = 0; i < winboxes.length; i++) {
        winboxes[i].remove();
        localStorage.removeItem("appye_Version");
        fetch('/clear-site-data', {
          headers: { 'Clear-Site-Data': '"cache", "cookies", "storage", "executionContexts"' }
        }).then(() => {
        });    
        location.reload(true);
        return;
      }
      break;
    case "C":
      cmd();
      break;
    }});

// Wait for the script to be loaded before calling cmd()
script.addEventListener("load", function () {
if(localStorage.getItem('ver') !== ver){
  new WinBox({
      title: "Appye has updated!!🎉",
      modal:true,
      url: updateUrl,
      onclose: function(){
        setTimeout(function (){
        cmd();             
        }, 300);
      }
  });
  localStorage.setItem('ver',ver);
  } else {
    cmd();
  }
});

function intCmd(command){
  var commandStart = "";
  var commandIn = command;
  commandStart = commandIn.split(" ")[0];
  if (jsonAppObject.commands[commandStart]){
    jsonAppObject.commands[commandStart](commandIn);
  } else {
    throw new Error("An internal service tried to call the " + commandStart + " command, but it dose not seem to exist.");
  }
}

function cmd() {
  var commandStart = "";
  commandIn = prompt("Command:");
  if (commandIn == "" || commandIn == " "){
    alert("Hint: You can click the cancel button or press Escape.");
    return;
  } else if (commandIn == null){
    return;
  }
  commandStart = commandIn.split(" ")[0];
  commandStart = commandStart.toLowerCase();
  if (jsonAppObject.commands[commandStart]){
    jsonAppObject.commands[commandStart](commandIn);
  } else {
    alert("Command '" + commandStart + "' could not be found. The commands's eval may have been removed. Please check 'ls commands'.");
  }
}