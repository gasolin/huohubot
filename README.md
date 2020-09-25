# Saihubot [![NPM version][npm-image]][npm-url] 
:robot: Framework to build :speech_balloon: message/chat bots in the :globe_with_meridians: **Browser**.
You can add new skills to bot via `skills` and extend its ability via `addons`. All with plain javascript. :clap:

Saihubot's API is inspired by [hubot](https://github.com/github/hubot/)'s API, so a developer who has learned `hubot-plugins` could learn `saihu-skills` very quickly. :zap:

Check [Online Demo](https://gasolin.github.io/saihubot/)

## Features

* Chatbot works in your browser, without server setup.
* Written in plain Javascript, compatible with most browsers
* Structure was inspired by [hubot](https://github.com/github/hubot/)
  * Regex based message matching
  * Could write adapter to fully cooperate with your web UI
  * Could swap brain to support different backends
  * Provide skills(pluginn) architecture that able to expand functions
  * Can extend bot functionality by import addons
* Tiny size, easy to learn (the init version has just 80 lines that bundle with three skills)
* Each message can be customized with any HTML elements
* Reference chat UI style is included
* Plugin callbacks are extremely flexible; You can control in-page elements, execute the local command, fetch remote data, trigger remote actions...

## How to use

### Try Saihubot samples online

If you just want to try how the saihubot looks like, Check [Online Demo](https://gasolin.github.io/saihubot/)

### Try Saihubot on Github

Fork the project, edit index.html with Github editor, save it and see the result on https://[yourname].github.io/saihubot

### Try Saihubot locally

Clone the project with command

```sh
git clone https://github.com/gasolin/saihubot.git
```

Then run

```sh
npx http-server .
```

now you have a working bot!

(drag `index.html` to your browser also works)


### Bootstrap Saihubot

Clone the project then includes the `saihubot.js` in your HTML file with a div tag for message history and the input field:

```html
<body>
  <div id="history"></div>
  <input id="message"><button id="send">Send</button>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      new SaihuBot({adapter: basicAdapter});
    });
  </script>
</body>
```

The script is used to bootstrap the Saihubot.

```js
new SaihuBot({});
```

Wrap that script in `DOMContentLoaded` event to make sure contents are loaded before running scripts.

You can pass some parameters into it to quickly customize the bot.

And don't forget to include related libraries in the header

```html
<head>
  <script src="saihubot.js"></script>
  <script src="adapters/saihubot-adapter-basic.js"></script>
  <script src="skills/saihubot-diagnostics.js"></script>
</header>
```

## Usage

Saihubot provide 3 default skills `ping`, `time`, `echo` that you can include via:

```html
<script src="skills/saihubot-diagnostics.js"></script>
```

### Ping skill

```
me: ping
bot: PONG
```

### :clock2: Time skill:

```
me: time
bot: Device time is Fri Aug 05 2016 21:22:11 GMT+0800 (CST)
```

### :loudspeaker: Echo skill:

```
me: echo Hello World!
bot: Hello World!
```

![Imgur](http://i.imgur.com/Ljjf0Fwl.png)


Saihubot also provide Search skills, you can include it via:

```html
<script src="skills/saihubot-search.js"></script>
```

Check the [Search Demo](https://gasolin.github.io/saihubot/samples/search).

### :mag_right: Google Search skill:

```
me: g saihubot
bot: Search saihubot via Google
me: google saihubot
bot: Search saihubot via Google
me: search saihubot
bot: Search saihubot via Google
```

### Wikipedia skill:

```
me: wiki saihubot
bot: Search saihubot via Wikipedia
me: wikipedia saihubot
bot: Search saihubot via Wikipedia
```

### Google Translate skill

```
me: translate hello
bot: Translate hello via Google Translate
me: tr saihubot
bot: Translate hello via Google Translate
```

## Want to learn more?

Check the [docs](https://github.com/gasolin/saihubot/tree/gh-pages/docs) section.

## What Saihu means?

Saihu(`師傅`) means `master` in Taiwanese, which people used to call the artisans.
Saihubot's origin goal is to provide a code sample that makes learning [hubot](https://github.com/github/hubot/) and its ES6 variant [Webbybot](https://github.com/gasolin/webbybot/) easier; then I found Saihu is a great way to embed bot into anywhere browser can live with.

## License

Saihubot use MIT License

## ChangeLog

Check [ChangeLog](CHANGELOG.md)

[npm-image]: https://badge.fury.io/js/saihubot.svg
[npm-url]: https://npmjs.org/package/saihubot
