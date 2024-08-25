import React, { useEffect, useState } from 'react';
import NavScrollExample from '../Navbar';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from '../AxiosRequests/BaseUrl';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('productsInCart')) || [];
    setCartItems(storedCartItems);

    const storedTotalCost = JSON.parse(localStorage.getItem('totalCost')) || 0;
    setTotalCost(storedTotalCost);
  }, []);

  useEffect(() => {
    const updatedTotalCost = calculateNetTotal();
    setTotalCost(updatedTotalCost);
    localStorage.setItem('totalCost', JSON.stringify(updatedTotalCost));
  }, [cartItems]);

  const calculateNetTotal = () => {
    let netTotal = 0;
    let shippingFee = 0; // Update this value as needed
    for (const product of cartItems) {
      netTotal += product.quantity * product.discounted_price;
    }
    netTotal += shippingFee;
    return netTotal.toFixed(2); // Assuming you want two decimal places
  };

  const updateQuantity = (index, action) => {
    const updatedCartItems = [...cartItems];
    if (action === 'increase') {
      updatedCartItems[index].quantity++;
    } else if (action === 'decrease' && updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity--;
    }
    setCartItems(updatedCartItems);
    localStorage.setItem('productsInCart', JSON.stringify(updatedCartItems));
  };

  const deleteItem = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem('productsInCart', JSON.stringify(updatedCartItems));

    const updatedTotalCost = calculateNetTotal();
    setTotalCost(updatedTotalCost);
    localStorage.setItem('totalCost', JSON.stringify(updatedTotalCost));
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post('/api/token/refresh', {
        refresh: JSON.parse(localStorage.getItem('refresh_token'))
      });
      const { access } = response.data;
      localStorage.setItem('access_token', JSON.stringify(access));
      return access;
    } catch (error) {
      console.error('Failed to refresh token', error);
      toast.error('Session expired. Please log in again.');
      navigate('/login');
      return null;
    }
  };

  const makeOrderRequest = async (order, token) => {
    return await axios.post('/order', order, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const handleCheckout = async () => {
    let token = JSON.parse(localStorage.getItem('access_token'));

    const order = {
      Delivery_destination: shippingAddress,
      product_details: JSON.parse(JSON.stringify(cartItems.map((product) => ({ id: product.id, quantity: product.quantity })))),
      GrandTotal: parseFloat(totalCost),
    };

    try {
      let response = await makeOrderRequest(order, token);

      if (response.status === 201) {
        toast.success("Order Placed Successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        console.log('Failed to create the order');
      }
    } catch (error) {
      if (error.response && error.response.data.code === 'token_not_valid') {
        token = await refreshToken();
        if (token) {
          try {
            const response = await makeOrderRequest(order, token);
  
            if (response.status === 201) {
              toast.success("Order Placed Successfully");
              setTimeout(() => {
                navigate("/");
              }, 2000);
            } else {
              console.log('Failed to create the order');
            }
          } catch (error) {
            console.log('Error during checkout:', error);
            toast.error("Bad Request");
          }
        }
      } else {
        console.log('Error during checkout:', error);
        toast.error("Bad Request");
      }
    }
  };

  const TopMargin = {
    marginTop: '80px',
  };

  const CheckoutStyle = {
    marginLeft: 'auto',
  };

  const CartContainer = {
    height: '100px',
    width: '100px',
    borderRadius: '15px',
  };

  const ButtonPro = {
    border: "1px solid black",
  };

  return (
    <>
      <ToastContainer />
      <NavScrollExample />
      <div className="cart" style={TopMargin}>
        <h3 className="text-center"> Your Cart </h3>
        <Row className="mx-5 mt-5">
          <Col xs={6} className="fw-bold">
            PRODUCT
          </Col>
          <Col xs={2} className="fw-bold">
            PRICE
          </Col>
          <Col xs={2} className="fw-bold">
            QUANTITY
          </Col>
          <Col xs={2} className="fw-bold">
            TOTAL
          </Col>
        </Row>
        <hr />
        {cartItems.length === 0 ? (
          <h4 className="text-center text-success"> Cart is Empty. </h4>
        ) : (
          cartItems.map((product, index) => (
            <div key={index}>
              <Row className="mx-5">
                <Col xs={6}>
                  <Row>
                    <Card.Img src={'http://localhost:8000' + product.product_image} style={CartContainer} />
                    <Col className="mx-2 mt-4">{product.product_title}</Col>
                  </Row>
                </Col>
                <Col xs={2}>
                  {product.discounted_price}
                </Col>
                <Col xs={2}>
                  <button className="button-pro btn btn-sm" style={ButtonPro} onClick={() => updateQuantity(index, 'decrease')}>
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="fw-bold">{product.quantity}</span>
                  <button className="button-pro btn btn-sm" style={ButtonPro} onClick={() => updateQuantity(index, 'increase')}>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </Col>
                <Col>
                  {product.quantity * product.discounted_price}
                </Col>
                <Col>
                  <button className="btn btn-danger" onClick={() => deleteItem(index)}>Delete</button>
                </Col>
              </Row>
              <br />
            </div>
          ))
        )}
        {cartItems.length === 0 ? null : (
          <>
            <hr />
            <Row className="mx-5">
              <Col xs={2} className="fw-bold text-end offset-md-8">
                Net Total:
              </Col>
              <Col className="fw-bold">{totalCost}</Col>
            </Row>
            <br />
            <Col className="offset-md-8 fw-bold">
              <Row className='mx-5'>
                <Col xs={5}>
                  Shipping Address:
                </Col>
                <Col xs={5}>
                  <input
                    type="text"
                    className="form-control"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                  />
                </Col>
              </Row>
            </Col>
            <br />
            <Col className="offset-md-10">
              <Button variant="primary" className="checkout" style={CheckoutStyle} onClick={handleCheckout}>
                Checkout
              </Button>
            </Col>
          </>
        )}
      </div>
    </>
  );
}
