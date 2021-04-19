import { PlotMargin } from "../templates/PlotConsts";

export function CalcWidthWithMargin(width: number, margin: PlotMargin): number {
  return width - margin.right - margin.left;
}

export function CalcHeightWithMargin(
  height: number,
  margin: PlotMargin
): number {
  return height - margin.top - margin.bottom;
}

export function numberConverter(n: number, d: number = 1) {
  let x = ("" + n).length;
  let p = Math.pow;
  d = p(10, d);
  x -= x % 3;
  return Math.round((n * d) / p(10, x)) / d + " kMGTPE"[x / 3];
}
