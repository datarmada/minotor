import React from 'react';
import { VerticalBarSeries } from 'react-vis';
import ReactVisComponent from './ReactVisComponent';

export default function BarPlot(props) {
  return <ReactVisComponent component={<VerticalBarSeries />} {...props} />;
}
