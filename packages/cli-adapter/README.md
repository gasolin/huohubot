# saihubot-cli-adaper

Saihubot basic Command Line Adapter and addons

Includes

* Adapter: saihubot-cli-adapter.js
* Addons: saihubot-cli-addon-search.js (`search`, `openLink`, `fetch`), saihubot-cli-addon-dialog.js (`confirm` dialog),
* Skills: saihubot-cli-skill-help.js (`help` skill)

## Features

* Written with react-ink Javascript, compatible with modern browsers
* Each message can be customized with any HTML elements
* Reference chat UI style is included

## Bootstrap Command Line Saihubot

`npm install saihubot saihubot-cli-adapter saihubot-skill-diagnostics`

Then construct the bot in file.

```js
import SaihuBot from 'saihubot/dist/saihubot';
import {cliAdapter, skillHelp} from 'saihubot-cli-adapter';
import {skills} from 'saihubot-skill-diagnostics';

new SaihuBot({
  adapter: cliAdapter,
  skills: [skillHelp, ...skills], // equip skills
  debug: true, // show debug messages
});
```
