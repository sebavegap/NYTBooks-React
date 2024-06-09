import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import logo from '../assets/imgs/Logo-Libros1.png';

const Header = () => {
  return (
    <header className="header">
      <Navbar bg="dark" variant="dark" sticky="top" expand="lg" className="mb-5 pb-2">
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              src={logo}
              alt=""
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            NYT Best Sellers
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <NavDropdown title="Categories" id="navbarDropdown">
              <NavDropdown.Item href="#">Action</NavDropdown.Item>
              <NavDropdown.Item href="#">Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;