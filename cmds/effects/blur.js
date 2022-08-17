module.exports = {
    name: ['blur'],
    args: [{"name":"file","required":false,"specifarg":false},{"name":"radius","required":false,"specifarg":true},{"name":"power","required":false,"specifarg":true}],
    execute: async function (msg, args) {
        let poopy = this

        await msg.channel.sendTyping().catch(() => { })
        if (poopy.functions.lastUrl(msg, 0) === undefined && args[1] === undefined) {
            await msg.channel.send('What is the file?!').catch(() => { })
            await msg.channel.sendTyping().catch(() => { })
            return;
        };
        var power = 2
        var powerindex = args.indexOf('-power')
        if (powerindex > -1) {
            power = isNaN(Number(args[powerindex + 1])) ? 2 : Number(args[powerindex + 1]) <= 0 ? 0 : Math.round(Number(args[powerindex + 1])) ?? 2
        }
        var radius = 2
        var radiusindex = args.indexOf('-radius')
        if (radiusindex > -1) {
            radius = isNaN(Number(args[radiusindex + 1])) ? 2 : Number(args[radiusindex + 1]) <= 0 ? 0 : Number(args[radiusindex + 1]) ?? 2
        }
        var currenturl = poopy.functions.lastUrl(msg, 0)
        var fileinfo = await poopy.functions.validateFile(currenturl, true).catch(async error => {
            await msg.channel.send(error).catch(() => { })
            await msg.channel.sendTyping().catch(() => { })
            return;
        })

        if (!fileinfo) return
        var type = fileinfo.type

        if (type.mime.startsWith('image') && !(poopy.vars.gifFormats.find(f => f === type.ext))) {
            var filepath = await poopy.functions.downloadFile(currenturl, `input.png`, {
                fileinfo: fileinfo
            })
            var filename = `input.png`

            await poopy.functions.execPromise(`ffmpeg -i ${filepath}/${filename} -filter_complex "[0:v]boxblur=luma_radius=${radius}:luma_power=${power}:chroma_radius=${radius}:chroma_power=${power}:alpha_radius=${radius}:alpha_power=${power}[out]" -map "[out]" -preset ${poopy.functions.findpreset(args)} ${filepath}/output.png`)
            return await poopy.functions.sendFile(msg, filepath, `output.png`)
        } else if (type.mime.startsWith('video')) {
            var filepath = await poopy.functions.downloadFile(currenturl, `input.mp4`, {
                fileinfo: fileinfo
            })
            var filename = `input.mp4`

            await poopy.functions.execPromise(`ffmpeg -i ${filepath}/${filename} -map 0:a? -b:a 10k -filter_complex "[0:v]boxblur=luma_radius=${radius}:luma_power=${power}:chroma_radius=${radius}:chroma_power=${power}:alpha_radius=${radius}:alpha_power=${power},scale=ceil(iw/2)*2:ceil(ih/2)*2[out]" -map "[out]" -preset ${poopy.functions.findpreset(args)} -c:v libx264 -pix_fmt yuv420p ${filepath}/output.mp4`)
            return await poopy.functions.sendFile(msg, filepath, `output.mp4`)
        } else if (type.mime.startsWith('image') && poopy.vars.gifFormats.find(f => f === type.ext)) {
            var filepath = await poopy.functions.downloadFile(currenturl, `input.gif`, {
                fileinfo: fileinfo
            })
            var filename = `input.gif`

            await poopy.functions.execPromise(`ffmpeg -i ${filepath}/${filename} -filter_complex "[0:v]boxblur=luma_radius=${radius}:luma_power=${power}:chroma_radius=${radius}:chroma_power=${power}:alpha_radius=${radius}:alpha_power=${power},split[pout][ppout];[ppout]palettegen=reserve_transparent=1[palette];[pout][palette]paletteuse=alpha_threshold=128[out]" -map "[out]" -preset ${poopy.functions.findpreset(args)} -gifflags -offsetting ${filepath}/output.gif`)
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
        name: 'blur {file} [-radius <pixels>] [-power <number>]',
        value: 'Blurs the file.'
    },
    cooldown: 2500,
    type: 'Effects'
}