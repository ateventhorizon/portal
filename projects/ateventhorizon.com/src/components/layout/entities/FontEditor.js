import React, {Fragment} from "react";
import Table from "react-bootstrap/Table";
import {useGetCurrentEntityData} from "../../../futuremodules/entities/entitiesAccessors";

const FontEditor = () => {

  const currentEntityData = useGetCurrentEntityData();
  if (!currentEntityData) return <Fragment></Fragment>;

  return (
    <div className="nodeViewer-a">
      <Table striped bordered hover variant="dark">
        <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Revision</td>
          <td>{currentEntityData.fontRevision}</td>
        </tr>
        <tr>
          <td>Units Per Em</td>
          <td>{currentEntityData.unitsPerEm}</td>
        </tr>
        <tr>
          <td>Glyph Max Enclosure</td>
          <td>
            [{currentEntityData.bbox[0]}, {currentEntityData.bbox[1]},{" "}
            {currentEntityData.bbox[2]}, {currentEntityData.bbox[3]}]
          </td>
        </tr>
        <tr>
          <td>Flags</td>
          <td>{currentEntityData.macStyle}</td>
        </tr>
        <tr>
          <td>Smallest Legible Size</td>
          <td>{currentEntityData.lowestRecPPEM}</td>
        </tr>
        <tr>
          <td>Ascent</td>
          <td>{currentEntityData.ascent}</td>
        </tr>
        <tr>
          <td>Descent</td>
          <td>{currentEntityData.descent}</td>
        </tr>
        <tr>
          <td>Line Gap</td>
          <td>{currentEntityData.lineGap}</td>
        </tr>
        <tr>
          <td>Caret Slope</td>
          <td>
            [{currentEntityData.caretSlope[0]},{" "}
            {currentEntityData.caretSlope[1]}]
          </td>
        </tr>
        <tr>
          <td>Caret Offset</td>
          <td>{currentEntityData.caretOffset}</td>
        </tr>
        <tr>
          <td>Min Left Side Bearing</td>
          <td>{currentEntityData.minLeftSideBearing}</td>
        </tr>
        <tr>
          <td>Min Right Side Bearing</td>
          <td>{currentEntityData.minRightSideBearing}</td>
        </tr>
        <tr>
          <td>Advance Width Max</td>
          <td>{currentEntityData.advanceWidthMax}</td>
        </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default FontEditor;
