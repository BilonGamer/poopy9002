module.exports = function (msg, fixedchoice) {
    let poopy = this
    let { _location, _arab, _funnygif, _ps, _activemember, _persontype,
        _insult, _compliment, _restaurant, _message, _restaurantfood,
        _platform, _noun, _animal, _segsy, _food, _country, _pspasta,
        _city, _sentence, _verb, _adj } = poopy.special.keys

    function phraseword(phrase) {
        const words = phrase.split(' ')
        return words[Math.floor(Math.random() * words.length)].replace(/[.,!?:;"{}[\]()]/g, '')
    }

    const year = new Date(Date.now()).getFullYear()
    const sayoriAdjectives = ['HORNY', 'FARTING', 'RACIST', 'STUPID', 'FEMBOY', 'GAY', 'TRANS', 'UNDERAGED', 'RETARD', 'BITCH', 'ASSHOLE', 'MOTHERFUCKER']
    const adjectives = ['is trans', 'the femboy', 'the futa', 'the idiot', 'the stalker', 'the impostor', 'now sus', 'the nutter', 'the shitter', 'the burger', 'is very annoying', 'big', 'fat', 'is thin', 'is small', 'what', 'is funny', 'noob', 'wtf', 'with pp', 'peed his pants', 'is amongla', 'looks at porn lolololol', 'angry'];
    const shipAdjectives = ['likes', 'you like', 'loves', 'you love', 'you are in love with', 'you should marry', 'with', 'hug', 'your game is now poopoo for'];
    const characters = ['daddy dearest', 'gf', 'pico', 'skid and pump', 'monster', 'mommy mearest', 'senpai', 'tankman', 'whitty', 'carol', 'hex', 'ruv', 'sarvente', 'miku', 'tricky', 'zardy', 'matt', 'garcello', 'shaggy', 'annie', 'tbh creature', 'yippee', 'cheeky', 'bob', 'tabi', 'agoti', 'kapi', 'neon', 'nene', 'monika', 'selever', 'tord', 'impostor', 'trollge', 'tree', 'nonsense', 'hypno', 'sonic.exe', 'sonic.exe', 'sonic.exe', 'sonic.exe', 'morbius', 'deinx', 'ralsei', 'kris', 'susie', 'berdly', 'nikocado', 'ness', 'giygas', 'tails doll', 'lord x', 'tbh', 'sans', 'cuphead', 'bendy', 'niko', 'joe biden', 'sprigatito']
    const options = [
        { text: `im in the ${_location().toLowerCase()}` },
        { text: 'lol https://tenor.com/view/sus-suspect-among-us-gif-18663592' },
        { text: 'https://tenor.com/view/madness-hank-new-grounds-jump-gif-17044581' },
        { text: 'https://tenor.com/view/friday-night-funkin-hey-boyfriend-gif-21180248' },
        { pings: true, text: 'SHUT UP' },
        { pings: true, text: 'sussy' },
        { text: 'lol' },
        { text: 'among us impostor in madness tricky mod' },
        { text: 'ehat', edit: 'what' },
        { text: `${_arab().toLowerCase()} is ${_arab().toLowerCase()}` },
        { text: `${_arab().toLowerCase()} in ${_arab().toLowerCase()}` },
        { text: `${_arab().toLowerCase()} ${_arab().toLowerCase()} is ${_arab().toLowerCase()} ${_arab().toLowerCase()}` },
        { text: `not ${_arab().toLowerCase()}` },
        { text: _arab().toLowerCase() },
        { text: _funnygif() },
        { text: `${_funnygif()} lmap` },
        { text: `${_ps()} this is ${_activemember(msg).toLowerCase()}` },
        { text: `${_activemember(msg).toLowerCase()} is a ${_persontype()}` },
        { text: `${_activemember(msg).toLowerCase()} is a ${_insult()}` },
        { text: `${_activemember(msg).toLowerCase()} is ${_compliment()}` },
        { text: `${_arab().toLowerCase()}.` },
        { text: _persontype() },
        { text: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`, edit: 'e' },
        { text: `i love ${_restaurant().toLowerCase()}` },
        { text: `the ${_arab().toLowerCase()} fandom is dying` },
        { text: `THE VS ${_arab().toUpperCase()} MOD` },
        { text: `WHAT A ${_arab().toUpperCase()}` },
        { text: _message(msg).toLowerCase().replace(/[.!,']/g, '') },
        { text: `they added the ${_arab().toLowerCase()} big ass` },
        { text: `they added the ${_arab().toLowerCase()}` },
        { text: `THEY ADDED ${_arab().toUpperCase()}` },
        { text: `the ${_arab().toLowerCase()}` },
        { text: `not ${_arab().toLowerCase()} fetish` },
        { text: `im eating ${_restaurantfood().toLowerCase()}` },
        { text: `finally a ${_arab().toLowerCase()} game to ${_platform().toLowerCase()}` },
        { text: `someone draw ${_activemember(msg).toLowerCase()} as ${characters[Math.floor(Math.random() * characters.length)]}` },
        { text: `ayo its ${_activemember(msg).toLowerCase()}` },
        { text: `ayo its ${characters[Math.floor(Math.random() * characters.length)]}` },
        { text: `${_arab().toLowerCase()} was made in ${Math.floor(Math.random() * (year - 1980)) + 1980} xd` },
        { text: `this will be ${_arab().toLowerCase()} in ${Math.floor(Math.random() * (year - 2000)) + 2000}` },
        { text: `YOU DONT KILL ${`${_arab().toUpperCase()} `.repeat(2)}KILLS YOU!!!!!!!!!!!!!!!!` },
        { text: `${_arab().toLowerCase()} is in the ${characters[Math.floor(Math.random() * characters.length)]} week` },
        { text: `${_activemember(msg).toLowerCase()} = ${characters[Math.floor(Math.random() * characters.length)]}` },
        { text: `no not big ass ${_arab().toLowerCase()}` },
        { pings: true, text: 'snat' },
        { pings: true, text: `remove ${_noun()} from me pls` },
        { text: 'STOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOPPPPPPPPPPPPPPPPPPPPPPP' },
        { text: 'WOOOOOOOOOOOOOOOOOOOOOOOOOOOOO' },
        { pings: true, text: 'wjat', edit: 'what' },
        { text: phraseword(_message(msg)).toLowerCase() },
        { text: `whats ${phraseword(_message(msg)).toLowerCase()}` },
        { text: 'NO' },
        { text: '🤣 🤣 🤣 🤣 🤣 🤣' },
        { text: 'STOP' },
        { pings: true, text: `they hit the ${_animal()}` },
        { text: 'WHU', edit: 'WHY' },
        { text: 'nopw', edit: 'nope' },
        { text: `${_persontype()}  I ate your ${_segsy()}` },
        { text: `u like ${characters[Math.floor(Math.random() * characters.length)]}s ${_segsy()}` },
        { pings: true, text: 'WHY' },
        { pings: true, text: `you are ${_insult()}` },
        { pings: true, text: `you are ${_compliment()}` },
        { text: 'why' },
        { text: 'GOD HELP ME' },
        { text: `yoo ${_food()}` },
        { text: `im eating ${_food()}` },
        { text: 'FUCK YOU' },
        { text: 'ayo' },
        { text: String.fromCodePoint(Math.floor(Math.random() * 26) + 97) },
        { text: 'wtf' },
        { text: _country().toLowerCase() },
        { text: 'wow' },
        { text: `i dont likr ${_activemember(msg).toLowerCase()}s ${_animal()}` },
        { text: 'no' },
        { text: 'not again' },
        { text: `IM NOT ${sayoriAdjectives[Math.floor(Math.random() * sayoriAdjectives.length)]}` },
        { text: `im ${sayoriAdjectives[Math.floor(Math.random() * sayoriAdjectives.length)].toLowerCase()}` },
        { text: 'nooooo' },
        { text: 'stol', edit: 'stop' },
        { text: _pspasta() },
        { text: _city().toLowerCase() },
        { pings: true, text: 'no' },
        { text: 'gay' },
        { text: 'i dare someone to post porn on my dm\'s' },
        { text: '._.' },
        { pings: true, text: '' },
        { text: `${msg.author.username.toUpperCase()} WHY` },
        { text: 'BRUH' },
        { text: msg.content },
        { text: 'SUS' },
        { text: _sentence().toLowerCase().replace(/[.,!?":;]/g, '') },
        { text: 'im underaged' },
        { pings: true, text: 'YOU SUSSY' },
        { text: 'AMOGUS' },
        { text: 'is that friday night porn' },
        { pings: true, text: 'flop' },
        { text: 'i like porn 🥲 🥲 🥲 🥲 🥲 🥲' },
        { text: _verb() },
        { text: _noun() },
        { text: _adj() },
        { pings: true, text: `stupid ${msg.author.username.toLowerCase()}` },
        { text: `not ${msg.author.username.toLowerCase()}` },
        { text: `wth ${msg.author.username.toLowerCase()}` },
        { text: `lol ${msg.author.username.toLowerCase()}` },
        { text: `${msg.author.username.toLowerCase()} ${adjectives[Math.floor(Math.random() * adjectives.length)]}` },
        { text: `${msg.author.username.toLowerCase()}: ${_arab().toLowerCase()}` },
        { text: `no not ${msg.author.username.toLowerCase()} with ${_arab().toLowerCase()}` },
        { text: 'ahhhhhhhhhh' },
        { text: `${_location().toLowerCase()} suuucks` },
        { text: 'why am i a bot' },
        { text: `${msg.author.username.toLowerCase()} ${shipAdjectives[Math.floor(Math.random() * shipAdjectives.length)]} ${_activemember(msg).toLowerCase()}` },
        { text: `is ${_activemember(msg).toLowerCase()} hot` },
        { text: `im not pinging ${_activemember(msg).toLowerCase()}` },
        { text: `${_activemember(msg).toUpperCase()} IS ${sayoriAdjectives[Math.floor(Math.random() * sayoriAdjectives.length)]} NOT ME` },
        { text: `${_activemember(msg).toLowerCase()} with the ${_noun()}` },
        { text: `${_activemember(msg).toLowerCase()} living in ${_country().toLowerCase()}` },
        { text: `${_activemember(msg).toLowerCase()}e` },
        { text: `${_adj()}e ${_activemember(msg).toLowerCase()}e` },
        { text: `${_activemember(msg).toUpperCase()} IS THE ${sayoriAdjectives[Math.floor(Math.random() * sayoriAdjectives.length)]} ${sayoriAdjectives[Math.floor(Math.random() * sayoriAdjectives.length)]} ${sayoriAdjectives[Math.floor(Math.random() * sayoriAdjectives.length)]} ${sayoriAdjectives[Math.floor(Math.random() * sayoriAdjectives.length)]}` },
        { text: msg.author.username.toLowerCase() }
    ]

    let choice = fixedchoice && (typeof (Number(fixedchoice)) == 'number' && (((Number(fixedchoice) - 1) >= options.length - 1 && options[options.length - 1]) || ((Number(fixedchoice) - 1) <= 0 && options[0]) || (isNaN(Number(fixedchoice)) && options[Math.floor(Math.random() * options.length)]) || options[Math.floor(Number(fixedchoice))]) || options[Math.floor(Math.random() * options.length)]) || options[Math.floor(Math.random() * options.length)]

    if (Math.random() < 0.02) choice.edit = 'e'

    return choice
}