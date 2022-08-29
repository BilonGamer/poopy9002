module.exports = {
    name: ['poopallover'],
    args: [{"name":"subject","required":true,"specifarg":false,"orig":"<subject>"}],
    execute: async function (msg, args) {
        let poopy = this
        let { Discord } = poopy.modules

        await msg.channel.sendTyping().catch(() => { })
        var saidMessage = args.slice(1).join(' ')
        var attachments = []
        msg.attachments.forEach(attachment => {
            attachments.push(new Discord.MessageAttachment(attachment.url))
        });
        if (args[1] === undefined && attachments.length <= 0) {
            await msg.reply('What/who is the subject?!').catch(() => { })
            await msg.channel.sendTyping().catch(() => { })
            return;
        };
        await msg.reply({
            content: '**' + (saidMessage || 'this') + '** has been successfully pooped on.',
            allowedMentions: {
                parse: ((!msg.member.permissions.has('ADMINISTRATOR') && !msg.member.permissions.has('MENTION_EVERYONE') && msg.author.id !== msg.guild.ownerID) && ['users']) || ['users', 'everyone', 'roles']
            },
            files: attachments
        }).catch(() => { })
        await msg.channel.sendTyping().catch(() => { })
    },
    help: { name: 'poopallover <subject>', value: 'Poop on something.' },
    type: 'OG'
}