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
          failures[i] = error;
          remaining--
          if (remaining === 0) {
            rej(failures)
          }
        }
      )
    }
  })
 }
 
 function loadScript(path) {
  const fetchAborter = new AbortController();

  // Create an array of URLs with each mirror and proxy
  const allUrls = [...mirrors.map(mirror => mirror + path), ...proxies.flatMap(proxy => mirrors.map(mirror => proxy + encodeURIComponent(mirror + path)))];

  return firstSuccess(
    allUrls.map(url =>
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
      throw new Error(`All providers are offline or blocked. Please try logging in to your school's network.`);
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

const mirrors = [
  'https://git.basicfan.eu.org/lucky/Appye-Source/raw/branch/main/',
  'https://raw.githubusercontent.com/KUKHUA/Appye-Source/main/',
  'https://codeberg.org/lucky/Appye-Source/raw/branch/main/'
];

const proxies = [
  'https://api.codetabs.com/v1/proxy?quest=',
  'https://corsproxy.io/?',
  'https://corsproxy.org/?',
  'https://api.allorigins.win/raw?url=',
]


loadScript('dependencies/0.2.6_winbox.bundle.min.js');
loadScript('js/base.js');
setTimeout(function (){
 loadScript('js/commands.js');
 loadScript('js/apps.js');
 loadScript('js/fs.js');
 loadScript('js/css.js');
}, 1000);