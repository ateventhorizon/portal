import React, {Fragment, useEffect} from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Routes from "./components/routing/Routes";

import {api, useApiSilent} from "./futuremodules/api/apiEntryPoint";
import {loadUser} from "./futuremodules/auth/authApiCalls";
import {initEH} from "./init";
import {Auth} from "./futuremodules/auth/authAccessors";
import "./App.css";

initEH();

const App = () => {
  const authApi = useApiSilent(Auth);
  useEffect(() => {
    api( authApi, loadUser );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
      <Router>
        <Navbar/>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route component={Routes}/>
          </Switch>
        </Fragment>
      </Router>
  );
};

export default App;
