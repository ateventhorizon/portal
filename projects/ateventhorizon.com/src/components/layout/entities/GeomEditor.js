import React, {Fragment} from "react";
import SmallEntriesDialog from "./SmallEntriesDialog";
import {fillMaterialParams} from "utils/materialUtils";
import MaterialParametersEditor from "./MaterialParametersEditor";
import {useGetCurrentEntityNodes} from "../../../futuremodules/entities/entitiesAccessors";

const GeomEditor = () => {

    const currentEntityNodes = useGetCurrentEntityNodes();
    let matSimples = [];

    // eslint-disable-next-line
    for (const e of currentEntityNodes) {
        matSimples.push(
            fillMaterialParams(e.key, e.value.values, e.value.thumbValues)
        );
    }

    const InObjectMaterials = () => {
        return (
            <div className="nodeViewer-a">
                <div className="titleMargin">Materials</div>
                {matSimples.map(e => (
                    <MaterialParametersEditor key={e.key} entity={e}/>
                ))}
            </div>
        );
    };

    return (
        <Fragment>
            <SmallEntriesDialog/>
            <InObjectMaterials/>
        </Fragment>
    );
};

export default GeomEditor;
