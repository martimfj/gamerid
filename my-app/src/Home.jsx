import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import logo from './logo.png';
import auth from './helpers/auth.js'
import NotesContainer from './NotesContainer'

import Navbar from './Navbar'

// import 'materialize-css/dist/css/materialize.css'



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user : auth.getUser(),
            drawer : true,
            filter : 'all'
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
        return (
            <div>
                <Navbar toggleDrawer={this.toggleDrawer} setFilter={this.setFilter}/>
                <NotesContainer margin={this.state.drawer} filter={this.state.filter}/>
            </div>
        );
    }
}

export default Home;