import DataPoint from "../../../rest/dtos/DataPoint";
import * as d3 from "d3";
import React from "react";

export function CreateCircles(
  data: DataPoint[],
  xScale: number[] & d3.ScaleLinear<number, number>,
  yScale: number[] & d3.ScaleLinear<number, number>,
  color: string = "lightblue",
  radius: number = 5
) {
  return data.map((d: DataPoint, i: number) => (
    <circle
      key={i}
      r={radius}
      cx={xScale(d.x)}
      cy={yScale(d.y)}
      style={{ fill: color }}
    />
  ));
}

export function CreateLines(
  data: DataPoint[],
  xScale: number[] & d3.ScaleLinear<number, number>,
  yScale: number[] & d3.ScaleLinear<number, number>,
  color: string = "lightblue",
  size: number = 2
) {
  return data.map((d: DataPoint, i: number, elements: DataPoint[]) => (
    <line
      key={i}
      x1={xScale(d.x)}
      x2={elements[i + 1] ? xScale(elements[i + 1].x) : xScale(d.x)}
      y1={yScale(d.y)}
      y2={elements[i + 1] ? yScale(elements[i + 1].y) : yScale(d.y)}
      style={{ stroke: color, strokeWidth: size }}
    />
  ));
}
