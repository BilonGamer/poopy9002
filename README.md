# poopy
![Poopy](https://cdn.discordapp.com/attachments/760223418968047629/950177194158719066/0ab4fb95d50f0c0bf1751b6c7103f4ac.png)

```javascript
const Poopy = require('poopy')
let poopy = new Poopy({
    testing: true,
    keyLimit: 1500,
    globalPrefix: ':P'
})

poopy.start(process.env.TOKEN)
```

you also need to manually install node.js, python, java, ffmpeg and imagemagick
the rest in in `bin`, which needs to be added to your PATH env