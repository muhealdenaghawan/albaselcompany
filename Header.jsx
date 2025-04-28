import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
const Header = () => {
  return (
    <header>
        <div className='container'>
        <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="/" className='logo'><span>Al-Basel</span> Contracting Company</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className='nav-link'>Home</Nav.Link>
            <Nav.Link href="/about" className='nav-link'>About Us</Nav.Link>
            <Nav.Link href="#" className='nav-link'>Services</Nav.Link>
            <Nav.Link href="#" className='nav-link'>Projects</Nav.Link>
            {/* <Nav.Link href="#link" className='nav-link'>Blogs</Nav.Link> */}
            <Nav.Link href="#" className='nav-link'>Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
        </div>
    </header>
  )
}

export default Header
