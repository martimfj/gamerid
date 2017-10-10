import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import logo from './icons/logo.png';
import auth from './helpers/auth.js'
import leagueprofile from './helpers/leagueoflegends.js'
import NotesContainer from './NotesContainer'

import Navbar from './Navbar'
import LeagueOfLegends from './LeagueOfLegends.jsx'
import Steam from './Steam.jsx'
import Battlenet from './Battlenet.jsx'

// import 'materialize-css/dist/css/materialize.css'



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user : auth.getUser(),
            drawer : true,
            filter : ''
        }
            
    }

    componentWillMount() {

    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    toggleDrawer = () => {
        this.setState({drawer : !this.state.drawer})
    }

    setFilter = (filter) => {
        this.setState({ filter : filter })
    }

    render() {
        if (this.state.filter === 'leagueoflegends') {
            return (
                <div>
                <Navbar toggleDrawer={this.toggleDrawer} setFilter={this.setFilter}/>
                <LeagueOfLegends />
                </div>
            );
        }

        else if (this.state.filter === 'steam') {
            return (
                <div>
                <Navbar toggleDrawer={this.toggleDrawer} setFilter={this.setFilter}/>
                <Steam />
                </div>
            );
        }

        else if (this.state.filter === 'battlenet') {
            return (
                <div>
                <Navbar toggleDrawer={this.toggleDrawer} setFilter={this.setFilter}/>
                <Battlenet />
                </div>
            );
        }

        else if (this.state.filter === '') {
            return (
                <div>
                <Navbar toggleDrawer={this.toggleDrawer} setFilter={this.setFilter}/>
                </div>
            );
        }
    }
}

export default Home;