module.exports = {
  desc: 'Returns a random known Phexonia Studios member.',
  func: function () {
    let poopy = this

    var members = [
      "tenda",
      "another",
      "bubbley",
      "avery",
      "deinx",
      "bilon",
      "babis",
      "empsy",
      "gritzy",
      "ballfish",
      "meatwad",
      "tuca",
      "raleigh",
      "spooky",
      "spellbunny",
      "fnepp",
      "concern",
      "barte",
      "betteruser",
      "lead",
      "phexonia",
      "deinbag",
      "hiro",
      "superbrohouse",
      "sayori",
      "tree",
      "agnook",
      "ennakon",
      "gordano",
      "zekkriel",
      "pl0x7",
      "wovxzers",
      "henryguy",
      "kleio",
      "diep",
      "bork",
      "fizzy",
      "kurbee",
      "viper",
      "carlito",
      "lordphan",
      "grulannius",
      "cocoa",
      "julia",
      "frank",
      "unax"
    ]
    return members[Math.floor(Math.random() * members.length)]
  }
}