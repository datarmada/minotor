import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function AreaGraph(props) {
  const d3Container = useRef(null);

  let { data, width, height } = props;

  useEffect(() => {
    if (data && d3Container.current) {
      const margin = {
        top: 10,
        right: 30,
        bottom: 30,
        left: 50,
      };

      width = width - margin.left - margin.right;
      height = height - margin.top - margin.bottom;

      const svg = d3
        .select(d3Container.current)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3
        .scaleTime()
        .domain(d3.extent(data, (d) => d.x))
        .range([0, width]);

      svg
        .append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => +d.y)])
        .range([height, 0]);

      svg.append('g').call(d3.axisLeft(y));

      svg
        .append('path')
        .datum(data)
        .attr('fill', '#cce5df')
        .attr('stroke', '#69b3a2')
        .attr('stroke-width', 1)
        .attr(
          'd',
          d3
            .area()
            .x((d) => x(d.x))
            .y0(y(0))
            .y1((d) => y(d.y)),
        );
    }
  }, [data, width, height]);

  return <div ref={d3Container} />;
}
