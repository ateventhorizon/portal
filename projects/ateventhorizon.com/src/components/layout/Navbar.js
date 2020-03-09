import React, {Fragment} from "react";
import {ProgressBar} from "../../futuremodules/progressbar/ProgressBar";
import {Navbareh, NavbarGrid, NavbarLogo, NavbarTitle, UserNameText} from "./Navbar.styled";
import {getProject, getUserName, logoffFromProject, useGetAuth} from "../../futuremodules/auth/authAccessors";

const Navbar = () => {

  const auth = useGetAuth();
  const userName = getUserName(auth);

  return (
    <Fragment>
      <ProgressBar/>
      <NavbarGrid>
        <NavbarLogo>
          <img src="/ehlogo.svg" alt=""/>
        </NavbarLogo>
        <Navbareh>
          <span className="colorLogo1">E</span>
          <span>vent</span> <span className="colorLogo2">H</span>
          <span>orizon</span>
        </Navbareh>
        <NavbarTitle>{getProject(auth)}</NavbarTitle>
        <UserNameText onClick={() => logoffFromProject(auth) }>
          {userName && <span><i className="fas fa-user"/>{" "}{userName}</span>}
        </UserNameText>
      </NavbarGrid>
    </Fragment>
  );
};

export default Navbar;
