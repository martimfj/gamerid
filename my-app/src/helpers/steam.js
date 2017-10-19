import {EventEmitter} from 'events'
import auth from './auth.js';

const emitter = new EventEmitter();
emitter.setMaxListeners(20)

var steamprofile = {
                    personName: null,
                    steamId: null,
                    profileUrl: null,
                    avatarFullUrl: null,
                    csgo: {
                        kills: null,
                        deaths: null,
                        mvps: null,
                        timePlayed: null,
                        headshots: null,
                    }
                }

export default window.steam = {
    subscribe(callback){
        emitter.addListener('steam_update', callback)
        let user = auth.getUser()
        user = JSON.parse(user)
        steamprofile.steamId = user.steam
        this.getSteamInfo()
    },

    setData(){
        emitter.emit('steam_update', steamprofile)
    },

    getSteamInfo() {
            fetch('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=8DD3D47C1DFB6EA97EA7F6665C4FBA20&steamids=' + steamprofile.steamId)
                .then(steamrequest => steamrequest.json())
                .then(steamrequest => {
                    steamprofile.personName    = steamrequest.response.players[0].personaname
                    steamprofile.steamId       = steamrequest.response.players[0].steamid
                    steamprofile.profileUrl    = steamrequest.response.players[0].profileurl
                    steamprofile.avatarFullUrl = steamrequest.response.players[0].avatarfull
                    this.getCSGOInfo()
                    this.setData()
                })
                
        },
    getCSGOInfo() {
        fetch('http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=8DD3D47C1DFB6EA97EA7F6665C4FBA20&steamid=' + steamprofile.steamId)
        .then(steamrequest => steamrequest.json())
        .then(steamrequest => {
            steamprofile.csgo.kills = steamrequest.playerstats.stats[0].value
            steamprofile.csgo.deaths = steamrequest.playerstats.stats[1].value
            steamprofile.csgo.mvps = steamrequest.playerstats.stats[104].value
            steamprofile.csgo.timePlayed = steamrequest.playerstats.stats[2].value
            steamprofile.csgo.headshots = steamrequest.playerstats.stats[25].value
            this.setData()
        })
    },

    getSteamProfile(){
        return steamprofile
    }
}