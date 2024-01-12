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
          failures[i] = errox
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
      throw new Error(`All providers are offline or blocked. Please try loging in to your school's network.`);
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
 // The list of URLs. The first success will be loaded.
 const urlDep = [
  "https://git.basicfan.eu.org/lucky/Appye-Source/raw/branch/main/dependencies/0.2.6_winbox.bundle.min.js",
 ];

 const urlBase = [
  "https://git.basicfan.eu.org/lucky/Appye-Source/raw/branch/main/js/base.js",
 ];

 const urlCommands = [
"https://git.basicfan.eu.org/lucky/Appye-Source/raw/branch/main/js/commands.js",
];

const urlApps = [
  "https://git.basicfan.eu.org/lucky/Appye-Source/raw/branch/main/js/apps.js",
  ];

  const urlFs = [
  "https://git.basicfan.eu.org/lucky/Appye-Source/raw/branch/main/js/Fs.js",
  ];
    const urlCss = [
  "https://git.basicfan.eu.org/lucky/Appye-Source/raw/branch/main/js/css.js",
  ];


 loadScript(urlDep);
 loadScript(urlBase);
 setTimeout(function (){
  loadScript(urlCommands);
  loadScript(urlApps);
  loadScript(urlFs);
  loadScript(urlCss);
 }, 1000);


 
