import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';
import battlenet from './helpers/battlenet.js';
import './battlenet.css';
import _ from 'lodash';

class Battlenet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            battlenetprofile : {
                battleTag: '',
                battleId: '',
                hero: {
                    name: '',
                    paragonLevel : '',
                    level: '',
                    class: '',
                    stats: {
                        life: '',
                        damage: '',
                        toughness: '',
                        healing: '',
                        hatred: '',
                        discipline: '',
                        strength: '',
                        dexterity: '',
                        intelligence: '',
                        vitality: '',
                    },
                    items: {
                        mainHand: '',
                        offHand: '',
                        waist: '',
                        rightFinger: '',
                        leftFinger: '',
                        neck: '',
                        feet: '',
                        hands: '',
                        shoulders: '',
                        torso: '',
                        legs: '',
                        bracers: '',
                        head: ''
                    }
                }
            }
        };

        /*this.user = auth.getUser()*/

    }

    componentWillMount() {
        battlenet.subscribe((battlenetprofile) => {
            this.setState({battlenetprofile : battlenetprofile})
        })
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    componentWillReceiveProps() {
    }

    render() {
        var mainHand = '';
        var offHand = '';
        var waist = '';
        var rightFinger = '';
        var leftFinger = '';
        var neck = '';
        var feet = '';
        var hands = '';
        var shoulders = '';
        var torso = '';
        var legs = '';
        var bracers = '';
        var head = '';

        if (this.state.battlenetprofile.hero.items.mainHand !== '') {
            var mainHand = 'http://media.blizzard.com/d3/icons/items/large/'    + this.state.battlenetprofile.hero.items.mainHand    + '.png';
            var offHand = 'http://media.blizzard.com/d3/icons/items/large/'     + this.state.battlenetprofile.hero.items.offHand     + '.png';
            var waist = 'http://media.blizzard.com/d3/icons/items/large/'       + this.state.battlenetprofile.hero.items.waist       + '.png';
            var rightFinger = 'http://media.blizzard.com/d3/icons/items/large/' + this.state.battlenetprofile.hero.items.rightFinger + '.png';
            var leftFinger = 'http://media.blizzard.com/d3/icons/items/large/'  + this.state.battlenetprofile.hero.items.leftFinger  + '.png';
            var neck = 'http://media.blizzard.com/d3/icons/items/large/'        + this.state.battlenetprofile.hero.items.neck        + '.png';
            var feet = 'http://media.blizzard.com/d3/icons/items/large/'        + this.state.battlenetprofile.hero.items.feet        + '.png';
            var hands = 'http://media.blizzard.com/d3/icons/items/large/'       + this.state.battlenetprofile.hero.items.hands       + '.png';
            var shoulders = 'http://media.blizzard.com/d3/icons/items/large/'   + this.state.battlenetprofile.hero.items.shoulders   + '.png';
            var torso = 'http://media.blizzard.com/d3/icons/items/large/'       + this.state.battlenetprofile.hero.items.torso       + '.png';
            var legs = 'http://media.blizzard.com/d3/icons/items/large/'        + this.state.battlenetprofile.hero.items.legs        + '.png';
            var bracers = 'http://media.blizzard.com/d3/icons/items/large/'     + this.state.battlenetprofile.hero.items.bracers     + '.png';
            var head = 'http://media.blizzard.com/d3/icons/items/large/'        + this.state.battlenetprofile.hero.items.head        + '.png';
        }
        return (
            <div>
            <div>
                <h1 style={{paddingBottom:'5%'}}> 
                    <strong> DIABLO III </strong> 
                 </h1>
                <div>
                    <div>
                            <div style={{
                                display: 'flex', 
                                flexDirection: 'row',
                            }}>
                                <div style={{ maxWidth: '70%', position: 'relative' }}>
                                    <img style={{ maxWidth: '95%' }} src='https://us.battle.net/d3/static/images/profile/hero/paperdoll/demon-hunter-male.jpg' />
                                    <div style={{position: 'absolute', bottom: '8%', right: '42%'}}>
                                        <img src={mainHand} style={{maxWidth:'70%'}} />
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '8%', right: '21%' }}>
                                        <img src={offHand} style={{maxWidth:'70%'}}/>
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '33%', right: '21%' }}>
                                        <img src={leftFinger} style={{ maxWidth: '50%' }} />
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '33%', right: '42%' }}>
                                        <img src={rightFinger} style={{ maxWidth: '50%' }} />
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '8%', right: '31%' }}>
                                        <img src={feet} style={{ maxWidth: '60%' }} />
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '22%', right: '32%' }}>
                                        <img src={legs} style={{ maxWidth: '55%' }} />
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '40%', right: '42%' }}>
                                        <img src={hands} style={{ maxWidth: '45%' }} />
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '40%', right: '21%' }}>
                                        <img src={bracers} style={{ maxWidth: '50%' }} />
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '42%', right: '30%' }}>
                                        <img src={torso} style={{ maxWidth: '55%' }} />
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '55%', right: '40%' }}>
                                        <img src={shoulders} style={{ maxWidth: '55%' }} />
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '60%', right: '24%' }}>
                                        <img src={neck} style={{ maxWidth: '55%' }} />
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '60%', right: '32%' }}>
                                        <img src={head} style={{ maxWidth: '55%' }} />
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '38%', right: '32%' }}>
                                        <img src={waist} style={{ maxWidth: '55%' }} />
                                    </div>
                                </div>
                            <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-around',
                                    width: '30%',
                                    paddingLeft: '2%'
                                }}>
                                    <div className='character-info-line'>
                                        <p> <strong> BattleTag </strong> </p>
                                        <p>{this.state.battlenetprofile.battleTag} </p>
                                    </div>
                                    <div className='character-info-line'>
                                        <p> <strong>Hero Name </strong></p>
                                        <p>{this.state.battlenetprofile.hero.name} </p>
                                    </div>
                                    <div className='character-info-line'>
                                            <p> <strong>Class </strong></p>
                                        <p>{this.state.battlenetprofile.hero.class} </p>
                                    </div>
                                    <div className='character-info-line'>
                                                <p> <strong> Hero Level</strong></p>
                                        <p>{this.state.battlenetprofile.hero.level} </p>
                                    </div>
                                    <div className='character-info-line'>
                                        <p> <strong>Paragon Level</strong></p>
                                        <p>{this.state.battlenetprofile.hero.paragonLevel} </p>
                                    </div>
                            </div>
                        </div>
                        <div style = {{paddingTop:'3%'}}>
                            <h2> Attributes </h2>
                            <div className = 'attributes-container' style={{ paddingTop: '3%' }}>
                                <div style = {{backgroundColor: '#d3d3d3'}} className='character-attributes-line'>
                                        <p> <strong>Strength  </strong></p>
                                        <p>{this.state.battlenetprofile.hero.stats.strength} </p>
                                </div>
                                <div className='character-attributes-line'>
                                        <p> <strong>Dexterity  </strong></p>
                                        <p>{this.state.battlenetprofile.hero.stats.dexterity} </p>
                                </div>
                                <div style={{ backgroundColor: '#d3d3d3' }} className='character-attributes-line'>
                                        <p> <strong>Intelligence  </strong></p>
                                        <p>{this.state.battlenetprofile.hero.stats.intelligence} </p>
                                </div>
                                <div className='character-attributes-line'>
                                        <p> <strong>Vitality </strong></p>
                                        <p>{this.state.battlenetprofile.hero.stats.vitality} </p>
                                </div>
                                <div style={{ backgroundColor: '#d3d3d3' }} className='character-attributes-line'>
                                        <p> <strong>Damage  </strong></p>
                                        <p> {this.state.battlenetprofile.hero.stats.damage}</p>
                                </div>
                                <div className='character-attributes-line'>
                                        <p> <strong>Toughness   </strong></p>
                                        <p> {this.state.battlenetprofile.hero.stats.toughness}</p>
                                </div>
                                <div style={{ backgroundColor: '#d3d3d3' }} className='character-attributes-line'>
                                        <p> <strong>Recovery   </strong></p>
                                        <p> {this.state.battlenetprofile.hero.stats.healing}</p>
                                </div>
                                <div className='character-attributes-line'>
                                        <p> <strong>Life    </strong></p>
                                        <p> {this.state.battlenetprofile.hero.stats.life}</p>
                                </div>
                                <div style={{ backgroundColor: '#d3d3d3' }} className='character-attributes-line'>
                                        <p> <strong>Hatred/Discipline </strong></p>
                                        <p> {this.state.battlenetprofile.hero.stats.hatred}/{this.state.battlenetprofile.hero.stats.discipline}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}


export default Battlenet;
