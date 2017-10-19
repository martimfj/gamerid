import {EventEmitter} from 'events'
import auth from './auth.js';

const emitter = new EventEmitter();
emitter.setMaxListeners(20)

var battlenetprofile = {
                    battleTag: null,
                    battleId: null,
                    hero: {
                        name: null,
                        paragonLevel : null,
                        level: null,
                        class: null,
                        stats: {
                            life: null,
                            damage: null,
                            toughness: null,
                            healing: null,
                            hatred: null,
                            discipline: null,
                            strength: null,
                            dexterity: null,
                            intelligence: null,
                            vitality: null,
                        },
                        items: {
                            mainHand: null,
                            offHand: null,
                            waist: null,
                            rightFinger: null,
                            leftFinger: null,
                            neck: null,
                            feet: null,
                            hands: null,
                            shoulders: null,
                            torso: null,
                            legs: null,
                            bracers: null,
                            head: null
                        }
                    }
                }

export default window.battlenet = {
    subscribe(callback){
        emitter.addListener('battlenet_update', callback)
        this.getBattleTag()
    },

    setData(){
        emitter.emit('battlenet_update', battlenetprofile)
    },

    getBattleTag() {
            fetch('https://us.api.battle.net/account/user?access_token=c47jejdy9pmnq3wftbc84769')
                .then(battlerequest => battlerequest.json())
                .then(battlerequest => {
                    battlenetprofile.battleTag    = battlerequest.battletag
                    battlenetprofile.battleId     = battlerequest.id
                    this.getD3Info()
                    this.setData()
                })
                
        },

    getD3Info() {
        fetch('https://us.api.battle.net/d3/profile/Borbas%231512/hero/87576658?locale=pt_BR&apikey=83sgkyu7bnyge9gffuq57f2wcjnbku52')
                .then(battlerequest => battlerequest.json())
                .then(battlerequest => {
                    battlenetprofile.hero.name               = battlerequest.name
                    battlenetprofile.hero.paragonLevel       = battlerequest.paragonLevel
                    battlenetprofile.hero.level              = battlerequest.level
                    battlenetprofile.hero.class              = battlerequest.class
                    battlenetprofile.hero.stats.life         = battlerequest.stats.life
                    battlenetprofile.hero.stats.damage       = battlerequest.stats.damage
                    battlenetprofile.hero.stats.toughness    = battlerequest.stats.toughness
                    battlenetprofile.hero.stats.healing      = battlerequest.stats.healing
                    battlenetprofile.hero.stats.hatred       = battlerequest.stats.primaryResource
                    battlenetprofile.hero.stats.discipline   = battlerequest.stats.secondaryResource
                    battlenetprofile.hero.stats.strength     = battlerequest.stats.strength
                    battlenetprofile.hero.stats.dexterity    = battlerequest.stats.dexterity
                    battlenetprofile.hero.stats.intelligence = battlerequest.stats.intelligence
                    battlenetprofile.hero.stats.vitality     = battlerequest.stats.vitality
                    battlenetprofile.hero.items.mainHand     = battlerequest.items.mainHand.icon
                    battlenetprofile.hero.items.offHand      = battlerequest.items.offHand.icon
                    battlenetprofile.hero.items.waist        = battlerequest.items.waist.icon
                    battlenetprofile.hero.items.rightFinger  = battlerequest.items.rightFinger.icon
                    battlenetprofile.hero.items.leftFinger   = battlerequest.items.leftFinger.icon
                    battlenetprofile.hero.items.neck         = battlerequest.items.neck.icon
                    battlenetprofile.hero.items.feet         = battlerequest.items.feet.icon
                    battlenetprofile.hero.items.hands        = battlerequest.items.hands.icon
                    battlenetprofile.hero.items.shoulders    = battlerequest.items.shoulders.icon
                    battlenetprofile.hero.items.torso        = battlerequest.items.torso.icon
                    battlenetprofile.hero.items.legs         = battlerequest.items.legs.icon
                    battlenetprofile.hero.items.bracers      = battlerequest.items.bracers.icon
                    battlenetprofile.hero.items.head         = battlerequest.items.head.icon
                    this.setData()
                })
    },

    getBattlenetProfile(){
        return battlenetprofile
    }
}