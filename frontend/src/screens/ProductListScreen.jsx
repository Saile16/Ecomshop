import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link, LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";

import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

import { useDispatch, useSelector } from "react-redux";
import {
  startCreatingProduct,
  startDeletingProduct,
  startGettingProducts,
} from "../store/products/thunks.js";
import { productDeleteReset } from "../store/products/productDeleteSlice.js";
import { productCreateReset } from "../store/products/productCreateSlice.js";
import Paginate from "../components/Paginate.jsx";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.products);
  const { loading, errorMessage, products, pages, page } = productList;
  // console.log(productList);

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    errorMessage: errorDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    errorMessage: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const user = useSelector((state) => state.userAuth);
  const { userInfo } = user;

  //   console.log(userInfo);

  let keyword = useLocation().search;

  useEffect(() => {
    dispatch(productCreateReset());
    if (!userInfo.isAdmin) {
      navigate("/login");
      return;
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(productDeleteReset());
      dispatch(startGettingProducts(keyword));
    }
  }, [
    dispatch,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    keyword,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(startDeletingProduct(id));
    }
  };

  const createProductHandler = (product) => {
    //Create Product
    dispatch(startCreatingProduct());
  };
  // console.log(products);
  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : errorMessage ? (
        <Message variant="danger">{errorMessage}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {products?.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>
                    <LinkContainer to={`/product/${product._id}`}>
                      <p>{product.name}</p>
                    </LinkContainer>
                  </td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </div>
  );
};

export default ProductListScreen;
