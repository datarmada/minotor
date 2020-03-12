import React, { useState } from 'react';
import {
  Crosshair,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis
} from 'react-vis';

export default function ReactVisComponent({ children, ...props }) {
  const { xTitle, yTitle, width, height, data } = props;
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
      <children.type
        {...children.props}
        data={data}
        onNearestX={(value, { index }) => setCrosshairValues([value])}
      />
      <XAxis title={xTitle} style={AXIS_STYLE} />
      <YAxis title={yTitle} style={AXIS_STYLE} />
      <Crosshair values={crosshairValues} />
    </XYPlot>
  );
}
