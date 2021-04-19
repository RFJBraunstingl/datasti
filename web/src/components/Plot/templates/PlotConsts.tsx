import DataPoint from "../../../rest/dtos/DataPoint";
import React from "react";

export const plotMargin = {
  top: 40,
  bottom: 40,
  left: 40,
  right: 100,
};

export type PlotProps = {
  width: number;
  height: number;
  data: DataPoint[];
  color: string;
  children?: React.ReactNode;
};

export const PlotDefaultProps = {
  width: 0,
  height: 0,
  data: [],
  color: "#4D70CC",
};

export type PlotMargin = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export const plotFontSize = 11;
