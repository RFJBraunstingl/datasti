import DataPoint, { DataType } from "../../../rest/dtos/DataPoint";
import * as d3 from "d3";

export function CreateXScale(
  data: DataPoint[],
  width: number
): number[] & d3.ScaleLinear<number, number> {
  switch (data[0].type) {
    case DataType.NumberOverNumber:
      return CreateXScaleBasic(data, width);
    case DataType.NumberOverDate:
      return CreateXScaleTime(data, width);
    default:
      return CreateXScaleBasic(data, width);
  }
}

function CreateXScaleBasic(
  data: DataPoint[],
  width: number
): number[] & d3.ScaleLinear<number, number> {
  return (
    d3
      .scaleLinear()
      // @ts-ignore
      .domain(d3.extent(data, (d) => d.x))
      .nice()
      .range([0, width])
  );
}

function CreateXScaleTime(
  data: DataPoint[],
  width: number
): number[] & d3.ScaleLinear<number, number> {
  return (
    d3
      .scaleTime()
      // @ts-ignore
      .domain(d3.extent(data, (d) => d.x))
      .nice()
      .range([0, width])
  );
}

export function CreateYScale(
  data: DataPoint[],
  height: number
): number[] & d3.ScaleLinear<number, number> {
  return CreateYScaleBasic(data, height);
}

function CreateYScaleBasic(
  data: DataPoint[],
  height: number
): number[] & d3.ScaleLinear<number, number> {
  return (
    d3
      .scaleLinear()
      // @ts-ignore
      .domain(d3.extent(data, (d) => d.y))
      .nice()
      .range([height, 0])
  );
}
