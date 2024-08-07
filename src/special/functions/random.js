module.exports = {
  helpf: '(min | max)',
  desc: 'Returns a random number between min and max.',
  func: function (matches) {
    let poopy = this
    let { splitKeyFunc } = poopy.functions

    var word = matches[1]
    var split = splitKeyFunc(word, { args: 2 })
    if (split.length <= 1 && split[0] == '') return Math.random()
    var min = Math.round(Number(split[0])) || 0
    var max = Math.round(Number(split[1])) || 0
    return Math.floor(Math.random() * (max + 1 - min)) + min
  }
}