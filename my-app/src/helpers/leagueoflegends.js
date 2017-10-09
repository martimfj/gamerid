import {EventEmitter} from 'events'

const emitter = new EventEmitter();
emitter.setMaxListeners(20)

var lolprofile = {
                    summonerName: 'coltshot',
                    accountId: null,
                    summonerId: null,
                    summonerLevel: null,
                    tier: null,
                    rank: null,
                    wins: null,
                    losses: null
                    // matches: null
                }

var count = 0

export default window.leagueoflegends = {
    subscribe(callback){
        emitter.addListener('lolprofile_update', callback)
        this.getSummoner()
        this.getRank()
        // this.getMatchHistory()
    },

    setData(){
        count ++
        if (count === 2){
            emitter.emit('lolprofile_update',lolprofile)
        }
    },

    getSummoner() {
            fetch('https://br1.api.riotgames.com/lol/summoner/v3/summoners/by-name/'+ lolprofile.summonerName +'?api_key=RGAPI-70b8a1e4-100a-4360-9bb2-9b87abb32846')
                .then(lolrequest => lolrequest.json())
                .then(lolrequest => {
                    lolprofile.summonerName  = lolrequest.name
                    lolprofile.summonerId    = lolrequest.id
                    lolprofile.accountId     = lolrequest.accountId
                    lolprofile.summonerLevel = lolrequest.summonerLevel
                    this.setData()
                })
                
        },

    getRank() {
        fetch('https://br1.api.riotgames.com/lol/league/v3/positions/by-summoner/647588?api_key=RGAPI-70b8a1e4-100a-4360-9bb2-9b87abb32846')
            .then(lolrequest => lolrequest.json())
            .then(lolrequest => {
                lolprofile.tier   = lolrequest[0].tier
                lolprofile.rank   = lolrequest[0].rank
                lolprofile.wins   = lolrequest[0].wins
                lolprofile.losses = lolrequest[0].losses
                this.setData()
            })
    },

    // getMatchHistory() {
    //     fetch('https://br1.api.riotgames.com/lol/match/v3/matchlists/by-account/663093/recent?api_key=RGAPI-70b8a1e4-100a-4360-9bb2-9b87abb32846')
    //     .then(lolrequest => lolrequest.json())
    //     .then(lolrequest => {
    //         lolprofile.matches = lolrequest.matches[0].lane
    //         this.setData()
    //     })
    // },

    getLolProfile(){
        return lolprofile
    }
}