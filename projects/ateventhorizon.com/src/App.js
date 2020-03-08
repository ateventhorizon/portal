import React, {Fragment} from "react";
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
import WasmCanvas from "react-wasm-canvas";
import {initGlobalStorage} from "./globalstorage/GlobalStorage";
// import WasmCanvas from "./localwasm";

initHostEnv();
initGlobalStorage();
initDB(DBConfig);

const App = () => {

  const wwwPrefixToAvoidSSLMadness = process.env.REACT_APP_EH_CLOUD_HOST === 'localhost' ? "" : "www.";
  let wasmArgumentList = [`hostname=${wwwPrefixToAvoidSSLMadness}${process.env.REACT_APP_EH_CLOUD_HOST}`];

  return (
    <Provider store={store}>
      <Router>
        <WasmCanvas
          wasmName="editor"
          argumentList={wasmArgumentList}
          padding="1px"
          borderRadius="5px"
          mandatoryWebGLVersionSupporNumber="webgl2"
        ></WasmCanvas>
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
