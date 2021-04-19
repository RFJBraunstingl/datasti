import React from "react"
import {Datapoint} from "../../../types/Datapoint";
import {PlotTemplate} from "../../plot/templates/PlotTemplate";
import {LinePlot} from "../../plot/templates/line/LinePlot";
import {RandomDateData} from "../../../utils/DataGenerator";
import {BasicAxis} from "../../plot/templates/axis/BasicAxis";
import {DateAxis} from "../../plot/templates/axis/DateAxis";
import {AxisAnchor} from "../../plot/templates/axis/AxisConsts";

interface Props {
    data: Datapoint[];
}

const LineGraphView = ({data}: Props) => {
    const plotHeight = 600;
    const plotWidth = 1000;

    return (
        <PlotTemplate width={plotWidth} height={plotHeight}>
            <LinePlot data={RandomDateData(31)}>
                <BasicAxis anchor={AxisAnchor.LEFT} unit={"kg"} ticks={5}/>
                <DateAxis anchor={AxisAnchor.BOTTOM} unit={"kg"} ticks={30}/>
            </LinePlot>
        </PlotTemplate>
    )
}

export default LineGraphView
