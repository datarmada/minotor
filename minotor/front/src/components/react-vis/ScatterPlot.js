import React from 'react';

import { MarkSeries } from 'react-vis';

// Components
import ReactVisComponent from './ReactVisComponent';

export default function ScatterPlot(props) {
  return (
    <ReactVisComponent {...props}>
      <MarkSeries sizeType="literal" />
    </ReactVisComponent>
  );
}
