import {PlotTemplate} from "../plot/templates/PlotTemplate";
import {LinePlot} from "../plot/templates/line/LinePlot";
import {RandomDateData} from "../../utils/DataGenerator";
import {BasicAxis} from "../plot/templates/axis/BasicAxis";
import {AxisAnchor} from "../plot/templates/axis/AxisConsts";
import {DateAxis} from "../plot/templates/axis/DateAxis";
import React, {useEffect, useState} from "react";
import useApi from "../../hooks/useApi";
import {Datapoint} from "../../types/Datapoint";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

export default function DataVis(props: any) {

    const [data, setData] = useState<Datapoint[]>([])
    const {getAllDatapoints} = useApi();

    useEffect(() => {
        getAllDatapoints(props.match.params.container)
            .then(setData)
            .catch(e => console.error(e))
    }, [getAllDatapoints])

    const plotHeight = 600;
    const plotWidth = 1000;

    return <Table>
        <TableHead>
            <TableRow>
                <TableCell>
                    timestamp
                </TableCell>
                <TableCell>
                    label
                </TableCell>
                <TableCell>
                    value
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {data.map(datapoint =>
                <TableRow key={datapoint.timestamp}>
                    <TableCell>
                        {datapoint.timestamp}
                    </TableCell>
                    <TableCell>
                        {datapoint.label}
                    </TableCell>
                    <TableCell>
                        {datapoint.value}
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    </Table>


    /* graph stuff */
    return (
        <PlotTemplate width={plotWidth} height={plotHeight}>
            <LinePlot data={RandomDateData(31)}>
                <BasicAxis anchor={AxisAnchor.LEFT} unit={"kg"} ticks={5}/>
                <DateAxis anchor={AxisAnchor.BOTTOM} unit={"kg"} ticks={30}/>
            </LinePlot>
        </PlotTemplate>
    );
}
