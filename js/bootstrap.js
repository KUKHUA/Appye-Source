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
 
 function loadScript(urls) {
  const fetchAborter = new AbortController();
 
  return firstSuccess(
    urls.map(url =>
      fetch(url, { signal: fetchAborter.signal })
        .then(resp => {
          if (resp.status === 200) {
            return resp.text();
          } else {
            throw new Error(resp.status + " " + resp.statusText);
          }
        })
        .then(content => {
          const script = document.createElement('script');
          script.textContent = content;
          document.body.appendChild(script);
        })
    )
  )
    .catch(failures => {
      throw new Error(`All providers are offline or blocked`);
    })
    .then(() => {
      fetchAborter.abort();
    })
    .catch(err => {
      alert("Failed to load the script: " + err.message + ".");
      if(!window.location.hostname == "www.desmos.com"){
        alert("Try to use the website that is about to open.");
        open("https://www.desmos.com/testing/virginia/graphing");
      } else if (window.navigator.onLine == false){
        alert("Please connect to the internet.");
      }
    });
}

const urlLoader = [
  "https://git.basicfan.eu.org/lucky/Appye-Source/raw/branch/main/js/loader.js",
  "https://nmn.pool.net.eu.org/cp/https/git.basicfan.eu.org/lucky/Appye-Source/raw/branch/main/js/loader.js",
  "https://raw.githubusercontent.com/KUKHUA/Appye-Source/main/js/loader.js",
  "https://raw.githack.com/KUKHUA/Appye-Source/main/js/loader.js",
  "https://cdn.jsdelivr.net/gh/KUKHUA/Appye-Source/js/loader.js"
  ];

loadScript(urlLoader);