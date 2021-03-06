import React, { Component } from 'react';

import Avatar from 'material-ui/Avatar'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField';
import logo from './icons/logo.png'
import steam from './icons/steam.png'
import leagueoflegends from './icons/leagueoflegends.png'
import battlenet from './icons/battlenet.png'
import steamdefault from './icons/steamdefaulticon.jpg'
import leagueoflegendsdefault from './icons/loldefaulticon.png'
import battlenetdefault from './icons/battlenetdefaulticon.png'
import auth from './helpers/auth.js'

class Navbar extends Component {
    constructor(props){
        super(props)
        this.mql = window.matchMedia('(min-width: 480px)')
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this)
        this.state = {
            user : auth.getUser(),
            open : false,
            anchorEl : null,
            drawer : null,
            show : false,
            value: '',
        }
        {/* user : auth.getUser(), */}
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentWillMount() {
        this.mql.addListener(this.mediaQueryChanged)
        this.setState({mql:this.mql, docked : this.mql.matches})
    }


    mediaQueryChanged() {
        this.setState({
        docked: this.mql.matches,
        open: this.mql.matches
        })
    }

    handleSearchChange(e) {
        console.log(e);
        this.setState({value: e.target.value});
    }

    toggleDrawer = () => {
        this.props.toggleDrawer()
    }


    handleTouchTap = (event) => {
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        })
    }

    handleRequestClose = () => {
        this.setState({
            open : false
        })
    }

    render() {
        return (
            <div>
            <div key='navbar' className="navbar-fixed" style={{zIndex: 5}}>
                <nav className="nav">
                        <div id="navbar" className="nav-wrapper sticky">
                        <ul>
                            <div className="middleimg center logo" style={{height:50}}>
                                <p style= {{
                                    fontSize:'24px',
                                    fontFamily: 'space'
                                    
                                }}>
                                    <strong> GAMER ID </strong>
                                </p>
                            </div>
                        </ul>

                        <ul style = {{paddingLeft:'15px'}}className="left">
                        <li>
                            <div className="row valign-wrapper">
                                <a onClick={this.toggleDrawer}>
                                    <FontIcon style={{color: 'white'}} className="material-icons">dehaze</FontIcon>
                                </a>
                            </div>
                        </li>
                        </ul>

                        <ul className="right" style={{marginRight:'40px'}}>
                            <li>
                                <TextField
                                    floatingLabelStyle = {{backgroundColor: '#fff'}}
                                    id="text-field-controlled"
                                    value={this.state.value}
                                    onChange={this.handleSearchChange}
                                    hintText='Procure um GamerID...'
                                />
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            </div>
        );
    }
}

export default Navbar;
