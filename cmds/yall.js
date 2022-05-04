module.exports = {
    name: ['yall', 'twitterartist'],
    execute: async function (msg, args) {
        let poopy = this

        msg.channel.sendTyping().catch(() => { })
        if (poopy.data['guild-data'][msg.guild.id]['channels'][msg.channel.id]['lastUrl'] === undefined && poopy.vars.validUrl.test(args[args.length - 1]) === false) {
            msg.channel.send('What is the file?!').catch(() => { })
            msg.channel.sendTyping().catch(() => { })
            return;
        };
        var saidMessage = args.join(' ').substring(args[0].length + 1)
        poopy.vars.symbolreplacements.forEach(symbolReplacement => {
            symbolReplacement.target.forEach(target => {
                saidMessage = saidMessage.replace(new RegExp(target, 'ig'), symbolReplacement.replacement)
            })
        })
        var matchedTextes = saidMessage.match(/"([\s\S]*?)"/)
        if (!matchedTextes) {
            matchedTextes = ['""', '']
        }
        var text = matchedTextes[1]
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

            var yall = await poopy.modules.Jimp.read(`templates/yall.png`)
            var morton = await poopy.modules.Jimp.loadFont('templates/fonts/Morton/Morton.fnt')
            await yall.print(morton, 274, 8, { text: poopy.modules.Discord.Util.cleanContent(text, msg), alignmentX: poopy.modules.Jimp.HORIZONTAL_ALIGN_LEFT, alignmentY: poopy.modules.Jimp.VERTICAL_ALIGN_TOP }, 202, 77)
            await yall.writeAsync(`${filepath}/yall.png`)

            var width = fileinfo.info.width
            var height = fileinfo.info.height

            var squareS = { value: ((height === width) && width) || ((height > width) && height) || width, constraint: ((height === width) && 'both') || ((height > width) && 'height') || 'width' }

            await poopy.functions.execPromise(`ffmpeg -i ${filepath}/${filename} -i ${filepath}/yall.png -i templates/transparent.png -filter_complex "[2:v]scale=249:368[transparent];[0:v]scale=${squareS.constraint === 'width' || squareS.constraint === 'both' ? 368 : -1}:${squareS.constraint === 'height' || squareS.constraint === 'both' ? 368 : -1}[frame];[transparent][frame]overlay=x=W/2-w/2:y=H/2-h/2:format=auto[cframe];[1:v][cframe]overlay=x=251:y=94:format=auto[out]" -map "[out]" -preset ${poopy.functions.findpreset(args)} ${filepath}/output.png`)
            await poopy.functions.sendFile(msg, filepath, `output.png`)
        } else if (type.mime.startsWith('video')) {
            var filepath = await poopy.functions.downloadFile(currenturl, `input.mp4`, {
                fileinfo: fileinfo
            })
            var filename = `input.mp4`

            var yall = await poopy.modules.Jimp.read(`templates/yall.png`)
            var morton = await poopy.modules.Jimp.loadFont('templates/fonts/Morton/Morton.fnt')
            await yall.print(morton, 274, 8, { text: poopy.modules.Discord.Util.cleanContent(text, msg), alignmentX: poopy.modules.Jimp.HORIZONTAL_ALIGN_LEFT, alignmentY: poopy.modules.Jimp.VERTICAL_ALIGN_TOP }, 202, 77)
            await yall.writeAsync(`${filepath}/yall.png`)

            var width = fileinfo.info.width
            var height = fileinfo.info.height

            var squareS = { value: ((height === width) && width) || ((height > width) && height) || width, constraint: ((height === width) && 'both') || ((height > width) && 'height') || 'width' }

            await poopy.functions.execPromise(`ffmpeg -i ${filepath}/${filename} -i ${filepath}/yall.png -i templates/transparent.png -map 0:a? -filter_complex "[2:v]scale=249:368[transparent];[0:v]scale=${squareS.constraint === 'width' || squareS.constraint === 'both' ? 368 : -1}:${squareS.constraint === 'height' || squareS.constraint === 'both' ? 368 : -1}[frame];[transparent][frame]overlay=x=W/2-w/2:y=H/2-h/2:format=auto[cframe];[1:v][cframe]overlay=x=251:y=94:format=auto[oout];[oout]scale=ceil(iw/2)*2:ceil(ih/2)*2[out]" -map "[out]" -preset ${poopy.functions.findpreset(args)} -c:v libx264 -pix_fmt yuv420p ${filepath}/output.mp4`)
            await poopy.functions.sendFile(msg, filepath, `output.mp4`)
        } else if (type.mime.startsWith('image') && poopy.vars.gifFormats.find(f => f === type.ext)) {
            var filepath = await poopy.functions.downloadFile(currenturl, `input.gif`)
            var filename = `input.gif`

            var yall = await poopy.modules.Jimp.read(`templates/yall.png`)
            var morton = await poopy.modules.Jimp.loadFont('templates/fonts/Morton/Morton.fnt')
            await yall.print(morton, 274, 8, { text: poopy.modules.Discord.Util.cleanContent(text, msg), alignmentX: poopy.modules.Jimp.HORIZONTAL_ALIGN_LEFT, alignmentY: poopy.modules.Jimp.VERTICAL_ALIGN_TOP }, 202, 77)
            await yall.writeAsync(`${filepath}/yall.png`)

            var width = fileinfo.info.width
            var height = fileinfo.info.height

            var squareS = { value: ((height === width) && width) || ((height > width) && height) || width, constraint: ((height === width) && 'both') || ((height > width) && 'height') || 'width' }

            await poopy.functions.execPromise(`ffmpeg -i ${filepath}/${filename} -i ${filepath}/yall.png -i templates/transparent.png -filter_complex "[2:v]scale=249:368[transparent];[0:v]scale=${squareS.constraint === 'width' || squareS.constraint === 'both' ? 368 : -1}:${squareS.constraint === 'height' || squareS.constraint === 'both' ? 368 : -1}[frame];[transparent][frame]overlay=x=W/2-w/2:y=H/2-h/2:format=auto[cframe];[1:v][cframe]overlay=x=251:y=94:format=auto[oout];[oout]split[pout][ppout];[ppout]palettegen=reserve_transparent=1[palette];[pout][palette]paletteuse=alpha_threshold=128[out]" -map "[out]" -preset ${poopy.functions.findpreset(args)} -gifflags -offsetting ${filepath}/output.gif`)
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
        name: 'yall/twitterartist "[text]" <file>',
        value: 'twitter artist'
    },
    cooldown: 2500,
    type: 'Memes'
}