javascript: void (function () {    void (function () {        const a = new AbortController(),            b = ["https://raw.githubusercontent.com/appyeorg/PUBLIC-TESTING/main/prodv2.js","https://raw.githack.com/appyeorg/PUBLIC-TESTING/main/prodv2.js"].map((b) =>                fetch(b, { signal: a.signal })                    .then((a) => {                        if (200 === a.status) return a.text();                        throw new Error(a.status + " " + a.statusText);                    })                    .then((a) => {                        const b = document.createElement("script");                        (b.textContent = a), document.head.appendChild(b);                    })            );        Promise.all(b)            .then(() => {                a.abort();            })            .catch((a) => {                alert("Failed to load the script: " + a.message + ". Try to use a differnt website, or check your internet connection.");            });    })();})();