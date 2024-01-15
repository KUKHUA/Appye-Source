# Appye

Appye is bookmarklet that is getting more and more complex.
It embeds a "web-os" in any page. 

PS: Please help with user interface desgin.



Join our server: [Appye Discord Server](https://discord.gg/CYjMqNS8K6)

## Credits
[Winbox.JS](https://github.com/nextapps-de/winbox) by [nextapps-de](https://github.com/nextapps-de),
[FoxLauncher](https://github.com/FoxMoss/FoxLauncher) by [FoxMoss](https://github.com/FoxMoss/),
and lastly JSZip.
```
JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
```

## Getting Started

1. Go [here](https://git.basicfan.eu.org/lucky/Appye-Source/raw/branch/main/bookmarklet.js).
2. Press CTRL+A, then CTRL+C.
3. Open the bookmark bar (Press CTRL+SHIFT+B if not sure.)
4. Right-click the bookmark bar and select "Add page..."
5. Choose a name for the bookmarklet (it doesn't matter what you put).
6. Paste the copied code in the URL section, using CTRL+V.
7. Now on a website, press the bookmark you created. It should pull up a prompt saying "Command". Press the "c" key anytime to open this prompt. Type "ls", standing for list, and browse the default items. You can click the title of each section to hide them. The "Add..." and "Import FLZ" buttons are a WIP, so ignore them for now.

For information about how to create your own apps/commands, please go [here](docs.md)

Note: Some websites may not work with Appye. Most Desmos state calculators do work.

Under [	Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-nc-sa/4.0/).

## Structure
- Javascript source code. **Path**:[/js/](https://git.basicfan.eu.org/lucky/Appye-Source/src/branch/main/js/)
- Dependencies of Appye. **Path**: [/dependencies/](https://git.basicfan.eu.org/lucky/Appye-Source/src/branch/main/dependencies)