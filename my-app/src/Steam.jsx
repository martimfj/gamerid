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
            <div>
            <div>
                <div>
                    <div>
                        <img src={this.state.steamprofile.avatarFullUrl} />
                        <p>{this.state.steamprofile.personName}</p>
                        <p>{this.state.steamprofile.profileUrl}</p>
                        <p>{this.state.steamprofile.steamId}</p>
                    </div>

                    <div >
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
