appye.createCommand(
  'app-load',
  (commandIn) => {
   commandIn = JSON.parse(commandIn);
   let appName = commandIn.arguments[1];
   let cachedApp = db.apps[appName];
   cachedApp.class = 'appye';
    if (cachedApp) {
      void new WinBox(cachedApp);
    } else if (cachedApp.evalme){
      eval(cachedApp.evalme);
    }
    else {
      alert(`The app "${appName}" could not be found.`);
    }},
  {
   title: "App Loader",
   description: "This loads apps.",
   author: "Pascal",
  }
);

appye.createCommand(
 'ls',
 (commandIn) => {
 var htmlVar = "";
 function getHtml(name,metaobject,id){
 let htmlVar = document.createElement('div');
 htmlVar.className = 'appgrid';
 htmlVar.style.display = 'grid';
 htmlVar.id = id;

 for(var items in metaobject){

  if(metaobject[items].hideme){
    break;
  }

   console.log(JSON.stringify(items));
   console.log(JSON.stringify(metaobject[items]));
   let title = metaobject[items].title;
   let description = metaobject[items].description;
   let author = metaobject[items].author;
   let icon = metaobject[items].icon;
   let command = '';
   let type = '';

   switch(name){
    case "Apps":
    command = `app-load ${items}`;
    type = 'apps';
      break;
    case "Commands":
    command = `${items}`;
    type = 'commands';
      break;
   }

   let appDiv = document.createElement('div');
   appDiv.className = 'app';
   appDiv.id = `${items}App`;
   //javascirpt is a clown for not being able to use .onclick
   appDiv.setAttribute(`onclick`, `intCmd("${command}");`);

   let img = document.createElement('img');
   img.className = 'appimg';
   img.src = icon;

   let titleElement = document.createElement('h3');
   titleElement.textContent = title;

   let descElement = document.createElement('p');
   descElement.textContent = description;

  let authorElement = document.createElement('p');
  authorElement.innerHTML = `<i>By</i> <b>${author}</b>`;

  let idElement = document.createElement('p');
  idElement.innerHTML = `ID is: <b>${items}</b>`;

  
    appDiv.appendChild(img);
    appDiv.appendChild(titleElement);
    appDiv.appendChild(descElement);
    appDiv.appendChild(authorElement);
    appDiv.appendChild(idElement);

if(metaobject[items]?.local == true){
  let deleteButton = document.createElement('button');
  deleteButton.style.cursor = 'pointer';
  deleteButton.title = 'Remove';
  deleteButton.className = 'innerappyebutton';
  deleteButton.setAttribute(`onclick`,`delete db.meta.${type}.${items}; 
  delete db.${type}.${items}; dbUpdate(); reloadWindow('ls');`)
  
  let deleteButtonIcon = document.createElement('span');
  deleteButtonIcon.className = 'material-symbols-outlined';
  deleteButtonIcon.textContent = 'delete';

  deleteButton.appendChild(deleteButtonIcon);
  appDiv.appendChild(deleteButton);
}

  htmlVar.appendChild(appDiv)

 }

 if(metaobject == db.meta.commands){
  htmlVar.style.display = "none";
 }

 return htmlVar.outerHTML;
 }
 
 let appHtml = getHtml('Apps',db.meta.apps,'appgrid');
 let cmdHtml = getHtml('Commands',db.meta.commands,'commandgrid');

 //add button
 let mainHtml = '';
 let containerDiv = document.createElement('div');

// add button
 let addButton = document.createElement('button');
 addButton.className = 'appyebutton';
 addButton.style.cursor = 'pointer';
 addButton.title = "Add an app or a command.";
 addButton.setAttribute('onclick','intCmd("addUI_Create_Me")');

 let addButtonIcon = document.createElement('span');
 addButtonIcon.className = 'material-symbols-outlined';
 addButtonIcon.textContent = 'library_add';

 //import button
 let importButton = document.createElement('button');
 importButton.className = 'appyebutton';
 importButton.style.cursor = 'pointer';
 importButton.title = "Import an app or a command into Appye.";
 importButton.setAttribute('onclick','');

 let importButtonIcon = document.createElement('span');
 importButtonIcon.className = 'material-symbols-outlined';
 importButtonIcon.textContent = 'publish';

// switch views
 let viewButton = document.createElement('button');
 viewButton.className = 'appyebutton';
 viewButton.style.cursor = 'pointer';
 viewButton.title = "Switch views";
 viewButton.setAttribute('onclick','toggleCommandView();');

 let viewButtonIcon = document.createElement('span');
 viewButtonIcon.className = 'material-symbols-outlined';
 viewButtonIcon.textContent = 'view_stream';


 
  addButton.appendChild(addButtonIcon);
  containerDiv.appendChild(addButton);

  importButton.appendChild(importButtonIcon);
  containerDiv.appendChild(importButton);

  viewButton.appendChild(viewButtonIcon);
  containerDiv.appendChild(viewButton);

  mainHtml = containerDiv.innerHTML;
 
 mainHtml += appHtml;
 mainHtml += cmdHtml;

 new WinBox({
   title: "List",
   background: '#249000',
   html: mainHtml,
   class: 'appye',
   icon: db.meta.commands.ls.icon
 });

 },
 {
   title: "List",
   description: "This command lists everything.",
   author: "Pascal",
 }
)

appye.createCommand(
  'addUI_Create_Me',
  (commandIn) => {
    let CreateMe_UI_HTML = '';

    let startDiv = document.createElement('div')
    startDiv.id = 'startDiv';

    let createSomething = document.createElement('h1');
    createSomething.textContent = "Let's create something!";

    startDiv.appendChild(createSomething);

    let giveItAName = document.createElement('h3');
    giveItAName.textContent = "Give it a name!";
    startDiv.appendChild(giveItAName);

    let userTitle = document.createElement('input');
    userTitle.id = 'userTitle';
    userTitle.className = 'apppyeinput';
    userTitle.placeholder = "Google";
    startDiv.appendChild(userTitle);

    let giveAnID = document.createElement('h3');
    giveAnID.textContent = "Give an ID (no spaces)";
    startDiv.appendChild(giveAnID);

    let userID = document.createElement('input');
    userID.id = 'userID';
    userID.className = 'apppyeinput';
    userID.placeholder = 'google_search';
    startDiv.appendChild(userID);

    let whoMadeThis = document.createElement('h3');
    whoMadeThis.textContent = "Who made this?";
    startDiv.appendChild(whoMadeThis);

    let userAuthor = document.createElement('input');
    userAuthor.id = 'userAuthor';
    userAuthor.className = "apppyeinput"
    userAuthor.placeholder = "Google Inc.";
    startDiv.appendChild(userAuthor);

    let whatsItsAbout = document.createElement('h3');
    whatsItsAbout.textContent = "What's it about?";
    startDiv.appendChild(whatsItsAbout);

    let userDescription = document.createElement('textarea');
    userDescription.id = 'userDescription';
    userDescription.className = 'apppyeinput';
    userDescription.placeholder = "The Google search engine.";
    startDiv.appendChild(userDescription);

    let anIcon = document.createElement('h3');
    anIcon.textContent = "An icon for it?"
    startDiv.appendChild(anIcon);

    let userIcon = document.createElement('input');
    userIcon.id = 'userIcon';
    userIcon.className = 'apppyeinput';
    userIcon.placeholder = 'https://www.google.com/favicon.ico';
    startDiv.appendChild(userIcon);

    let br = document.createElement('br');
    startDiv.appendChild(br);

    let nextButton = document.createElement('button');
    nextButton.className = 'appyebutton';
    nextButton.style.cursor = 'pointer';
    nextButton.title = "Continue to the next page."
    nextButton.setAttribute('onclick',"showHideDiv('detailDiv','startDiv');");

    let nextButtonIcon = document.createElement('span');
    nextButtonIcon.className = 'material-symbols-outlined';
    nextButtonIcon.textContent = 'arrow_forward'
    nextButton.appendChild(nextButtonIcon);

    startDiv.appendChild(nextButton);

    let detailDiv = document.createElement('div');
    detailDiv.id = 'detailDiv';
    detailDiv.className = "hideme";

    let letsGetTheDetails = document.createElement('h1');
    letsGetTheDetails.textContent = "Let's get the details!";
    detailDiv.appendChild(letsGetTheDetails);

    let whatIsit = document.createElement('h3');
    whatIsit.textContent = "What is it?";
    detailDiv.appendChild(whatIsit);

    let appRadio = document.createElement('input');
    appRadio.type = 'radio';
    appRadio.id = 'app';
    appRadio.name = 'addType';
    appRadio.value = "App";
    appRadio.setAttribute('onclick',"showHideDiv('appOnly','commandOnlyDiv')");
    detailDiv.appendChild(appRadio);

    let appLabel = document.createElement('label');
    appLabel.setAttribute('for','app')
    appLabel.textContent = "App";
    detailDiv.appendChild(appLabel);

    let appSpacing = document.createElement('br');
    detailDiv.appendChild(appSpacing);

    let commandRadio = document.createElement('input')
    commandRadio.type = 'radio';
    commandRadio.setAttribute('onclick',"showHideDiv('commandOnlyDiv','appOnly')")
    commandRadio.id = 'command';
    commandRadio.name = 'addType';
    commandRadio.value = "Command";
    detailDiv.appendChild(commandRadio);

    let commandLabel = document.createElement('label');
    commandLabel.for = 'command';
    commandLabel.textContent = "Command";
    detailDiv.appendChild(commandLabel);

    let commandSpacing = document.createElement('br');
    detailDiv.appendChild(commandSpacing);

    let commandOnlyDiv = document.createElement('div');
    commandOnlyDiv.className = 'hideme';
    commandOnlyDiv.id = 'commandOnlyDiv';

    let jsCodeh3 = document.createElement('h3');
    jsCodeh3.textContent = "Paste in your Javascript code.";

    commandOnlyDiv.appendChild(jsCodeh3);

    let jsTextArea = document.createElement('textarea');
    jsTextArea.id = 'userJavascript';
    jsTextArea.placeholder = 'alert(JSON.stringify(commandIn));';
    jsTextArea.className = 'apppyeinput';

    commandOnlyDiv.appendChild(jsTextArea)

    detailDiv.appendChild(commandOnlyDiv);

    let appOnlyDiv = document.createElement('div');
    appOnlyDiv.id = 'appOnly';
    appOnlyDiv.className = 'hideme';
    
    let urlOrHtmlh3 = document.createElement('h3');
    urlOrHtmlh3.textContent = "Do you have a URL or HTML for this app?";

    appOnlyDiv.appendChild(urlOrHtmlh3);

    let urlRadio = document.createElement('input');
    urlRadio.type = 'radio';
    urlRadio.setAttribute('onclick',"showHideDiv('urlOnly','htmlOnly')");
    urlRadio.id = 'URL';
    urlRadio.name = 'appType';
    urlRadio.value = 'URL';

    appOnlyDiv.appendChild(urlRadio);

    let URLlabel = document.createElement('label');
    URLlabel.for = 'URL';
    URLlabel.textContent = "URL";
    
    appOnlyDiv.appendChild(URLlabel);

    let HTMLradio = document.createElement('input');
    HTMLradio.type = 'radio';
    HTMLradio.setAttribute('onclick',"showHideDiv('htmlOnly','urlOnly')");
    HTMLradio.id = 'HTML';
    HTMLradio.value = 'HTML';
    HTMLradio.name = 'appType';
    appOnlyDiv.appendChild(HTMLradio);

    let HTMLlabel = document.createElement('label');
    HTMLlabel.for = 'HTML';
    HTMLlabel.textContent = "HTML";
    appOnlyDiv.appendChild(HTMLlabel);

    detailDiv.appendChild(appOnlyDiv);

    let URLOnlyDiv = document.createElement('div');
    URLOnlyDiv.id = 'urlOnly';
    URLOnlyDiv.className = 'hideme';
    
    let urlTextArea = document.createElement('textarea');
    urlTextArea.id = 'userUrl';
    urlTextArea.placeholder = 'https://www.google.com/?igu=1'
    urlTextArea.className = 'apppyeinput';

    URLOnlyDiv.appendChild(urlTextArea);

    detailDiv.appendChild(URLOnlyDiv);

    let HTMLOnlyDiv = document.createElement('div');
    HTMLOnlyDiv.id = 'htmlOnly';
    HTMLOnlyDiv.className = 'hideme';

    let HTMLTextArea = document.createElement('textarea');
    HTMLTextArea.id = 'userHtml';
    HTMLTextArea.placeholder = "<h1>This is Google.</h1>";
    HTMLTextArea.className = 'apppyeinput'

    HTMLOnlyDiv.appendChild(HTMLTextArea);

    detailDiv.appendChild(HTMLOnlyDiv);

    let userColorText = document.createElement('h3');
    userColorText.textContent = "Pick a color to stylize your app window!";
    detailDiv.appendChild(userColorText);

    let userColor = document.createElement('input')
    userColor.type = 'color';
    userColor.id = 'userColor';
    detailDiv.appendChild(userColor);

    let backButton = document.createElement('button');
    backButton.className = 'appyebutton'
    backButton.style.cursor = 'pointer';
    backButton.title = "Go back a page.";
    backButton.setAttribute('onclick',"showHideDiv('startDiv','detailDiv');")
    backButton.innerHTML += '<span class="material-symbols-outlined">arrow_back</span>';
    detailDiv.appendChild(backButton);

    let copyButton = document.createElement('button');
    copyButton.className = 'appyebutton'
    copyButton.style.cursor = 'pointer';
    copyButton.title = "Copy the code.";
    copyButton.setAttribute('onclick',"userInterfaceDo('copy')")
    copyButton.innerHTML += '<span class="material-symbols-outlined">content_copy</span>';
    detailDiv.appendChild(copyButton);

    let createButton = document.createElement('button');
    createButton.className = 'appyebutton'
    createButton.style.cursor = 'pointer';
    createButton.title = "Create it!";
    createButton.setAttribute('onclick',"userInterfaceDo('create');")
    createButton.innerHTML += '<span class="material-symbols-outlined">check_small</span>';
    detailDiv.appendChild(createButton);

    CreateMe_UI_HTML = startDiv.outerHTML;
    CreateMe_UI_HTML += detailDiv.outerHTML;


    new WinBox({
      title: "Create",
      background: '#249000',
      modal: true,
      html: CreateMe_UI_HTML,
      class: 'appye',
      icon: db.meta.commands.addUI_Create_Me.icon,
    });
  },
  {
    title:"Add App",
    description: "IF YOU SEE THIS IT IS BUG REPORT IT.",
    author: "YOU WILL NEVER SEE THIS.",
    hideme: true
  }
)