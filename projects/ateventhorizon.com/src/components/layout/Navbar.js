import React, {Fragment} from "react";
import {ProgressBar} from "../../futuremodules/progressbar/ProgressBar";
import {UserNameText} from "./Navbar.styled";
import {getProject, getUserName, logoffFromProject, useGetAuth} from "../../futuremodules/auth/authAccessors";

const Navbar = () => {

  const auth = useGetAuth();
  const userName = getUserName(auth);
  const title = getProject(auth);

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
        <UserNameText onClick={ () =>
          logoffFromProject(auth)
        }>
          {userName && <span><i className="fas fa-user"/>{" "}{userName}</span>}
        </UserNameText>
      </div>
    </Fragment>
  );
};

export default Navbar;
