import {PlotDefaultProps, PlotProps} from "../PlotConsts";
import React from "react";
import {CreateXScale, CreateYScale} from "../../utils/CreateScale";
import {CreateCircles, CreateLines} from "../../utils/CreateFigures";

export function LinePlot(props: PlotProps){

    const data = props.data;

    const xScale = CreateXScale(data, props.width);
    const yScale = CreateYScale(data, props.height);

    const children = React.Children.toArray(props.children).map( element => {
        // @ts-ignore
        return React.cloneElement(element, {
            xScale: xScale,
            yScale: yScale,
            width: props.width,
            height: props.height})
    })

    const circles = CreateCircles(data, xScale, yScale, props.color);
    const lines = CreateLines(data, xScale, yScale, props.color);

    return (
        <>
            {children}
            {circles}
            {lines}
        </>
    );
}

LinePlot.defaultProps = PlotDefaultProps;