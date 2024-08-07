const { catbox, google } = require('./modules')

let vars = {}

vars.validUrl = /https?:\/\/([!#$&-;=?-[\]_a-z~]|%[0-9a-fA-F]{2})+/
vars.badFilter = /nigg|fagg|https?\:\/\/.*(rule34|e621|porn|hentai|xxx|iplogger|ipify|gay)/ig
vars.scamFilter = /discord\.(gift|gg)\/[\d\w]+\/?/ig
vars.emojiRegex = require('emoji-regex')()
vars.Catbox = new catbox.Catbox()
vars.Litterbox = new catbox.Litterbox()
if (process.env.GOOGLE_KEY) vars.youtube = google.youtube({
    version: 'v3',
    auth: process.env.GOOGLE_KEY
})
/*if (process.env.TWITTER_CONSUMER_KEY && process.env.TWITTER_CONSUMER_SECRET && process.env.TWITTER_ACCESSTOKEN_KEY && process.env.TWITTER_ACCESSTOKEN_SECRET) vars.twitterClient = new Twitter({
    consumer_key: process.env.TWITTERCONSUMERKEY,
    consumer_secret: process.env.TWITTERCONSUMERSECRET,
    access_token_key: process.env.TWITTERACCESSTOKENKEY,
    access_token_secret: process.env.TWITTERACCESSTOKENSECRET
})*/
vars.gifFormats = ['gif', 'apng']
vars.jimpFormats = ['png', 'jpeg', 'jpg', 'gif', 'bmp', 'tiff']
vars.processingTools = require('./processingTools')
vars.symbolreplacements = [{
    target: [
        '\u2018',
        '\u2019',
        '\u201b',
        '\u275b',
        '\u275c'
    ],
    replacement: "'"
},
{
    target: [
        '\u201c',
        '\u201d',
        '\u201f'
    ],
    replacement: '"'
}]
vars.punctuation = ['?', '.', '!', '...']
vars.caseModifiers = [
    function (text) {
        return text.toUpperCase()
    },
    function (text) {
        return text.toLowerCase()
    },
    function (text) {
        return text.toUpperCase().substring(0, 1) + text.toLowerCase().substring(1)
    }
]
vars.battleStats = {
    health: 100,
    maxHealth: 100,
    heal: 0,
    defense: 0,
    attack: 0,
    accuracy: 0,
    loot: 0,
    exp: 150,
    bucks: 20
}
vars.clevercontexts = {}

module.exports = vars