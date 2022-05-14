module.exports = {
    name: ['destroy', 'kill', 'shutdown'],
    execute: async function (msg) {
        let poopy = this

        var ownerid = poopy.config.ownerids.find(id => id == msg.author.id);
        if (ownerid === undefined) {
            await msg.channel.send('Owner only!').catch(() => { })
            return
        } else {
            await msg.channel.send('The salami lid').catch(() => { })
            await poopy.destroy()
            if (poopy.config.quitOnDestroy) process.exit()
        };
    },
    help: { name: 'destroy/kill/shutdown', value: 'Causes Poopy to shutdown.' },
    type: 'Owner'
}