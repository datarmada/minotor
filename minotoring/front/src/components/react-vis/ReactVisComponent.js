import React, { useState } from 'react';
import {
  Crosshair,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis
} from 'react-vis';

export default function ReactVisComponent({ component, ...props }) {
  const { xTitle, yTitle, width, height, data } = props;
  const Component = component;
  const [crosshairValues, setCrosshairValues] = useState([]);

  const AXIS_STYLE = {
    title: {
      fontWeight: 900,
      fontSize: '16px',
      fill: 'black'
    }
  };
  return (
    <XYPlot
      height={height}
      width={width}
      onMouseLeave={() => setCrosshairValues([])}
    >
      <VerticalGridLines />
      <HorizontalGridLines />
      <Component.type
        {...Component.props}
        data={data}
        onNearestX={(value, { index }) => setCrosshairValues([value])}
      />
      <XAxis title={xTitle} style={AXIS_STYLE} />
      <YAxis title={yTitle} style={AXIS_STYLE} />
      <Crosshair values={crosshairValues} />
    </XYPlot>
  );
}
