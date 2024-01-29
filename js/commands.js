appye.createCommand(
  'app-load',
  (commandIn) => {
   commandIn = JSON.parse(commandIn);
   let appName = commandIn.arguments[1];
   let cachedApp = db.apps[appName];
   cachedApp.class = 'appye';
    if (cachedApp) {
      void new WinBox(cachedApp);
    } else {
      alert(`The app "${appName}" could not be found.`);
    }
  },
  {
   title: "App Loader",
   description: "This loads all the apps.",
   author: "Pascal"
  }
);

appye.createCommand(
 'ls',
 (commandIn) => {
 var htmlVar = "";
 function getHtml(name,metaobject){
 let htmlVar = "";
 htmlVar += `<div class="appgrid">`;
 for(var items in metaobject){
   console.log(JSON.stringify(items));
   console.log(JSON.stringify(metaobject[items]));
   let title = metaobject[items].title;
   let description = metaobject[items].description;
   let author = metaobject[items].author;
   let icon = metaobject[items].icon;
  htmlVar +=`
  <div onclick="intCmd('app-load ${items}')" class="app" id="${items}App">
    <img class="appimg" src="${icon}"></img>
    <h3>${title}</h3>
    <p>${description}</p>
    <p><i>By</i> <b>${author}</b></p>
  </div>
`
 }
 htmlVar += `</div>`;
 return htmlVar;
 }
 
 var appHtml = getHtml('Apps',db.meta.apps);

 //ls.html
 //add button
 var mainHtml = `<button class="appyebutton" style="cursor:pointer;" title="Add an app or a command." onclick=""><span class="material-symbols-outlined"> library_add </span></button>`;
 
 //import button
 mainHtml += `<button class="appyebutton" style="cursor:pointer;" title="Import an app into Appye." onclick=""><span class="material-symbols-outlined"> publish </span></button>`;

 mainHtml += appHtml;

 new WinBox({
   title: "List",
   background: '#249000',
   html: mainHtml,
   class: 'appye'
 });

 },
 {
   title: "List",
   description: "This command lists <b>everything</b>.",
   author: "Pascal",

 }
)