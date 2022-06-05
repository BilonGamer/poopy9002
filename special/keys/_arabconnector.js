module.exports = {
  desc: "Returns a random connector from the arabottify command's connector dictionary.",
  func: function () {
    let poopy = this

    return poopy.arrays.arabConnectors[Math.floor(Math.random() * poopy.arrays.arabConnectors.length)]
  }
}