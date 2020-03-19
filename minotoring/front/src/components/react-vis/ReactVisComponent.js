import React, { useState } from 'react';
import {
  Crosshair,
  DiscreteColorLegend,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from 'react-vis';

export default function ReactVisComponent({ children, ...props }) {
  const { xTitle, yTitle, width, height, data } = props;
  const [crosshairValues, setCrosshairValues] = useState([]);

  // If no data at all, return null component
  if (!data) {
    return null;
  }
  // Constants
  const AXIS_STYLE = {
    title: {
      fontWeight: 900,
      fontSize: '16px',
    },
  };

  const layerMaker = layerGenerator(children, setCrosshairValues);
  const renderedLayers = data.map(({ data, name, color }) => layerMaker(data, name, color));

  return (
    <XYPlot height={height} width={width} onMouseLeave={() => setCrosshairValues([])}>
      <VerticalGridLines />
      <HorizontalGridLines />
      {renderedLayers}
      <XAxis title={xTitle} style={AXIS_STYLE} />
      <YAxis title={yTitle} style={AXIS_STYLE} />
      <DiscreteColorLegend
        items={data.map(({ name, color }) => ({ title: name, color }))}
        style={{ position: 'absolute', top: 0, right: 0 }}
      />
      <Crosshair values={crosshairValues} />
    </XYPlot>
  );
}

// Utils
const layerGenerator = (children, setCrosshairValues) => (data, name, color = '#79C7E3') => (
  <children.type
    key={name}
    {...children.props}
    color={color}
    opacity={0.5}
    data={data}
    onNearestX={(value, { index }) => setCrosshairValues([value])}
  />
);
