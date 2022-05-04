module.exports = {
    name: ['brightcontrast', 'brightness', 'contrast'],
    execute: async function (msg, args) {
        let poopy = this

        msg.channel.sendTyping().catch(() => { })
        if (poopy.data['guild-data'][msg.guild.id]['channels'][msg.channel.id]['lastUrl'] === undefined && args[4] === undefined) {
            msg.channel.send('What is the file?!').catch(() => { })
            msg.channel.sendTyping().catch(() => { })
            return;
        };
        var currenturl = poopy.data['guild-data'][msg.guild.id]['channels'][msg.channel.id]['lastUrl']
        var brightness = (isNaN(Number(String(args[1]).replace(/,/g, ''))) ? 0 : Number(String(args[1]).replace(/,/g, '')) <= -10 ? -10 : Number(String(args[1]).replace(/,/g, '')) >= 10 ? 10 : Number(String(args[1]).replace(/,/g, '')) || 0) / 10
        var contrast = isNaN(Number(String(args[2]).replace(/,/g, ''))) ? 1 : Number(String(args[2]).replace(/,/g, '')) <= -10 ? -10 : Number(String(args[2]).replace(/,/g, '')) >= 10 ? 10 : Number(String(args[2]).replace(/,/g, '')) ?? 1
        var contrastreductions = 0
        var contrastfilters = []
        var c = contrast

        while (c > 2) {
            c -= 2
            contrastreductions++
        }

        for (var i = 0; i < contrastreductions; i++) {
            contrastfilters.push(`eq=contrast=2`)
        }

        contrastfilters.push(`eq=contrast=${c}`)

        var fileinfo = await poopy.functions.validateFile(currenturl).catch(error => {
            msg.channel.send(error)
            msg.channel.sendTyping().catch(() => { })
            return;
        })

        if (!fileinfo) return
        var type = fileinfo.type

        if (type.mime.startsWith('image') && !(poopy.vars.gifFormats.find(f => f === type.ext))) {
            var filepath = await poopy.functions.downloadFile(currenturl, `input.png`, {
                fileinfo: fileinfo
            })
            var filename = `input.png`
            await poopy.functions.execPromise(`ffmpeg -i ${filepath}/${filename} -filter_complex "[0:v]split[normal][extract];[extract]alphaextract[mask];[normal]eq=brightness=${brightness},${contrastfilters.join(',')}[bc];[bc][mask]alphamerge[out]" -map "[out]" -preset ${poopy.functions.findpreset(args)} ${filepath}/output.png`)
            await poopy.functions.sendFile(msg, filepath, `output.png`)
        } else if (type.mime.startsWith('video')) {
            var filepath = await poopy.functions.downloadFile(currenturl, `input.mp4`, {
                fileinfo: fileinfo
            })
            var filename = `input.mp4`
            await poopy.functions.execPromise(`ffmpeg -i ${filepath}/${filename} -map 0:a? -filter_complex "[0:v]eq=brightness=${brightness},${contrastfilters.join(',')},scale=ceil(iw/2)*2:ceil(ih/2)*2[out]" -map "[out]" -preset ${poopy.functions.findpreset(args)} -c:v libx264 -pix_fmt yuv420p ${filepath}/output.mp4`)
            await poopy.functions.sendFile(msg, filepath, `output.mp4`)
        } else if (type.mime.startsWith('image') && poopy.vars.gifFormats.find(f => f === type.ext)) {
            var filepath = await poopy.functions.downloadFile(currenturl, `input.gif`, {
                fileinfo: fileinfo
            })
            var filename = `input.gif`
            await poopy.functions.execPromise(`ffmpeg -i ${filepath}/${filename} -filter_complex "[0:v]split[normal][extract];[extract]alphaextract[mask];[normal]eq=brightness=${brightness},${contrastfilters.join(',')}[bc];[bc][mask]alphamerge,split[pout][ppout];[ppout]palettegen=reserve_transparent=1[palette];[pout][palette]paletteuse=alpha_threshold=128[out]" -map "[out]" -preset ${poopy.functions.findpreset(args)} -gifflags -offsetting ${filepath}/output.gif`)
            await poopy.functions.sendFile(msg, filepath, `output.gif`)
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
    },
    help: {
        name: 'brightcontrast/brightness/contrast [brightness (from -10 to 10)] [contrast (from -10 to 10)] <file>',
        value: "Changes the file's brightness and contrast values."
    },
    cooldown: 2500,
    type: 'Color'
}