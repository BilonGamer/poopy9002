module.exports = {
    name: ['speedup', 'speed'],
    execute: async function (msg, args) {
        let poopy = this

        await msg.channel.sendTyping().catch(() => { })
        if (poopy.functions.lastUrl(msg.guild.id, msg.channel.id, 0) === undefined && args[2] === undefined) {
            await msg.channel.send('What is the file?!').catch(() => { })
            await msg.channel.sendTyping().catch(() => { })
            return;
        };
        var currenturl = poopy.functions.lastUrl(msg.guild.id, msg.channel.id, 0)
        var speed = isNaN(Number(args[1])) ? 2 : Number(args[1]) <= 1 ? 1 : Number(args[1]) >= 6 ? 6 : Number(args[1]) || 2
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
            var fps = fileinfo.info.fps
            var audio = fileinfo.info.audio

            if (audio) {
                await poopy.functions.execPromise(`ffmpeg -i ${filepath}/${filename} -filter_complex "[0:v]fps=fps='min(60,${fps.includes('0/0') ? '60' : fps}*${speed})',setpts=(1/${speed})*PTS,scale=ceil(iw/2)*2:ceil(ih/2)*2[v];[0:a]atempo=${speed}[a]" -map "[v]" -map "[a]" -preset ${poopy.functions.findpreset(args)} -c:v libx264 -pix_fmt yuv420p ${filepath}/output.mp4`)
                return await poopy.functions.sendFile(msg, filepath, `output.mp4`)
            } else {
                await poopy.functions.execPromise(`ffmpeg -i ${filepath}/${filename} -filter_complex "[0:v]fps=fps='min(60,${fps.includes('0/0') ? '60' : fps}*${speed})',setpts=(1/${speed})*PTS,scale=ceil(iw/2)*2:ceil(ih/2)*2[v]" -map "[v]" -c:v libx264 -pix_fmt yuv420p ${filepath}/output.mp4`)
                return await poopy.functions.sendFile(msg, filepath, `output.mp4`)
            }
        } else if (type.mime.startsWith('audio')) {
            var filepath = await poopy.functions.downloadFile(currenturl, `input.mp3`, {
                fileinfo: fileinfo
            })
            var filename = `input.mp3`
            await poopy.functions.execPromise(`ffmpeg -i ${filepath}/${filename} -filter_complex "[0:a]atempo=${speed}[a]" -map "[a]" -preset ${poopy.functions.findpreset(args)} ${filepath}/output.mp3`)
            return await poopy.functions.sendFile(msg, filepath, `output.mp3`)
        } else if (type.mime.startsWith('image') && poopy.vars.gifFormats.find(f => f === type.ext)) {
            var filepath = await poopy.functions.downloadFile(currenturl, `input.gif`, {
                fileinfo: fileinfo
            })
            var filename = `input.gif`
            var fps = fileinfo.info.fps

            await poopy.functions.execPromise(`ffmpeg -i ${filepath}/${filename} -filter_complex "[0:v]fps=fps='min(50,${fps.includes('0/0') ? '50' : fps}*${speed})',setpts=(1/${speed})*PTS,split[pout][ppout];[ppout]palettegen=reserve_transparent=1[palette];[pout][palette]paletteuse=alpha_threshold=128[out]" -map "[out]" -preset ${poopy.functions.findpreset(args)} -gifflags -offsetting ${filepath}/output.gif`)
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
        name: 'speedup/speed [multiplier (from 1 to 6)] <file>',
        value: 'Speeds up the file by the multiplier. Default is 2.'
    },
    cooldown: 2500,
    type: 'Duration'
}
