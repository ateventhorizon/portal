import React, {useState} from "react";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import {alphaBool} from "../../../futuremodules/utils/utils";

const RenderParamsToolbar = () => {
  const [useSkybox, setUseSkybox] = useState(false);
  const [useVignette, setVignette] = useState(true);
  const [useFilmGrain, setFilmGrain] = useState(true);
  // const [useBloom, setBloom] = useState(true);
  // const [useDOF, setDOF] = useState(true);
  const [useSSAO, setSSAO] = useState(false);

  return (
    <div className="renderParams-a">
      <ToggleButtonGroup size="sm" type="checkbox">
        <ToggleButton
          variant="secondary"
          value={0}
          onChange={e => {
            window.Module.addScriptLine(
              "rr.useSkybox(" + alphaBool(useSkybox) + ")"
            );
            setUseSkybox(!useSkybox);
          }}
        >
          <i className="fas fa-globe"/>
        </ToggleButton>
        <ToggleButton
          variant="secondary"
          value={2}
          onChange={e => {
            window.Module.addScriptLine(
              "rr.useVignette(" + alphaBool(useVignette) + ")"
            );
            setVignette(!useVignette);
          }}
        >
          <i className="fas fa-dot-circle"/>
        </ToggleButton>
        {/*<ToggleButton*/}
        {/*  variant="secondary"*/}
        {/*  value={3}*/}
        {/*  onChange={e => {*/}
        {/*    window.Module.addScriptLine(*/}
        {/*      "rr.useBloom(" + alphaBool(useBloom) + ")"*/}
        {/*    );*/}
        {/*    setBloom(!useBloom);*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <i className="fas fa-sun"/>*/}
        {/*</ToggleButton>*/}
        <ToggleButton
          variant="secondary"
          value={4}
          onChange={e => {
            window.Module.addScriptLine(
              "rr.useFilmGrain(" + alphaBool(useFilmGrain) + ")"
            );
            setFilmGrain(!useFilmGrain);
          }}
        >
          <i className="fas fa-braille"/>
        </ToggleButton>
        {/*<ToggleButton*/}
        {/*  variant="secondary"*/}
        {/*  value={5}*/}
        {/*  onChange={e => {*/}
        {/*    window.Module.addScriptLine("rr.useDOF(" + alphaBool(useDOF) + ")");*/}
        {/*    setDOF(!useDOF);*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <i className="far fa-images"/>*/}
        {/*</ToggleButton>*/}
        <ToggleButton
          variant="secondary"
          value={6}
          onChange={e => {
            window.Module.addScriptLine(
              "rr.useSSAO(" + alphaBool(useSSAO) + ")"
            );
            setSSAO(!useSSAO);
          }}
        >
          <i className="fas fa-rainbow"/>
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default RenderParamsToolbar;
