module.exports = {
  desc: 'Returns a random file sent in the server. Requires permission for the bot to read messages within a channel.',
  func: function (msg) {
    let poopy = this
    let data = poopy.data
    let vars = poopy.vars
    let { decrypt } = poopy.functions
    
    var validFile = new RegExp(`${vars.validUrl.source}\\.(png|jpe?g|bmp|webp|gif|apng|mp4|mov|wmv|webp|avi)`)

    var messages = data.guildData[msg.guild.id]['messages'].filter(m => decrypt(m.content).match(validImage))
    var urlMessages = []
    
    for (var { ...m } of messages) {
        var urls = decrypt(m.content).match(new RegExp(validImage, 'g'))
        for (var url of urls) {
            m.content = url
            urlMessages.push({ ...m })
        }
    }
    
    return urlMessages.length ? urlMessages[Math.floor(Math.random() * urlMessages.length)].content.replace(/\@/g, '@‌') : ''
  },
  array: function (msg) {
    let poopy = this
    let data = poopy.data
    let vars = poopy.vars
    let { decrypt } = poopy.functions
    
    var validFile = new RegExp(`${vars.validUrl.source}\\.(png|jpe?g|bmp|webp|gif|apng|mp4|mov|wmv|webp|avi)`)

    var messages = data.guildData[msg.guild.id]['messages'].filter(m => decrypt(m.content).match(validImage))
    var urlMessages = []
    
    for (var { ...m } of messages) {
        var urls = decrypt(m.content).match(new RegExp(validImage, 'g'))
        for (var url of urls) {
            m.content = url
            urlMessages.push({ ...m })
        }
    }

    return urlMessages.map(m => m.content.replace(/\@/g, '@‌'))
  }
}
