module.exports = {
    name: ['spam', 'flood'],
    args: [{ "name": "times", "required": true, "specifarg": false, "orig": "<times>" }, { "name": "message", "required": true, "specifarg": false, "orig": "<message>" }, { "name": "nodelete", "required": false, "specifarg": true, "orig": "[-nodelete]" }, { "name": "tts", "required": false, "specifarg": true, "orig": "[-tts]" }],
    execute: async function (msg, args) {
        let poopy = this
        let config = poopy.config
        let { Discord } = poopy.modules
        let tempdata = poopy.tempdata

        await msg.channel.sendTyping().catch(() => { })
        if (msg.member.permissions.has('MANAGE_GUILD') || msg.member.permissions.has('MANAGE_MESSAGES') || msg.member.permissions.has('ADMINISTRATOR') || msg.author.id === msg.guild.ownerID || config.ownerids.find(id => id == msg.author.id)) {
            if (args[1] === undefined && args[2] === undefined) {
                await msg.reply('How much do I spam?!').catch(() => { })
                return;
            }
            var del = true
            var deleteIndex = args.indexOf('-nodelete')
            if (deleteIndex > -1) {
                args.splice(deleteIndex, 1)
                del = false
            }
            var tts = false
            var ttsIndex = args.indexOf('-tts')
            if (ttsIndex > -1) {
                args.splice(ttsIndex, 1)
                tts = true
            }
            var saidMessage = args.slice(2).join(' ')
            var attachments = msg.attachments.map(attachment => new Discord.MessageAttachment(attachment.url, attachment.name))
            var numToRepeat = Number(args[1]);
            if (isNaN(numToRepeat)) {
                await msg.reply({
                    content: 'Invalid number: **' + args[1] + '**',
                    allowedMentions: {
                        parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                    }
                }).catch(() => { })
                return;
            }
            else if (numToRepeat > 25) {
                await msg.reply('Number must be smaller or equal to **25**.').catch(() => { })
                return;
            }
            if (args[2] === undefined && attachments.length <= 0) {
                await msg.reply('What is the message to spam?!').catch(() => { })
                return;
            };
            var sendObject = {
                allowedMentions: {
                    parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                },
                files: attachments,
                stickers: msg.stickers,
                tts: (msg.member.permissions.has('ADMINISTRATOR') || msg.member.permissions.has('SEND_TTS_MESSAGES') || msg.author.id === msg.guild.ownerID) && tts
            }
            if (saidMessage) {
                sendObject.content = saidMessage
            }
            if (del) {
                msg.delete().catch(() => { })
            }
            var reply = await msg.fetchReference().catch(() => { })

            if (msg.isCommand && msg.isCommand() && del) await msg.deferReply({ ephemeral: true }).catch(() => { })

            for (var i = 0; i < numToRepeat; i++) {
                if (tempdata[msg.guild.id][msg.channel.id]['shut']) break

                if (reply) {
                    await reply.reply(sendObject).catch(() => { })
                } else {
                    if (del || msg.replied) {
                        await msg.channel.send(sendObject).catch(() => { })
                        if (!msg.isCommand && del) msg.delete().catch(() => { })
                    } else {
                        await msg.reply(sendObject).catch(() => { })
                    }
                }
            }

            if (msg.isCommand && msg.isCommand() && del) await msg.editReply({ content: 'Successfully sent.' }).catch(() => { });
        } else {
            await msg.reply('You need to have the manage messages permission to execute that!').catch(() => { })
            return;
        };
    },
    help: {
        name: 'spam/flood <times> <message> [-nodelete] [-tts] (manage messages permission only)',
        value: 'Spam a message! Limit is 25.\nExample usage: p:spam 5 stupid'
    },
    cooldown: 10000,
    nodefer: true,
    perms: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
    type: 'Annoying'
}