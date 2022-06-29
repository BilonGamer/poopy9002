module.exports = {
  desc: 'Returns a random message from the server. Requires permission for the bot to read messages within a channel.',
  func: function (msg) {
    let poopy = this

    var messages = poopy.data['guild-data'][msg.guild.id]['messages']
    return messages.length ? messages[Math.floor(Math.random() * messages.length)].content.replace(/\@/g, '@‌') : ''
  }
}