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

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      page: 'Headlines'
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {
    let page = null;
    switch (this.state.page) {
    case 'Headlines':
      page = <Headlines />;
      break
    case 'Following':
      page = <Following />;
      break
    default:
      page = <Headlines />;
  }
      return (
        <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Breaking News</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink onClick={(e) => this.setState({page: 'Headlines'})}>Headlines</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={(e) => this.setState({page: 'Following'})}>Following</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
          <Container>
          {page}
          
          </Container>
        </div>

      );
    }
  }

export default App;
