module.exports = {
    name: ['chainpunch'],
    args: [{
        "name": "subject", "required": true, "specifarg": false, "orig": "<subject>",
        "autocomplete": function (interaction) {
            let poopy = this

            var memberData = poopy.data.guildData[interaction.guild.id]['allMembers']
            var memberKeys = Object.keys(memberData).sort((a, b) => memberData[b].messages - memberData[a].messages)

            return memberKeys.map(id => {
                return { name: memberData[id].username, value: id }
            })
        }
    }],
    execute: async function (msg, args) {
        let poopy = this
        let { battle } = poopy.functions
        var action = '**{src}** chain punched **{trgt}**! It did **{dmg}** damage!'
        var damage = Math.round(Math.random() * 18) + 6 // from 6 to 24
        var chance = 1 / 3

        return await battle(msg, args.slice(1).join(' '), action, damage, chance)
    },
    help: {
        name: 'chainpunch <subject>',
        value: 'Chain punch something! Does random damage, and has a pretty high chance to miss.'
    },
    type: 'Battling'
}