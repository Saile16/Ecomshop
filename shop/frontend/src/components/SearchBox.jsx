import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      // navigate(`/?keyword=${keyword}`);
      navigate(`/?keyword=${keyword}&page=1`);
    } else {
      navigate(location.pathname);
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        value={keyword}
        placeholder="Search Products..."
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2 m-2">
        Submit
      </Button>
    </Form>
  );
};

export default SearchBox;