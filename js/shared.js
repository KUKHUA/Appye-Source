function cmd() {
  var commandStart = "";
  commandIn = prompt("Command:");
  if (commandIn == "" || commandIn == " ") {
    alert("Hint: You can click the cancel button or press Escape.");
    return;
  } else if (commandIn == null) {
    return;
  }
    intCmd(commandIn);
    dbUpdate();
}

function intCmd(command) {
  let commandArgs = command.split(" ");
  var commandStart = commandArgs[0];
  let commandTime = Date.now();
  
  var commandIn = {
  fullCommand: command,
  commandName: commandStart,
  arguments: commandArgs,
  time: commandTime
  };

  commandIn = JSON.stringify(commandIn);
  console.log(commandIn);

  if(db.meta.commands[commandStart] && db.meta.commands[commandStart].local){
    eval(db.commands[commandStart]);
  }

  if (db.commands[commandStart]) {
      dbUpdate();
      db.commands[commandStart](commandIn);
  } else {
    alert(`The ${commandStart} command dose not seem to exist.`);
  }
}

idObj = {};

function hideDiv(id) {
var tmpID = document.getElementById(id);
var tmpIDText = document.getElementById(id + "Text");
if (idObj[id]) {
  idObj[id] = 0;
  tmpID.style.display = 'none';
  if(tmpIDText){
    tmpIDText.style['font-style'] = 'italic';
  }
} else {
  idObj[id] = 1;
  tmpID.style.display = 'block';
  if(tmpIDText){
    tmpIDText.style['font-style'] = '';
  }
}}

function showHideDiv(showId, hideIds) {
  var elementToShow = document.getElementById(showId);
  elementToShow.style.display = 'block';
  
  if (Array.isArray(hideIds)) {
    hideIds.forEach(function(id) {
      var elementToHide = document.getElementById(id);
      elementToHide.style.display = 'none';
    });
  } else {
    var elementToHide = document.getElementById(hideIds);
    elementToHide.style.display = 'none';
  }
} 

function getIcon(appName) {
  const iconMirrors = [
    "https://git.basicfan.eu.org/lucky/Appye-Source/raw/branch/main/icons/",
    "https://raw.githubusercontent.com/KUKHUA/Appye-Source/main/icons/",
  ];

  for (const mirror of iconMirrors) {
    const iconUrl = `${mirror}${appName}_icon.png`;
    try {
      const request = new XMLHttpRequest();
      request.open('GET', iconUrl, false);  // `false` makes the request synchronous
      request.send(null);

      if (request.status === 200) {
        return iconUrl;
      }
    } catch (error) {
      // Ignore errors and continue to the next mirror
    }
  }

  if (db.meta.apps[appName]?.icon) {
    const iconUrl = db.meta.apps[appName].icon;
    try {
      const request = new XMLHttpRequest();
      request.open('GET', iconUrl, false);  // `false` makes the request synchronous
      request.send(null);

      if (request.status === 200) {
        return iconUrl;
      }
    } catch (error) {
      // Ignore errors and return the default icon
    }
  }

  return "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgLTk2MCA5NjAgOTYwIiB3aWR0aD0iMjQiPjxwYXRoIGQ9Ik00MjQtMzIwcTAtODEgMTQuNS0xMTYuNVQ1MDAtNTE0cTQxLTM2IDYyLjUtNjIuNVQ1ODQtNjM3cTAtNDEtMjcuNS02OFQ0ODAtNzMycS01MSAwLTc3LjUgMzFUMzY1LTYzOGwtMTAzLTQ0cTIxLTY0IDc3LTExMXQxNDEtNDdxMTA1IDAgMTYxLjUgNTguNVQ2OTgtNjQxcTAgNTAtMjEuNSA4NS41VDYwOS00NzVxLTQ5IDQ3LTU5LjUgNzEuNVQ1MzktMzIwSDQyNFptNTYgMjQwcS0zMyAwLTU2LjUtMjMuNVQ0MDAtMTYwcTAtMzMgMjMuNS01Ni41VDQ4MC0yNDBxMzMgMCA1Ni41IDIzLjVUNTYwLTE2MHEwIDMzLTIzLjUgNTYuNVQ0ODAtODBaIi8+PC9zdmc+";
}

function dbUpdate(){
  localStorage.setItem('db', JSON.stringify(db));
}

function showHideDiv(showIds, hideIds) {
  if (Array.isArray(showIds)) {
    showIds.forEach(function(id) {
      var elementToShow = document.getElementById(id);
      elementToShow.style.display = 'block';
    });
  } else {
    var elementToShow = document.getElementById(showIds);
    elementToShow.style.display = 'block';
  }
  
  if (Array.isArray(hideIds)) {
    hideIds.forEach(function(id) {
      var elementToHide = document.getElementById(id);
      elementToHide.style.display = 'none';
    });
  } else {
    var elementToHide = document.getElementById(hideIds);
    elementToHide.style.display = 'none';
  }
}

function remove(app,type){
  switch(type){
    case command:
      delete db.commands[app];
      delete db.meta.commands[app];
    break;

    case app:
      delete db.apps[app];
      delete db.meta.apps[app];
    break;

    case flag:
      delete db.flags[app];
      delete db.meta.flags[app];
      break;
  }
}

document.head.innerHTML += `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,500;0,900;1,500;1,900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
<style>
.appyeheading{
color: #249000;
font-weight: 800;
user-select: none;
}

.appyebutton {
font-family: 'Source Code Pro', monospace;
font-weight: 500;
background-color: #0F0F0F;
color: white;
border-radius: 10px;
box-shadow: 2px 2px 2px #272727;
}

.appyebutton:hover {
background-color: #272727;
}

.winbox.appye .wb-body {
background-color: #0F0F0F;
color: white;
font-family: 'Source Code Pro', monospace;
}

.appyedivider {
border-top: 5px solid #d1cccc;
border-radius: 10px;
}

.apppyeinput {
font-family: 'Source Code Pro', monospace;
font-weight: 500;
background-color: #272727;
color: white;
border-radius: 5px;
}

.hideme {
display: none;
}

</style>
`;

