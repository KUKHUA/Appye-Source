# Appye Documentation
## Creating Apps
Start with this template:
```
appyeApi.createApp(
  "",
  {
    title: "",
    url: "",
    html: "",
    icon: "",
    background: "#bd8c91"
  },
  {
    vendor: "",
    desc: "",
    tags: [""],  
  }
)
```
We will go through this line by line.

This text is your app ID, so the user can launch it
(eg 'app-load appid') ```"",```.

After the "," is the winbox JSON data.
This will be directly given to winbox. (Do not worry if you don't understand that.)

In the winbox data, the title, icon, background color is what is shown to the user at the top of your app window.

For the icon, you can just "Copy image address" any image, and paste that in the quotaion marks. And for the background color (shown as only "background"), you can use [Redketchup.io](https://redketchup.io/color-picker) to get that color (as HEX, ex #FFFFF).


Now for the URL/HTML, you only need one of these for it to work, as if you put both, it will break.
 
 A URL is what is on top in the OmniBox/Address Bar. Please beware that not all websites will work, as most websites set it up so you can't put their website on your website. Most unprofessional game/proxy websites will work. Please note this will most likely not unblock website (although it could) it will likely not.
 
 HTML is the pure code for websites. For example:
 ```
 <h1>HELLO!</h1>
 <p>Hello world.</p>
 ```
 We will not be moving on to the next section, the **Metadata**. The vendor in this section is a author name/nickname. Now, the "desc" is a description of a app/command. (Hint: You can actually put HTML in here).
 
 Lastly, tags. This feature is currently not implemented, but tags will be used for a search feature. It is recommended to put some here.
 Here is an example on how to use it:
 ```["tag1","tag2","etc"]```.

## Creating commands
Please not that you should know some JavaScript before attempting to make a command.

Start off with this template:
```
appyeApi.createCommand(
'',
(commandIn) => {

},
  {
    humanName:"",
    vendor: "",
    desc: "",
    tags: [], 
    examples: [], 
  }
)
```
The first `'',` is the command ID, what the user types to run it. In the `commandIn` nested function is the JavaScript code that will be ran.
```
(commandIn) => {

}
```
After this is the metadata.
The `humanName` is the title/name of the command. The `vendor` is a author name/nickname. The `icon` is self-explanitory and optional. The `desc` is a description. The `tags` are optional. The `examples` are examples of use. Examples and tags use the follwing format.
 ```
 ["tag1","tag2","etc"]
 ```


## Local Objects
Now that you've created you command and/or app, how do you use it?

Currently Appye is closed source, while there are plans for that to change, it won't be for the time being.

Since it is closed source, how do your custom content?

With the `eval` command!
The eval command allows you to set multiple javascript snippets to run at start-up of Appye.

Here how to use it:
1. Get your modified template code in your copy/paste.
2. Load up an Appye command prompt.
3. Type `eval set `, next you need to type an ID for the eval so you can remove it if you no longer want it (eg `eval set testid`).
4. Next, after you type your id, add a space afterwards and paste your modified template code. You may have to minify this code for it to work correctly.
5. Now, reload appye on the same website and your app/command should show up in `ls apps`, and `ls commands`, respectively.

Please note that since bookmarklets are ephemeral, that it saves it in the local storage of the website you set it on. This means it will only excute the JavaScript on the website that you set it on.


As well, please be careful of installing external apps/command. Appye, nor anyone at Appye will take responsibility for what you install on Appye. Please review **all** external app/commands carefully.




