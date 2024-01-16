appye.createCommand(
  'app-load',
  (commandIn) => {
    parseApp = commandIn.replace("app-load ", "");
    /**
     * Represents a cached app.
     * @type {Object}
     */
    var cachedApp = jsonAppObject.apps[parseApp];
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

appye.createCommand(
  'cloak-it',
  (commandIn) => {
    const win = window.open();
    const doc = win.document;
    const iframe = doc.createElement("iframe");
    let defTitle = "Desmos | Testing";
    let defIcon = "https://www.desmos.com/favicon.ico";
    let parsedUrl = commandIn.replace("cloak-it ", "");
    // Check if valid URL
    /**
     * Checks if the given URL is present in the jsonAppObject.apps.
     * If the URL is present, it checks if the app has an HTML property.
     * If the app does not have an HTML property, it returns the app's URL.
     * If the app has an HTML property, it sets the srcdoc of the iframe to the app's HTML.
     * If the URL is not present in jsonAppObject.apps, it checks if the URL is valid.
     * If the URL is valid, it returns the URL.
     * If the URL is not valid, it throws an error with the message "Invalid URL: {url}".
     * 
     * @param {string} url - The URL to check.
     * @returns {string} - The app's URL or the valid URL.
     * @throws {Error} - If the URL is not valid.
     */
    function jsonAppCheck(url) {
      const app = jsonAppObject.apps[url];
      if (app) {
        if (!app.html) {
          return app.url;
        } else {
          iframe.srcdoc = app.html;
        }
      } else {
        if (isValidUrl(url)) {
          return url;
        } else {
          throw new Error(`Invalid URL: ${url}`);
        }
      }
    }

    let prefix = parsedUrl.split(" ")[0]; // get the prefix

    switch (prefix) {
      case "google":
        defTitle = "Google";
        defIcon = "https://www.google.com/favicon.ico";
        parsedUrl = parsedUrl.replace("google ", "");
        break;
      case "drive":
        defTitle = "My Drive - Google Drive";
        defIcon = "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png";
        parsedUrl = parsedUrl.replace("drive ", "");
        break;
      case "canvas":
        defTitle = "Dashboard";
        defIcon = "https://learn.canvas.net/favicon.ico";
        parsedUrl = parsedUrl.replace("canvas ", "");
        break;
      case "clever":
        defTitle = "Clever | Portal";
        defIcon = "https://clever.com/favicon.ico";
        parsedUrl = parsedUrl.replace("clever ", "");
        break;
      case "self":
        defTitle = document.title;
        defIcon = "https://s2.googleusercontent.com/s2/favicons?domain_url=" + window.location.href;
        parsedUrl = parsedUrl.replace("self ", "");
        break;
      default:
        parsedUrl = jsonAppCheck(parsedUrl);
        break;
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

  appye.createCommand(
    'load-url',
    (commandIn) => {
      /**
       * Retrieves the title from a domain string.
       * 
       * @param {string} str - The domain string.
       * @returns {string} - The title extracted from the domain string.
       */
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

appye.createCommand(
  'search',
  (commandIn) => {
    searchEngineName = "SearX";
    baseSearchURL = "https://searx.garudalinux.org/search?q=";
    /**
     * The search term extracted from the command input.
     * @type {string}
     */
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

appye.createCommand(
  'ls',
  (commandIn) => {
    commandIn = commandIn.replace('ls ','');
    var appHtml,cmdHtml,pluginHtml;
    localObjects = JSON.parse(localStorage.getItem('imapluginThis'));
    function getHtml(object) {
      var htmlVar = ''; // Initialize htmlVar to an empty string outside the loop
      for (var items in object) {
        let metadata = jsonAppObject.metadata[items];
        if (!metadata) {
          console.error(`No metadata found for item ${items}`);
          continue;
        }
    
        let icon = getIcon(items);
        let vendor = metadata.vendor;
        let description = metadata.desc;
        let examples = metadata.examples;
    
        htmlVar += `<h1><img src="${icon}" alt="${items}'s Icon" width="30" height="30"> ${items}</h1>
        <h3 id="by-vendor-">by ${vendor}</h3>
        <p>${description}</p>`;

        if(object = jsonAppObject.apps){
          htmlVar += `<button class="appyebutton" onclick="intCmd('app-load ${items}')"> Open App </button>`;
        }

        if(examples){
          htmlVar += `<h4>Examples:</h4>`
          var exmpCount;
          for(example in examples){
            exmpCount += 1;
            htmlVar += `${example[exmpCount]} <button class="appyebutton" onclick="${example[exmpCount]}"> Run </button>`
          }
        }
      }
      return htmlVar; // Return the generated HTML
    }

  appHtml = getHtml(jsonAppObject.apps)
  cmdHtml = getHtml(jsonAppObject.commands)

      localObjects = JSON.parse(localStorage.getItem('imapluginThis'));
      for (var dynamicObjects in localObjects){
        humanName = dynamicObjects;
        code = localObjects[dynamicObjects].code;
        pluginHtml += `<h2>${humanName} </h2> <button class="appyebutton" onclick="intCmd('plugin del ${dynamicObjects}')"> Remove plugin</button>
        <h3>Code: </h3>
        <p>${code}</p>
        <hr>
        `;
      }
      
      mainHtml = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,500;0,900;1,500;1,900&display=swap" rel="stylesheet">

<script>
var idObj = {};
  
</script>
<button  class="appyebutton"style="cursor:pointer;" title="Allows you to add an app, command, etc." onclick="">Add...</button> <button class="appyebutton" style="cursor:pointer;" title="Allows you to import a FLZ (pre-packaged app/game) into Appye." onclick="">Import FLZ</button>


<h1 class="appyeheader" font-style="italic" title="You can click to show/hide this section." id="AppsText" style="cursor:pointer;" onclick='hideDiv("Apps")'> > Apps</h1>
<div id='Apps'>
  ${appHtml}
</div>

<h1 class="appyeheader" title="You can click to show/hide this section." id="CommandsText"style="cursor:pointer;" onclick='hideDiv("Commands")'> > Commands</h1>
<div id='Commands'>
  ${cmdHtml}
</div>

<h1 class="appyeheader" title="You can click to show/hide this section." id="PluginsText"style="cursor:pointer;" onclick='hideDiv("Plugins")'> > Plugins</h1>
<div id='Plugins'>
  ${pluginHtml}
</div>`;

new WinBox({
    title: "List",
    background: '#249000',
    html: mainHtml,
    class:'appyebody',
});

  },
{
    humanName: "List",
    vendor: "AppyeSYS",
    desc: "Defualt command, lists command/apps.",
    tags: ["ls","dir","list","commands","apps",'plugin','plugins'],
    examples: ["ls commands", "ls apps","ls plugins"],
    sys: true
  }

);

appye.createCommand(
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

appye.createCommand(
  'plugin',
  (commandIn) => {
  if(!localStorage.getItem('imapluginThis')){
    localStorage.setItem('imapluginThis','{}');
  }
  localObjects = JSON.parse(localStorage.getItem('imapluginThis'));
    commandIn = commandIn.replace("plugin ", "");
    if (commandIn.startsWith("set ")) {
      commandIn = commandIn.replace("set ", "");
      localObjID = commandIn.split(" ")[0];
      commandIn = commandIn.replace(`${localObjID} `, "");
            if (!localObjects[localObjID]) {
        localObjects[localObjID] = {};
      }
      localObjects[localObjID].code = commandIn;
      localStorage.setItem('imapluginThis', JSON.stringify(localObjects));
    } else if (commandIn.startsWith("del ")) {
      commandIn = commandIn.replace("del ", "");
      localObjID = commandIn.split(" ")[0];
      localObjects[localObjID] = undefined;
      localStorage.setItem('imapluginThis', JSON.stringify(localObjects));
      alert(`The plugin ${localObjID} has been removed.`);
    }
  },
  {
    humanName:"Plugin",
    vendor:"Luck",
    desc:"Allows you to run JavaScript snippets on launch of Appye.",
    tags: ["plugin","javascript","js","set plugin","snippets"],
    examples: ['plugin set test alert("test");']
  }
);