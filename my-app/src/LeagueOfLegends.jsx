import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress';
import leagueoflegends from './helpers/leagueoflegends.js'
import _ from 'lodash'

import {Pie} from 'react-chartjs-2';

class LeagueOfLegends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lolprofile : {
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
        };

        /*this.user = auth.getUser()*/

    }

    componentWillMount() {
        leagueoflegends.subscribe((lolprofile) => {
            this.setState({lolprofile : lolprofile})
        })
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    componentWillReceiveProps() {
    }




    render() {
        let data = {
            labels: ['Wins: ' + this.state.lolprofile.wins,'Losses: ' + this.state.lolprofile.losses],
            datasets: [{data: [this.state.lolprofile.wins, this.state.lolprofile.losses],
                        backgroundColor: ['#00ff00','#ff0000'],
                      }]
        };

        var lastPlayedChampionImage = '';

        if (this.state.lolprofile.lastPlayedChampion !== '') {
            var lastPlayedChampionImage = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + this.state.lolprofile.lastPlayedChampion + '.png';
        }

        var firstMasteryChampionImage = '';

        if (this.state.lolprofile.mastery.firstMasteryChampion.championName !== '') {
            var firstMasteryChampionImage = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + this.state.lolprofile.mastery.firstMasteryChampion.championName + '.png';
        }

        var secondMasteryChampionImage = '';

        if (this.state.lolprofile.mastery.secondMasteryChampion.championName !== '') {
            var secondMasteryChampionImage = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + this.state.lolprofile.mastery.secondMasteryChampion.championName + '.png';
        }

        var tierImage = '';

        if (this.state.lolprofile.tier !== '') {
            var tierImage = require('./icons/tier-icons/'+this.state.lolprofile.tier.toLowerCase()+'_'+this.state.lolprofile.rank.toLowerCase()+'.png');
        }

        return (
            <div style={ this.props.margin ? { marginLeft:275,marginRight:25 } : { marginLeft : 0 }}>
            <div className='row centered'>
                <div className='note-input-wrapper' style={{backgroundColor : '#ffffff' }}>
                    <div>
                        <img src={lastPlayedChampionImage} />
                        <p>{this.state.lolprofile.summonerName}</p>
                        <p>{this.state.lolprofile.summonerLevel}</p>
                        <p>{this.state.lolprofile.tier} {this.state.lolprofile.rank}</p>
                        <img src={tierImage} />
                        <Pie data={data}/>
                        <img src={firstMasteryChampionImage} />
                        <p>{this.state.lolprofile.mastery.firstMasteryChampion.level}</p>
                        <p>{this.state.lolprofile.mastery.firstMasteryChampion.points}</p>
                        <p>{this.state.lolprofile.mastery.firstMasteryChampion.championName}</p>
                        <img src={secondMasteryChampionImage} />
                        <p>{this.state.lolprofile.mastery.secondMasteryChampion.level}</p>
                        <p>{this.state.lolprofile.mastery.secondMasteryChampion.points}</p>
                        <p>{this.state.lolprofile.mastery.firstMasteryChampion.championName}</p>
                    </div>

                      <div >
                          { this.state.imageIsLoading ? <CircularProgress style={{ margin : 20 }}/> : null }
                          { _.values(this.state.images).reverse() }
                          <img className='note-input-img' src={this.state.imgSrc}/>
                      </div>
                  </div>
              </div>
        );
    }
}


export default LeagueOfLegends;
