import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import DashboardUser from "../layout/DashboardUser";
import DashboardProject from "../layout/DashboardProject";
import NotFound from "../layout/NotFound";
import {EHAlert} from "../../futuremodules/alerts/alerts";

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/dashboarduser" component={DashboardUser}/>
        <Route exact path="/dashboardproject" component={DashboardProject}/>
        <Route component={NotFound}/>
      </Switch>
      <EHAlert/>
    </Fragment>
  );
};

export default Routes;
