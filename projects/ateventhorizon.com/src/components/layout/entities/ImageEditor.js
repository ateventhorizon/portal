import React, {Fragment} from "react";
import Table from "react-bootstrap/Table";

const ImageEditor = () => {

  // eslint-reimplement
  const currentEntityData = {};
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
            <td>Image Format</td>
            <td>{currentEntityData.headerType}</td>
          </tr>
          <tr>
            <td>Width</td>
            <td>{currentEntityData.width}</td>
          </tr>
          <tr>
            <td>Height</td>
            <td>{currentEntityData.height}</td>
          </tr>
          <tr>
            <td>Bits per Pixel</td>
            <td>{currentEntityData.bpp}</td>
          </tr>
          <tr>
            <td>Channels</td>
            <td>{currentEntityData.channels}</td>
          </tr>
          <tr>
            <td>Depth</td>
            <td>{currentEntityData.depth}</td>
          </tr>
          <tr>
            <td>Compressed size</td>
            <td>
              {currentEntityData.compressedSize === 0
                ? "N/A"
                : currentEntityData.compressedSize}
            </td>
          </tr>
          <tr>
            <td>Memory size</td>
            <td>{currentEntityData.uncompressedSize}</td>
          </tr>
          <tr>
            <td>Format</td>
            <td>{currentEntityData.outFormat}</td>
          </tr>
          <tr>
            <td>Filter Mode</td>
            <td>{currentEntityData.filterMode}</td>
          </tr>
          <tr>
            <td>Spatial type</td>
            <td>{currentEntityData.ttm}</td>
          </tr>
          <tr>
            <td>Tiling Mode</td>
            <td>{currentEntityData.wrapMode}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ImageEditor;
