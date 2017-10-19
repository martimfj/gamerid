import {EventEmitter} from 'events'
import auth from './auth.js';

const emitter = new EventEmitter();
emitter.setMaxListeners(20)

var lolprofile = {
                    summonerName: '',
                    accountId: '',
                    summonerId: '',
                    summonerLevel: '',
                    tier: '',
                    rank: '',
                    wins: '',
                    losses: '',
                    lastPlayedChampionId: '',
                    lastPlayedChampion: '',
                    mastery: {
                        firstMasteryChampion: {
                            level: '',
                            points: '',
                            championId: '',
                            championName: ''},
                        secondMasteryChampion: {
                            level: '',
                            points: '',
                            championId: '',
                            championName: ''}
                        }
                }

var counter = 0

export default window.leagueoflegends = {
    subscribe(callback){
        emitter.addListener('lolprofile_update', callback)
        let user = auth.getUser()
        user = JSON.parse(user)
        lolprofile.summonerName = user.riot
        this.getSummoner()
    },

    setData(){
        emitter.emit('lolprofile_update',lolprofile)
    },

    getSummoner(summonerName) {
        fetch('https://br1.api.riotgames.com/lol/summoner/v3/summoners/by-name/'+ lolprofile.summonerName +'?api_key=RGAPI-467c2a2d-460d-4c5c-aac9-ddd55734fea0')
            .then(lolrequest => lolrequest.json())
            .then(lolrequest => {
                lolprofile.summonerName  = lolrequest.name
                lolprofile.summonerId    = lolrequest.id
                lolprofile.accountId     = lolrequest.accountId
                lolprofile.summonerLevel = lolrequest.summonerLevel
                this.getRank(lolprofile.summonerId)
                this.getChampionMasteries(lolprofile.summonerId)
                this.setData()
            })
        },

    getRank(summonerId) {
        fetch('https://br1.api.riotgames.com/lol/league/v3/positions/by-summoner/'+ summonerId +'?api_key=RGAPI-467c2a2d-460d-4c5c-aac9-ddd55734fea0')
            .then(lolrequest => lolrequest.json())
            .then(lolrequest => {
                lolprofile.tier   = lolrequest[0].tier
                lolprofile.rank   = lolrequest[0].rank
                lolprofile.wins   = lolrequest[0].wins
                lolprofile.losses = lolrequest[0].losses
                this.getLastPlayedChampionId(lolprofile.accountId)
                this.setData()
            })
    },

    getLastPlayedChampionId(accountId) {
        fetch('https://br1.api.riotgames.com/lol/match/v3/matchlists/by-account/'+ accountId + '/recent?api_key=RGAPI-467c2a2d-460d-4c5c-aac9-ddd55734fea0')
            .then(lolrequest => lolrequest.json())
            .then(lolrequest => {
                lolprofile.lastPlayedChampionId = lolrequest.matches[0].champion
                this.getLastPlayedChampion(lolprofile.lastPlayedChampionId)
                this.setData()
            })
    },

    getLastPlayedChampion(championId) {
        fetch('https://br1.api.riotgames.com/lol/static-data/v3/champions/'+ championId +'?locale=pt_BR&api_key=RGAPI-467c2a2d-460d-4c5c-aac9-ddd55734fea0')
            .then(lolrequest => lolrequest.json())
            .then(lolrequest => {
                lolprofile.lastPlayedChampion = lolrequest.key
                this.setData()
            })
    },

    getMasteryChampions(firstChampionId, secondChampionId) {
        fetch('https://br1.api.riotgames.com/lol/static-data/v3/champions/'+ firstChampionId +'?locale=pt_BR&api_key=RGAPI-467c2a2d-460d-4c5c-aac9-ddd55734fea0')
            .then(lolrequest => lolrequest.json())
            .then(lolrequest => {
                lolprofile.mastery.firstMasteryChampion.championName = lolrequest.key
                this.setData()
            })
        fetch('https://br1.api.riotgames.com/lol/static-data/v3/champions/'+ secondChampionId +'?locale=pt_BR&api_key=RGAPI-467c2a2d-460d-4c5c-aac9-ddd55734fea0')
            .then(lolrequest => lolrequest.json())
            .then(lolrequest => {
                lolprofile.mastery.secondMasteryChampion.championName = lolrequest.key
                this.setData()
            })
    },

    getChampionMasteries(summonerId) {
        fetch('https://br1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/'+ summonerId +'?api_key=RGAPI-467c2a2d-460d-4c5c-aac9-ddd55734fea0')
            .then(lolrequest => lolrequest.json())
            .then(lolrequest => {
                lolprofile.mastery.firstMasteryChampion.level           = lolrequest[0].championLevel
                lolprofile.mastery.firstMasteryChampion.points          = lolrequest[0].championPoints
                lolprofile.mastery.firstMasteryChampion.championId      = lolrequest[0].championId
                lolprofile.mastery.secondMasteryChampion.level          = lolrequest[1].championLevel
                lolprofile.mastery.secondMasteryChampion.points         = lolrequest[1].championPoints
                lolprofile.mastery.secondMasteryChampion.championId     = lolrequest[1].championId
                this.getMasteryChampions(lolprofile.mastery.firstMasteryChampion.championId, lolprofile.mastery.secondMasteryChampion.championId)
                this.setData()
            })
    },


    getLolProfile(){
        return lolprofile
    }
}
