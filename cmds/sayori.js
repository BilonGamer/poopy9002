module.exports = {
    name: ['sayori'],
    execute: async function (msg, args) {
        let poopy = this

        if (msg.channel.parent) {
            if (msg.channel.parent.isText()) {
                msg.channel.send('Webhooks can\'t be used here.').catch(() => { })
                return
            }
        }

        var fixedchoice = args[1]

        var datamembers = poopy.data['guild-data'][msg.guild.id]['members'];
        var members = []
        for (var id in datamembers) {
            var datamember = datamembers[id]
            if (datamember.username) members.push(datamember.username)
        }
        var year = new Date(Date.now()).getFullYear()
        var sayoriAdjectives = ['HORNY', 'FARTING', 'RACIST', 'STUPID', 'FEMBOY', 'GAY', 'TRANS', 'UNDERAGED', 'RETARD', 'BITCH', 'ASSHOLE', 'MOTHERFUCKER']
        var adjectives = ['is trans', 'the femboy', 'the futa', 'the idiot', 'the stalker', 'the impostor', 'now sus', 'the nutter', 'the shitter', 'the burger', 'is very annoying', 'big', 'fat', 'is thin', 'is small', 'what', 'is funny', 'noob', 'wtf', 'with pp', 'peed his pants', 'is amongla', 'looks at porn lolololol'];
        var shipAdjectives = ['likes', 'you like', 'loves', 'you love', 'you are in love with', 'you should marry', 'with', 'hug', 'your game is now poopoo for'];
        var fnf = ['dad', 'gf', 'pico', 'skid and pump', 'monster', 'mom', 'senpai', 'tankman', 'whitty', 'carol', 'hex', 'ruv', 'sarvente', 'miku', 'tricky', 'zardy', 'matt', 'garcello', 'shaggy', 'annie', 'cheeky', 'bob', 'tabi', 'agoti', 'kapi', 'neon', 'nene', 'monika', 'cg5', 'updike', 'selever', 'tord', 'impostor', 'trollge', 'tree']
        var consoles = ['pc', 'mobile', 'tablet', 'xbox', 'nintendo switch', 'nintendo 3ds', 'nintendo 2ds', 'psp', 'ps1', 'ps2', 'gamecube', 'ps3', 'ps4', 'ps5', 'wii', 'xbox 360', 'xbox one', 'gameboy', 'nintendo 64', 'sega genesis', 'wii u']
        var options = [
            { pings: false, text: 'lol https://tenor.com/view/sus-suspect-among-us-gif-18663592' },
            { pings: false, text: 'https://tenor.com/view/madness-hank-new-grounds-jump-gif-17044581' },
            { pings: false, text: 'https://tenor.com/view/friday-night-funkin-hey-boyfriend-gif-21180248' },
            { pings: true, text: 'SHUT UP' },
            { pings: true, text: 'sussy' },
            { pings: false, text: 'lol' },
            { pings: false, text: 'among us impostor in madness tricky mod' },
            { pings: false, text: 'ehat', edit: 'what' },
            { pings: false, text: poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toLowerCase() + ' is ' + poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toLowerCase() },
            { pings: false, text: poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toLowerCase() + ' in ' + poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toLowerCase() },
            { pings: false, text: poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toLowerCase() + ' ' + poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toLowerCase() + ' is ' + poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toLowerCase() + ' ' + poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toLowerCase() },
            { pings: false, text: 'not ' + poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toLowerCase() },
            { pings: false, text: poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toLowerCase() },
            { pings: false, text: poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toLowerCase() + '.' },
            { pings: false, text: 'the ' + poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toLowerCase() + ' fandom is dying' },
            { pings: false, text: 'THE VS ' + poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toUpperCase() + ' MOD' },
            { pings: false, text: 'WHAT A ' + poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toUpperCase() },
            { pings: false, text: 'they added the ' + poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toLowerCase() + ' big ass' },
            { pings: false, text: 'the ' + poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toLowerCase() },
            { pings: false, text: 'not ' + poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toLowerCase() + ' fetish' },
            { pings: false, text: 'finally a ' + poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toLowerCase() + ' game to ' + consoles[Math.floor(Math.random() * consoles.length)] },
            { pings: false, text: poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toLowerCase() + ' was made in ' + (Math.floor(Math.random() * (year - 1980)) + 1980) + ' xd' },
            { pings: false, text: 'this will be ' + poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toLowerCase() + ' in ' + (Math.floor(Math.random() * (year - 2000)) + 2000) },
            { pings: false, text: 'YOU DONT KILL ' + (poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toUpperCase() + ' ').repeat(2) + 'KILLS YOU!!!!!!!!!!!!!!!!' },
            { pings: false, text: poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toLowerCase() + ' is in the ' + fnf[Math.floor(Math.random() * fnf.length)] + ' week' },
            { pings: false, text: 'no not big ass ' + poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toLowerCase() },
            { pings: true, text: 'snat' },
            { pings: false, text: 'STOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOPPPPPPPPPPPPPPPPPPPPPPP' },
            { pings: false, text: 'WOOOOOOOOOOOOOOOOOOOOOOOOOOOOO' },
            { pings: true, text: 'wjat', edit: 'what' },
            { pings: false, text: 'NO' },
            { pings: false, text: '🤣 🤣 🤣 🤣 🤣 🤣' },
            { pings: false, text: 'STOP' },
            { pings: false, text: 'WHU', edit: 'WHY' },
            { pings: true, text: 'WHY' },
            { pings: false, text: 'GOD HELP ME' },
            { pings: false, text: 'IM NOT' },
            { pings: false, text: 'wtf' },
            { pings: false, text: 'wow' },
            { pings: false, text: 'no' },
            { pings: false, text: 'not again' },
            { pings: false, text: 'IM NOT ' + sayoriAdjectives[Math.floor(Math.random() * sayoriAdjectives.length)] },
            { pings: false, text: 'im ' + sayoriAdjectives[Math.floor(Math.random() * sayoriAdjectives.length)].toLowerCase() },
            { pings: false, text: 'nooooo' },
            { pings: false, text: 'stol', edit: 'stop' },
            { pings: false, text: 'Hope you realize that people can become not cringe. Maybe. Juuuust maybe. I have stopped doing shit with the "gay chains". If you tried not dwelling on the past maybe you could actually realize how annoying you are. Now let me guess youll respond with a short answer, not answer, respond with what I did, or completely change the topic.' },
            { pings: true, text: 'no' },
            { pings: false, text: 'gay' },
            { pings: false, text: 'i dare someone to post porn on my dm\'s' },
            { pings: false, text: '._.' },
            { pings: true, text: '' },
            { pings: false, text: msg.author.username.toUpperCase() + ' WHY' },
            { pings: false, text: 'BRUH' },
            { pings: false, text: 'SUS' },
            { pings: false, text: 'im underaged' },
            { pings: true, text: 'YOU SUSSY' },
            { pings: false, text: 'AMOGUS' },
            { pings: false, text: 'is that friday night porn' },
            { pings: true, text: 'flop' },
            { pings: false, text: 'i like porn 🥲 🥲 🥲 🥲 🥲 🥲' },
            { pings: true, text: 'stupid ' + msg.author.username.toLowerCase() },
            { pings: false, text: 'not ' + msg.author.username.toLowerCase() },
            { pings: false, text: 'wth ' + msg.author.username.toLowerCase() },
            { pings: false, text: 'lol ' + msg.author.username.toLowerCase() },
            { pings: false, text: msg.author.username.toLowerCase() + ' ' + adjectives[Math.floor(Math.random() * adjectives.length)] },
            { pings: false, text: msg.author.username.toLowerCase() + ': ' + poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toLowerCase() },
            { pings: false, text: 'no not ' + msg.author.username.toLowerCase() + ' with ' + poopy.arrays.arabDictionary[Math.floor(Math.random() * poopy.arrays.arabDictionary.length)].toLowerCase() },
            { pings: false, text: 'ahhhhhhhhhh' },
            { pings: false, text: 'school suuucks' },
            { pings: false, text: 'why am i a bot' },
            { pings: false, text: msg.author.username.toLowerCase() + ' ' + shipAdjectives[Math.floor(Math.random() * shipAdjectives.length)] + ' ' + members[Math.floor(Math.random() * members.length)].toLowerCase() },
            { pings: false, text: 'is ' + members[Math.floor(Math.random() * members.length)].toLowerCase() + ' hot' },
            { pings: false, text: 'im not pinging ' + members[Math.floor(Math.random() * members.length)].toLowerCase() },
            { pings: false, text: members[Math.floor(Math.random() * members.length)].toUpperCase() + ' IS ' + sayoriAdjectives[Math.floor(Math.random() * sayoriAdjectives.length)] + ' NOT ME' },
            { pings: false, text: members[Math.floor(Math.random() * members.length)].toUpperCase() + ' IS THE ' + sayoriAdjectives[Math.floor(Math.random() * sayoriAdjectives.length)] + ' ' + sayoriAdjectives[Math.floor(Math.random() * sayoriAdjectives.length)] + ' ' + sayoriAdjectives[Math.floor(Math.random() * sayoriAdjectives.length)] + ' ' + sayoriAdjectives[Math.floor(Math.random() * sayoriAdjectives.length)] },
            { pings: false, text: msg.author.username.toLowerCase() }
        ];

        var sayori = await poopy.bot.users.fetch('758638862590803968')

        var option = fixedchoice && (typeof (Number(fixedchoice)) == 'number' && (((Number(fixedchoice) - 1) >= options.length - 1 && options[options.length - 1]) || ((Number(fixedchoice) - 1) <= 0 && options[0]) || (isNaN(Number(fixedchoice)) && options[Math.floor(Math.random() * options.length)]) || options[Math.floor(Number(fixedchoice))]) || options[Math.floor(Math.random() * options.length)]) || options[Math.floor(Math.random() * options.length)]
        var optiontext
        if (option['pings'] === true) {
            optiontext = '<@' + msg.author.id + '> ' + option['text']
        } else {
            optiontext = option['text']
        }

        var sayoriMessage

        var webhooks = await msg.channel.fetchWebhooks().catch(() => { })
        if (webhooks ? webhooks.size : undefined) {
            var findWebhook = webhooks.find(webhook => poopy.bot.user === webhook.owner)
            if (findWebhook) {
                sayoriMessage = await findWebhook.send({
                    content: optiontext,
                    username: sayori.username,
                    avatarURL: sayori.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }),
                    allowedMentions: {
                        parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                    }
                })
                    .then(botmsg => {
                        if (option['edit']) {
                            var editTimeout = setTimeout(() => {
                                if (option['pings'] === true) {
                                    botmsg.delete().catch(() => { })
                                    findWebhook.send({
                                        content: '<@' + msg.author.id + '> ' + option['edit'] + ' ⁽ᵉᵈᶦᵗᵉᵈ⁾',
                                        username: sayori.username,
                                        avatarURL: sayori.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }),
                                        allowedMentions: {
                                            parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                                        }
                                    }).catch(() => { })
                                } else {
                                    botmsg.delete().catch(() => { })
                                    findWebhook.send({
                                        content: option['edit'] + ' ⁽ᵉᵈᶦᵗᵉᵈ⁾',
                                        username: sayori.username,
                                        avatarURL: sayori.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }),
                                        allowedMentions: {
                                            parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                                        }
                                    }).catch(() => { })
                                }
                                clearTimeout(editTimeout)
                            }, 3000)
                        }
                    })
                    .catch(() => { })
            } else {
                var createdWebhook = await msg.channel.createWebhook('Poopyhook', { avatar: 'https://cdn.discordapp.com/attachments/760223418968047629/835923489834664056/poopy2.png' }).catch(() => { })
                if (!createdWebhook) {
                    msg.channel.send('I need admin for this command!').catch(() => { })
                    return
                }
                sayoriMessage = await createdWebhook.send({
                    content: optiontext,
                    username: sayori.username,
                    avatarURL: sayori.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }),
                    allowedMentions: {
                        parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                    }
                })
                    .then(botmsg => {
                        if (option['edit']) {
                            var editTimeout = setTimeout(() => {
                                if (option['pings'] === true) {
                                    botmsg.delete().catch(() => { })
                                    findWebhook.send({
                                        content: '<@' + msg.author.id + '> ' + option['edit'] + ' ⁽ᵉᵈᶦᵗᵉᵈ⁾',
                                        username: sayori.username,
                                        avatarURL: sayori.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }),
                                        allowedMentions: {
                                            parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                                        }
                                    }).catch(() => { })
                                } else {
                                    botmsg.delete().catch(() => { })
                                    findWebhook.send({
                                        content: option['edit'] + ' ⁽ᵉᵈᶦᵗᵉᵈ⁾',
                                        username: sayori.username,
                                        avatarURL: sayori.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }),
                                        allowedMentions: {
                                            parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                                        }
                                    }).catch(() => { })
                                }
                                clearTimeout(editTimeout)
                            }, 3000)
                        }
                    })
                    .catch(() => { })
            }
        } else {
            var createdWebhook = await msg.channel.createWebhook('Poopyhook', { avatar: 'https://cdn.discordapp.com/attachments/760223418968047629/835923489834664056/poopy2.png' }).catch(() => { })
            if (!createdWebhook) {
                msg.channel.send('I need admin for this command!').catch(() => { })
                return
            }
            sayoriMessage = await createdWebhook.send({
                content: optiontext,
                username: sayori.username,
                avatarURL: sayori.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }),
                allowedMentions: {
                    parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                }
            })
                .then(botmsg => {
                    if (option['edit']) {
                        var editTimeout = setTimeout(() => {
                            if (option['pings'] === true) {
                                botmsg.delete().catch(() => { })
                                findWebhook.send({
                                    content: '<@' + msg.author.id + '> ' + option['edit'] + ' ⁽ᵉᵈᶦᵗᵉᵈ⁾',
                                    username: sayori.username,
                                    avatarURL: sayori.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }),
                                    allowedMentions: {
                                        parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                                    }
                                }).catch(() => { })
                            } else {
                                botmsg.delete().catch(() => { })
                                findWebhook.send({
                                    content: option['edit'] + ' ⁽ᵉᵈᶦᵗᵉᵈ⁾',
                                    username: sayori.username,
                                    avatarURL: sayori.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }),
                                    allowedMentions: {
                                        parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                                    }
                                }).catch(() => { })
                            }
                            clearTimeout(editTimeout)
                        }, 3000)
                    }
                })
                .catch(() => { })
        }

        if (!sayoriMessage) {
            sayoriMessage = await msg.channel.send({
                content: optiontext,
                allowedMentions: {
                    parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                }
            })
                .then(botmsg => {
                    if (option['edit']) {
                        var editTimeout = setTimeout(() => {
                            if (option['pings'] === true) {
                                botmsg.edit({
                                    content: '<@' + msg.author.id + '> ' + option['edit'],
                                    allowedMentions: {
                                        parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                                    }
                                }).catch(() => { })
                            } else {
                                botmsg.edit({
                                    content: option['edit'],
                                    allowedMentions: {
                                        parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                                    }
                                }).catch(() => { })
                            }
                            clearTimeout(editTimeout)
                        }, 3000)
                    }
                })
                .catch(() => { })
        }
    },
    help: { name: 'sayori [phraseChoice]', value: 'no not sayori ai' },
    cooldown: 2500,
    type: 'Inside Joke'
}