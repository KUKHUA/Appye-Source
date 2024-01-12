//event listeners & consts
jsonAppObject = { apps: {}, commands: {}, metadata: {}, flags: {} };

// set functions for plugins
const appye = {
  createApp(name, info, metadata) {
    //check for dupliucates
    if (name in jsonAppObject.apps) {
      throw new Error("Duplicate app " + name);
    } else if (name in jsonAppObject.metadata) {
      throw new Error("Duplicate metadata " + name);
    }
    jsonAppObject.apps[name] = info;
    jsonAppObject.apps[name].icon = getIcon(name);
    jsonAppObject.metadata[name] = metadata;
  },
  createCommand(command, js, metadata) {
    if (command in jsonAppObject.commands) {
      throw new Error("Duplicate command " + command);
    } else if (command in jsonAppObject.metadata) {
      throw new Error("Duplicate metadata " + command);
    }
    jsonAppObject.commands[command] = js;
    jsonAppObject.metadata[command] = metadata;
  }
};

//load in plugins here
if (localStorage.getItem('imaEvalThis')) {
  localObjects = JSON.parse(localStorage.getItem('imaEvalThis'));
  for (var dymObjects in localObjects) {
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
  }
});

/**
 * Executes a command based on the provided input.
 * @param {string} command - The command to be executed.
 * @throws {Error} If the command does not exist in the jsonAppObject.
 */
function intCmd(command) {
  var commandStart = "";
  var commandIn = command;
  commandStart = commandIn.split(" ")[0];
  if (jsonAppObject.commands[commandStart]) {
    jsonAppObject.commands[commandStart](commandIn);
  } else {
    throw new Error("A service tried to call the " + commandStart + " command, but it dose not seem to exist.");
  }
}

/**
 * Executes a command based on user input.
 * @function cmd
 * @returns {void}
 */
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
}

function hideDiv(id) {
  var tmpID = document.getElementById(id);
  var tmpIDText = document.getElementById(id + "Text");
  if (idObj[id]) {
    idObj[id] = 0;
    tmpID.style.display = 'none';
        tmpIDText.style['font-style'] = 'italic';
  } else {
    idObj[id] = 1;
    tmpID.style.display = 'block';
    tmpIDText.style['font-style'] = '';
    
  }
}



/**
 * Retrieves the icon URL for the specified app name.
 * @param {string} appName - The name of the app.
 * @returns {Promise<string>} The icon URL.
 */
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

  if (jsonAppObject.metadata[appName]?.icon) {
    const iconUrl = jsonAppObject.metadata[appName].icon;
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