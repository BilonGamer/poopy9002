module.exports = {
    name: ['setstatus', 'ss'],
    execute: async function (msg, args, opts) {
        let poopy = this

        var ownerid = poopy.config.ownerids.find(id => id == msg.author.id);
        if (ownerid === undefined && !opts.ownermode) {
            await msg.channel.send('Owner only!').catch(() => { })
            return
        }
        else {
            if (args[1] === undefined && args[2] === undefined && args[3] === undefined) {
                await msg.channel.send('Where are the arguments?!').catch(() => { })
                return;
            }
            else if (args[2] === undefined && args[3] === undefined) {
                await msg.channel.send('What is the status type?! (Available: **PLAYING**, **LISTENING**, **WATCHING**, **STREAMING**, **COMPETING**)').catch(() => { })
                return;
            }
            else if (args[3] === undefined) {
                await msg.channel.send('What is the status message?!').catch(() => { })
                return;
            }
            if (args[1] === 'false' || args[1] === 'true') {
                if (args[2] === 'PLAYING' || args[2] === 'LISTENING' || args[2] === 'WATCHING' || args[2] === 'STREAMING' || args[2] === 'COMPETING') {
                    var saidMessage = args.slice(3).join(' ')
                    await msg.channel.sendTyping().catch(() => { })
                    poopy.functions.infoPost(`Status changed to ${args[2].toLowerCase() + ' ' + ((args[2] === "COMPETING" && 'in ') || (args[2] === "LISTENING" && 'to ') || '') + saidMessage}`)
                    poopy.bot.user.setPresence({
                        status: 'online',
                        activities: [
                            {
                                name: saidMessage + ` | ${poopy.config.globalPrefix}help`,
                                type: args[2],
                                url: 'https://www.youtube.com/watch?v=LDQO0ALm0gE'
                            }
                        ],
                    });
                    poopy.vars.statusChanges = args[1];
                    await msg.channel.send({
                        content: 'Poopy\'s status set to: **' + saidMessage + ' (' + args[2] + ')**',
                        allowedMentions: {
                            parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                        }
                    }).catch(() => { })
                    await msg.channel.sendTyping().catch(() => { })
                }
                else {
                    await msg.channel.send({
                        content: 'Invalid status type: **' + args[2] + '** (Available: **PLAYING**, **LISTENING**, **WATCHING**, **STREAMING**, **COMPETING**)',
                        allowedMentions: {
                            parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
                        }
                    }).catch(() => { })
                    await msg.channel.sendTyping().catch(() => { })
                }
            }
            else {
                await msg.channel.send('Specify a valid value! (**false** or **true**)').catch(() => { })
                return;
            }
        };
    },
    help: {
        name: 'setstatus/ss <changes? (false or true)> <type (STREAMING, WATCHING, PLAYING, LISTENING or COMPETING)> <statusMessage>',
        value: 'Allows Poopy to have a custom status.\n' +
            'Example usage: p:setstatus false STREAMING you, idiot.'
    },
    cooldown: 2500,
    type: 'Owner'
}