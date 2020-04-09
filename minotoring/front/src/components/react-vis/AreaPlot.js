import React from 'react';

import { AreaSeries } from 'react-vis';

// Components
import ReactVisComponent from './ReactVisComponent';

export default function AreaPlot(props) {
  return (
    <ReactVisComponent {...props}>
      <AreaSeries curve="curveMonotoneX" />
    </ReactVisComponent>
  );
}
