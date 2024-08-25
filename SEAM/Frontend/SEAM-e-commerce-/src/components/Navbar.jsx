import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping,faMagnifyingGlass ,faUser} from '@fortawesome/free-solid-svg-icons'

import {useState, useEffect} from 'react';

function NavScrollExample() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Load the cart count from local storage when the component mounts
    let productNumbers = localStorage.getItem('cartItems');

    if (productNumbers) {
      setCartCount(parseInt(productNumbers));
    }
  }, []);




  return (
    <Navbar expand="lg" className="bg-body-tertiary fixed-top shadow">
      <Container fluid className="mx-5">
        <Navbar.Brand className="nav-brand" href="/">E-commerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >

            <NavDropdown title="Category" id="navbarScrollingDropdown" >
              <NavDropdown.Item href="#action3">Bike</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Laptop
              </NavDropdown.Item>
              <NavDropdown.Item href="#action5">
                Smart Phone
              </NavDropdown.Item>
            </NavDropdown>
          <Link to="/addProduct" className="text-bold mx-3 mt-2 text-decoration-none text-black "> Sell Product </Link>
          </Nav>


          <Form className="d-flex" >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              name="search"
              aria-label="Search"
            />
            <Button variant="outline-info" className="rounded-circle"> <FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
          </Form>
          
          <Nav className="ms-auto my-2 my-lg-0">
            
            <Link to="/ordering" className="navbar-cart text-bold mx-2 text-decoration-none "><FontAwesomeIcon icon={faCartShopping} color="black"/> Cart <span>{cartCount}</span> </Link>
            <Link to="/login" className="text-bold mx-2 text-decoration-none "> <FontAwesomeIcon icon={faUser} color="black"/> Login </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;