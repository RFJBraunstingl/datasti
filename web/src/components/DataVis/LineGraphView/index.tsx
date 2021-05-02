import React from "react";
import {Datapoint as DatastiDatapoint} from "../../../types/Datapoint";
import {PlotTemplate} from "../../Plot/templates/PlotTemplate";
import {LinePlot} from "../../Plot/templates/line/LinePlot";
import {BasicAxis} from "../../Plot/templates/axis/BasicAxis";
import {DateAxis} from "../../Plot/templates/axis/DateAxis";
import {AxisAnchor} from "../../Plot/templates/axis/AxisConsts";
import DataPoint, {DataType} from "../../../rest/dtos/DataPoint"

interface Props {
    data: DatastiDatapoint[];
}

const LineGraphView = ({data}: Props) => {
    const plotHeight = 600;
    const plotWidth = 1000;

    const toDate: (timestamp: string) => Date = (timstamp) => {
        return new Date(timstamp);
    }

    const convert: (data: DatastiDatapoint[]) => DataPoint[] = (data: DatastiDatapoint[]) => data
        .filter(data => data.value !== undefined && data.timestamp !== undefined)
        .map(value => new DataPoint(
            DataType.NumberOverDate,
            toDate(value.timestamp!!),
            +value.value)
        );

    return (
        <PlotTemplate width={plotWidth} height={plotHeight}>
            <LinePlot data={convert(data)}>
                <BasicAxis anchor={AxisAnchor.LEFT} unit={""} ticks={5}/>
                <DateAxis anchor={AxisAnchor.BOTTOM} unit={"time"} ticks={5}/>
            </LinePlot>
        </PlotTemplate>
    );
};

export default LineGraphView;
