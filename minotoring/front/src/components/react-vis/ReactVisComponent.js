import PropTypes from 'prop-types';
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
  const { data, xTitle, yTitle, width, height, axisStyle, legendStyle } = props;
  const [crosshairValues, setCrosshairValues] = useState([]);

  // If no data at all, return null component
  if (!data) {
    return null;
  }

  // Generating layers
  const layerMaker = layerGenerator(children, setCrosshairValues);
  const renderedLayers = data.map(({ data: layerData, name, color }, idx) =>
    layerMaker(idx == 0, data, layerData, name, color),
  );

  return (
    <XYPlot height={height} width={width} onMouseLeave={() => setCrosshairValues([])}>
      <VerticalGridLines />
      <HorizontalGridLines />
      {renderedLayers}
      <XAxis title={xTitle} style={axisStyle} />
      <YAxis title={yTitle} style={axisStyle} />
      <DiscreteColorLegend
        items={data.map(({ name, color }) => ({ title: name, color }))}
        style={legendStyle}
      />
      <Crosshair values={crosshairValues} />
    </XYPlot>
  );
}

ReactVisComponent.propTypes = {
  // data has to contain :
  // [
  //  {
  //    data: [{x, y}, {x, y}, ...],
  //    name: Name of the layer,
  //    color: string of a color, optional
  //  },
  //  ...
  // ]
  data: PropTypes.array.isRequired,
  xTitle: PropTypes.string.isRequired,
  yTitle: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  axisStyle: PropTypes.object,
  legendStyle: PropTypes.object,
};

ReactVisComponent.defaultProps = {
  width: 600,
  height: 400,
  axisStyle: {
    title: {
      fontWeight: 900,
      fontSize: '16px',
    },
  },
  legendStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
};

// Utils
const layerGenerator = (children, setCrosshairValues) => (
  first,
  data,
  layerData,
  name,
  color = '#79C7E3',
) => (
  <children.type
    key={name}
    {...children.props}
    color={color}
    opacity={0.5}
    data={layerData}
    onNearestX={
      first
        ? (value, { index }) => {
            setCrosshairValues(data.map((elt) => elt.data[index]));
          }
        : null
    }
  />
);
