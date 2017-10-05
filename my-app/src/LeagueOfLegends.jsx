import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash'


class LeagueOfLegends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summonerName: null,
            accountId: null,
            summonerId: null,
            summonerLevel: null,
            tier: null,
            rank: null,
            wins: null,
            losses: null,
            matches: null
        }
        /*this.user = auth.getUser()*/

    }

    componentWillMount() {
    }

    componentDidMount() {
        this.getSummoner();
        this.getRank();
        this.getMatchHistory();
    }

    componentWillUnmount() {

    }

    componentWillReceiveProps() {
    }
    

    getSummoner() {
        fetch('https://br1.api.riotgames.com/lol/summoner/v3/summoners/by-name/coltshot?api_key=RGAPI-e3afb9fd-41f4-49f7-9b04-3aa715d76b4f')
            .then(lolrequest => lolrequest.json())
            .then(lolrequest => {
                this.setState({
                    summonerName : lolrequest.name,
                    summonerId   : lolrequest.id,
                    accountId    : lolrequest.accountId,
                    summonerLevel: lolrequest.summonerLevel
                })
            })
    }

    getRank() {
        fetch('https://br1.api.riotgames.com/lol/league/v3/positions/by-summoner/647588?api_key=RGAPI-e3afb9fd-41f4-49f7-9b04-3aa715d76b4f')
            .then(lolrequest => lolrequest.json())
            .then(lolrequest => {
                this.setState({
                    tier   : lolrequest[0].tier,
                    rank   : lolrequest[0].rank,
                    wins   : lolrequest[0].wins,
                    losses : lolrequest[0].losses
                })
            })
    }

    getMatchHistory() {
        fetch('https://br1.api.riotgames.com/lol/match/v3/matchlists/by-account/663093/recent?api_key=RGAPI-e3afb9fd-41f4-49f7-9b04-3aa715d76b4f')
        .then(lolrequest => lolrequest.json())
        .then(lolrequest => {
            this.setState({
                matches : lolrequest.matches[0].lane
            })
        })
    }

    render() {
        return (
            <div style={ this.props.margin ? { marginLeft:275,marginRight:25 } : { marginLeft : 0 }}>
            <div className='row centered'>
                <div className='note-input-wrapper' style={{backgroundColor : '#ffffff' }}>
                    <div>
                        <p>{this.state.summonerName}</p>
                        <p>{this.state.summonerLevel}</p>
                        <p>{this.state.tier} {this.state.rank}</p>
                        <p>Wins: {this.state.wins}</p>
                        <p>Losses: {this.state.losses}</p>
                        <p>Matches: {this.state.matches}</p>
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