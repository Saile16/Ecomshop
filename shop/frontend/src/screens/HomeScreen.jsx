import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product.jsx";

import { startGettingProducts } from "../store/products/thunks.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import { useLocation } from "react-router-dom";
import Paginate from "../components/Paginate.jsx";
import ProductCarousel from "../components/ProductCarousel.jsx";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  let keyword = location.search;

  useEffect(() => {
    dispatch(startGettingProducts(keyword));
    console.log("useffect");
  }, [dispatch, keyword]);

  const { products, loading, errorMessage, page, pages } = useSelector(
    (state) => state.products
  );

  return (
    <div>
      {/* {JSON.stringify(products)} */}
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : errorMessage ? (
        <Message variant="danger">{errorMessage}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </>
      )}
    </div>
  );
};

export default HomeScreen;
