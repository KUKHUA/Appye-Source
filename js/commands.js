
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