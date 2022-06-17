module.exports = {
    name: ['outline', 'border'],
    execute: async function (msg, args) {
        let poopy = this

        await msg.channel.sendTyping().catch(() => { })
        if (poopy.functions.lastUrl(msg.guild.id, msg.channel.id, 0) === undefined && args[1] === undefined) {
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
        var bordersplit = []
        var overlays = []
        var overlayrepeat = 10
        var repeatindex = args.indexOf('-repeat')
        if (repeatindex > -1) {
            overlayrepeat = isNaN(Number(args[repeatindex + 1])) ? 10 : Number(args[repeatindex + 1]) <= 1 ? 1 : Number(args[repeatindex + 1]) >= 100 ? 100 : Math.round(Number(args[repeatindex + 1])) || 10
        }
        for (var i = 1; i <= overlayrepeat; i++) {
            bordersplit.push(`[border${i}]`)
            if (i !== overlayrepeat) {
                overlays.push(`[${i !== 1 ? 'o' : ''}border${i}][border${i + 1}]overlay=x=0:y=0:format=auto${i !== overlayrepeat - 1 ? `[oborder${i + 1}]` : ''}`)
            }
        }

        var rgb = {
            r: 255,
            g: 255,
            b: 255,
        }
        var colorindex = args.indexOf('-color')
        if (colorindex > -1) {
            var r = args[colorindex + 1]
            var g = args[colorindex + 2]
            var b = args[colorindex + 3]
            rgb.r = isNaN(Number(String(r).replace(/,/g, ''))) ? 0 : Number(String(r).replace(/,/g, '')) <= 0 ? 0 : Number(String(r).replace(/,/g, '')) >= 255 ? 255 : Number(String(r).replace(/,/g, '')) || 0
            rgb.g = isNaN(Number(String(g).replace(/,/g, ''))) ? 0 : Number(String(g).replace(/,/g, '')) <= 0 ? 0 : Number(String(g).replace(/,/g, '')) >= 255 ? 255 : Number(String(g).replace(/,/g, '')) || 0
            rgb.b = isNaN(Number(String(b).replace(/,/g, ''))) ? 0 : Number(String(b).replace(/,/g, '')) <= 0 ? 0 : Number(String(b).replace(/,/g, '')) >= 255 ? 255 : Number(String(b).replace(/,/g, '')) || 0
        }

        var currenturl = poopy.functions.lastUrl(msg.guild.id, msg.channel.id, 0)
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

            await poopy.functions.execPromise(`ffmpeg -i ${filepath}/${filename} -filter_complex "[0:v]split[input][blur];[blur]boxblur=luma_radius=${radius}:luma_power=${power}:chroma_radius=${radius}:chroma_power=${power}:alpha_radius=${radius}:alpha_power=${power},curves=r='0/1 1/1':g='0/1 1/1':b='0/1 1/1',curves=r='0/0 1/${rgb.r / 255}':g='0/0 1/${rgb.g / 255}':b='0/0 1/${rgb.b / 255}',split=${overlayrepeat}${bordersplit.join('')};${overlays.join(';')}[greatborder];[greatborder][input]overlay=x=0:y=0:format=auto[out]" -map "[out]" -preset ${poopy.functions.findpreset(args)} ${filepath}/output.png`)
            return await poopy.functions.sendFile(msg, filepath, `output.png`)
        } else if (type.mime.startsWith('image') && poopy.vars.gifFormats.find(f => f === type.ext)) {
            var filepath = await poopy.functions.downloadFile(currenturl, `input.gif`, {
                fileinfo: fileinfo
            })
            var filename = `input.gif`

            await poopy.functions.execPromise(`ffmpeg -i ${filepath}/${filename} -filter_complex "[0:v]split[input][blur];[blur]boxblur=luma_radius=${radius}:luma_power=${power}:chroma_radius=${radius}:chroma_power=${power}:alpha_radius=${radius}:alpha_power=${power},curves=r='0/1 1/1':g='0/1 1/1':b='0/1 1/1',curves=r='0/0 1/${rgb.r / 255}':g='0/0 1/${rgb.g / 255}':b='0/0 1/${rgb.b / 255}',split=${overlayrepeat}${bordersplit.join('')};${overlays.join(';')}[greatborder];[greatborder][input]overlay=x=0:y=0:format=auto,split[pout][ppout];[ppout]palettegen=reserve_transparent=1[palette];[pout][palette]paletteuse=alpha_threshold=128[out]" -map "[out]" -preset ${poopy.functions.findpreset(args)} -gifflags -offsetting ${filepath}/output.gif`)
            return await poopy.functions.sendFile(msg, filepath, `output.gif`)
        } else if (type.mime.startsWith('video')) {
            await msg.channel.send(`videos have no alpha channel + cry about it + stay mad + get real + L + mald seethe cope harder + don't care + didn't ask + hoes mad + basic + skill issue + ratio + you fell off + the audacity + triggered + any askers + redpilled + get a life + ok and? + cringe + touch grass + donowalled + not based + your're a (insert stereotype) + not funny didn't laugh + you're* + grammar issue + go outside + get good + reported + ad hominem + GG! + ur mom`).catch(() => { })
            await msg.channel.sendTyping().catch(() => { })
            return
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
        name: 'outline/border <file> [-radius <pixels>] [-power <number>] [-color <r> <g> <b>] [-repeat <number (max 100)>]',
        value: 'Adds an outline to the file, only works with transparent ones.'
    },
    cooldown: 2500,
    type: 'Effects'
}