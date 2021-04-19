import { AxisAnchor, AxisDefaultProps, AxisProps } from "./AxisConsts";
import React from "react";
import { AxisUnit } from "./unit/Units";
import { plotFontSize } from "../PlotConsts";

export function DateAxis(props: AxisProps) {
  let axis = <></>;
  switch (props.anchor) {
    case AxisAnchor.LEFT:
      axis = DateAxisLeft(props);
      break;
    case AxisAnchor.BOTTOM:
      axis = DateAxisBottom(props);
      break;
    case AxisAnchor.RIGHT:
      axis = DateAxisRight(props);
      break;
    case AxisAnchor.TOP:
      axis = DateAxisTop(props);
      break;
    default:
      return <></>;
  }

  const unit = AxisUnit(props);

  return (
    <>
      {axis}
      {unit}
    </>
  );
}

DateAxis.defaultProps = AxisDefaultProps;

function DateAxisLeft(props: AxisProps) {
  const textPadding = -10;
  const axis = props.yScale.ticks(props.ticks).map((d: number, i: number) => (
    <g key={i} className="y-tick">
      <line
        style={{ stroke: props.color }}
        y1={props.yScale(d)}
        y2={props.yScale(d)}
        x1={0}
        x2={props.width}
      />
      <text
        style={{ fontSize: plotFontSize }}
        dy=".32em"
        x={textPadding}
        y={props.yScale(d)}
        fontFamily="'Montserrat', sans-serif"
        textAnchor="end"
      >
        {new Date(d).getDate()}
      </text>
    </g>
  ));
  return <>{axis}</>;
}

function DateAxisRight(props: AxisProps) {
  const textPadding = 10;
  const axis = props.yScale.ticks(props.ticks).map((d: number, i: number) => (
    <g key={i} className="y-tick">
      <line
        style={{ stroke: props.color }}
        y1={props.yScale(d)}
        y2={props.yScale(d)}
        x1={0}
        x2={props.width}
      />
      <text
        style={{ fontSize: plotFontSize }}
        dy=".32em"
        x={props.width + textPadding}
        y={props.yScale(d)}
        fontFamily="'Montserrat', sans-serif"
      >
        {new Date(d).getDate()}
      </text>
    </g>
  ));
  return <>{axis}</>;
}

function DateAxisBottom(props: AxisProps) {
  const textPadding = 10;
  const axis = props.xScale.ticks(props.ticks).map((d: number, i: number) => (
    <g className="x-tick" key={i}>
      <line
        style={{ stroke: props.color }}
        y1={0}
        y2={props.height}
        x1={props.xScale(d)}
        x2={props.xScale(d)}
      />
      <text
        style={{ textAnchor: "middle", fontSize: plotFontSize }}
        dy=".71em"
        x={props.xScale(d)}
        y={props.height + textPadding}
        fontFamily="'Montserrat', sans-serif"
      >
        {new Date(d).getDate()}
      </text>
    </g>
  ));
  return <>{axis}</>;
}

function DateAxisTop(props: AxisProps) {
  const textPadding = -15;
  const axis = props.xScale.ticks(props.ticks).map((d: number, i: number) => (
    <g className="x-tick" key={i}>
      <line
        style={{ stroke: props.color }}
        y1={0}
        y2={props.height}
        x1={props.xScale(d)}
        x2={props.xScale(d)}
      />
      <text
        style={{ textAnchor: "middle", fontSize: plotFontSize }}
        dy=".71em"
        x={props.xScale(d)}
        y={textPadding}
        fontFamily="'Montserrat', sans-serif"
      >
        {new Date(d).getDate()}
      </text>
    </g>
  ));
  return <>{axis}</>;
}
