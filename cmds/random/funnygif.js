module.exports = {
  name: ['funnygif', 'memegif'],
  args: [],
  execute: async function (msg) {
    let poopy = this

    await msg.channel.send(poopy.special.keys._funnygif.func.call(poopy)).catch(() => { })
  },
  help: {
    name: 'funnygif/memegif',
    value: 'Sends a random funny GIF to the channel.'
  },
  cooldown: 2500,
  type: 'Random'
}