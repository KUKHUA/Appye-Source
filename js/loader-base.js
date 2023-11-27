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

// The list of URLs. The first success will be loaded.
const URLS = [
  "https://raw.githubusercontent.com/appyeorg/PUBLIC-TESTING/main/proda.js",
  //"https://e.pool.nyphp.com/cp/https/raw.githubusercontent.com/KUKHUA/chc-testing/main/proda.js",
  //"https://e.pool.nyphp.com/cors/appye/proda.js",
  "https://raw.githack.com/appyeorg/PUBLIC-TESTING/main/proda.js",
  "https://cz.cyou/gh/https://raw.githubusercontent.com/appyeorg/PUBLIC-TESTING/main/proda.js",
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
  appye()
})
.catch(err => {
  alert("Failed to load the script: " + err.message + ". Try to use the website that is about to open.")
  open("https://www.desmos.com/testing/virginia/graphing")
})