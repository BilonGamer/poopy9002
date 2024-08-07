module.exports = {
  helpf: '(phrase1 | phrase2 | phrase3 | etc...)',
  desc: 'Returns the last phrase if none are blank.',
  func: function (matches) {
    let poopy = this
    let { splitKeyFunc } = poopy.functions

    var word = matches[1]
    var split = splitKeyFunc(word)
    var and = ''
    for (var i in split) {
      var phrase = split[i]
      if (!phrase) return ''
      else and = phrase
    }
    return and
  }
}