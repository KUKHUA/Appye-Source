appye.createCommand(
  'app-load',
  (commandIn) => {
   commandIn = JSON.parse(commandIn);
   let appName = commandIn.arguments[1];
   let cachedApp = db.apps[appName];
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
 htmlVar += `<h1 class="appyeheading" title="You can double click to show/hide this section." `;
 htmlVar += `id="${name}Text" style="cursor:pointer" onclick='hideDiv("${name}")'><span class="material-symbols-outlined">arrow_drop_down</span>${name}</h1><div id="${name}">`;

 for( var items in metaobject){
   console.log(JSON.stringify(items));
   console.log(JSON.stringify(metaobject[items]));
   let title = metaobject[items].title;
   let description = metaobject[items].description;
   let author = metaobject[items].author;
   let icon = metaobject[items].icon;
   let type;
   switch(metaobject){
     case db.meta.apps:
     type = 'app';
       break;
     case db.meta.commands:
     type = 'command';
       break;
     case db.meta.flags:
     type = 'flag';
       break;
   }

   htmlVar += `
   <h2><img width="25" height="25" src="${icon}" alt="${title}'s Icon"> ${title}</h2>
   <h4>by <b>${author}</b></h4>
   <h5>ID: ${items}</h5>
   <p>${description}</p>`;

   if(metaobject == db.meta.apps){
     htmlVar += `
     <button class="appyebutton" style="cursor:pointer;" onclick="intCmd('app-load ${items}')" > Open ${title}</button>
     `;
   }

   htmlVar += `<hr class="appyedivider">`;
 }
htmlVar += `</div>`;
 return htmlVar;
 }
 
 var appHtml = getHtml('Apps',db.meta.apps);
 var cmdHtml = getHtml('Commands',db.meta.commands);

 //ls.html
 //add button
 var mainHtml = `<button class="appyebutton" style="cursor:pointer;" title="Allows you to add an app, command, etc." onclick="">Add...</button> `;
 
 //import button
 mainHtml += `<button class="appyebutton" style="cursor:pointer;" title="Allows you to import a FLZ (pre-packaged app/game) into Appye." onclick="">Import FLZ</button>`;

 mainHtml += appHtml;
 mainHtml += cmdHtml;

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