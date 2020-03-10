import React, {Fragment, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {api, movieWarning, useApi} from "../../api/apiEntryPoint";
import {registerUser} from "../authApiCalls";

const Register = () => {
  const [formData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const authApi = useApi('auth');
  const [auth, , , alertStore] = authApi;

  if ( auth ) {
    return <Redirect to="/dashboarduser" />;
  }

  const { name, email, password, password2 } = formData;
  const onChange = e =>
    setFromData({
      ...formData,
      [e.target.name]: e.target.value
    });
  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      movieWarning(alertStore, "Passwords do not match");
    } else {
      api( authApi, registerUser, name, email, password );
    }
  };

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-info">
          <br />
          Sign Up
        </h1>
        <p className="lead">
          <span className="text-warning"><i className="fas fa-user" /></span> Create Your Account
        </p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => onChange(e)}
            />
            <small className="form-text" />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              minLength="6"
              autocomplete="new-password"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={e => onChange(e)}
              minLength="6"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-3">
          Already have an account? <Link to="/login"><span className="text-info">Sign In</span></Link>
        </p>
      </section>
    </Fragment>
  );
};

export default Register;
