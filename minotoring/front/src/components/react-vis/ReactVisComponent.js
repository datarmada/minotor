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

  // Conditionnal child creation: 2 cases, if data is set
  // or if trainData && predictData are
  const renderedChildren = [];
  if (data) {
    const child = (
      <children.type
        {...children.props}
        opacity={0.5}
        data={data.map(({ x, y }) => ({ x, y: y + 1 }))}
        onNearestX={(value, { index }) => setCrosshairValues([value])}
      />
    );
    renderedChildren.push(child);
  } else {
    const trainChild = (
      <children.type
        {...children.props}
        color="grey"
        opacity={0.5}
        data={trainData}
        onNearestX={(value, { index }) => setCrosshairValues([value])}
      />
    );
    const predictChild = (
      <children.type
        {...children.props}
        opacity={0.5}
        data={predictData}
        onNearestX={(value, { index }) => setCrosshairValues([value])}
      />
    );
    renderedChildren.push(trainChild, predictChild);
  }

  return (
    <XYPlot height={height} width={width} onMouseLeave={() => setCrosshairValues([])}>
      <VerticalGridLines />
      <HorizontalGridLines />
      {renderedChildren.map((child) => child)}
      <XAxis title={xTitle} style={AXIS_STYLE} />
      <YAxis title={yTitle} style={AXIS_STYLE} />
      <Crosshair values={crosshairValues} />
    </XYPlot>
  );
}
