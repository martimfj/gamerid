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
                avatarFullUrl: false,
                countryCode: null,
                stateId: null,
                cityId: null
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
        return (
            <div style={ this.props.margin ? { marginLeft:275,marginRight:25 } : { marginLeft : 0 }}>
            <div className='row centered'>
                <div className='note-input-wrapper' style={{backgroundColor : '#ffffff' }}>
                    <div>
                        <img src={this.state.steamprofile.avatarFullUrl} />
                        <p>{this.state.steamprofile.personName}</p>
                        <p>{this.state.steamprofile.profileUrl}</p>
                        <p>{this.state.steamprofile.steamId}</p>
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