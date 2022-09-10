import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";

import Message from "../components/Message";

import { startAddingToCart, startRemovingFromCart } from "../store/cart/thunks";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  // console.log(cartItems);
  const userLogin = useSelector((state) => state.userAuth);
  const { userInfo } = userLogin;

  const removeFromCartHandler = (productId) => {
    dispatch(startRemovingFromCart(productId));
  };

  const checkoutHandler = () => {
    if (userInfo) {
      //   window.location.href = redirect;
      navigate("/shipping");
      return;
    }
    navigate("/login?redirect=shipping");
    // history.push('/login?redirect=shipping')

    //   const checkoutHandler = () => {
    //     if(!userInfo){
    //        navigate('/login')
    //     } else{
    //        navigate('/shipping')
    //     }
    //  }
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={`http://127.0.0.1:8000${item.image}`}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link
                      to={`/product/${item._id}`}
                      style={{
                        textDecoration: "unset",
                      }}
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      // el e.target.value tiene que ser un numero podriamos rodearlo con un Number
                      //o poner un parseInt ya lo hicimos dentro de la funcion startAddingToCart
                      onChange={(e) =>
                        dispatch(startAddingToCart(item, e.target.value))
                      }
                    >
                      {/* de esta manera podemos crear un dropdown con la cantidad de items en nuestra
                          db */}
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                SubTotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item className="p-2">
            <Button
              type="button"
              className="btn-block d-block w-100"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;