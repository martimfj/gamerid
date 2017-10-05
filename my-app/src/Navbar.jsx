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
            show : false
        }
        {/* user : auth.getUser(), */}
    }
    
    componentWillMount() {
        this.mql.addListener(this.mediaQueryChanged)
        this.setState({mql:this.mql, docked : this.mql.matches})
    }

    componentDidMount() {
        /*this.photoInput.addEventListener('change', (e) => {
            this.addPicture(e)
        })*/
    }
    

    mediaQueryChanged() {
        this.setState({
        docked: this.mql.matches,
        open: this.mql.matches
        })
    }

    toggleDrawer = () => {
        this.drawer.setState( { open : !this.drawer.state.open })
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

    /*addPicture = (e) => {
        let file = e.path[0].files[0]
        if (file) {
            if (file.size > 2000000) {
                this.setState({ errorText : "Imagem muito pesada, o tamanho máximo é 2MB" })
            } else {
                this.setState({ errorText : "", imageIsLoading : true })
                store.uploadImage(file,(result) => {
                    console.log(result)
                    let newImages = this.state.images
                    newImages[result.data.id] =
                        <div key={result.data.id} image={result.data} className='hover-container'>
                            <img className='note-input-img'  src={result.data.link} />
                            <div className='hover-overlay' 
                                style={{width : result.data.width > 350 ? 350 : result.data.width}}
                            />
                            <div className='hover-button'>
                                <IconButton 
                                    id={result.data.id} 
                                    onClick={() => {
                                        this.setState({ images : { ...this.state.images,[result.data.id] : null } })
                                    }}
                                >
                                    <FontIcon className="material-icons" > delete </FontIcon>
                                </IconButton>
                            </div>
                        </div>
                    this.setState({images : newImages, imageIsLoading : false })
                })
            }    
        }
    }*/

    render() {
        return (
            <div>
            <div key='navbar' className="navbar-fixed" style={{backgroundColor:'#ffca28', zIndex: 5}}>
                <nav className="nav">
                    <div id="navbar" className="nav-wrapper sticky">
                        <ul>
                            <div className="middleimg center logo" style={{height:50}}>
                                <img className='logo' src={logo} width={50}/> 
                            </div>
                        </ul>

                        <ul className="left">
                        <li>
                            <div className="row valign-wrapper">
                                <a onClick={this.toggleDrawer}>
                                    <FontIcon style={{color: 'white'}} className="material-icons">dehaze</FontIcon>
                                </a>
                            </div>
                        </li>
                        </ul>

                        <ul className="right">
                            <li>
                                <IconButton onClick={this.handleLockPress}>
                                    <FontIcon className="material-icons" > refresh </FontIcon>
                                </IconButton>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            {/*  SIDEBAR  */}

            <Drawer
                key='sidebar'
                docked={this.state.docked}
                containerClassName='drawer'
                width={250}
                ref={ (Drawer) => { this.drawer = Drawer } } >
                
                    <FlatButton style={{height:'auto',lineHeight:'none'}}
                        onTouchTap={this.handleTouchTap}
                        hoverColor={ 'rgba(130,130,130,0.1)' }>
                        <Avatar src='http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/588.png' className='userImg' />
                        <Popover
                            open={this.state.open}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'middle', vertical: 'top'}}
                            onRequestClose={this.handleRequestClose}
                        >
                            <Menu>
                                <MenuItem primaryText="Selecionar Imagem de Perfil" />
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
                    onClick={() => { this.props.setFilter('battlenet') }}
                />
                <MenuItem style={{marginTop:20}}
                    leftIcon={<img src={leagueoflegends} />}
                    primaryText='League of Legends'
                    onClick={() => { this.props.setFilter('leagueoflegends') }}
                />
                <MenuItem style={{marginTop:20}}
                    leftIcon={<img src={steam} />}
                    primaryText='Steam'
                    onClick={() => { this.props.setFilter('steam') }}
                />

                {/* final da navbar */}
                <div className='sidebar-bottom-item'>
                    <Divider/>
                    {/*<MenuItem
                        leftIcon={<FontIcon className="material-icons" >settings</FontIcon>} 
                        primaryText="Configurações"
                    />*/}
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

export default Navbar;