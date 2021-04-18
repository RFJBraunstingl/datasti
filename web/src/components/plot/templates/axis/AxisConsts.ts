import * as d3 from "d3";

export enum AxisAnchor {
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right"
}

export type AxisProps = {
    width: number
    height: number
    xScale: number[] & d3.ScaleLinear<number, number>
    yScale: number[] & d3.ScaleLinear<number, number>
    ticks: number
    color: string
    anchor: AxisAnchor
    unit: string
}

export const AxisDefaultProps = {
    width: 0,
    height: 0,
    xScale: [0],
    yScale: [0],
    ticks: 10,
    color: "#e4e5eb",
    unit: ""
}
