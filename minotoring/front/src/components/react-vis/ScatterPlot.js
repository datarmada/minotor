import React from 'react';
import { MarkSeries } from 'react-vis';
import ReactVisComponent from './ReactVisComponent';

export default function ScatterPlot(props) {
  const { type, data } = props;

  if (type === 'outliers' && data.length != 0) {
    const outlierData = getOutlierData(data);
    props = {
      ...props,
      data: [
        {
          name: 'Outliers',
          type: 'predict',
          data: outlierData,
        },
      ],
    };
  }

  return (
    <ReactVisComponent {...props}>
      <MarkSeries />
    </ReactVisComponent>
  );
}

// Utils
const getOutlierData = (data) => {
  const idx = data.findIndex(({ type }) => type === 'predict');
  // if predict type has been found
  if (idx !== -1) {
    const predictData = data[idx];
    return values2reactVisData(predictData.values);
  }
  return data;
};

const values2reactVisData = (values) => values.map((value, idx) => ({ x: idx, y: value }));
