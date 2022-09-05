import { useEffect, useState } from "react";
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
import Rating from "../components/Rating";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { startGettingProductDetail } from "../store/products/thunks";

import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../store/cart/cartSlice";
import { startAddingToCart } from "../store/cart/thunks";
// import { startAddingProductsCart } from "../store/cart/thunks";

const ProductScreen = () => {
  //catidad de productos que se va a comprar el user cambiara este valor por dropdown

  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGettingProductDetail(id));
  }, [dispatch, id]);

  const { product, loading, errorMessage } = useSelector(
    (state) => state.productDetails
  );

  const addToCartHandler = () => {
    dispatch(startAddingToCart(product, qty));
    navigate("/cart");
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : errorMessage ? (
        <Message variant="danger">{errorMessage}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image
              src={`http://127.0.0.1:8000${product.image}`}
              alt={product.name}
              fluid
            />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={`#f8e825`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col xs="auto" className="my-1">
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {/* de esta manera podemos crear un dropdown con la cantidad de items en nuestra
                          db */}
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="d-block w-100"
                    disabled={product.countInStock <= 0}
                    type="button"
                  >
                    Add to Card
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProductScreen;
