import React, { Component } from 'react';
import './App.css';
import Headlines from './Headlines.js';
import Following from './following.js';
import {  
  
  Collapse,
  Container, 
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  } from 'reactstrap';
import { BrowserRouter as Router, Route} from 'react-router-dom';
var Infinite = require('react-infinite');
var apiKey = "d418a65c0c38453da8d0ee0eae5467e0";


class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
      return (
        <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Breaking News</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Headlines</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/following">Following</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
          <Container>
            
          
          <Router>
            <div>
              <Route exact path="/" component={Headlines}/>
              <Route path="/following" component={Following}/>
            </div>
          </Router>
          </Container>
        </div>

      );
    }
  }

export default App;
