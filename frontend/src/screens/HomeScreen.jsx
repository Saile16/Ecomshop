import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product.jsx";

import { startGettingProducts } from "../store/products/thunks.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGettingProducts());
    console.log("useffect");
  }, [dispatch]);

  const { products, loading, errorMessage } = useSelector(
    (state) => state.products
  );

  return (
    <div>
      {/* {JSON.stringify(products)} */}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : errorMessage ? (
        <Message variant="danger">{errorMessage}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Product key={product.name} product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomeScreen;
