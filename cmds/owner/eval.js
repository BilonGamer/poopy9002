module.exports = {
    name: ['eval', 'execute'],
    args: [{ "name": "code", "required": false, "specifarg": false, "orig": "{code}" }],
    execute: async function (msg, args, opts) {
        let poopy = this
        let config = poopy.config
        let tempdata = poopy.tempdata
        let { util } = poopy.modules

        var ownerid = (config.ownerids.find(id => id == msg.author.id));
        if (ownerid === undefined && !opts.ownermode) {
            await msg.reply('Owner only!').catch(() => { })
            return
        }
        var saidMessage = args.slice(1).join(' ')
        var no = config.illKillYouIfYouUseEval.find(id => id === msg.guild.id || saidMessage.includes(id))
        if (no) {
            await msg.reply('<:YouIdiot:735259116737658890>').catch(() => { })
            return
        }
        try {
            var evalMessage
            with (poopy) {
                evalMessage = await eval(saidMessage)
            }

            if (typeof (evalMessage) !== 'string') evalMessage = util.inspect(evalMessage)

            evalMessage = evalMessage.match(/[\s\S]{1,2000}/g)

            for (var i in evalMessage) {
                if (tempdata[msg.guild.id][msg.channel.id]['shut']) break
                var ev = evalMessage[i]
                await msg.reply({
                    content: ev,
                    allowedMentions: {
                        parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                    }
                }).catch(async () => {
                    await msg.reply('​').catch(() => { })
                    return
                })
            }
        } catch (error) {
            await msg.reply({
                content: error.message,
                allowedMentions: {
                    parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                }
            }).catch(() => { })
            return
        }
    },
    help: {
        name: 'eval/execute {code}',
        value: 'Evaluation command. (pretty much execute the code you want)'
    },
    raw: true,
    type: 'Owner'
}