module.exports = {
  helpf: '(language | code)',
  desc: 'Compiles the code in the specified language using Wandbox. Only declared variables and functions can be used here (to prevent confusion with functions in that language)',
  func: async function (matches, msg, isBot, _, opts) {
    let poopy = this

    var declopts = { ...opts }
    declopts.declaredonly = true
    var word = await poopy.functions.getKeywordsFor(matches[1], msg, isBot, declopts).catch(() => { }) ?? ''

    var language

    var cl = -1
    var codeBlock = (word.match(/```[\s\S]+```/) ?? [])[0]
    if (codeBlock) {
      var codeLang = (codeBlock.match(/```[^\n\r]+[\n\r]/) ?? [])[0]
      if (codeLang) {
        cl = codeLang.length
        language = codeLang.substring(3).trim()
      }
    }

    if (cl <= -1) {
      var split = poopy.functions.splitKeyFunc(word, { args: 2 })
      language = split[0]
      word = split[1]
    }

    if (language === undefined) return 'What is the programming language?!'

    if (codeBlock) word = word.substring(cl > -1 ? cl : 3, word.length - 3).trim()

    var langresponse = await poopy.modules.axios.get('https://wandbox.org/api/list.json').catch(() => { })
    var langVersion

    if (langresponse) {
      var languages = langresponse.data.filter((lang, index) => langresponse.data.findIndex(l => l.templates[0] === lang.templates[0]) === index).sort((a, b) => {
        if (a.templates[0] < b.templates[0]) return -1
        if (a.templates[0] > b.templates[0]) return 1
        return 0
      })

      var findLang = languages.find(lang => lang.templates[0] === language.toLowerCase())

      if (findLang) {
        langVersion = findLang.name
      } else {
        return 'Not a valid programming language.'
      }
    } else return word

    var response = await poopy.modules.axios.request({
      url: 'https://wandbox.org/api/compile.ndjson',
      method: 'POST',
      data: {
        code: word,
        codes: [],
        compiler: langVersion,
        'compiler-option-raw': "",
        description: "",
        options: "",
        'runtime-option-raw': "",
        stdin: "",
        title: ""
      }
    }).catch(async () => { })

    if (!response) return word

    var jsons = response.data.trim().split('\n').map(json => JSON.parse(json))

    var stdOut = jsons.find(json => json.type === 'StdOut')
    var stdErr = jsons.find(json => json.type === 'StdErr')
    var output

    if (stdOut && stdErr) output = `StdOut: ${stdOut.data}\n\nStdErr: ${stdErr.data}`
    else output = (stdOut ?? stdErr) ? (stdOut ?? stdErr).data : 'No output.'

    return output
  },
  attemptvalue: 100,
  limit: 1,
  raw: true,
  parentheses: true
}