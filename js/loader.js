function firstSuccess(promises) {
  let failures = []
  let remaining = promises.length
  let i = 0
  return new Promise((res, rej) => {
    for (let p of promises) {
      i++
      p.then(
        value => res(value),
        err => {
          failures[i] = err
          remaining--
          if (remaining === 0) {
            rej(failures)
          }
        }
      )
    }
  })
}

command = "";
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

// The list of URLs. The first success will be loaded.
const URLS = [
  "https://git.basicfan.eu.org/lucky/Appye-Source/raw/branch/main/js/beta.js",
  "https://nmn.pool.net.eu.org/cp/https/git.basicfan.eu.org/lucky/Appye-Source/raw/branch/main/js/beta.js",
  "https://nmn.pool.net.eu.org/cp/64/aHR0cHM6Ly9naXQuYmFzaWNmYW4uZXUub3JnL2x1Y2t5L0FwcHllLVNvdXJjZS9yYXcvYnJhbmNoL21haW4vanMvYmV0YS5qcw==",
]

const fetchAborter = new AbortController()

// Take the first successful promise.
firstSuccess(
  // For each URL...
  URLS.map(url =>
    // Fetch the content.
    fetch(url, { signal: fetchAborter.signal })
    .then(resp => {
      // If there was a success...
      if (resp.status === 200) {
        // return the text. (We need to return it since text returns a promise.)
        return resp.text()
      } else {
        // If it failed, throw an error for .catch to handle.
        throw new Error(resp.status + " " + resp.statusText)
      }
    })
    .then(content => {
      // Try to parse the javascript. If it succeeds, it can be ran by calling it. If it fails, there is a syntax error.
      return new Function(content)
    })
  )
)
.catch(failures => {
  throw new Error(`All providers are offline or blocked`) // better error message for second .catch
})
.then(appye => {
  // If we're here, a fetch succeeded, so abort the other ones.
  fetchAborter.abort()
  // Run the parsed code.
  //this needs to be changed to a script element.
  appye()
})
.catch(err => {
  alert("Failed to load the script: " + err.message + ".");
  if(!window.location.hostname == "www.desmos.com"){
  alert("Try to use the website that is about to open.");
  open("https://www.desmos.com/testing/virginia/graphing");
  } else if (window.navigator.onLine == false){
 alert("Please connect to the internet.");
  }
})