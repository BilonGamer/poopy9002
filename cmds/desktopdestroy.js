module.exports = {
    name: ['desktopdestroy', 'desktopdestroyer'],
    execute: async function (msg, args) {
        let poopy = this

        msg.channel.sendTyping().catch(() => { })
        if (poopy.data['guild-data'][msg.guild.id]['channels'][msg.channel.id]['lastUrl'] === undefined && args[1] === undefined) {
            msg.channel.send('What is the file?!').catch(() => { })
            msg.channel.sendTyping().catch(() => { })
            return;
        };
        var currenturl = poopy.data['guild-data'][msg.guild.id]['channels'][msg.channel.id]['lastUrl'] || args[1]
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
            var height = fileinfo.info.height

            await poopy.functions.execPromise(`ffmpeg -stream_loop -1 -i ${filepath}/${filename} -i templates/destroy.gif -filter_complex "${height >= 238 ? `[1:v]scale=-1:${height >= 300 ? 300 : height}[ckout];` : ''}[${height >= 238 ? `ckout` : `1:v`}]colorkey=0x00FF01:0.3:0.3[jout];[0:v]scale='min(400,iw)':min'(400,ih)':force_original_aspect_ratio=decrease[lout];[lout][jout]overlay=shortest=1:x=W/2-w/2:y=H/2-h/2:format=auto[rout];[rout]split[gnout][gpout];[gpout]palettegen=reserve_transparent=1[palette];[gnout][palette]paletteuse=alpha_threshold=128[out]" -map "[out]" -preset ${poopy.functions.findpreset(args)} -gifflags -offsetting ${filepath}/output.gif`)
            await poopy.functions.sendFile(msg, filepath, `output.gif`)
        } else if (type.mime.startsWith('video')) {
            var filepath = await poopy.functions.downloadFile(currenturl, `input.mp4`, {
                fileinfo: fileinfo
            })
            var filename = `input.mp4`
            var height = fileinfo.info.height

            await poopy.functions.execPromise(`ffmpeg -i ${filepath}/${filename} -stream_loop -1 -i templates/destroy.gif -map 0:a? -filter_complex "${height >= 238 ? `[1:v]scale=-1:${height}[ckout];` : ''}[${height >= 238 ? `ckout` : `1:v`}]colorkey=0x00FF01:0.3:0.3[jout];[0:v][jout]overlay=shortest=1:x=W/2-w/2:y=H/2-h/2:format=auto[sout];[sout]scale=ceil(iw/2)*2:ceil(ih/2)*2[out]" -map "[out]" -preset ${poopy.functions.findpreset(args)} -c:v libx264 -pix_fmt yuv420p ${filepath}/output.mp4`)
            await poopy.functions.sendFile(msg, filepath, `output.mp4`)
        } else if (type.mime.startsWith('image') && poopy.vars.gifFormats.find(f => f === type.ext)) {
            var filepath = await poopy.functions.downloadFile(currenturl, `input.gif`, {
                fileinfo: fileinfo
            })
            var filename = `input.gif`
            var height = fileinfo.info.height

            await poopy.functions.execPromise(`ffmpeg -stream_loop -1 -i ${filepath}/${filename} -i templates/destroy.gif -filter_complex "${height >= 238 ? `[1:v]scale=-1:${height}[ckout];` : ''}[${height >= 238 ? `ckout` : `1:v`}]colorkey=0x00FF01:0.3:0.3[jout];[0:v][jout]overlay=shortest=1:x=W/2-w/2:y=H/2-h/2:format=auto[rout];[rout]split[gnout][gpout];[gpout]palettegen=reserve_transparent=1[palette];[gnout][palette]paletteuse=alpha_threshold=128[out]" -map "[out]" -preset ${poopy.functions.findpreset(args)} -gifflags -offsetting ${filepath}/output.gif`)
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
    help: { name: 'desktopdestroy/desktopdestroyer <file>', value: 'death' },
    cooldown: 2500,
    type: 'Memes'
}