import React from "react";
import {Link, Redirect} from "react-router-dom";
import {useHasUser} from "../../futuremodules/auth/authAccessors";

const Landing = () => {

  if (useHasUser()) {
    return (<Redirect to="/dashboarduser" />);
  }

  return (
    <section className="landing">
      <div className="landing-inner">
        <h1 className="logofont x-large">
          <span className="colorLogo1">Ready</span>
          Set
          <span className="colorLogo2">Create</span>
        </h1>
        <div className="my-2"/>
        <div className="buttons">
          <Link to="register" className="btn btn-primary my-2">
            Sign Up
          </Link>{" "}
          <Link to="login" className="btn btn-info my-2">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing;
