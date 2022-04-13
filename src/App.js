// import "./App.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "./firebase.init";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import { Button, Form } from "react-bootstrap";

const auth = getAuth(app);

function App() {
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(password)) {
      setError("Password must not contain Whitespaces.");
      return;
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(password)) {
      setError("Password must have at least one Uppercase Character.");
      return;
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(password)) {
      setError("Password must have at least one Lowercase Character.");
      return;
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(password)) {
      setError("Password must contain at least one Digit.");
      return;
    }

    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(password)) {
      setError("Password must contain at least one Special Symbol.");
      return;
    }

    const isValidLength = /^.{10,16}$/;
    if (!isValidLength.test(password)) {
      setError("Password must be 10-16 Characters Long.");
      return;
    }
    setValidated(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    console.error("Hacked", email, password);
    event.preventDefault();
  };

  return (
    <div className="App">
      <div className="registration w-50 mx-auto mt-5">
        <h2 className="text-primary ">Registration</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handleEmail}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={handlePass}
              type="password"
              placeholder="Password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <p className="text-danger">Error: {error}</p>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
