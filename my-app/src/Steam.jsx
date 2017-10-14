import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress';
import steam from './helpers/steam.js'
import _ from 'lodash'

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
            <div style={ this.props.margin ? { marginLeft:275,marginRight:25 } : { marginLeft : 0 }}>
            <div className='row centered'>
                <div className='note-input-wrapper' style={{backgroundColor : '#ffffff' }}>
                    <div>
                        <img src={this.state.steamprofile.avatarFullUrl} />
                        <p>{this.state.steamprofile.personName}</p>
                        <p>{this.state.steamprofile.profileUrl}</p>
                        <img src={csgoImage} />
                        <p>Time Played: {timePlayed.toFixed(0)} Hours</p>
                        <p>Kills: {this.state.steamprofile.csgo.kills}</p>
                        <p>Deaths: {this.state.steamprofile.csgo.deaths}</p>
                        <p>MVPs: {this.state.steamprofile.csgo.mvps}</p>
                        <p>K/D Ratio: {kdratio.toFixed(2)}</p>
                        <p>Headshot %: {headshotPercentage.toFixed(2)}</p>
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


export default Steam;