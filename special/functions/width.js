module.exports = {
  helpf: '(url)',
  desc: 'Fetches and returns the width of the specified file.',
  func: async function (matches) {
    let poopy = this

    var word = matches[1]

    var error
    var fileinfo = await poopy.functions.validateFile(word, 'very true').catch(err => {
      error = err
    })
    if (error) return error

    return fileinfo.info.width
  }
}