import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress';
import battlenet from './helpers/battlenet.js'
import _ from 'lodash'

class Battlenet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            battlenetprofile : {
                battleTag: null,
                battleId: null,
                paragonLevel: null,
                hero: null,
                heroLevel: null,
                heroClass: null,
                heroPortrait: null
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
        return (
            <div style={ this.props.margin ? { marginLeft:275,marginRight:25 } : { marginLeft : 0 }}>
            <div className='row centered'>
                <div className='note-input-wrapper' style={{backgroundColor : '#ffffff' }}>
                    <div>
                        <img src={this.state.battlenetprofile.heroPortrait} />
                        <p>BattleTag: {this.state.battlenetprofile.battleTag}</p>
                        <p>Hero Name: {this.state.battlenetprofile.hero}</p>
                        <p>Class: {this.state.battlenetprofile.heroClass}</p>
                        <p>Hero Level: {this.state.battlenetprofile.heroLevel}</p>
                        <p>Paragon Level: {this.state.battlenetprofile.paragonLevel}</p>
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