import {EventEmitter} from 'events'

const emitter = new EventEmitter();
emitter.setMaxListeners(20)

var steamprofile = {
                    personName: null,
                    steamId: null,
                    profileUrl: null,
                    avatarFullUrl: null,
                    countryCode: null,
                    stateId: null,
                    cityId: null
                }

export default window.steam = {
    subscribe(callback){
        emitter.addListener('steam_update', callback)
        this.getSteamInfo()
    },

    setData(){
        emitter.emit('steam_update', steamprofile)
    },

    getSteamInfo() {
            fetch('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=8DD3D47C1DFB6EA97EA7F6665C4FBA20&steamids=76561197989030975')
                .then(steamrequest => steamrequest.json())
                .then(steamrequest => {
                    steamprofile.personName    = steamrequest.response.players[0].personaname
                    steamprofile.steamId       = steamrequest.response.players[0].steamid
                    steamprofile.profileUrl    = steamrequest.response.players[0].profileurl
                    steamprofile.avatarFullUrl = steamrequest.response.players[0].avatarfull
                    steamprofile.countryCode   = steamrequest.response.players[0].loccountrycode
                    steamprofile.stateId       = steamrequest.response.players[0].locstatecode
                    steamprofile.cityId        = steamrequest.response.players[0].loccityid
                    this.setData()
                })
                
        },

    getSteamProfile(){
        return steamprofile
    }
}