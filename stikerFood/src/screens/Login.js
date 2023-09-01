import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let navigate=useNavigate()
  const handleSubmit = async (e) => {
    //synthetic event preventDefault
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
    }
    if (json.success) {
      navigate("/");
      localStorage.setItem("authToken",json.authToken)
      localStorage.setItem("userEmail",credentials.email)
    }
    
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
          <Link to="/createuser" className="btn btn-danger mt-3">
            I'm a new   user
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
