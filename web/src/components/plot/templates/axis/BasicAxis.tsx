import React from "react";
import { AxisAnchor, AxisDefaultProps, AxisProps } from "./AxisConsts";
import { numberConverter } from "../../utils/Utils";
import { AxisUnit } from "./unit/Units";
import { plotFontSize } from "../PlotConsts";

export function BasicAxis(props: AxisProps) {
  let axis = <></>;
  switch (props.anchor) {
    case AxisAnchor.LEFT:
      axis = BasicAxisLeft(props);
      break;
    case AxisAnchor.BOTTOM:
      axis = BasicAxisBottom(props);
      break;
    case AxisAnchor.RIGHT:
      axis = BasicAxisRight(props);
      break;
    case AxisAnchor.TOP:
      axis = BasicAxisTop(props);
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

BasicAxis.defaultProps = AxisDefaultProps;

function BasicAxisLeft(props: AxisProps) {
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
        {numberConverter(d)}
      </text>
    </g>
  ));

  return <>{axis}</>;
}

function BasicAxisRight(props: AxisProps) {
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
        {numberConverter(d)}
      </text>
    </g>
  ));

  return <>{axis}</>;
}

function BasicAxisBottom(props: AxisProps) {
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
        style={{ fontSize: plotFontSize }}
        dy=".71em"
        x={props.xScale(d)}
        y={props.height + textPadding}
        fontFamily="'Montserrat', sans-serif"
      >
        {numberConverter(d)}
      </text>
    </g>
  ));

  return <>{axis}</>;
}

function BasicAxisTop(props: AxisProps) {
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
        style={{ fontSize: plotFontSize }}
        dy=".71em"
        x={props.xScale(d)}
        y={textPadding}
        fontFamily="'Montserrat', sans-serif"
      >
        {numberConverter(d)}
      </text>
    </g>
  ));
  return <>{axis}</>;
}
