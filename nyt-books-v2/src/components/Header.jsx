import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import logo from '../assets/imgs/Logo-Libros1.png';
import { useBooks } from '../context/BooksContext';

const Header = () => {
  const navigate = useNavigate();
  const { categories } = useBooks();

  const handleCategoryClick = (category) => {
    navigate('/', { state: { scrollTo: category } });
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <Navbar bg="dark" variant="dark" sticky="top" expand="lg" className="mb-5 pb-2">
        <Container fluid>
          <Navbar.Brand onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
            <img
              src={logo}
              alt=""
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            NYT Best Sellers
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={handleHomeClick}>Home</Nav.Link>
              <NavDropdown title="Categories" id="navbarDropdown" align="end">
                {categories.map((category, index) => (
                  <NavDropdown.Item
                    key={index}
                    onClick={() => handleCategoryClick(category.list_name)}
                  >
                    {category.list_name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;