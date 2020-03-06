import React, {Fragment} from "react";
import {ProgressBar} from "./ProgressBar";
import {useDispatch, useSelector} from "react-redux";
import {logoffFromProject} from "../../actions/auth";
import {UserNameText} from "./Navbar.styled";

const Navbar = () => {

  const userstate = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const hasUser = (userstate.isAuthenticated && userstate.userdata && userstate.userdata.user.name);
  const userName = hasUser ? userstate.userdata.user.name : "";

  const title = userstate.userdata ? userstate.userdata.project : "";

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
        <UserNameText onClick={ () => {dispatch(logoffFromProject())}}>
          {userstate.isAuthenticated ? <span><i className="fas fa-user"/>{" "}{userName}</span> : ""}
        </UserNameText>
      </div>
    </Fragment>
  );
};

export default Navbar;
