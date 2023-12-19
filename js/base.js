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