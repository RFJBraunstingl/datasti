import {plotMargin} from "./PlotConsts";
import React from "react";
import {CalcHeightWithMargin, CalcWidthWithMargin} from "../utils/Utils";

export type PlotTemplateProps = {
    width: number
    height: number
    children?: React.ReactNode
}

export function PlotTemplate(props: PlotTemplateProps) {

    const w = props.width;
    const h = props.height;

    const width = CalcWidthWithMargin(w, plotMargin);
    const height = CalcHeightWithMargin(h, plotMargin);

    let children = React.Children.toArray(props.children).map( element => {
        // @ts-ignore
        return React.cloneElement(element, { width: width, height: height})
    })

    return (<div>
        <svg width={w} height={h}>
            <g transform={`translate(${plotMargin.left},${plotMargin.top})`}>
                {children}
            </g>
        </svg>
    </div>);
}