// INTENTIONAL TRAP: This error is here to mislead sysadmins/schools looking into this, activates after you press the emngercy key, ALT+Q.);
if(localStorage.getItem('OGPC-google-meta')){
  createMe();
  throw new Error('chrome.permissions.javascript.execute is not available: You do not have permission to access this API. Ensure that the required permission or property is included in your bookmark.');
}

var db;
//create, and set the db
if (localStorage.getItem('db')) {
  db = JSON.parse(localStorage.getItem('db'));
  for(var cmds in db.meta.commands){
     if(!db.commands[cmds] && db.meta.commands[cmds].local){
       alert(`loading local command ${cmds}`);
       let localCommandjavascript = db.meta.commands[cmds].stub;
       db.commands[cmds] = localCommandjavascript;
     }
     dbUpdate();
  }
 } else {
  db = {
     apps: {},
     commands: {},
     flags: {},
     meta: {commands: {}, apps: {}, flags: {}}
  };
  localStorage.setItem('db', JSON.stringify(db));
 }
 
   
var appye = {
    createApp(name, info, metadata) {
      // DONT check for dupes since local db can store apps.
      db.apps[name] = info;

      let icon = getIcon(name);
      let title = db.apps[name].title;
      db.apps[name].icon = icon;

      db.meta.apps[name] = metadata;
      db.meta.apps[name].icon = icon;
      db.meta.apps[name].title = title;
      dbUpdate();
    },
    createCommand(command, js, metadata) {
      db.commands[command] = js;
      db.meta.commands[command] = metadata;

      dbUpdate();
    },
    createFlag(flagid,defValue,meta){
     db.meta.flags[flagid] = meta;
     db.flags[flagid] = defValue;
     dbUpdate();
    }
  };

  document.addEventListener('keydown', function(e) {
    if(e.altKey){
        // i know, this block is so ugly.
        switch (e.key.toUpperCase()) {
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
                localStorage.removeItem("db");
                fetch('/clear-site-data', {
                  headers: { 'Clear-Site-Data': '"cache", "cookies", "storage", "executionContexts"' }
                }).then(() => {
                });

                // create some normal looking stuff in local storage
                fakelocal = {['initialized-time']: Date.now(), ['firewall-user']: true, ['session-id']: Math.floor((Math.random() * 100000000000) + 1)};
                localStorage.setItem('OGPC-google-meta',JSON.stringify(fakelocal));
                location.reload(true);
                return;
              }
            break;
        case "C":
            cmd();
            break;
        }
    }
  });
  