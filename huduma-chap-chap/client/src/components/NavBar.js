import React from 'react';
import './nav.css'
import { FaTools,} from "react-icons/fa"

import {Link} from 'react-router-dom';
import { Navbar,  NavDropdown, Nav, } from 'react-bootstrap';
const navStyle = {
    "paddingRight": "45px"
  }  
  const titleStyle = {
    "fontFamily" : "Quicksand",
    "fontWeight": "",
    "paddingTop": "5px",
    "fontColor" : "grey"
  }
  const navbarStyle = {
    "padding" : "20px"
  }

const theNavbar = (props) =>{
    return (<div>
    <Navbar bg="white" expand="lg">
    <Navbar.Brand href="#home"> <FaTools/>  eService</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto" style ={navStyle} >
    <Nav.Link href="/"> &nbsp;  Home</Nav.Link> 
        <Nav.Link>&nbsp;Operations</Nav.Link>
        <NavDropdown title="More Services" id="basic-nav-dropdown" >
          <NavDropdown.Item href="#action/3.2">Product 1</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  </div>
    );

}

export default theNavbar;