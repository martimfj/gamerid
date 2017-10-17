import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress';
import steam from './helpers/steam.js'
import _ from 'lodash'
import './lol.css';

class Steam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steamprofile : {
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
        };

        /*this.user = auth.getUser()*/

    }

    componentWillMount() {
        steam.subscribe((steamprofile) => {
            this.setState({steamprofile : steamprofile})
        })
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    componentWillReceiveProps() {
    }


    render() {

        let csgoImage = 'http://media.steampowered.com/steamcommunity/public/images/apps/730/d0595ff02f5c79fd19b06f4d6165c3fda2372820.jpg';
        let kdratio = this.state.steamprofile.csgo.kills / this.state.steamprofile.csgo.deaths;
        let headshotPercentage = (this.state.steamprofile.csgo.headshots / this.state.steamprofile.csgo.kills) * 100
        let timePlayed = this.state.steamprofile.csgo.timePlayed / 3600

        return (
            <div>
            <div>
                <div>
                    <div>
                        <div className='flex-row-around'>
                            <img src={this.state.steamprofile.avatarFullUrl} />
                            <h1 style={{paddingRight:'50px'}} className='flex-column-centered'>
                                <strong>{this.state.steamprofile.personName}</strong>
                            </h1>
                        </div>
                        <div style={{paddingTop:'30px'}}>
                                <a href={this.state.steamprofile.profileUrl}><span><strong>Visit profile</strong></span></a>
                        </div>
                        <div style={{ paddingTop: '30px' }}>
                            <h1><strong> Counter Strike: Global Offensive </strong> </h1>
                            <img src={csgoImage} />
                            <h2 className='sub-title'> Player Stats </h2>
                            <div style={{ backgroundColor: '#d3d3d3' }} className='character-attributes-line'>
                                    <p> <strong>Time Played  </strong></p>
                                    <p>{timePlayed.toFixed(0)} Hours </p>
                            </div>
                            <div className='character-attributes-line'>
                                    <p> <strong>Kills  </strong></p>
                                    <p>{this.state.steamprofile.csgo.kills} </p>
                            </div>
                            <div style={{ backgroundColor: '#d3d3d3' }} className='character-attributes-line'>
                                    <p> <strong>Deaths  </strong></p>
                                    <p>{this.state.steamprofile.csgo.deaths} </p>
                            </div>
                            <div className='character-attributes-line'>
                                    <p> <strong>MVPs </strong></p>
                                    <p>{this.state.steamprofile.csgo.mvps} </p>
                            </div>
                            <div style={{ backgroundColor: '#d3d3d3' }} className='character-attributes-line'>
                                    <p> <strong>K/D Ratio  </strong></p>
                                    <p> {kdratio.toFixed(2)}</p>
                            </div>
                            <div className='character-attributes-line'>
                                    <p> <strong>Headshot %   </strong></p>
                                    <p> {headshotPercentage.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        );
    }
}


export default Steam;
