import React from "react";
import d3 from "d3";

type LineGraphProps = {
    data: any
    width: number
    height: number
}

const margin = ({top: 20, right: 30, bottom: 30, left: 40})

export default function MissingDataLineGraph(props: LineGraphProps) {


    const x =  d3.scaleUtc()
        // @ts-ignore
        .domain(d3.extent(props.data, d => d.date))
        .range([margin.left, props.width - margin.right])

    const y = d3.scaleLinear()
        // @ts-ignore
        .domain([0, d3.max(props.data, d => d.value)]).nice()
        .range([props.height - margin.bottom, margin.top])

    // @ts-ignore
    const xAxis = g => g
        .attr("transform", `translate(0,${props.height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(props.width / 80).tickSizeOuter(0))

    // @ts-ignore
    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        // @ts-ignore
        .call(g => g.select(".domain").remove())
        // @ts-ignore
        .call(g => g.select(".tick:last-of-type text").clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(g.data.y))

    const line = d3.line()
        //@ts-ignore
        .defined(d => !isNaN(d.value))
        //@ts-ignore
        .x(d => x(d.date))
        //@ts-ignore
        .y(d => y(d.value))

    const svg = d3.create("svg")
        .attr("viewBox", "[0, 0," + props.width + ","  + props.height + "]")
        .attr("fill", "none")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round");

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    svg.append("path")
        .datum(props.data.filter(line.defined()))
        .attr("stroke", "#ccc")
        .attr("d", line);

    svg.append("path")
        .datum(props.data)
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    return svg.node();
}