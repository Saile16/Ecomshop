import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import Loader from "../components/Loader.jsx";
import {
  startDeliveringOrder,
  startGettingOrderDetails,
  startPayingOrder,
} from "../store/order/thunks.js";
import { orderPayReset } from "../store/order/orderPay.js";
import PaypalCheckoutButton from "../components/PaypalCheckoutButton.jsx";
import { orderDeliveredReset } from "../store/order/orderDeliveredSlice.js";

const OrderScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, errorMessage } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  //   console.log(order);

  const orderDelivered = useSelector((state) => state.orderDelivered);
  const { loading: loadingDelivered, success: successDelivered } =
    orderDelivered;

  const userAuth = useSelector((state) => state.userAuth);
  const { userInfo } = userAuth;

  const orderTemporal = Object.assign({}, order, {});
  orderTemporal.itemsPrice = order.orderItems
    ?.reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  //PAYPAL
  //AfAq6-vbu_A5Z59iTqNGVn9EuSuFuA4n1hout5Hk-eMi0y27JGrJuboHcT6g2wAuOzIRzxhSH1yViKIg

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    }
    if (!order || successPay || order._id !== Number(id) || successDelivered) {
      // if (!order || order._id !== Number(id)) {
      dispatch(orderPayReset());
      dispatch(orderDeliveredReset());
      dispatch(startGettingOrderDetails(id));
      return;
    }
  }, [dispatch, id, order, successPay, successDelivered]);

  const deliverHandler = () => {
    dispatch(startDeliveringOrder(order));
  };
  return loading ? (
    <Loader />
  ) : errorMessage ? (
    <Message variant="danger">{errorMessage}</Message>
  ) : (
    <div>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user?.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user?.email}`}>{order.user?.email}</a>
              </p>
              <p>
                <strong>Shipping: </strong>
                {order.shippingAddress?.address}, {order.shippingAddress?.city}{" "}
                {order.shippingAddress?.postalCode},{" "}
                {order.shippingAddress?.country},{" "}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems?.length === 0 ? (
                <Message variant="info">Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems?.map((item, index) => (
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
                  <Col>${orderTemporal.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  <PaypalCheckoutButton amount={order.totalPrice} id={id} />
                </ListGroup.Item>
              )}
            </ListGroup>
            {loadingDelivered && <Loader />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroup.Item className="p-2">
                  <Button
                    onClick={deliverHandler}
                    type="button"
                    className="btn d-block w-100"
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;
