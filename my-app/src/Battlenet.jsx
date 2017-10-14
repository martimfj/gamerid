import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider'
import battlenet from './helpers/battlenet.js'
import _ from 'lodash'

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
            <div style={ this.props.margin ? { marginLeft:275,marginRight:25 } : { marginLeft : 0 }}>
            <div className='row centered'>
                <div className='note-input-wrapper' style={{backgroundColor : '#ffffff' }}>
                    <div>
                        <img src='https://us.battle.net/d3/static/images/profile/hero/paperdoll/demon-hunter-male.jpg' />
                        <p>BattleTag: {this.state.battlenetprofile.battleTag}</p>
                        <p>Hero Name: {this.state.battlenetprofile.hero.name}</p>
                        <p>Class: {this.state.battlenetprofile.hero.class}</p>
                        <p>Hero Level: {this.state.battlenetprofile.hero.level}</p>
                        <p>Paragon Level: {this.state.battlenetprofile.hero.paragonLevel}</p>
                        <img src={mainHand} />
                        <img src={offHand} />
                        <img src={waist} />
                        <img src={rightFinger} />
                        <img src={leftFinger} />
                        <img src={neck} />
                        <img src={feet} />
                        <img src={hands} />
                        <img src={shoulders} />
                        <img src={torso} />
                        <img src={legs} />
                        <img src={bracers} />
                        <img src={head} />
                        <ul>
                            <li>Attributes</li>
                            <Divider/>
                            <li>Strength     {this.state.battlenetprofile.hero.stats.strength}</li>
                            <li>Dexterity    {this.state.battlenetprofile.hero.stats.dexterity}</li>
                            <li>Intelligence {this.state.battlenetprofile.hero.stats.intelligence}</li>
                            <li>Vitality     {this.state.battlenetprofile.hero.stats.vitality}</li>
                            <Divider/>
                            <li>Damage       {this.state.battlenetprofile.hero.stats.damage}</li>
                            <li>Toughness    {this.state.battlenetprofile.hero.stats.toughness}</li>
                            <li>Recovery     {this.state.battlenetprofile.hero.stats.healing}</li>
                            <Divider/>
                            <li>Life         {this.state.battlenetprofile.hero.stats.life}</li>
                            <li>Hatred/Discipline {this.state.battlenetprofile.hero.stats.hatred}/{this.state.battlenetprofile.hero.stats.discipline}</li>
                        </ul>
                    </div>

                    <div className='row center canvas-container'>
                        { this.state.imageIsLoading ? <CircularProgress style={{ margin : 20 }}/> : null }
                        { _.values(this.state.images).reverse() }
                        <img className='note-input-img' src={this.state.imgSrc}/>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}


export default Battlenet;