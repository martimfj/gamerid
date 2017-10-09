import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress';
import leagueoflegends from './helpers/leagueoflegends.js'
import Gold from './icons/tier-icons/gold_v.png'
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
                matches: ''
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

        return (
            <div style={ this.props.margin ? { marginLeft:275,marginRight:25 } : { marginLeft : 0 }}>
            <div className='row centered'>
                <div className='note-input-wrapper' style={{backgroundColor : '#ffffff' }}>
                    <div>
                        <img src="http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Jinx.png" />
                        <p>{this.state.lolprofile.summonerName}</p>
                        <p>{this.state.lolprofile.summonerLevel}</p>
                        <p>{this.state.lolprofile.tier} {this.state.lolprofile.rank}</p>
                        <img src={Gold} />
                        <p>Matches: {this.state.lolprofile.matches}</p>
                        <Pie data={data}/>
                    </div>

                    <div className='row center canvas-container'>
                        { this.state.imageIsLoading ? <CircularProgress style={{ margin : 20 }}/> : null }
                        { _.values(this.state.images).reverse() }
                        <img className='note-input-img' src={this.state.imgSrc}/>
                    </div>
                    
                    <div className='note-input-options'>    
                        <input id="photoInput" 
                            type="file" 
                            ref={(ref) => this.photoInput = ref } 
                            style={{display:'none'}}
                        />
                        
                    </div>
                    
                </div>
            </div>
        </div>
        );
    }
}


export default LeagueOfLegends;