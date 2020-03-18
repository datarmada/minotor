import React, { useState } from 'react';
import { Crosshair, HorizontalGridLines, VerticalGridLines, XAxis, XYPlot, YAxis } from 'react-vis';

export default function ReactVisComponent({ children, ...props }) {
  const { xTitle, yTitle, width, height, data, trainData, predictData } = props;
  const [crosshairValues, setCrosshairValues] = useState([]);

  // If no data at all, return null component
  if (!(data || (trainData && predictData))) {
    return null;
  }
  // Constants
  const AXIS_STYLE = {
    title: {
      fontWeight: 900,
      fontSize: '16px',
      fill: 'black',
    },
  };
  const childMaker = childGenerator(children, setCrosshairValues);

  // Conditionnal child creation: 2 cases, if data is set
  // or if trainData && predictData are
  const renderedChildren = [];
  if (data) {
    const child = childMaker(data);
    renderedChildren.push(child);
  } else {
    const trainChild = childMaker(trainData, 'grey');
    const predictChild = childMaker(predictData);
    renderedChildren.push(trainChild, predictChild);
  }

  return (
    <XYPlot height={height} width={width} onMouseLeave={() => setCrosshairValues([])}>
      <VerticalGridLines />
      <HorizontalGridLines />
      {renderedChildren}
      <XAxis title={xTitle} style={AXIS_STYLE} />
      <YAxis title={yTitle} style={AXIS_STYLE} />
      <Crosshair values={crosshairValues} />
    </XYPlot>
  );
}

// Utils
const childGenerator = (children, setCrosshairValues) => (data, color = '#79C7E3') => (
  <children.type
    {...children.props}
    color={color}
    opacity={0.5}
    data={data}
    onNearestX={(value, { index }) => setCrosshairValues([value])}
  />
);
