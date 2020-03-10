import React, {Fragment, useCallback} from "react";
import {useDropzone} from "react-dropzone";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import {
  checkFileExtensionsOnEntityGroup,
  getFileNameExt,
  getFileNameOnlyNoExt,
  GroupGeom,
  groupHasCreateEditor,
  groupHasImportFacility
} from "../../../utils/utils";

import {useGlobal} from "reactn";
import {alertWarning} from "../../../futuremodules/alerts/alerts";
import {api, useApi} from "../../../futuremodules/api/apiEntryPoint";
import {addEntity, addPlaceHolderEntity} from "../../../futuremodules/entities/entitiesApiCalls";

// const streams = require("memory-streams");
const tar = require("tar-stream");

const chooseFilenameFromMultiFiles = (files, group) => {
  if (group === GroupGeom) {
    for (const file of files) {
      if (getFileNameExt(file.name) === "fbx") {
        return getFileNameOnlyNoExt(file.name) + ".fbx_folder";
      }
    }
  }
  return null;
}

var isArrayBufferSupported = (new Buffer(new Uint8Array([1]).buffer)[0] === 1);

var arrayBufferToBuffer = isArrayBufferSupported ? arrayBufferToBufferAsArgument : arrayBufferToBufferCycle;

function arrayBufferToBufferAsArgument(ab) {
  return new Buffer(ab);
}

function arrayBufferToBufferCycle(ab) {
  var buffer = new Buffer(ab.byteLength);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }
  return buffer;
}

const EntityDragAndImport = () => {

  const [, alertStore] = useGlobal('notificationAlert');
  const entitiesApi = useApi('entities');
  const [entities] = entitiesApi;
  const groupSelected = entities ? entities.groupSelected : null;

  const onDrop = useCallback(
    async acceptedFiles => {

      const readFileAsync = (file) => {
        let reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onload = () => {
            console.log("Finished loading ", file.name);
            resolve(reader.result);
          };
          reader.onerror = () => {
            reader.abort();
            console.log("Error loading ", file.name);
            reject("Cannot open file");
          }
          reader.readAsArrayBuffer(file);
        })
      }

      const readFileAsyncS = async (file) => {
        try {
          return await readFileAsync(file);
        } catch (e) {
          return null;
        }
      }

      const singleFileRead = async (acceptedFile) => {
        // check file dragged has a valid extension for asset type
        console.log("Group selected is", groupSelected);
        if (checkFileExtensionsOnEntityGroup(groupSelected, acceptedFile.name)) {
          const fileContent = await readFileAsync(acceptedFile);
          api(entitiesApi, addEntity, acceptedFile.name, fileContent, groupSelected);
        } else {
          alertWarning(alertStore, "Wrong file type for this entity type");
        }
      }

      const multiFileRead = async (acceptedFiles) => {

        const filename = chooseFilenameFromMultiFiles(acceptedFiles, groupSelected);

        if (filename == null) {
          alertWarning(alertStore, "No files for " + groupSelected + " group has been selected.");
          return;
        }

        let abuffers = [];
        let tarPack = tar.pack();

        for (let i = 0; i < acceptedFiles.length; i++) {
          const ab = await readFileAsyncS(acceptedFiles[i]);
          if (ab) {
            abuffers.push({
              name: acceptedFiles[i].name,
              size: ab.byteLength,
              data: ab
            });
          }
        }

        // tarPack.on('error', reject);
        const packEntry = (err) => {
          if (err) {
            console.log("Error");
            // reject(err);
          } else if (abuffers.length) {
            console.log("Buffer length", abuffers.length)
            const fileEntry = abuffers.pop();
            let entry = tarPack.entry({name: fileEntry.name, size: fileEntry.size}, packEntry);
            entry.write(arrayBufferToBuffer(fileEntry.data));
            entry.end();
          } else {
            console.log("Finalise");
            tarPack.finalize();
            // const fileContent = tarWrite(tarPack);
            // dispatch(addEntity(filename, fileContent, groupSelected));
            // resolve();
          }
        }
        packEntry();
      }

      try {
        if (acceptedFiles.length === 1) {
          await singleFileRead(acceptedFiles[0]);
        } else if (acceptedFiles.length > 1) {
          await multiFileRead(acceptedFiles);
        }
      } catch (e) {
        console.log(e);
      }
    },
    [groupSelected, alertStore, entitiesApi]
    )
  ;

  const {getRootProps, getInputProps} = useDropzone({onDrop});
  const addButton = groupHasCreateEditor(groupSelected);
  const importButton = groupHasImportFacility(groupSelected);

  return (
    <Fragment>
      <div className="leftSideBarGroupImport">
        <ButtonGroup size="sm" type="checkbox">
          {addButton && (
            <Button
              variant="secondary"
              value={1}
              onClick={e => {
                e.preventDefault();
                api( entitiesApi, addPlaceHolderEntity, groupSelected);
              }}
            >
              <i className="fas fa-plus"/>
            </Button>
          )}
          {importButton && (
            <Button variant="secondary" value={2}>
              <div {...getRootProps({className: "dropzoneNoHMargins"})}>
                <input {...getInputProps()} />
                <span>
                  <i className="fas fa-upload"/>
                </span>
              </div>
            </Button>
          )}
        </ButtonGroup>
      </div>
    </Fragment>
  );
};


export default EntityDragAndImport;
