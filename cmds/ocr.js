module.exports = {
    name: ['ocr', 'recognizetext'],
    execute: async function (msg, args) {
        let poopy = this

        async function ocr(msg, url) {
            var options = {
                method: 'POST',
                url: 'https://microsoft-computer-vision3.p.rapidapi.com/ocr',
                params: { detectOrientation: 'true', language: 'unk' },
                headers: {
                    'content-type': 'application/json',
                    'x-rapidapi-host': 'microsoft-computer-vision3.p.rapidapi.com',
                    'x-rapidapi-key': poopy.functions.randomKey('RAPIDAPIKEY')
                },
                data: {
                    url: url
                }
            }

            var response = await poopy.modules.axios.request(options).catch(async () => {
                await msg.channel.send('Error.').catch(() => { })
            })

            if (!response) return

            if (!(response.status >= 200 && response.status < 300)) {
                await msg.channel.send(`${response.status} ${response.statusText}`).catch(() => { })
                return
            }

            var body = response.data
            var regions = body.regions

            if (regions.length <= 0) {
                await msg.channel.send(`No text detected.`).catch(() => { })
                return
            }

            var result = regions.map(region => region.lines.map(line => line.words.map(word => word.text).join(' ')).join('\n')).join('\n\n')

            await msg.channel.send({
                content: `Language: \`${body.language}\`\n\`\`\`\n${result}\n\`\`\``,
                allowedMentions: {
                    parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                }
            }).catch(async () => {
                var currentcount = poopy.vars.filecount
                poopy.vars.filecount++
                var filepath = `temp/${poopy.config.mongodatabase}/file${currentcount}`
                poopy.modules.fs.mkdirSync(`${filepath}`)
                poopy.modules.fs.writeFileSync(`${filepath}/ocr.txt`, result)
                await msg.channel.send({
                    content: `Language: \`${body.language}\``,
                    files: [new poopy.modules.Discord.MessageAttachment(`${filepath}/ocr.txt`)]
                }).catch(() => { })
                poopy.modules.fs.rmSync(`${filepath}`, { force: true, recursive: true })
            })
        }

        await msg.channel.sendTyping().catch(() => { })
        if (poopy.data['guild-data'][msg.guild.id]['channels'][msg.channel.id]['lastUrl'] === undefined && args[1] === undefined) {
            await msg.channel.send('What is the file to recognize?!').catch(() => { })
            await msg.channel.sendTyping().catch(() => { })
            return;
        };
        var currenturl = poopy.data['guild-data'][msg.guild.id]['channels'][msg.channel.id]['lastUrl'] || args[1]
        var fileinfo = await poopy.functions.validateFile(currenturl).catch(async error => {
            await msg.channel.send(error).catch(() => { })
            await msg.channel.sendTyping().catch(() => { })
            return;
        })

        if (!fileinfo) return
        var type = fileinfo.type

        if (type.mime.startsWith('image')) {
            await ocr(msg, currenturl).catch(() => { })
        } /*else if (type.mime.startsWith('video')) {
                    var currentcount = poopy.vars.filecount
                    poopy.vars.filecount++
                    var filepath = `temp/${poopy.config.mongodatabase}/file${currentcount}`
                    poopy.modules.fs.mkdirSync(`${filepath}`)
                    await poopy.functions.execPromise(`ffmpeg -i "${currenturl}" -vframes 1 ${filepath}/output.png`)
                    await ocr(msg, `${filepath}/output.png`, `${filepath}`)
                }*/ else {
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
        name: 'ocr/recognizetext <file>',
        value: "Recognizes text within an image with Microsoft's Computer Vision."
    },
    cooldown: 2500,
    type: 'Text'
}