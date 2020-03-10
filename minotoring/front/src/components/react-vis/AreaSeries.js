import React from 'react';

import {
  AreaSeries as AS,
  XYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
} from 'react-vis';

import '../../../node_modules/react-vis/dist/style.css';
import '../../sass/react-vis/AreaSeries.scss';

export default function AreaSeries(props) {
  const { data, xTitle, yTitle, width, height } = props;

  const AXIS_STYLE = {
    title: {
      fontWeight: 900,
      fontSize: '16px',
      fill: 'black',
    },
  };

  return (
    <XYPlot height={height} width={width}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <AS data={data} curve="curveMonotoneX" />
      <XAxis title={xTitle} style={AXIS_STYLE} />
      <YAxis title={yTitle} style={AXIS_STYLE} />
    </XYPlot>
  );
}
