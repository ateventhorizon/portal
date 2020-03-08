import React, {Fragment} from "react";
import {ProgressBar} from "./ProgressBar";
import {UserNameText} from "./Navbar.styled";
import {useApi} from "../../api/apiEntryPoint";

const Navbar = () => {

  const authApi = useApi('auth');
  const [auth, authStore] = authApi;

  const userName = auth ? auth.user.name : "";
  const title = auth ? auth.project : "";

  const logoffFromProject = () => {
    authStore({
      ...auth,
      project: null
    });
  };

  return (
    <Fragment>
      <ProgressBar/>
      <div className="navbarGrid">
        <div className="navbarlogo-a">
          <img src="/ehlogo.svg" alt=""/>
        </div>
        <div className="navbareh-a navdiv-titletext">
          {" "}
          <span className="colorLogo1">E</span>
          <span>vent</span> <span className="colorLogo2">H</span>
          <span>orizon</span>
        </div>
        <div className="navbartitle-a">{title}</div>
        <UserNameText onClick={() => {
          logoffFromProject();
        }}>
          {auth ? <span><i className="fas fa-user"/>{" "}{userName}</span> : ""}
        </UserNameText>
      </div>
    </Fragment>
  );
};

export default Navbar;
