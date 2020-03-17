import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import Register from "../../futuremodules/auth/components/Register";
import Login from "../../futuremodules/auth/components/Login";
import DashboardUser from "../layout/DashboardUser";
import DashboardProject from "../layout/DashboardProject";
import NotFound from "../layout/NotFound";
import {EHAlert} from "../../futuremodules/alerts/alerts";
import {wscMessages} from "../../utils/webSocketClient";

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/register" component={Register} websocketMessageHandler={wscMessages}/>
        <Route exact path="/login" component={Login} websocketMessageHandler={wscMessages}/>
        <Route exact path="/dashboarduser" component={DashboardUser}/>
        <Route exact path="/dashboardproject" component={DashboardProject}/>
        <Route component={NotFound}/>
      </Switch>
      <EHAlert/>
    </Fragment>
  );
};

export default Routes;
