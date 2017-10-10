import {EventEmitter} from 'events'

const emitter = new EventEmitter();
emitter.setMaxListeners(20)

var battlenetprofile = {
                    battleTag: null,
                    battleId: null,
                    paragonLevel: null,
                    hero: null,
                    heroLevel: null,
                    heroClass: null,
                    heroPortrait: 'http://media.blizzard.com/d3/icons/portraits/64/demonhunter_male.png'
                }

export default window.battlenet = {
    subscribe(callback){
        emitter.addListener('battlenet_update', callback)
        this.getBattleTag()
        this.getD3Info()
    },

    setData(){
        emitter.emit('battlenet_update', battlenetprofile)
    },

    getBattleTag() {
            fetch('https://us.api.battle.net/account/user?access_token=7ncphwzfsj46tqy2sx4mgkjx')
                .then(battlerequest => battlerequest.json())
                .then(battlerequest => {
                    battlenetprofile.battleTag    = battlerequest.battletag
                    battlenetprofile.battleId     = battlerequest.id
                    this.setData()
                })
                
        },

    getD3Info() {
        fetch('https://us.api.battle.net/d3/profile/Borbas%231512/?locale=pt_BR&apikey=83sgkyu7bnyge9gffuq57f2wcjnbku52')
                .then(battlerequest => battlerequest.json())
                .then(battlerequest => {
                    battlenetprofile.paragonLevel= battlerequest.paragonLevel
                    battlenetprofile.hero          = battlerequest.heroes[0].name
                    battlenetprofile.heroLevel     = battlerequest.heroes[0].level
                    battlenetprofile.heroClass     = battlerequest.heroes[0].class
                    this.setData()
                })
    },

    getBattlenetProfile(){
        return battlenetprofile
    }
}