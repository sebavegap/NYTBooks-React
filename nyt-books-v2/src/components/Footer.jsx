import React from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import logo from '../assets/imgs/Logo-Libros1.png';

const Footer = () => {
  return (
    <footer className="footer mt-auto">
      <Navbar bg="dark" variant="dark" className="pt-3">
        <Container fluid className="justify-content-around">
          <Row>
            <Col>
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
            </Col>
            <Col>
              <div className="navbar-nav text-white">
                <p>
                  All info provided by{' '}
                  <a href="https://developer.nytimes.com/">The New York Times Books API</a>
                </p>
              </div>
            </Col>
            <Col>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </footer>
  );
};

export default Footer;