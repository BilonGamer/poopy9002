module.exports = {
    helpf: '(url | name)',
    desc: 'Sends the file with that URL to the channel. Has the default cooldown of course.',
    func: async function (matches, msg, isBot) {
        let poopy = this
        let { splitKeyFunc, validateFile, downloadFile, sendFile } = poopy.functions
        let globaldata = poopy.globaldata
        let { axios } = poopy.modules
        let tempdata = poopy.tempdata
        let data = poopy.data
        let config = poopy.config

        var word = matches[1]
        var split = splitKeyFunc(word, { args: 2 })
        var url = split[0]
        var name = split[1]
        
        if (!url || !(await axios.get(url).catch(() => { }))) return word

        if (tempdata[msg.guild.id][msg.channel.id]['shut']) return ''

        if (globaldata['bot-data']['shit'].find(id => id === msg.author.id)) return 'shit'

        if (data['guild-data'][msg.guild.id]['members'][msg.author.id]['coolDown']) {
            if ((data['guild-data'][msg.guild.id]['members'][msg.author.id]['coolDown'] - Date.now()) > 0 &&
                tempdata[msg.author.id]['cooler'] !== msg.id) {
                return `Calm down! Wait more ${(data['guild-data'][msg.guild.id]['members'][msg.author.id]['coolDown'] - Date.now()) / 1000} seconds.`
            } else {
                data['guild-data'][msg.guild.id]['members'][msg.author.id]['coolDown'] = false
            }
        }

        tempdata[msg.author.id]['cooler'] = msg.id
        
        if (tempdata[msg.author.id][msg.id]['execCount'] >= 1 && data['guild-data'][msg.guild.id]['chaincommands'] == false && !(msg.member.permissions.has('MANAGE_GUILD') || msg.member.permissions.has('MANAGE_MESSAGES') || msg.member.permissions.has('ADMINISTRATOR') || msg.author.id === msg.guild.ownerID || isBot)) return 'You can\'t chain commands in this server.'
        if (tempdata[msg.author.id][msg.id]['execCount'] >= config.commandLimit * ((msg.member.permissions.has('MANAGE_GUILD') || msg.member.permissions.has('MANAGE_MESSAGES') || msg.member.permissions.has('ADMINISTRATOR') || msg.author.id === msg.guild.ownerID || isBot) ? 5 : 1)) return `Number of commands to run at the same time must be smaller or equal to **${config.commandLimit * ((msg.member.permissions.has('MANAGE_GUILD') || msg.member.permissions.has('MANAGE_MESSAGES') || msg.member.permissions.has('ADMINISTRATOR') || msg.author.id === msg.guild.ownerID || isBot) ? 5 : 1)}**!`
        tempdata[msg.author.id][msg.id]['execCount']++
        
        data['guild-data'][msg.guild.id]['members'][msg.author.id]['coolDown'] = (data['guild-data'][msg.guild.id]['members'][msg.author.id]['coolDown'] || Date.now()) + 2500 / ((msg.member.permissions.has('MANAGE_GUILD') || msg.member.permissions.has('MANAGE_MESSAGES') || msg.member.permissions.has('ADMINISTRATOR') || msg.author.id === msg.guild.ownerID) ? 5 : 1)

        var fileinfo = await validateFile(url, 'very true').catch(() => { })
        if (!fileinfo) return word
        var filepath = await downloadFile(fileinfo.buffer, fileinfo.name, { buffer: true })
        await sendFile(msg, filepath, fileinfo.name, { name: name || fileinfo.name })

        return ''
    },
    attemptvalue: 10,
    limit: 5
}