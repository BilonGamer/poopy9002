const axios = require('axios')

var dataGotten = {}
var dataGetting = {}

function randomKey(name) {
    var i = 1
    var keys = []
    while (process.env[name + (i != 1 ? i: '')]) {
        keys.push(process.env[name + (i != 1 ? i: '')])
        i++
    }
    return keys[Math.floor(Math.random() * keys.length)]
}

var dataGetters = {
    codeLanguages: async function () {
        var clresponse = await axios.get('https://wandbox.org/api/list.json').catch((e) => console.log(e))

        if (clresponse) {
            return clresponse.data.filter((lang, index, self) => self.findIndex(l => l.templates[0] === lang.templates[0]) === index).sort((a, b) => {
                if (a.templates[0] < b.templates[0]) return -1
                if (a.templates[0] > b.templates[0]) return 1
                return 0
            })
        }
    },
    
    languages: async function () {
        var lresponse = await axios.request({
            method: 'GET',
            url: 'https://microsoft-translator-text.p.rapidapi.com/languages',
            params: { 'api-version': '3.0' },
            headers: {
                'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
                'x-rapidapi-key': randomKey('RAPIDAPI_KEY')
            }
        }).catch(() => { })

        if (lresponse) return Object.keys(lresponse.data.translation).map(lang => {
            return { ...lresponse.data.translation[lang], language: lang }
        })
    },
    
    uberduck: async function () {
        var voiceResponse = await axios.request({
            method: 'GET',
            url: 'https://api.uberduck.ai/voices?mode=tts-basic',
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${btoa(`${process.env.UBERDUCK_KEY}:${process.env.UBERDUCK_SECRET}`)}`
            }
        }).catch(() => { })

        if (voiceResponse) {
            var voices = voiceResponse.data.sort((va, vb) => {
                var x = va.display_name.toLowerCase()
                var y = vb.display_name.toLowerCase()
                if (x < y) return -1
                if (x > y) return 1
                return 0
            })

            var categories = []
            for (var i in voices) {
                var voice = voices[i]

                if (!categories.find(category => category.name == voice.category)) categories.push({ name: voice.category, voices: [] })
                categories.find(category => category.name == voice.category).voices.push(voice)
            }
            categories.sort((ca, cb) => {
                var x = ca.name.toLowerCase()
                var y = cb.name.toLowerCase()
                if (x < y) return -1
                if (x > y) return 1
                return 0
            })

            return [voices, categories]
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createData(dataType) {
    var dataGet = dataGetters[dataType]
    dataGetters[dataType] = async function () {
        while (dataGetting[dataType]) await sleep()
        if (dataGotten[dataType]) return dataGotten[dataType]

        dataGetting[dataType] = true
        var result = await dataGet().catch((e) => console.log(e))

        if (result) dataGotten[dataType] = result
        delete dataGetting[dataType]

        return result
    }
}

for (var name in dataGetters) {
    createData(name)
}

module.exports = dataGetters