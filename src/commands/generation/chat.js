module.exports = {
    name: ['chat', 'ask'],
    args: [
        {
            "name": "message", "required": true, "specifarg": false, "orig": "<message>"
        },
        {
            "name": "temperature", "required": false, "specifarg": true, "orig": "[-temperature <number (from 0 to 1)>]"
        },
        {
            "name": "instruct", "required": false, "specifarg": true, "orig": "[-instruct <prompt>]"
        },
    ],
    execute: async function (msg, args) {
        let poopy = this
        let { getOption, parseNumber, userToken } = poopy.functions
        let { axios, fs, Discord } = poopy.modules
        let vars = poopy.vars
        let config = poopy.config

        await msg.channel.sendTyping().catch(() => { })

        var temperature = getOption(args, 'temperature', { dft: 0.6, splice: true, n: 1, join: true, func: (opt) => parseNumber(opt, { dft: 0.6, min: 0, max: 1, round: false }) })
        var instruct = getOption(args, 'instruct', { dft: "", splice: true, n: Infinity, join: true })
        var saidMessage = args.slice(1).join(' ')
        if (args[1] === undefined) {
            await msg.reply('What is the text to generate?!').catch(() => { })
            await msg.channel.sendTyping().catch(() => { })
            return
        }
        var resp = await axios({
            url: `https://api.ai21.com/studio/v1/chat/completions`,
            method: 'POST',
            data: {
                model: "jamba-instruct",
                messages: [
                    {
                        role: "system",
                        content: instruct,
                    },
                    {
                        role: "user",
                        content: saidMessage,
                    },
                ],
                temperature: temperature,
                top_p: 1,
            },
            headers: {
                Authorization: `Bearer ${userToken(msg.author.id, 'AI21_KEY')}`
            }
        }).catch(() => { })

        if (resp) {
            if (!msg.nosend) await msg.reply({
                content: resp.data.choices[0].message.content,
                allowedMentions: {
                    parse: ((!msg.member.permissions.has('Administrator') && !msg.member.permissions.has('MentionEveryone') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                }
            }).catch(async () => {
                var currentcount = vars.filecount
                vars.filecount++
                var filepath = `temp/${config.database}/file${currentcount}`
                fs.mkdirSync(`${filepath}`)
                fs.writeFileSync(`${filepath}/generated.txt`, resp.data.choices[0].message.content)
                await msg.reply({
                    files: [new Discord.AttachmentBuilder(`${filepath}/generated.txt`)]
                }).catch(() => { })
                fs.rmSync(`${filepath}`, { force: true, recursive: true })
            })
            return resp.data.choices[0].message.content
        }
    },
    help: {
        name: 'chat/ask <message> [-temperature <number (from 0 to 1)>] [-instruct <prompt>]',
        value: 'Generates an answer based on your prompt using AI21. Default temperature is 1.'
    },
    type: 'Generation',
    envRequired: ['AI21_KEY']
}
