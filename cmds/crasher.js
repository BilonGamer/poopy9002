module.exports = {
    name: ['crasher', 'crashvideo'],
    execute: async function (msg, args) {
        let poopy = this

        if (msg.member.permissions.has('MANAGE_GUILD') || msg.member.roles.cache.find(role => role.name.match(/mod|dev|admin|owner|creator|founder|staff/ig)) || msg.member.permissions.has('ADMINISTRATOR') || msg.author.id === msg.guild.ownerID || poopy.config.ownerids.find(id => id == msg.author.id)) {
            msg.channel.sendTyping().catch(() => { })
            if (poopy.data[poopy.config.mongodatabase]['guild-data'][msg.guild.id]['channels'][msg.channel.id]['lastUrl'] === undefined && args[1] === undefined) {
                msg.channel.send('What is the file?!').catch(() => { })
                msg.channel.sendTyping().catch(() => { })
                return;
            };
            var currenturl = poopy.data[poopy.config.mongodatabase]['guild-data'][msg.guild.id]['channels'][msg.channel.id]['lastUrl'] || args[1]
            var fileinfo = await poopy.functions.validateFile(currenturl).catch(error => {
                msg.channel.send(error)
                msg.channel.sendTyping().catch(() => { })
                return;
            })

            if (!fileinfo) return
            var type = fileinfo.type

            if (type.mime.startsWith('image') || type.mime.startsWith('video')) {
                var filepath = await poopy.functions.downloadFile(currenturl, `input.${fileinfo.shortext}`, {
                    fileinfo: fileinfo
                })
                var filename = `input.${fileinfo.shortext}`
                poopy.modules.fs.copyFileSync(`templates/crash.webm`, `${filepath}/crash.webm`)

                await poopy.functions.execPromise(`ffmpeg -i ${filepath}/${filename} -pix_fmt yuv444p -preset ${poopy.functions.findpreset(args)} ${filepath}/webm.webm`)
                poopy.modules.fs.writeFileSync(`${filepath}/concat.txt`, `file 'webm.webm'\nfile 'crash.webm'`)
                await poopy.functions.execPromise(`ffmpeg -f concat -i ${filepath}/concat.txt -codec copy -preset ${poopy.functions.findpreset(args)} ${filepath}/output.webm`)
                await poopy.functions.sendFile(msg, filepath, `output.webm`)
            } else {
                msg.channel.send({
                    content: `Unsupported file: \`${currenturl}\``,
                    allowedMentions: {
                        parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                    }
                }).catch(() => { })
                msg.channel.sendTyping().catch(() => { })
                return
            }
        } else {
            msg.channel.send('You need to be an administrator to execute that! (you can do it in another server though I won\'t stop you)').catch(() => { })
            return;
        }
    },
    help: {
        name: '<:newpoopy:839191885310066729> crasher/crashvideo <file> (admin only)',
        value: "Manipulates the file to make it a WebM crasher."
    },
    cooldown: 2500,
    perms: ['ADMINISTRATOR'],
    type: 'Hex Manipulation'
}