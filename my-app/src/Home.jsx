import React, { Component } from 'react';
import logo from './icons/logo.png';
import auth from './helpers/auth.js';
import { Grid, Col, Row} from 'react-bootstrap';
import Navbar from './Navbar';
import LeagueOfLegends from './LeagueOfLegends.jsx';
import Steam from './Steam.jsx';
import Battlenet from './Battlenet.jsx';
import LeftDrawer from './drawer';

// import 'materialize-css/dist/css/materialize.css'



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user : auth.getUser(),
            drawer : true,
            filter : 'all',
            wichGame: '',
        }
        this.returnGameComponent = this.returnGameComponent.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    returnGameComponent(){
      if (this.state.wichGame === 'lol') {
        return (
          <LeagueOfLegends />
        );
      }
      else if (this.state.wichGame === 'steam') {
        return (
          <Steam />
        );
      } else if (this.state.wichGame === 'battlenet') {
        return ( <Battlenet />);
      }
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
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/>
                <Navbar toggleDrawer={this.toggleDrawer} setFilter={this.setFilter}/>
                <Grid>
                  <Row>
                      { this.state.drawer ?
                        <Col md={3}>
                        <LeftDrawer
                          selectedOptionCallback = {
                            (game) => {
                              this.setState({wichGame:game});
                            }
                          }
                        />
                         </Col>
                        :
                        ''
                      }
                    <Col md={this.state.drawer ? 9 : 12}>
                      {this.returnGameComponent()}
                    </Col>
                  </Row>
                </Grid>
                {/* <NotesContainer margin={this.state.drawer} filter={this.state.filter}/> */}
            </div>
        );
    }
}

export default Home;
