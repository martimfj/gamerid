import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import leagueoflegends from './helpers/leagueoflegends.js';
import _ from 'lodash';
import './lol.css';

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
                    },
                // thirdMasteryChampion: {
                //     level: '',
                //     points: '',
                //     championId: '',
                //     championName: ''
                // },
            }
            }
        };

        /*this.user = auth.getUser()*/


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


        // var thirdMasteryChampionImage = '';

        // if (this.state.lolprofile.mastery.thirdMasteryChampion.championName !== '') {
        //     var thirdMasteryChampionImage = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + this.state.lolprofile.mastery.thirdMasteryChampion.championName + '.png';
        // }

        var tierImage = '';

        if (this.state.lolprofile.tier !== '') {
            var tierImage = require('./icons/tier-icons/'+this.state.lolprofile.tier.toLowerCase()+'_'+this.state.lolprofile.rank.toLowerCase()+'.png');
        }

        return (
            <div >
            <div >
                <div >
                        <div>
                            <h1 style={{ paddingBottom: '5%' }}>
                                <strong> League of Legends </strong>
                            </h1>
                        </div>
                    <div>
                        <h2 className='sub-title'> Basic Informations </h2>
                        <div className='flex-row-between'>
                            <div className='flex-column-centered'>
                                    <span className='label-title'> Latest Champion Played </span>
                                    <img style={{maxWidth: '70%'}} src={lastPlayedChampionImage} />
                            </div>
                            <div className='flex-column-centered'>
                              <span className='label-title'> Summoner Name </span>
                              <p>{this.state.lolprofile.summonerName}</p>
                            </div>
                            <div className='flex-column-centered'>
                                    <span className='label-title'> Level </span>
                                <p>{this.state.lolprofile.summonerLevel}</p>
                            </div>
                        </div>
                        <h2 className='sub-title'> Rank </h2>
                        <div className='flex-row-around'>
                            <div className='flex-column-centered'>
                                <img src={tierImage} />
                            </div>
                            <div className='flex-column-centered'>
                                <h3><strong>{this.state.lolprofile.tier} {this.state.lolprofile.rank}</strong></h3>
                            </div>
                        </div>
                        <h2 className='sub-title'> Matches </h2>
                        <div className='flex-row-center'>
                          <div>
                             <Pie data={data} />
                          </div>
                        </div>
                        <h2 className='sub-title'> Champions Mastery </h2>
                        <div className='flex-row-around'>
                            <div className='flex-column-centered'>
                                <p>{this.state.lolprofile.mastery.secondMasteryChampion.championName}</p>
                                <img src={secondMasteryChampionImage} />
                                <div className='flex-column-centered'>
                                    <p> <strong>Level</strong> {this.state.lolprofile.mastery.secondMasteryChampion.level}</p>
                                    <p>{this.state.lolprofile.mastery.secondMasteryChampion.points} <strong>points</strong></p>
                                </div>
                            </div>
                            <div className='flex-column-centered'>
                                    <p>{this.state.lolprofile.mastery.firstMasteryChampion.championName}</p>
                                    <img src={firstMasteryChampionImage} />
                                    <div className='flex-column-centered'>
                                        <p> <strong>Level</strong> {this.state.lolprofile.mastery.firstMasteryChampion.level}</p>
                                        <p>{this.state.lolprofile.mastery.firstMasteryChampion.points} <strong>points</strong></p>
                                    </div>
                            </div>
                            {/* <div className='flex-column-centered'>
                                <p>{this.state.lolprofile.mastery.thirdMasteryChampion.championName}</p>
                                <img src={thirdMasteryChampionImage} />
                                <div className='flex-column-centered'>
                                    <p> <strong>Level</strong> {this.state.lolprofile.mastery.thirdMasteryChampion.level}</p>
                                    <p>{this.state.lolprofile.mastery.thirdMasteryChampion.points} <strong>points</strong></p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        );
    }
}


export default LeagueOfLegends;
