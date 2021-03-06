import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import Loading from "../../Sheared/Loading/Loading";
import SocialLogin from "../SocialLogin/SocialLogin";
import login from "../../../images/Login.jpg";
import users from "../../../images/user.jpg";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef("");
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, resetError] =
    useSendPasswordResetEmail(auth);

  if (loading || sending) {
    return <Loading />;
  }

  if (user) {
    // navigate(from, { replace: true });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    await signInWithEmailAndPassword(email, password);

    // create / POST Method
    // http://localhost:5000/
    // https://quiet-sierra-51150.herokuapp.com/
    await fetch("https://quiet-sierra-51150.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("accessToken", data.accessToken);
        navigate(from, { replace: true });
        event.target.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // ------------------------------------
  };

  const resetPassword = async () => {
    const email = emailRef.current.value;
    await sendPasswordResetEmail(email);
    toast("Sent email");
  };

  return (
    <div className="container mb-5">
      <div className="w-100">
        <img
          style={{ height: "300px" }}
          src={users}
          className="img-fluid d-block mx-auto"
          alt=""
        />
      </div>
      <div className="card mb-5  border-0">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={login}
              className="img-fluid rounded-start d-md-block d-none"
              alt="..."
            />
          </div>
          <div className="col-md-6 mt-5">
            <Form onSubmit={handleSubmit} className="w-100 p-5 mx-auto">
              <h1 className="text-primary text-center mt-2">Please Login</h1>
              <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                <Form.Control
                  required
                  ref={emailRef}
                  type="email"
                  name="email"
                  className=""
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  required
                  type="password"
                  name="password"
                  className=""
                  placeholder="Password"
                />
              </Form.Group>
              <p className="text-danger">{error?.message}</p>
              <p className="text-danger">{resetError?.message}</p>
              <Form.Group
                className="mb-3"
                controlId="formBasicCheckbox"
              ></Form.Group>
              <Button
                className="w-100 rounded-pill d-block mx-auto fs-5 mb-4"
                variant="primary"
                type="submit"
              >
                Login
              </Button>
            </Form>
            <p className=" text-center mt-2">
              New User?
              <Link
                to="/signup"
                className="text-primary text-decoration-none px-2"
              >
                Please Register
              </Link>
            </p>
            <p className=" text-center mt-2">
              Forget Password?
              <Link
                to="/login"
                onClick={resetPassword}
                className="text-primary text-decoration-none px-2"
              >
                Reset Password
              </Link>
            </p>
            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
