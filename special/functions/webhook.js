module.exports = {
    helpf: '(name | avatar | message) (manage webhooks only)',
    desc: 'Creates a webhook with the name and avatar specified that will send the desired message.',
    func: async function (matches, msg, isBot) {
        let poopy = this

        var word = matches[1]
        var split = poopy.functions.splitKeyFunc(word)
        var name = split[0] ?? ''
        var avatar = split[1] ?? ''
        var message = split.slice(2).length ? split.slice(2).join(' | ') : ''
        var allBlank = true

        if (poopy.tempdata[msg.guild.id][msg.channel.id]['shut']) return ''

        if (poopy.data[poopy.config.mongodatabase]['guild-data'][msg.guild.id]['members'][msg.author.id]['coolDown']) {
            if ((poopy.data[poopy.config.mongodatabase]['guild-data'][msg.guild.id]['members'][msg.author.id]['coolDown'] - Date.now()) > 0) {
                return `Calm down! Wait more ${(poopy.data[poopy.config.mongodatabase]['guild-data'][msg.guild.id]['members'][msg.author.id]['coolDown'] - Date.now()) / 1000} seconds.`
            } else {
                poopy.data[poopy.config.mongodatabase]['guild-data'][msg.guild.id]['members'][msg.author.id]['coolDown'] = false
            }
        }

        poopy.data[poopy.config.mongodatabase]['guild-data'][msg.guild.id]['members'][msg.author.id]['coolDown'] = (poopy.data[poopy.config.mongodatabase]['guild-data'][msg.guild.id]['members'][msg.author.id]['coolDown'] || Date.now()) + 2500 / ((msg.member.permissions.has('MANAGE_GUILD') || msg.member.roles.cache.find(role => role.name.match(/mod|dev|admin|owner|creator|founder|staff/ig)) || msg.member.permissions.has('MANAGE_MESSAGES') || msg.member.permissions.has('ADMINISTRATOR') || msg.author.id === msg.guild.ownerID) ? 5 : 1)

        if (msg.channel.parent) {
            if (msg.channel.parent.isText()) {
                return 'Webhooks can\'t be used here.'
            }
        }

        for (var i = 0; i < name.length; i++) {
            var letter = name[i]
            if (letter !== ' ') {
                allBlank = false
            }
        }

        if (allBlank) {
            return 'Invalid name.'
        }

        var fetchAvatar = await poopy.modules.axios.request({
            url: avatar,
            responseType: 'stream'
        }).catch(() => { })
        if (!fetchAvatar) {
            return 'Invalid avatar.'
        }

        var avatarFiletype = await poopy.modules.fileType.fromStream(fetchAvatar.data).catch(() => { })
        if (!avatarFiletype) {
            return 'Invalid avatar.'
        }

        if (!(avatarFiletype.mime.startsWith('image'))) {
            return 'Invalid avatar.'
        }

        if (msg.member.permissions.has('MANAGE_WEBHOOKS') || msg.member.permissions.has('ADMINISTRATOR') || msg.member.permissions.has('MANAGE_GUILD') || msg.member.roles.cache.find(role => role.name.match(/mod|dev|admin|owner|creator|founder|staff/ig)) || msg.author.id === msg.guild.ownerID || poopy.config.ownerids.find(id => id == msg.author.id) || isBot) {
            var webhooks = await msg.channel.fetchWebhooks().catch(() => { })
            if (webhooks ? webhooks.size : undefined) {
                var findWebhook = webhooks.find(webhook => poopy.bot.user === webhook.owner)
                if (findWebhook) {
                    await poopy.functions.waitMessageCooldown()
                    await findWebhook.send({
                        content: message,
                        username: name,
                        avatarURL: avatar,
                        allowedMentions: {
                            parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                        }
                    }).catch(() => { })
                } else {
                    var createdWebhook = await msg.channel.createWebhook('Poopyhook', { avatar: 'https://cdn.discordapp.com/attachments/760223418968047629/835923489834664056/poopy2.png' }).catch(() => { })
                    if (!createdWebhook) {
                        return 'I need admin for this command!'
                    } else {
                        await poopy.functions.waitMessageCooldown()
                        await createdWebhook.send({
                            content: message,
                            username: name,
                            avatarURL: avatar,
                            allowedMentions: {
                                parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                            }
                        }).catch(() => { })
                    }
                }
            } else {
                var createdWebhook = await msg.channel.createWebhook('Poopyhook', { avatar: 'https://cdn.discordapp.com/attachments/760223418968047629/835923489834664056/poopy2.png' }).catch(() => { })
                if (!createdWebhook) {
                    return 'I need admin for this command!'
                } else {
                    await poopy.functions.waitMessageCooldown()
                    await createdWebhook.send({
                        content: message,
                        username: name,
                        avatarURL: avatar,
                        allowedMentions: {
                            parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                        }
                    }).catch(() => { })
                }
            }
        } else {
            return 'You need to have the manage webhooks permission to execute that!'
        }

        return ''
    },
    attemptvalue: 10
}