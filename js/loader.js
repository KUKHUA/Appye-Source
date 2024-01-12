
function firstSuccess(promises) {
  let failures = []
  let remaining = promises.length
  let i = 0
  return new Promise((res, rej) => {
    for (let p of promises) {
      i
      p.then(
        value => res(value),
        err => {
          failures[i] = errox
          remaining
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
            throw new Error(resp.status  " "  resp.statusText);
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
      throw new Error(`All providers are offline or blocked. Please try loging in to your school's network.`);
    })
    .then(() => {
      fetchAborter.abort();
    })
    .catch(err => {
      alert("Failed to load the script: "  err.message  ".");
      if(!window.location.hostname == "www.desmos.com"){
        alert("Try to use the website that is about to open.");
        open("https://www.desmos.com/testing/virginia/graphing");
      } else if (window.navigator.onLine == false){
        alert("Please connect to the internet.");
      }
    });
}
 // The list of URLs. The first success will be loaded.
 const urlDep = [
  "https://git.basicfan.eu.org/lucky/AppyeSource/raw/branch/main/dependencies/0.2.6_winbox.bundle.min.js",
  "https://nmn.pool.net.eu.org/cp/https/rawcdn.githack.com/nextappsde/winbox/0.2.82/dist/winbox.bundle.min.js",
  "https://nmn.pool.net.eu.org/cp/https/raw.githubusercontent.com/nextappsde/winbox/master/dist/winbox.bundle.min.js",
  "https://nmn.pool.net.eu.org/cp/64/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL25leHRhcHBzLWRlL3dpbmJveC9tYXN0ZXIvZGlzdC93aW5ib3guYnVuZGxlLm1pbi5qcw==",
  "https://rawcdn.githack.com/nextappsde/winbox/0.2.82/dist/winbox.bundle.min.js",
  "https://raw.githubusercontent.com/nextappsde/winbox/master/dist/winbox.bundle.min.js",
  "https://raw.githubusercontent.com/KUKHUA/AppyeSource/main/dependencies/0.2.6_winbox.bundle.min.js",
  "https://cdn.jsdelivr.net/gh/KUKHUA/AppyeSource/dependencies/0.2.6_winbox.bundle.min.js",
  "https://codeberg.org/lucky/AppyeSource/raw/branch/main/dependencies/0.2.6_winbox.bundle.min.js"
 ];

 const urlBase = [
  "https://git.basicfan.eu.org/lucky/AppyeSource/raw/branch/main/js/base.js",
  "https://nmn.pool.net.eu.org/cp/https/git.basicfan.eu.org/lucky/AppyeSource/raw/branch/main/js/base.js",
  "https://nmn.pool.net.eu.org/cp/64/aHR0cHM6Ly9naXQuYmFzaWNmYW4uZXUub3JnL2x1Y2t5L0FwcHllLVNvdXJjZS9yYXcvYnJhbmNoL21haW4vanMvYmFzZS5qcw==",
  "https://raw.githubusercontent.com/KUKHUA/AppyeSource/main/js/base.js",
  "https://raw.githack.com/KUKHUA/AppyeSource/main/js/base.js",
  "https://codeberg.org/lucky/AppyeSource/raw/branch/main/js/base.js",
  "https://cdn.jsdelivr.net/gh/KUKHUA/AppyeSource/js/base.js",
 ];

 const urlCommands = [
"https://git.basicfan.eu.org/lucky/AppyeSource/raw/branch/main/js/commands.js",
"https://nmn.pool.net.eu.org/cp/https/git.basicfan.eu.org/lucky/AppyeSource/raw/branch/main/js/commands.js",
"https://nmn.pool.net.eu.org/cp/64/aHR0cHM6Ly9naXQuYmFzaWNmYW4uZXUub3JnL2x1Y2t5L0FwcHllLVNvdXJjZS9yYXcvYnJhbmNoL21haW4vanMvY29tbWFuZHMuanM=",
"https://raw.githubusercontent.com/KUKHUA/AppyeSource/main/js/commands.js",
"https://raw.githack.com/KUKHUA/AppyeSource/main/js/commands.js",
"https://codeberg.org/lucky/AppyeSource/raw/branch/main/js/commands.js",
"https://cdn.jsdelivr.net/gh/KUKHUA/AppyeSource/js/commands.js"
];

const urlApps = [
  "https://git.basicfan.eu.org/lucky/AppyeSource/raw/branch/main/js/apps.js",
  "https://nmn.pool.net.eu.org/cp/https/git.basicfan.eu.org/lucky/AppyeSource/raw/branch/main/js/apps.js",
  "https://nmn.pool.net.eu.org/cp/64/aHR0cHM6Ly9naXQuYmFzaWNmYW4uZXUub3JnL2x1Y2t5L0FwcHllLVNvdXJjZS9yYXcvYnJhbmNoL21haW4vanMvYXBwcy5qcw==",
  "https://raw.githubusercontent.com/KUKHUA/AppyeSource/main/js/apps.js",
  "https://raw.githack.com/KUKHUA/AppyeSource/main/js/apps.js",
  "https://codeberg.org/lucky/AppyeSource/raw/branch/main/js/apps.js",
  "https://cdn.jsdelivr.net/gh/KUKHUA/AppyeSource/js/apps.js"
  ];

  const urlFs = [
  "https://git.basicfan.eu.org/lucky/AppyeSource/raw/branch/main/js/Fs.js",
  "https://nmn.pool.net.eu.org/cp/https/git.basicfan.eu.org/lucky/AppyeSource/raw/branch/main/js/Fs.js",
  "https://raw.githubusercontent.com/KUKHUA/AppyeSource/main/js/Fs.js",
  "https://raw.githack.com/KUKHUA/AppyeSource/main/js/Fs.js",
  "https://codeberg.org/lucky/AppyeSource/raw/branch/main/js/Fs.js",
  "https://cdn.jsdelivr.net/gh/KUKHUA/AppyeSource/js/Fs.js"
  ];

 loadScript(urlDep);
 loadScript(urlBase);
 setTimeout(function (){
  loadScript(urlCommands);
  loadScript(urlApps);
  loadScript(urlFs);
 }, 1000);


 
