module.exports = {
    name: ['jumpscare', 'fnaf'],
    args: [{"name":"file","required":false,"specifarg":false},{"name":"zoomtime","required":false,"specifarg":true},{"name":"zoomsize","required":false,"specifarg":true}],
    execute: async function (msg, args) {
        let poopy = this

        await msg.channel.sendTyping().catch(() => { })
        if (poopy.functions.lastUrl(msg, 0) === undefined && args[1] === undefined) {
            await msg.channel.send('What is the file?!').catch(() => { })
            await msg.channel.sendTyping().catch(() => { })
            return;
        };
        var zoomsize = 1
        var zoomsindex = args.indexOf('-zoomsize')
        if (zoomsindex > -1) {
            zoomsize = isNaN(Number(args[zoomsindex + 1])) ? 1 : Number(args[zoomsindex + 1]) <= 0.05 ? 0.05 : Number(args[zoomsindex + 1]) || 1
        }
        var zoomtime = 0.25
        var zoomtindex = args.indexOf('-zoomtime')
        if (zoomtindex > -1) {
            zoomtime = isNaN(Number(args[zoomtindex + 1])) ? 1 : Number(args[zoomtindex + 1]) <= 0.05 ? 0.05 : Number(args[zoomtindex + 1]) || 1
        }
        var currenturl = poopy.functions.lastUrl(msg, 0) || args[1]
        var fileinfo = await poopy.functions.validateFile(currenturl).catch(async error => {
            await msg.channel.send(error).catch(() => { })
            await msg.channel.sendTyping().catch(() => { })
            return;
        })

        if (!fileinfo) return
        var type = fileinfo.type

        if (type.mime.startsWith('video') || (type.mime.startsWith('image'))) {
            var filepath = await poopy.functions.downloadFile(currenturl, `input.${fileinfo.shortext}`, {
                fileinfo: fileinfo
            })
            var filename = `input.${fileinfo.shortext}`
            var width = fileinfo.info.width
            var height = fileinfo.info.height

            await poopy.functions.execPromise(`ffmpeg -stream_loop -1 -t ${zoomtime} -i ${filepath}/${filename} -f lavfi -stream_loop -1 -t ${zoomtime} -r 50 -i "color=0x00000000:s=${width}x${height},format=rgba" -filter_complex "[0:v]fps=50,scale=${width}*(t/${zoomtime})*${zoomsize}:${height}*(t/${zoomtime})*${zoomsize}:eval=frame[overlay];[1:v][overlay]overlay=x=(W-w)/2:y=(H-h)/2:format=auto,scale='min(400,iw)':min'(400,ih)':force_original_aspect_ratio=decrease,split[pout][ppout];[ppout]palettegen=reserve_transparent=1[palette];[pout][palette]paletteuse=alpha_threshold=128[out]" -map "[out]" -preset ${poopy.functions.findpreset(args)} -y -shortest -gifflags -offsetting ${filepath}/output.gif`)
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
        name: 'jumpscare/fnaf {file} [-zoomtime <seconds>] [-zoomsize <multiplier>]',
        value: 'five nights. Default time is 0.25 and size is 1.'
    },
    cooldown: 2500,
    type: 'Animation'
}