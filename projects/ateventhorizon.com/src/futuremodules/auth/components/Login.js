import React, {Fragment, useState} from "react";
import {Link, Redirect} from "react-router-dom";

import {api, useApi} from "../../api/apiEntryPoint";
import {loginUser} from "../authApiCalls";

const Login = () => {
  const [formData, setFromData] = useState({
    email: "",
    password: "",
    project: ""
  });

  const authApi = useApi('auth');
  const [auth] = authApi;

  if ( auth ) {
    return <Redirect to="/dashboarduser" />;
  }

  const { email, password } = formData;
  const onChange = e =>
    setFromData({
      ...formData,
      [e.target.name]: e.target.value
    });

  const performLogin = (ev) => {
    ev.preventDefault();
    api(authApi, loginUser, email, password);
  };

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-info">
          <br />
          Login
        </h1>
        <p className="lead">
          <span className="text-warning"><i className="fas fa-user" /></span> Log-in Into Your Account
        </p>
        <form className="form" onSubmit={(ev) => performLogin(ev)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              autoComplete="email"
              name="email"
              value={email}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={e => onChange(e)}
              minLength="6"
            />
          </div>
          <input type="submit" className="btn btn-info" value="Login" />
        </form>
        <p className="my-3">
          Don't have an account? <Link to="/register"><span className="text-info">Sign Up</span></Link>
        </p>
      </section>
    </Fragment>
  );
};

export default Login;
