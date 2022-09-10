import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Message from "../components/Message.jsx";
import CheckoutSteps from "../components/CheckoutSteps.jsx";
import { startCreatingOrder } from "../store/order/thunks.js";
import { orderCreateReset } from "../store/order/orderSlice.js";

const PlaceOrderScreen = () => {
  const orderCreate = useSelector((state) => state.orderCreate);
  // console.log(orderCreate);
  const { order, success, errorMessage } = orderCreate;
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  //   cart.itemsPrice = cart.cartItems
  //     .reduce((acc, item) => acc + item.price * item.qty, 0)
  //     .toFixed(2);

  const cartTemporal = Object.assign({}, cart, {
    itemsPrice: cart.cartItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2),
  });
  cartTemporal.shippingPrice = cartTemporal.itemsPrice > 100 ? 0 : 10;
  cartTemporal.taxPrice = Number(0.082 * cartTemporal.itemsPrice).toFixed(2);
  cartTemporal.totalPrice = (
    Number(cartTemporal.itemsPrice) +
    Number(cartTemporal.shippingPrice) +
    Number(cartTemporal.taxPrice)
  ).toFixed(2);
  //   const cartTemporalShippingPrice = (
  //     cartTemporalPrice.itemsPrice > 100 ? 0 : 10
  //   ).toFixed(2);;
  //   console.log(cartTemporalShippingPrice);
  //   console.log(cartTemporalOrder, cart);
  const dispatch = useDispatch();
  const placeOrder = () => {
    dispatch(
      startCreatingOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cartTemporal.itemsPrice,
        shippingPrice: cartTemporal.shippingPrice,
        taxPrice: cartTemporal.taxPrice,
        totalPrice: cartTemporal.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch(orderCreateReset());
    }
  }, [success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country},{" "}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Item:</Col>
                  <Col>${cartTemporal.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cartTemporal.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cartTemporal.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${cartTemporal.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {errorMessage && (
                  <Message variant="danger">{errorMessage}</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
