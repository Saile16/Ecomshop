import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

import FormContainer from "../components/FormContainer.jsx";
import { useParams } from "react-router-dom";
import { startGettingUserProfile } from "../store/userProfile/thunks.js";
import { userUpdateAdminReset } from "../store/userUpdateAdmin/userUpdateAdminSlice.js";
import { startUpdatingUserAsAdmin } from "../store/userUpdateAdmin/thunks.js";

const UserEditScreen = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, errorMessage, user } = userProfile;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    errorMessage: errorUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch(userUpdateAdminReset());
      navigate("/admin/userlist");
    } else {
      if (!user.name || user._id !== Number(id)) {
        dispatch(startGettingUserProfile(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, id, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      startUpdatingUserAsAdmin({
        _id: user._id,
        name,
        email,
        isAdmin,
      })
    );
  };
  return (
    <div>
      <Link to={`/admin/userlist`}>Go back</Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : errorMessage ? (
          <Message variant="danger">{errorMessage}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Email"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default UserEditScreen;
