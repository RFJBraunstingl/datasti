import React from "react";
import {AxisAnchor, AxisDefaultProps, AxisProps} from "../AxisConsts";
import {plotFontSize} from "../../PlotConsts";

export function AxisUnit(props: AxisProps) {
    switch (props.anchor) {
        case AxisAnchor.LEFT:
            return LeftAxisUnit(props);
        case AxisAnchor.BOTTOM:
            return BottomAxisUnit(props);
        case AxisAnchor.RIGHT:
            return RightAxisRight(props);
        case AxisAnchor.TOP:
            return  <></>
        default:
            return <></>
    }
}

AxisUnit.defaultProps = AxisDefaultProps;

export function LeftAxisUnit(props: AxisProps) {
    const unitPadding = -20;
    return (
        <g className="unit">
            <text
                style={{fontSize: plotFontSize, fontWeight: "bold"}}
                dy=".32em"
                x={0}
                y={unitPadding}
                textAnchor="middle"
                fontFamily="'Montserrat', sans-serif">
                {props.unit}
            </text>
        </g>);
}

export function BottomAxisUnit(props: AxisProps) {
    const unitPadding = 15;
    return (
        <g className="unit">
            <text
                style={{fontSize: plotFontSize, fontWeight: "bold"}}
                dy=".32em"
                x={props.width + unitPadding}
                y={props.height}
                fontFamily="'Montserrat', sans-serif">
                {props.unit}
            </text>
        </g>);
}

export function RightAxisRight(props: AxisProps) {
    const unitPadding = -20;
    return (
        <g className="unit">
            <text
                style={{fontSize: plotFontSize, fontWeight: "bold"}}
                dy=".32em"
                x={props.width}
                y={unitPadding}
                textAnchor="middle"
                fontFamily="'Montserrat', sans-serif">
                {props.unit}
            </text>
        </g>);
}