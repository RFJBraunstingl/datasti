import React, {useEffect, useState} from "react";
import useApi from "../../hooks/useApi";
import {Datapoint} from "../../types/Datapoint";
import useStyles from "./styles";
import TableView from "./TableView";
import LineGraphView from "./LineGraphView";
import Header from "./Header";

const dataModes = ["Table", "Line"];

type DataMode = typeof dataModes[number];

export default function DataVis(props: any) {
    const classes = useStyles();
    const [data, setData] = useState<Datapoint[]>([]);
    const {getAllDatapoints} = useApi();
    const [dataMode, setDataMode] = useState<DataMode>("Table");
    const container = props.match.params.container;

    const reloadDatapoints = () => {
        getAllDatapoints(container)
            .then(setData)
            .catch((e) => console.error(e));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => reloadDatapoints(), []);

    const renderDataView = () => {
        switch (dataMode) {
            case "Line":
                return <LineGraphView data={data}/>;

            default:
            case "Table":
                return <TableView data={data}/>;
        }
    };

    return (
        <>
            <Header container={container}
                    possibleModes={dataModes}
                    dataMode={dataMode}
                    setDataMode={setDataMode}
                    onDatapointAdded={reloadDatapoints}/>
            <div className={classes.visualization}>{renderDataView()}</div>
        </>
    );
}
