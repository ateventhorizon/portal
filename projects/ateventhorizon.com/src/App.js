import React, {Fragment, useEffect} from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Routes from "./components/routing/Routes";

import {initHostEnv} from "./HostEnv";

import {DBConfig} from "./DBConfig";
import {initDB} from "react-indexed-db";
import {Provider} from "react-redux";
import store from "./store";

import "./App.css";
import {initGlobalStorage} from "./globalstorage/GlobalStorage";
import {api, useApiSilent} from "./api/apiEntryPoint";
import {loadUser} from "./api/auth";
// import WasmCanvas from "./localwasm";

initHostEnv();
initGlobalStorage();
initDB(DBConfig);

const App = () => {

  // const wwwPrefixToAvoidSSLMadness = process.env.REACT_APP_EH_CLOUD_HOST === 'localhost' ? "" : "www.";
  // let wasmArgumentList = [`hostname=${wwwPrefixToAvoidSSLMadness}${process.env.REACT_APP_EH_CLOUD_HOST}`];

  const authApi = useApiSilent('auth');
  useEffect(() => {
    api( authApi, loadUser );
    return () => {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar/>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route component={Routes}/>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
