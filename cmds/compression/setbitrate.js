module.exports = {
    name: ['setbitrate'],
    args: [{"name":"bitrate","required":true,"specifarg":false},{"name":"file","required":false,"specifarg":false}],
    execute: async function (msg, args) {
        let poopy = this

        await msg.channel.sendTyping().catch(() => { })
        if (poopy.functions.lastUrl(msg, 0) === undefined && args[1] === undefined) {
            await msg.channel.send('What is the file?!').catch(() => { })
            await msg.channel.sendTyping().catch(() => { })
            return;
        };
        var bitrate = isNaN(Number(args[1])) ? undefined : Number(args[1]) <= 1 ? 1 : Number(args[1]) >= 2000 ? 2000 : Number(args[1]) || undefined
        if (bitrate === undefined) {
            await msg.channel.send('What is the bitrate?!').catch(() => { })
            await msg.channel.sendTyping().catch(() => { })
            return;
        }
        var currenturl = poopy.functions.lastUrl(msg, 0) || args[1]
        var fileinfo = await poopy.functions.validateFile(currenturl, true).catch(async error => {
            await msg.channel.send(error).catch(() => { })
            await msg.channel.sendTyping().catch(() => { })
            return;
        })

        if (!fileinfo) return
        var type = fileinfo.type

        if (type.mime.startsWith('video')) {
            var filepath = await poopy.functions.downloadFile(currenturl, `input.mp4`, {
                fileinfo: fileinfo
            })
            var filename = `input.mp4`
            await poopy.functions.execPromise(`ffmpeg -i ${filepath}/${filename} -b:v ${bitrate}k -vf "scale=ceil(iw/2)*2:ceil(ih/2)*2" -preset ${poopy.functions.findpreset(args)} -c:v libx264 -pix_fmt yuv420p ${filepath}/output.mp4`)
            return await poopy.functions.sendFile(msg, filepath, `output.mp4`)
        } else if (type.mime.startsWith('image') && !(poopy.vars.gifFormats.find(f => f === type.ext))) {
            var filepath = await poopy.functions.downloadFile(currenturl, `input.png`, {
                fileinfo: fileinfo
            })
            var filename = `input.png`
            await poopy.functions.execPromise(`ffmpeg -i ${filepath}/${filename} -b:v ${bitrate}k -vf "scale=ceil(iw/2)*2:ceil(ih/2)*2" -preset ${poopy.functions.findpreset(args)} -c:v libx264 -pix_fmt yuv420p ${filepath}/converted.mp4`)
            await poopy.functions.execPromise(`ffmpeg -i ${filepath}/converted.mp4 -preset ${poopy.functions.findpreset(args)} -vframes 1 ${filepath}/output.png`)
            return await poopy.functions.sendFile(msg, filepath, `output.png`)
        } else if (type.mime.startsWith('image') && poopy.vars.gifFormats.find(f => f === type.ext)) {
            var filepath = await poopy.functions.downloadFile(currenturl, `input.gif`, {
                fileinfo: fileinfo
            })
            var filename = `input.gif`
            await poopy.functions.execPromise(`ffmpeg -i ${filepath}/${filename} -b:v ${bitrate}k -vf "scale=ceil(iw/2)*2:ceil(ih/2)*2" -preset ${poopy.functions.findpreset(args)} -c:v libx264 -pix_fmt yuv420p ${filepath}/converted.mp4`)
            await poopy.functions.execPromise(`ffmpeg -i ${filepath}/converted.mp4 -filter_complex "[0:v]split[pout][ppout];[ppout]palettegen=reserve_transparent=1[palette];[pout][palette]paletteuse=alpha_threshold=128[out]" -map "[out]" -preset ${poopy.functions.findpreset(args)} -gifflags -offsetting ${filepath}/output.gif`)
            return await poopy.functions.sendFile(msg, filepath, `output.gif`)
        } else {
            await msg.channel.send({
                content: `Unsupported file: \`${currenturl}\``,
                allowedMentions: {
                    parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                }
            }).catch(() => { })
            await msg.channel.sendTyping().catch(() => { })
            return
        }
    },
    help: {
        name: 'setbitrate <bitrate> {file}',
        value: "Sets the file's bitrate to <bitrate>."
    },
    cooldown: 2500,
    type: 'Compression'
}