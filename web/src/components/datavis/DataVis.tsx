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
    }, [getAllDatapoints, props.match.params.container])

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

    /* graph stuff

    const plotHeight = 600;
    const plotWidth = 1000;

    return (
        <PlotTemplate width={plotWidth} height={plotHeight}>
            <LinePlot data={RandomDateData(31)}>
                <BasicAxis anchor={AxisAnchor.LEFT} unit={"kg"} ticks={5}/>
                <DateAxis anchor={AxisAnchor.BOTTOM} unit={"kg"} ticks={30}/>
            </LinePlot>
        </PlotTemplate>
    );*/
}
