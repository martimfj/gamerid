import React, { Component } from 'react';
import logo from './logo.svg';
import {NavBar, Icon} from 'react-materialize'
import './App.css';

class App extends Component {
  render() {
    return (
      <html>
      </html>
    );
  }
}

class NavigationBar extends Component  {
  render() {
    return (
      <Navbar brand='logo' left>
        <NavItem href='get-started.html'>Getting started</NavItem>
        <NavItem href='components.html'>Components</NavItem>
      </Navbar>
    );
  }
}

class SideBar extends Component {
  render() {
    return (
      <div>
        <ul id="slide-out" class="side-nav">
        <li><a class="subheader">Categorias</a></li>      
        <li><a href="#tag-modal" class="waves-effect waves-light modal-trigger"><i class="material-icons">add</i>Nova Categoria</a></li>
        <li><a href="#tag-modal-remove" class="waves-effect waves-light modal-trigger"><i class="material-icons">clear</i>Remover Categoria</a></li>
        <li><a href="#tag-modal-edit" class="waves-effect waves-light modal-trigger"><i class="material-icons">arrow_forward</i></a></li>
        </ul>
      </div>
    );
  }
}

export default App;
