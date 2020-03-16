import React from 'react';
import { AreaSeries } from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';
import ReactVisComponent from './ReactVisComponent';

export default function AreaPlot(props) {
  return (
    <ReactVisComponent {...props}>
      <AreaSeries curve="curveMonotoneX" />
    </ReactVisComponent>
  );
}
