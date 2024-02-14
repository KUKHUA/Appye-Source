function cmd() {
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

  if(commandStart.startsWith('$')){
    eval(commandIn.fullCommand.replace('$',""));
    return;
  }
  
  commandIn = JSON.stringify(commandIn);

  if(db.meta.commands[commandStart] && db.meta.commands[commandStart].local){
    eval(db.commands[commandStart]);
  } else if (db.commands[commandStart]) {
      dbUpdate();
      db.commands[commandStart](commandIn);
      return;
  } else {
    try {
      eval(commandStart);
    } catch(err) {
      alert(err.message);
    }

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
      request.open('GET', iconUrl, false);  
      request.send(null);

      if (request.status === 200) {
        return iconUrl;
      }
    } catch (error) {
      // Ignore errors and continue to the next mirror
    }
  }

  if (db.meta.apps[appName]?.icon || db.meta.commands?.icon) {
    let iconUrl;
    if(db.meta.apps[appName]?.icon){
      iconUrl = db.meta.apps[appName].icon;
    } else {
      iconUrl = db.meta.commands[appName].icon;
    }

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

function clipBoardWrite(toWrite){
  if (navigator.clipboard && window.isSecureContext) {
   navigator.clipboard.writeText(toWrite);
} else {
   prompt("Please copy the following:",toWrite);
}
}

let commandView = true;
//resources for html:
function toggleCommandView() {
  if (commandView) {
    showHideDiv('commandgrid','appgrid');
    document.getElementById('commandgrid').style.display = 'grid';
  } else {
    showHideDiv('appgrid','commandgrid');
    document.getElementById('appgrid').style.display = 'grid';
  }
  commandView = !commandView; 
}

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
    return;
  }
} 
function reloadWindow(command){
  var winboxes = document.querySelectorAll('.winbox');
  for (var i =  0; i < winboxes.length; i++) {
    winboxes[i].remove();
  }
  intCmd(command);
}
function userInterfaceDo(type) {
  let usertitle = document.getElementById('userTitle').value;
  let userid = document.getElementById('userID').value;
  let userauthor = document.getElementById('userAuthor').value;
  let userdescription = document.getElementById('userDescription').value;
  let usericon = document.getElementById('userIcon').value;
  let userjs = document.getElementById('userJavascript').value;
  let userColor = document.getElementById('userColor').value;
  let userUrl = document.getElementById('userUrl').value;
  let userHtml = document.getElementById('userHtml').value;
  let usermeta = {
    title: usertitle,
    description: userdescription,
    author: userauthor,
    icon: usericon,
    local: true,
  };

  if (type == "create") {
    if (document.getElementById('command').checked) {
      appye.createCommand(userid, userjs, usermeta);
    } else if (document.getElementById('app').checked && document.getElementById('URL').checked) {
      appye.createApp(userid, {
        title: usertitle,
        url: userUrl,
        background: userColor,
        icon: usericon
      }, usermeta);
    } else if (document.getElementById('app').checked && document.getElementById('HTML').checked) {
      appye.createApp(userid, {
        title: usertitle,
        html: userHtml,
        background: userColor,
        icon: usericon
      }, usermeta);
    }

    if (document.getElementById('app').checked) {
      db.apps[userid].icon = usericon;
      db.meta.apps[userid].icon = usericon;
    }
    alert(`${usertitle} has been created. All windows will close now.`);
    reloadWindow('ls');
  }

  if (type == "copy") {
    if (document.getElementById('command').checked) {
      clipBoardWrite(`appye.createCommand('${userid}','${userjs}',${JSON.stringify(usermeta)})`);
    } else if (document.getElementById('app').checked && document.getElementById('URL').checked) {
      clipBoardWrite(`
        appye.createApp(
          '${userid}',
          {
            title: '${usertitle}',
            url: '${userUrl}',
            background: '${userColor}',
            icon: '${usericon}'
          },
          ${JSON.stringify(usermeta)}
        )`);
    } else if (document.getElementById('app').checked && document.getElementById('HTML').checked) {
      clipBoardWrite(`
        appye.createApp(
          '${userid}',
          {
            title: '${usertitle}',
            html: '${userHtml.toString()}',
            background: '${userColor}',
            icon: '${usericon}'
          },
          ${JSON.stringify(usermeta)}
        )`);
    }
  }
}

document.head.innerHTML += `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,500;0,900;1,500;1,900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
<style>

.appyebutton {
  font-family: 'Source Code Pro', monospace;
  font-weight: 500;
  border:none;
  background-color: #272727;
  color: white;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
}

.innerappyebutton {
  font-family: 'Source Code Pro', monospace;
  font-weight: 500;
  border:none;
  background-color: #0F0F0F;
  color: white;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
}

.innerappyebutton:hover {
  background-color: #272727;
}

.appyebutton:hover {
  background-color: #5a5858;
}

.winbox.appye .wb-body {
background-color: #0F0F0F;
color: white;
font-family: 'Source Code Pro', monospace;
border-radius: 10px;
}

.winbox.appye {
  border-radius: 10px;
}

.appyedivider {
border-top: 5px solid #d1cccc;
border-radius: 10px;
margin-bottom: 5px;
margin-top: 5px;
margin-left: 5px;
margin-right: 5px;
}

.apppyeinput {
  font-family: 'Source Code Pro', monospace;
  font-weight: 500;
  background-color: #272727;
  color: white;
  border-radius: 5px;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 5px;
  border:none;
  outline: none;
  font-size: medium;
  }

.apppyeinput:focus{
    background-color: #5a5858;
    border:none;
  }


.hideme {
display: none;
}

.app {
  padding: 5px;
  border-radius: 5px;
  background-color: #272727;
  height: fit-content;
  width: fit-content;
  aspect-ratio: 1 / 1; 
  text-align: center;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.app:hover {
  background-color: #5a5858;
  cursor:pointer;
}

.appimg {
  margin-top: 5px;
  width: 80px;
  height: 80px;
  border-radius: 25px;
}

.appgrid {
  grid-template-columns: auto auto auto auto auto auto;
  margin: 0%;
  width: fit-content;
  height: fit-content;
  grid-gap: 10px; /* Add some gap between the grid items */
  justify-content: start;
  align-content: start; /* Align the grid items to the start */
}
</style>
`;

