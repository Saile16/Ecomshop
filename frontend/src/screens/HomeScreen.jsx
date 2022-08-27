import { useState, useEffect } from "react";

import { Row, Col } from "react-bootstrap";
import Product from "../components/Product.jsx";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios("http://127.0.0.1:8000/api/products/");

      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {/* {JSON.stringify(products)} */}
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Product key={product.id} product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeScreen;
