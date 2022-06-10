module.exports = {
    helpf: '(query | index)',
    desc: 'Returns a random YouTube video out of the search query, if no index is specified.',
    func: async function (matches, msg) {
        let poopy = this

        var word = matches[1]
        var split = poopy.functions.splitKeyFunc(word, { args: 2 })
        var query = poopy.functions.getIndexOption(split, 0)[0]
        var page = poopy.functions.getIndexOption(split, 1, { n: Infinity }).join(' | ')
        var res = await poopy.vars.youtube.search.list({
            type: 'video',
            q: query,
            part: 'snippet',
            maxResults: 50,
            safeSearch: msg.channel.nsfw ? 'none' : 'strict'
        }).catch(() => { })
        
        if (!res) return word

        var urls = res.data.items.map(result => `https://www.youtube.com/watch?v=${result.id.videoId}`)
        
        if (!urls || !urls.length) return word

        var page = poopy.functions.parseNumber(page, { dft: Math.floor(Math.random() * urls.length), min: 0, max: urls.length - 1, round: true })

        return await poopy.modules.youtubedl(urls[page], {
            format: '18',
            'get-url': ''
        }).catch(() => { }) ?? urls[page]
    },
    attemptvalue: 10,
    limit: 5
}