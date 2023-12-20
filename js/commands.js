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
    appHtml + `
    <style rel="stylesheet">@import url('https://fonts.googleapis.com/css2?family=Oswald&family=Quattrocento:wght@400;700&display=swap');:root{--font-family-header:'Oswald',sans-serif;--font-family:'Quattrocento',serif;--font-size:14px;--font-weight:400;--line-height:1.6;--transition:all .5s ease;--primary:#1175b8;--secondary:#f5f5f5;--background:#fff;--txt:#333;--info:#eefbff;--info-border:#c0def7;--info-txt:#2b5274;--success:#f0ffee;--success-border:#c0f7d8;--success-txt:#2b7434;--danger:#fee;--danger-border:#f7c0c0;--danger-txt:#742b2b;--gutter:10px}[data-theme=dark]{--primary:#fff;--secondary:#222;--background:#181818;--txt:#8b8b8b;--info:#0c2932;--info-border:#06181e;--info-txt:#61b0c9;--success:#244820;--success-border:#122a10;--success-txt:#7acb71;--danger:#461919;--danger-border:#280c0c;--danger-txt:#c75959}.grid{columns:5 150px;gap:var(--gutter);margin:var(--gutter)}::-webkit-scrollbar{ background: var(--secondary); width: 5px; height: 5px;} ::-webkit-scrollbar-thumb{ background: var(--txt); cursor: pointer} body{ max-width: 1024px; margin: auto; font-family: var(--font-family); font-size: var(--font-size); line-height: var(--line-height); padding-top: 10px; padding-bottom: 10px; background-color: var(--background); color: var(--txt); padding: 30px} body>:first-child{ margin-top: 0 !important} body>:last-child{ margin-bottom: 0 !important} a{ color: var(--primary)} a.anchor{ display: block; padding-left: 30px; margin-left: -30px; cursor: pointer; position: absolute; top: 0; left: 0; bottom: 0} h1, h2, h3, h4, h5, h6{ padding: 0; font-family:var(--font-family-header); font-weight: 700; -webkit-font-smoothing: antialiased; cursor: text; position: relative; text-transform: uppercase; margin: 0} h1:hover a.anchor, h2:hover a.anchor, h3:hover a.anchor, h4:hover a.anchor, h5:hover a.anchor, h6:hover a.anchor{ text-decoration: none} h1 code, h1 tt{ font-size: inherit} h2 code, h2 tt{ font-size: inherit} h3 code, h3 tt{ font-size: inherit} h4 code, h4 tt{ font-size: inherit} h5 code, h5 tt{ font-size: inherit} h6 code, h6 tt{ font-size: inherit} h1{ font-size: 28px; color: var(--primary)} h2{ font-size: 24px; border-bottom: 1px solid var(--secondary); color: var(--primary)} h3{ font-size: 18px} h4{ font-size: 16px} h5{ font-size: 14px} h6{ font-size: 14px} blockquote, dl, li, ol, p, pre, table, ul{ margin: 15px 0} hr{ border: 0none; color: var(--secondary); height: 4px; padding: 0} body>h2:first-child{ margin-top: 0; padding-top: 0} body>h1:first-child{ margin-top: 0; padding-top: 0} body>h1:first-child+h2{ margin-top: 0; padding-top: 0} body>h3:first-child, body>h4:first-child, body>h5:first-child, body>h6:first-child{ margin-top: 0; padding-top: 0} a:first-child h1, a:first-child h2, a:first-child h3, a:first-child h4, a:first-child h5, a:first-child h6{ margin-top: 0; padding-top: 0} h1 p, h2 p, h3 p, h4 p, h5 p, h6 p{ margin-top: 0} li p.first{ display: inline-block} li{ margin: 0} ol, ul{ padding-left: 30px} ol:first-child, ul:first-child{ margin-top: 0} dl{ padding: 0} dl dt{ font-size: 14px; font-weight: 700; font-style: italic; padding: 0; margin: 15px 5px} dl dt:first-child{ padding: 0} dl dt>:first-child{ margin-top: 0} dl dt>:last-child{ margin-bottom: 0} dl dd{ margin: 15px; padding: 15px} dl dd>:first-child{ margin-top: 0} dl dd>:last-child{ margin-bottom: 0} blockquote{ border-left: 4px solid var(--secondary); padding: 15px; color: var(--primary)} blockquote>:first-child{ margin-top: 0} blockquote>:last-child{ margin-bottom: 0} table{ padding: 0; border-collapse: collapse; width: 100%; margin: 30px auto; background: var(--background)} table tr{ border-top: 1px solid var(--secondary); background-color: var(--background); margin: 0; padding: 0} table tr:nth-child(2n){ color: var(--txt); background: var(--secondary)} table tr th{ font-weight: 700; border: 1px solid var(--txt); background: var(--txt); color: var(--secondary); margin: 0; padding: 6px 13px} table tr td{ border: 1px solid var(--secondary); margin: 0; padding: 6px 13px} table tr td:first-child, table tr th:first-child{ margin-top: 0} table tr td:last-child, table tr th:last-child{ margin-bottom: 0} img{ max-width: 100%} code, tt{ margin: 2px; padding: 5px; white-space: nowrap; border: 1px solid var(--secondary); background-color: var(--background); border-radius: 3px} pre code{ margin: 0; padding: 0; white-space: pre; border: 0; background: 0} pre{ border: 1px solid var(--txt); background-color: var(--txt); color: var(--secondary); font-size: 13px; line-height: 20px; overflow: auto; padding: 6px 10px; border-radius: 3px; margin: 30px auto; white-space: pre-wrap; font-family: "Consolas", monospace} pre code, pre tt{ background-color: transparent; border: 0} sup{ font-size: .83em; vertical-align: super; line-height: 0} *{ -webkit-print-color-adjust: exact} @media screen and (min-width:914px){ body{ width: 854px; margin: 0auto}} @media print{ pre, table{ page-break-inside: avoid} pre{ word-wrap: break-word}} img{ display: block; max-width: 100%; margin: 20px auto; -webkit-box-shadow: 2px 3px 3px var(--background); box-shadow: 2px 3px 3px var(--background)} li.task{ list-style-type: none} .col-2{ -webkit-column-count: 2; -moz-column-count: 2; column-count: 2; -webkit-column-gap: 20px; -moz-column-gap: 20px; column-gap: 20px; -webkit-column-rule: 1px solid var(--secondary); -moz-column-rule: 1px solid var(--secondary); column-rule: 1px solid var(--secondary); margin: 20px auto; padding-bottom: 10px; border-bottom: 1px solid var(--secondary)} .col-3{ -webkit-column-count: 3; -moz-column-count: 3; column-count: 3; -webkit-column-gap: 10px; -moz-column-gap: 10px; column-gap: 10px; -webkit-column-rule: 1px solid var(--secondary); -moz-column-rule: 1px solid var(--secondary); column-rule: 1px solid var(--secondary); margin: 20px auto; padding-bottom: 10px; border-bottom: 1px dotted var(--secondary)} @media (max-width:700px){ .col-2, .col-3{ column-count: 1}} div p{ margin: 0} details{ width: 100%; margin: 0auto; background: var(--background); border: 1px solid var(--secondary); margin-bottom: .5rem; border-radius: 5px; overflow: hidden} summary{ padding: .5rem; display: block; background: var(--background); padding-left: 1.8rem; position: relative; cursor: pointer} summary:before{ content: ""; border-width: .4rem; border-style: solid; border-color: transparent transparent transparent var(--txt); color: var(--txt); position: absolute; top: .8rem; left: .8rem; transform: rotate(0); transform-origin: .2rem 50%; transition: .25s transform ease} details[open]>summary:before{ transform: rotate(90deg)} details summary::-webkit-details-marker{ display: none} details>ul{ padding-bottom: 1rem; margin-bottom: 0} .info-body{ padding: .5rem; border-top: 1px solid var(--secondary)} .divider{ -webkit-column-break-inside: avoid; -moz-column-break-inside: avoid; break-inside: avoid; page-break-inside: avoid} .note-info{ background: var(--info); padding: 5px 10px; border: 1px solid var(--info-border); color: var(--info-txt); margin: 20px auto} .note-success{ background: var(--success); padding: 5px 10px; border: 1px solid var(--success-border); color: var(--success-txt); margin: 20px auto} .note-danger{ background: var(--danger); padding: 5px 10px; border: 1px solid var(--danger-border); color: var(--danger-txt); margin: 20px auto} @media print{ *{ background: 0 !important; color: #000 !important; -webkit-filter: none !important; filter: none !important; -ms-filter: none !important} body{ margin: 0; padding: 0; font-size: 12pt; max-width: 100%} a, a:visited{ text-decoration: underline} hr{ height: 1px; border: 0; border-bottom: 1px solid #000} a[href]:after{ content: " (" attr(href)")"} abbr[title]:after{ content: " (" attr(title)")"} blockquote{ border-left: 4px solid #ddd; padding: 15px; page-break-inside: avoid} img, tr{ page-break-inside: avoid} table{ width: 100%} img{ max-width: 100% !important} h2, h3, p{ orphans: 3; widows: 3} h2, h3{ page-break-after: avoid} a[href]:after{ content: none}} .preloader{ height: calc(100vh - 6rem); display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center; background: var(--background); margin: 0; padding: 0} .loader{ width: 32px; height: 32px; position: relative} .loader svg{ -webkit-transform: rotate(360deg); -ms-transform: rotate(360deg); transform: rotate(360deg); -webkit-animation: rota 1s infinite linear; animation: rota 1s infinite linear} @-webkit-keyframes rota{ 0%{ -webkit-transform: rotate(-360deg); transform: rotate(-360deg)}} @keyframes rota{ 0%{ -webkit-transform: rotate(-360deg); transform: rotate(-360deg)}} .example{ display: -ms-grid; display: grid; -webkit-transition: all .5s; -o-transition: all .5s; transition: all .5s; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#000)); background: -o-linear-gradient(top, #fff, #000); background: linear-gradient(to bottom, #fff, #000)} ul:has(.task) input[type=checkbox]{ margin-right: 6px} ul:has(.task){ margin: 0; padding: 0; list-style: none} ul:has(.task) label{ box-sizing: border-box; display: flex; align-items: center; width: 100%; border: 1px solid var(--secondary); color: var(--text); margin: 2px 0; padding: 5px 10px} ul:has(.task) label:has(input:checked){ background: var(--info); border-color: var(--info-border); color: var(--info-txt); font-weight: 700}</style><body data-theme="dark">`

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
      
   cmdHtml + `
    <style rel="stylesheet">@import url('https://fonts.googleapis.com/css2?family=Oswald&family=Quattrocento:wght@400;700&display=swap');:root{--font-family-header:'Oswald',sans-serif;--font-family:'Quattrocento',serif;--font-size:14px;--font-weight:400;--line-height:1.6;--transition:all .5s ease;--primary:#1175b8;--secondary:#f5f5f5;--background:#fff;--txt:#333;--info:#eefbff;--info-border:#c0def7;--info-txt:#2b5274;--success:#f0ffee;--success-border:#c0f7d8;--success-txt:#2b7434;--danger:#fee;--danger-border:#f7c0c0;--danger-txt:#742b2b;--gutter:10px}[data-theme=dark]{--primary:#fff;--secondary:#222;--background:#181818;--txt:#8b8b8b;--info:#0c2932;--info-border:#06181e;--info-txt:#61b0c9;--success:#244820;--success-border:#122a10;--success-txt:#7acb71;--danger:#461919;--danger-border:#280c0c;--danger-txt:#c75959}.grid{columns:5 150px;gap:var(--gutter);margin:var(--gutter)}::-webkit-scrollbar{ background: var(--secondary); width: 5px; height: 5px;} ::-webkit-scrollbar-thumb{ background: var(--txt); cursor: pointer} body{ max-width: 1024px; margin: auto; font-family: var(--font-family); font-size: var(--font-size); line-height: var(--line-height); padding-top: 10px; padding-bottom: 10px; background-color: var(--background); color: var(--txt); padding: 30px} body>:first-child{ margin-top: 0 !important} body>:last-child{ margin-bottom: 0 !important} a{ color: var(--primary)} a.anchor{ display: block; padding-left: 30px; margin-left: -30px; cursor: pointer; position: absolute; top: 0; left: 0; bottom: 0} h1, h2, h3, h4, h5, h6{ padding: 0; font-family:var(--font-family-header); font-weight: 700; -webkit-font-smoothing: antialiased; cursor: text; position: relative; text-transform: uppercase; margin: 0} h1:hover a.anchor, h2:hover a.anchor, h3:hover a.anchor, h4:hover a.anchor, h5:hover a.anchor, h6:hover a.anchor{ text-decoration: none} h1 code, h1 tt{ font-size: inherit} h2 code, h2 tt{ font-size: inherit} h3 code, h3 tt{ font-size: inherit} h4 code, h4 tt{ font-size: inherit} h5 code, h5 tt{ font-size: inherit} h6 code, h6 tt{ font-size: inherit} h1{ font-size: 28px; color: var(--primary)} h2{ font-size: 24px; border-bottom: 1px solid var(--secondary); color: var(--primary)} h3{ font-size: 18px} h4{ font-size: 16px} h5{ font-size: 14px} h6{ font-size: 14px} blockquote, dl, li, ol, p, pre, table, ul{ margin: 15px 0} hr{ border: 0none; color: var(--secondary); height: 4px; padding: 0} body>h2:first-child{ margin-top: 0; padding-top: 0} body>h1:first-child{ margin-top: 0; padding-top: 0} body>h1:first-child+h2{ margin-top: 0; padding-top: 0} body>h3:first-child, body>h4:first-child, body>h5:first-child, body>h6:first-child{ margin-top: 0; padding-top: 0} a:first-child h1, a:first-child h2, a:first-child h3, a:first-child h4, a:first-child h5, a:first-child h6{ margin-top: 0; padding-top: 0} h1 p, h2 p, h3 p, h4 p, h5 p, h6 p{ margin-top: 0} li p.first{ display: inline-block} li{ margin: 0} ol, ul{ padding-left: 30px} ol:first-child, ul:first-child{ margin-top: 0} dl{ padding: 0} dl dt{ font-size: 14px; font-weight: 700; font-style: italic; padding: 0; margin: 15px 5px} dl dt:first-child{ padding: 0} dl dt>:first-child{ margin-top: 0} dl dt>:last-child{ margin-bottom: 0} dl dd{ margin: 15px; padding: 15px} dl dd>:first-child{ margin-top: 0} dl dd>:last-child{ margin-bottom: 0} blockquote{ border-left: 4px solid var(--secondary); padding: 15px; color: var(--primary)} blockquote>:first-child{ margin-top: 0} blockquote>:last-child{ margin-bottom: 0} table{ padding: 0; border-collapse: collapse; width: 100%; margin: 30px auto; background: var(--background)} table tr{ border-top: 1px solid var(--secondary); background-color: var(--background); margin: 0; padding: 0} table tr:nth-child(2n){ color: var(--txt); background: var(--secondary)} table tr th{ font-weight: 700; border: 1px solid var(--txt); background: var(--txt); color: var(--secondary); margin: 0; padding: 6px 13px} table tr td{ border: 1px solid var(--secondary); margin: 0; padding: 6px 13px} table tr td:first-child, table tr th:first-child{ margin-top: 0} table tr td:last-child, table tr th:last-child{ margin-bottom: 0} img{ max-width: 100%} code, tt{ margin: 2px; padding: 5px; white-space: nowrap; border: 1px solid var(--secondary); background-color: var(--background); border-radius: 3px} pre code{ margin: 0; padding: 0; white-space: pre; border: 0; background: 0} pre{ border: 1px solid var(--txt); background-color: var(--txt); color: var(--secondary); font-size: 13px; line-height: 20px; overflow: auto; padding: 6px 10px; border-radius: 3px; margin: 30px auto; white-space: pre-wrap; font-family: "Consolas", monospace} pre code, pre tt{ background-color: transparent; border: 0} sup{ font-size: .83em; vertical-align: super; line-height: 0} *{ -webkit-print-color-adjust: exact} @media screen and (min-width:914px){ body{ width: 854px; margin: 0auto}} @media print{ pre, table{ page-break-inside: avoid} pre{ word-wrap: break-word}} img{ display: block; max-width: 100%; margin: 20px auto; -webkit-box-shadow: 2px 3px 3px var(--background); box-shadow: 2px 3px 3px var(--background)} li.task{ list-style-type: none} .col-2{ -webkit-column-count: 2; -moz-column-count: 2; column-count: 2; -webkit-column-gap: 20px; -moz-column-gap: 20px; column-gap: 20px; -webkit-column-rule: 1px solid var(--secondary); -moz-column-rule: 1px solid var(--secondary); column-rule: 1px solid var(--secondary); margin: 20px auto; padding-bottom: 10px; border-bottom: 1px solid var(--secondary)} .col-3{ -webkit-column-count: 3; -moz-column-count: 3; column-count: 3; -webkit-column-gap: 10px; -moz-column-gap: 10px; column-gap: 10px; -webkit-column-rule: 1px solid var(--secondary); -moz-column-rule: 1px solid var(--secondary); column-rule: 1px solid var(--secondary); margin: 20px auto; padding-bottom: 10px; border-bottom: 1px dotted var(--secondary)} @media (max-width:700px){ .col-2, .col-3{ column-count: 1}} div p{ margin: 0} details{ width: 100%; margin: 0auto; background: var(--background); border: 1px solid var(--secondary); margin-bottom: .5rem; border-radius: 5px; overflow: hidden} summary{ padding: .5rem; display: block; background: var(--background); padding-left: 1.8rem; position: relative; cursor: pointer} summary:before{ content: ""; border-width: .4rem; border-style: solid; border-color: transparent transparent transparent var(--txt); color: var(--txt); position: absolute; top: .8rem; left: .8rem; transform: rotate(0); transform-origin: .2rem 50%; transition: .25s transform ease} details[open]>summary:before{ transform: rotate(90deg)} details summary::-webkit-details-marker{ display: none} details>ul{ padding-bottom: 1rem; margin-bottom: 0} .info-body{ padding: .5rem; border-top: 1px solid var(--secondary)} .divider{ -webkit-column-break-inside: avoid; -moz-column-break-inside: avoid; break-inside: avoid; page-break-inside: avoid} .note-info{ background: var(--info); padding: 5px 10px; border: 1px solid var(--info-border); color: var(--info-txt); margin: 20px auto} .note-success{ background: var(--success); padding: 5px 10px; border: 1px solid var(--success-border); color: var(--success-txt); margin: 20px auto} .note-danger{ background: var(--danger); padding: 5px 10px; border: 1px solid var(--danger-border); color: var(--danger-txt); margin: 20px auto} @media print{ *{ background: 0 !important; color: #000 !important; -webkit-filter: none !important; filter: none !important; -ms-filter: none !important} body{ margin: 0; padding: 0; font-size: 12pt; max-width: 100%} a, a:visited{ text-decoration: underline} hr{ height: 1px; border: 0; border-bottom: 1px solid #000} a[href]:after{ content: " (" attr(href)")"} abbr[title]:after{ content: " (" attr(title)")"} blockquote{ border-left: 4px solid #ddd; padding: 15px; page-break-inside: avoid} img, tr{ page-break-inside: avoid} table{ width: 100%} img{ max-width: 100% !important} h2, h3, p{ orphans: 3; widows: 3} h2, h3{ page-break-after: avoid} a[href]:after{ content: none}} .preloader{ height: calc(100vh - 6rem); display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center; background: var(--background); margin: 0; padding: 0} .loader{ width: 32px; height: 32px; position: relative} .loader svg{ -webkit-transform: rotate(360deg); -ms-transform: rotate(360deg); transform: rotate(360deg); -webkit-animation: rota 1s infinite linear; animation: rota 1s infinite linear} @-webkit-keyframes rota{ 0%{ -webkit-transform: rotate(-360deg); transform: rotate(-360deg)}} @keyframes rota{ 0%{ -webkit-transform: rotate(-360deg); transform: rotate(-360deg)}} .example{ display: -ms-grid; display: grid; -webkit-transition: all .5s; -o-transition: all .5s; transition: all .5s; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#000)); background: -o-linear-gradient(top, #fff, #000); background: linear-gradient(to bottom, #fff, #000)} ul:has(.task) input[type=checkbox]{ margin-right: 6px} ul:has(.task){ margin: 0; padding: 0; list-style: none} ul:has(.task) label{ box-sizing: border-box; display: flex; align-items: center; width: 100%; border: 1px solid var(--secondary); color: var(--text); margin: 2px 0; padding: 5px 10px} ul:has(.task) label:has(input:checked){ background: var(--info); border-color: var(--info-border); color: var(--info-txt); font-weight: 700}</style><body data-theme="dark">`
  
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