module.exports = {
    name: ['frames', 'extractframes', 'getframes'],
    args: [{"name":"file","required":false,"specifarg":false,"orig":"{file}"}],
    execute: async function (msg, args) {
        let poopy = this
        let { lastUrl, validateFile, downloadFile, execPromise, navigateEmbed, sendFile } = poopy.functions
        let vars = poopy.vars
        let { fs, archiver } = poopy.modules
        let config = poopy.config
        let bot = poopy.bot

        await msg.channel.sendTyping().catch(() => { })
        if (lastUrl(msg, 0) === undefined && args[1] === undefined) {
            await msg.reply('What is the file?!').catch(() => { })
            await msg.channel.sendTyping().catch(() => { })
            return;
        };
        var currenturl = lastUrl(msg, 0) || args[1]
        var fileinfo = await validateFile(currenturl).catch(async error => {
            await msg.reply(error).catch(() => { })
            await msg.channel.sendTyping().catch(() => { })
            return;
        })

        if (!fileinfo) return
        var type = fileinfo.type

        if (type.mime.startsWith('video') || (type.mime.startsWith('image') && vars.gifFormats.find(f => f === type.ext))) {
            var filepath = await downloadFile(currenturl, `input.${fileinfo.shortext}`, {
                fileinfo: fileinfo
            })
            var filename = `input.${fileinfo.shortext}`
            fs.mkdirSync(`${filepath}/frames`)

            await execPromise(`ffmpeg -i ${filepath}/${filename} ${filepath}/frames/frame_%04d.png`)
            var output = fs.createWriteStream(`${filepath}/output.zip`)
            var archive = archiver('zip')

            await new Promise(async resolve => {
                output.on('finish', async () => {
                    var frames = fs.readdirSync(`${filepath}/frames`)
                    var catboxframes = {}
    
                    await navigateEmbed(msg.channel, async (page, ended) => {
                        var frameurl = ended ? await vars.Catbox.upload(`${filepath}/frames/${frames[page - 1]}`).catch(() => { }) : catboxframes[frames[page - 1]]
    
                        if (!frameurl && !ended) {
                            frameurl = await vars.Litterbox.upload(`${filepath}/frames/${frames[page - 1]}`).catch(() => { }) ?? ''
                            catboxframes[frames[page - 1]] = frameurl
                        }
    
                        if (config.textEmbeds) return `${frameurl}\n\nFrame ${page}/${frames.length}`
                        else return {
                            "title": fileinfo.name,
                            "url": currenturl,
                            "color": 0x472604,
                            "image": {
                                "url": frameurl
                            },
                            "footer": {
                                "icon_url": bot.user.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }),
                                "text": `Frame ${page}/${frames.length}`
                            },
                        }
                    }, frames.length, msg.member, [
                        {
                            emoji: '939523064658526278',
                            reactemoji: '⏬',
                            customid: 'zip',
                            style: 'PRIMARY',
                            function: async (_, __, resultsMsg, collector) => {
                                collector.stop()
                                resultsMsg.delete().catch(() => { })
                                sendFile(msg, filepath, `output.zip`)
                            },
                            page: false
                        }
                    ], undefined, undefined, undefined, (reason) => {
                        if (reason == 'time') fs.rmSync(filepath, { force: true, recursive: true })
                    }, msg)
                    resolve()
                });
    
                archive.pipe(output)
                archive.directory(`${filepath}/frames`, false)
                archive.finalize()
            })
        } else {
            await msg.reply({
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
        name: 'frames/extractframes/getframes {file}',
        value: 'Extracts all of the frames in the video/GIF and archives them in a ZIP file.'
    },
    cooldown: 2500,
    type: 'Conversion'
}