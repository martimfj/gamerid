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
import FileBase64 from 'react-file-base64';

import logo from './icons/logo.png'
import steam from './icons/steam.png'
import leagueoflegends from './icons/leagueoflegends.png'
import battlenet from './icons/battlenet.png'
import steamdefault from './icons/steamdefaulticon.jpg'
import leagueoflegendsdefault from './icons/loldefaulticon.png'
import battlenetdefault from './icons/battlenetdefaulticon.png'
import auth from './helpers/auth.js'

class LeftDrawer extends Component {
    constructor(props){
        super(props)
        this.mql = window.matchMedia('(min-width: 480px)')
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this)
        this.state = {
            user : JSON.parse(auth.getUser()),
            open : false,
            anchorEl : null,
            drawer : null,
            show : false,
            files : ''
        }
        this.selectFile = false;
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

    getFiles(files){
        this.setState({ files: files, open : false})
        var url = 'http://localhost:8080/api/avatar?username=' + this.state.user.username + '&avatar=' + this.state.files.base64;
        fetch(url)
  }


    render() {
        var profileImage = this.state.user.avatar;
        if (this.state.files !== '') {
            var profileImage = this.state.files.base64;
        }

        return (
            <div
            >
            <Drawer
                key='sidebar'
                overlayStyle={{
                    backgroundColor: '#000 !important'
                }}
                docked={this.state.docked}
                containerClassName='drawer'
                width={250}>

                    <FlatButton style={{height:'auto',lineHeight:'none'}}
                        onTouchTap={this.handleTouchTap}
                        hoverColor={ 'rgba(130,130,130,0.1)' }>
                        <Avatar src={profileImage} size={70} />
                        <Popover
                            open={this.state.open}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'middle', vertical: 'top'}}
                            onRequestClose={this.handleRequestClose}
                        >
                            <Menu>
                                <MenuItem disabled primaryText="Selecionar Imagem de Perfil" />
                                <FileBase64 multiple={ false } onDone={ this.getFiles.bind(this) } />
                            </Menu>
                        </Popover>
                    </FlatButton>

                <MenuItem disabled
                    primaryText={
                        <ul className='drawer-item' style={{color: 'gray', marginTop: 0}}>
                            {this.state.user.username}
                        </ul>
                    }
                />
                <MenuItem disabled
                    primaryText={
                        <ul className='drawer-item' style={{color: 'gray', marginTop: 0}}>
                            {this.state.user.email}
                        </ul>
                    }
                />
                <Divider/>
                <MenuItem style={{marginTop:20}}
                    leftIcon={<img src={battlenet} />}
                    primaryText='Battle.net'
                    onClick={() => { this.props.selectedOptionCallback('battlenet') }}
                />
                <MenuItem style={{marginTop:20}}
                    leftIcon={<img src={leagueoflegends} />}
                    primaryText='League of Legends'
                    onClick={() => { this.props.selectedOptionCallback('lol') }}
                />
                <MenuItem style={{marginTop:20}}
                    leftIcon={<img src={steam} />}
                    primaryText='Steam'
                    onClick={() => { this.props.selectedOptionCallback('steam') }}
                />
                <div className='sidebar-bottom-item'>
                    <Divider/>
                    <MenuItem
                        leftIcon={<FontIcon className="material-icons" >power_settings_new</FontIcon>}
                        primaryText="Sair" onClick={auth.logout}
                    />
                </div>
            </Drawer>
            </div>
        );
    }
}

export default LeftDrawer;
