module.exports = {
    desc: 'Returns a random country.',
    func: function () {
        let poopy = this
        let json = poopy.json

        var countryJSON = json.countryJSON
        var countryCodes = Object.keys(countryJSON)
        return countryJSON[countryCodes[Math.floor(Math.random() * countryCodes.length)]].name
    },
    array: function () {
        let poopy = this
        let json = poopy.json

        var countryJSON = json.countryJSON
        var countryValues = Object.values(countryJSON)
        return countryValues.map(c => c.name)
    }
}