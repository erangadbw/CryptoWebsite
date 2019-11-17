import React, {Component} from 'react';

import {Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
 .navbar {
   background-color:#222;
 }

.navbar-brand, .navbar-nav .nav-link {
  color:#bbb;

  &:hover {
    color: white;
  }
}
`;

export class NavigationBar extends Component {
  render(){
    return(
    <Styles>
      <Navbar expand ="lg">
        <Navbar.Brand >Crypto Price </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      </Navbar>
    </Styles>
  )};
}
