module.exports = {
    name: ['fileinfo'],
    execute: async function (msg, args) {
        let poopy = this

        msg.channel.sendTyping().catch(() => { })
        if (poopy.data['guild-data'][msg.guild.id]['channels'][msg.channel.id]['lastUrl'] === undefined && args[4] === undefined) {
            msg.channel.send('What is the file?!').catch(() => { })
            msg.channel.sendTyping().catch(() => { })
            return;
        };
        var currenturl = poopy.data['guild-data'][msg.guild.id]['channels'][msg.channel.id]['lastUrl']
        var fileinfo = await poopy.functions.validateFile(currenturl, 'very true').catch(error => {
            msg.channel.send(error)
            msg.channel.sendTyping().catch(() => { })
            return;
        })

        if (!fileinfo) return
        var type = fileinfo.type

        var jsoninfo = {}
        var formattedSize = poopy.modules.prettyBytes(fileinfo.info.realsize)
        var size = `${formattedSize}${formattedSize.endsWith(' B') ? '' : ` (${fileinfo.info.realsize} B)`}`
        var params = [
            `**File Size**: ${size}`,
            `**Format**: ${type.ext}`,
            `**Mime**: ${type.mime}`
        ]
        var paramFunctions

        var json = await poopy.functions.execPromise(`ffprobe -of json -show_streams -show_format "${currenturl}"`)
        if (json) {
            jsoninfo = JSON.parse(json)
        }

        if (jsoninfo["streams"]) {
            if (type.mime.startsWith('image') && !(poopy.vars.gifFormats.find(f => f === type.ext))) {
                var videoStream = jsoninfo["streams"].find(stream => stream["codec_type"] === 'video')

                if (videoStream) {
                    paramFunctions = [
                        function () {
                            if (videoStream["width"] && videoStream["height"]) {
                                params.push(`**Scale**: ${videoStream["width"]}x${videoStream["height"]}`)
                            }
                        },
                        function () {
                            if (videoStream["sample_aspect_ratio"]) {
                                params.push(`**Sample Aspect Ratio**: ${videoStream["sample_aspect_ratio"]}`)
                            }
                        },
                        function () {
                            if (videoStream["display_aspect_ratio"]) {
                                params.push(`**Display Aspect Ratio**: ${videoStream["display_aspect_ratio"]}`)
                            }
                        },
                        function () {
                            if (videoStream["codec_name"] && videoStream["codec_long_name"]) {
                                params.push(`**Codec**: ${videoStream["codec_name"]} (${videoStream["codec_long_name"]})`)
                            }
                        },
                        function () {
                            if (videoStream["pix_fmt"]) {
                                params.push(`**Pixel Format**: ${videoStream["pix_fmt"]}`)
                            }
                        }
                    ]
                }
            } else if (type.mime.startsWith('video')) {
                var videoStream = jsoninfo["streams"].find(stream => stream["codec_type"] === 'video')
                var audioStream = jsoninfo["streams"].find(stream => stream["codec_type"] === 'audio')

                if (videoStream) {
                    paramFunctions = [
                        function () {
                            if (videoStream["width"] && videoStream["height"]) {
                                params.push(`**Scale**: ${videoStream["width"]}x${videoStream["height"]}`)
                            }
                        },
                        function () {
                            if (videoStream["sample_aspect_ratio"]) {
                                params.push(`**Sample Aspect Ratio**: ${videoStream["sample_aspect_ratio"]}`)
                            }
                        },
                        function () {
                            if (videoStream["display_aspect_ratio"]) {
                                params.push(`**Display Aspect Ratio**: ${videoStream["display_aspect_ratio"]}`)
                            }
                        },
                        function () {
                            if (videoStream["duration"]) {
                                var totalSeconds = videoStream["duration"]
                                var days = Math.floor(totalSeconds / 86400);
                                totalSeconds %= 86400;
                                var hours = Math.floor(totalSeconds / 3600);
                                totalSeconds %= 3600;
                                var minutes = Math.floor(totalSeconds / 60);
                                var seconds = totalSeconds % 60
                                var times = []

                                if (days) times.push(days)
                                if (hours) times.push(hours)
                                if (minutes) times.push(minutes)
                                if (seconds) times.push(seconds)

                                params.push(`**Video Duration**: ${times.join(':')}`)
                            }
                        },
                        function () {
                            if (audioStream) {
                                if (audioStream["duration"]) {
                                    var totalSeconds = audioStream["duration"]
                                    var days = Math.floor(totalSeconds / 86400);
                                    totalSeconds %= 86400;
                                    var hours = Math.floor(totalSeconds / 3600);
                                    totalSeconds %= 3600;
                                    var minutes = Math.floor(totalSeconds / 60);
                                    var seconds = totalSeconds % 60
                                    var times = []

                                    if (days) times.push(days)
                                    if (hours) times.push(hours)
                                    if (minutes) times.push(minutes)
                                    if (seconds) times.push(seconds)

                                    params.push(`**Audio Duration**: ${times.join(':')}`)
                                }
                            }
                        },
                        function () {
                            if (videoStream["nb_frames"]) {
                                params.push(`**Frames**: ${videoStream["nb_frames"]}`)
                            }
                        },
                        function () {
                            if (videoStream["r_frame_rate"]) {
                                params.push(`**Framerate**: ${videoStream["r_frame_rate"]}`)
                            }
                        },
                        function () {
                            if (audioStream) {
                                if (audioStream["sample_rate"]) {
                                    params.push(`**Audio Rate**: ${audioStream["sample_rate"]}`)
                                }
                            }
                        },
                        function () {
                            if (videoStream["codec_name"] && videoStream["codec_long_name"]) {
                                params.push(`**Video Codec**: ${videoStream["codec_name"]} (${videoStream["codec_long_name"]})`)
                            }
                        },
                        function () {
                            if (audioStream) {
                                if (audioStream["codec_name"] && audioStream["codec_long_name"]) {
                                    params.push(`**Audio Codec**: ${audioStream["codec_name"]} (${audioStream["codec_long_name"]})`)
                                }
                            }
                        },
                        function () {
                            if (videoStream["bit_rate"]) {
                                params.push(`**Video Bitrate**: ${videoStream["bit_rate"]}`)
                            }
                        },
                        function () {
                            if (audioStream) {
                                if (audioStream["bit_rate"]) {
                                    params.push(`**Audio Bitrate**: ${audioStream["bit_rate"]}`)
                                }
                            }
                        },
                        function () {
                            if (videoStream["pix_fmt"]) {
                                params.push(`**Pixel Format**: ${videoStream["pix_fmt"]}`)
                            }
                        }
                    ]
                }
            } else if (type.mime.startsWith('image') && poopy.vars.gifFormats.find(f => f === type.ext)) {
                var videoStream = jsoninfo["streams"].find(stream => stream["codec_type"] === 'video')

                if (videoStream) {
                    paramFunctions = [
                        function () {
                            if (videoStream["width"] && videoStream["height"]) {
                                params.push(`**Scale**: ${videoStream["width"]}x${videoStream["height"]}`)
                            }
                        },
                        function () {
                            if (videoStream["sample_aspect_ratio"]) {
                                params.push(`**Sample Aspect Ratio**: ${videoStream["sample_aspect_ratio"]}`)
                            }
                        },
                        function () {
                            if (videoStream["display_aspect_ratio"]) {
                                params.push(`**Display Aspect Ratio**: ${videoStream["display_aspect_ratio"]}`)
                            }
                        },
                        function () {
                            if (videoStream["duration"]) {
                                var totalSeconds = videoStream["duration"]
                                var days = Math.floor(totalSeconds / 86400);
                                totalSeconds %= 86400;
                                var hours = Math.floor(totalSeconds / 3600);
                                totalSeconds %= 3600;
                                var minutes = Math.floor(totalSeconds / 60);
                                var seconds = totalSeconds % 60
                                var times = []

                                if (days) times.push(days)
                                if (hours) times.push(hours)
                                if (minutes) times.push(minutes)
                                if (seconds) times.push(seconds)

                                params.push(`**Duration**: ${times.join(':')}`)
                            }
                        },
                        function () {
                            if (videoStream["nb_frames"]) {
                                params.push(`**Frames**: ${videoStream["nb_frames"]}`)
                            }
                        },
                        function () {
                            if (videoStream["r_frame_rate"]) {
                                params.push(`**Framerate**: ${videoStream["r_frame_rate"]}`)
                            }
                        },
                        function () {
                            if (videoStream["codec_name"] && videoStream["codec_long_name"]) {
                                params.push(`**Codec**: ${videoStream["codec_name"]} (${videoStream["codec_long_name"]})`)
                            }
                        },
                        function () {
                            if (videoStream["pix_fmt"]) {
                                params.push(`**Pixel Format**: ${videoStream["pix_fmt"]}`)
                            }
                        }
                    ]
                }
            } else if (type.mime.startsWith('audio')) {
                var audioStream = jsoninfo["streams"].find(stream => stream["codec_type"] === 'audio')

                if (audioStream) {
                    paramFunctions = [
                        function () {
                            if (audioStream["duration"]) {
                                var totalSeconds = audioStream["duration"]
                                var days = Math.floor(totalSeconds / 86400);
                                totalSeconds %= 86400;
                                var hours = Math.floor(totalSeconds / 3600);
                                totalSeconds %= 3600;
                                var minutes = Math.floor(totalSeconds / 60);
                                var seconds = totalSeconds % 60
                                var times = []

                                if (days) times.push(days)
                                if (hours) times.push(hours)
                                if (minutes) times.push(minutes)
                                if (seconds) times.push(seconds)

                                params.push(`**Duration**: ${times.join(':')}`)
                            }
                        },
                        function () {
                            if (audioStream["sample_rate"]) {
                                params.push(`**Rate**: ${audioStream["sample_rate"]}`)
                            }
                        },
                        function () {
                            if (audioStream["codec_name"] && audioStream["codec_long_name"]) {
                                params.push(`**Codec**: ${audioStream["codec_name"]} (${audioStream["codec_long_name"]})`)
                            }
                        },
                        function () {
                            if (audioStream["bit_rate"]) {
                                params.push(`**Bitrate**: ${audioStream["bit_rate"]}`)
                            }
                        }
                    ]
                }
            }
        }

        for (var i in paramFunctions) {
            paramFunctions[i]()
        }

        var embed = {
            "title": fileinfo.name,
            "description": params.join('\n'),
            "url": currenturl,
            "color": 0x472604,
            "footer": {
                "icon_url": poopy.bot.user.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }),
                "text": poopy.bot.user.username
            },
            "thumbnail": {
                "url": currenturl
            }
        }

        if (poopy.config.textEmbeds) msg.channel.send({
            content: `\`${fileinfo.name}\`\n\n${params.join('\n')}`,
            allowedMentions: {
                parse: (!msg.member.permissions.has('ADMINISTRATOR') &&
                    !msg.member.permissions.has('MENTION_EVERYONE') &&
                    msg.author.id !== msg.guild.ownerID) ?
                    ['users'] : ['users', 'everyone', 'roles']
            }
        }).catch(() => { })
        else msg.channel.send({
            embeds: [embed]
        }).catch(() => { })
    },
    help: { name: 'fileinfo <file>', value: 'Get info on a file.' },
    cooldown: 2500,
    type: 'Main'
}