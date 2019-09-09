import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Controlled as CodeMirror } from "react-codemirror2";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { useIndexedDB } from "react-indexed-db";
import Table from "react-bootstrap/Table";

require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");
require("codemirror/theme/neat.css");
require("codemirror/mode/lua/lua.js");

const AppEditor = ({ currentEntity, userData, wasmLogs, wasmOutputDirty }) => {
  const { getAll, add, update } = useIndexedDB("files");
  const [fileData, setFileData] = useState(null);
  const [fileC, setFileC] = useState(null);
  const [consoleArrayLogs, setConsoleArrayLogs] = useState([]);

  useEffect(() => {
    if (
      userData !== null &&
      userData.project !== null &&
      currentEntity !== null &&
      currentEntity.entity !== null &&
      userData.user !== null &&
      userData.user.email !== null &&
      fileData === null
    ) {
      getAll().then(filesFromDb => {
        filesFromDb.some(fileFromDb => {
          if (
            fileFromDb.project === userData.project &&
            fileFromDb.app === currentEntity.entity.mKey &&
            fileFromDb.file === "main.lua" &&
            fileFromDb.user === userData.user.email
          ) {
            setFileData(fileFromDb);
            setFileC(fileFromDb.content);
            return true;
          }
          return false;
        });
      });
    }
  }, [
    userData,
    currentEntity,
    fileData,
    fileC,
    consoleArrayLogs,
    wasmLogs,
    wasmOutputDirty,
    getAll
  ]);

  if (consoleArrayLogs.length < wasmLogs.length) {
    let newConsoleLog = consoleArrayLogs;
    for (let t = consoleArrayLogs.length; t < wasmLogs.length; t++) {
      newConsoleLog.push({
        key: t.toString(),
        text: wasmLogs[t]
      });
    }
    setConsoleArrayLogs(newConsoleLog);
  }

  const handleClick = () => {
    if (fileData === null) {
      // console.log("ADD NEW FILE");
      add({
        project: userData.project,
        app: currentEntity.entity.mKey,
        file: "main.lua",
        user: userData.user.email,
        content: fileC
      }).then(
        event => {
          let updatedFileData = {
            id: event,
            project: userData.project,
            app: currentEntity.entity.mKey,
            file: "main.lua",
            user: userData.user.email,
            content: fileC
          };
          setFileData(updatedFileData);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      // console.log("UPDATE FILE");
      update({ ...fileData, id: fileData.id, content: fileC }).then(
        event => {
          // console.log("FILE UPDATED: ", event);
        },
        error => {
          console.log(error);
        }
      );
    }
  };

  return (
    <Fragment>
      <div className="source_tabs-a">
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="main.lua"></Tab>
        </Tabs>
      </div>
      <div className="appdataquad">
        <CodeMirror
          value={fileC}
          className="react-codemirror2 appdataquad"
          options={{
            mode: "lua",
            theme: "material",
            lineNumbers: true
          }}
          onBeforeChange={(editor, data, value) => {
            setFileC(value);
          }}
          onChange={(editor, data, value) => {}}
          onKeyPress={(editor, event) => {
            if (event.code === "Enter" && event.ctrlKey === true) {
              const content = editor.getValue();
              window.Module.addScriptLine(content);
              // handleClick();
            }
          }}
        />
      </div>
      <div className="source_controls-a">
        <ButtonGroup size="sm">
          <Button
            variant="secondary"
            value={1}
            onClick={e => {
              handleClick();
              window.Module.addScriptLine(fileC);
            }}
          >
            <i className="fas fa-play"></i>
          </Button>
          <Button
            variant="secondary"
            value={1}
            onClick={e => {
              handleClick();
            }}
          >
            <i className="fas fa-save"></i>
          </Button>
        </ButtonGroup>
      </div>
      <div className="app_controls-a">
        <Tabs defaultActiveKey="console" id="uncontrolled-tab-example">
          <Tab eventKey="console" title="console">
            <div className="console-output small">
              <ul>
                {consoleArrayLogs.map(e => (
                  <li key={e.key}>{e.text}</li>
                ))}
              </ul>
            </div>
          </Tab>
          <Tab eventKey="settings" title="settings">
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Rendering</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Shadow OverBurn Coef</td>
                  <td>2.0</td>
                </tr>
                <tr>
                  <td>Indoor Scene Coeff</td>
                  <td>1.0</td>
                </tr>
                <tr>
                  <td>Shadow Z-Fight Coeff</td>
                  <td>0.002</td>
                </tr>
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="builds" title="builds"></Tab>
        </Tabs>
      </div>
    </Fragment>
  );
};

AppEditor.propTypes = {
  currentEntity: PropTypes.object,
  userData: PropTypes.object,
  wasmLogs: PropTypes.array,
  wasmOutputDirty: PropTypes.bool
};

const mapStateToProps = state => ({
  currentEntity: state.entities.currentEntity,
  userData: state.auth.userdata,
  wasmLogs: state.wasm.consoleOutput,
  wasmOutputDirty: state.wasm.consoleOutputDirty
});

export default connect(
  mapStateToProps,
  {}
)(AppEditor);
