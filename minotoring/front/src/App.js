import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function App() {
  const d3Container = useRef(null);

  let data = [
    { date: '2013-04-28', value: 135.98 },
    { date: '2014-04-28', value: 125.98 },
    { date: '2015-04-28', value: 115.98 },
    { date: '2016-04-28', value: 105.98 },
    { date: '2017-04-28', value: 165.98 },
    { date: '2018-04-28', value: 175.98 },
    { date: '2019-04-28', value: 195.98 },
    { date: '2020-04-28', value: 155.98 },
  ];

  data = data.map((d) => ({ ...d, date: d3.timeParse('%Y-%m-%d')(d.date) }));

  const margin = {
    top: 10,
    right: 30,
    bottom: 30,
    left: 50,
  };
  const width = 460 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  useEffect(() => {
    if (data && d3Container.current) {
      const svg = d3
        .select(d3Container.current)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3
        .scaleTime()
        .domain(d3.extent(data, (d) => d.date))
        .range([0, width]);

      svg
        .append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      console.log(x(data[0].date));

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => +d.value)])
        .range([height, 0]);
      svg.append('g').call(d3.axisLeft(y));

      svg
        .append('path')
        .datum(data)
        .attr('fill', '#cce5df')
        .attr('stroke', '#69b3a2')
        .attr('stroke-width', 3)
        .attr(
          'd',
          d3
            .area()
            .x((d) => x(d.date))
            .y0(y(0))
            .y1((d) => y(d.value)),
        );
    }
  }, [data, d3Container.current]);

  return <div ref={d3Container} />;
}

export default App;
