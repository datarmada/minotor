import React from 'react';

import { VerticalBarSeries } from 'react-vis';

// Components
import ReactVisComponent from './ReactVisComponent';

export default function BarPlot(props) {
  return (
    <ReactVisComponent {...props}>
      <VerticalBarSeries />
    </ReactVisComponent>
  );
}
