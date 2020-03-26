import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  Crosshair,
  DiscreteColorLegend,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  FlexibleXYPlot,
  YAxis,
} from 'react-vis';

// Utils
const createLayerMaker = (children, setCrosshairValues) => (
  first,
  data,
  layerData,
  name,
  color = '#79C7E3'
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
            setCrosshairValues(data.map(elt => elt.data[index]));
          }
        : null
    }
  />
);

export default function ReactVisComponent({ children, ...props }) {
  const { data, xTitle, yTitle, width, height, axisStyle, legendStyle } = props;
  const [crosshairValues, setCrosshairValues] = useState([]);
  // If no data at all, return null component
  if (!data) {
    return null;
  }
  // Generating layers
  const makeLayer = createLayerMaker(children, setCrosshairValues);
  const renderedLayers = data.map(({ data: layerData, name, color }, idx) =>
    makeLayer(idx === 0, data, layerData, name, color)
  );

  return (
    <FlexibleXYPlot
      height={height}
      width={width}
      onMouseLeave={() => setCrosshairValues([])}
    >
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
    </FlexibleXYPlot>
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
  children: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(Object).isRequired,
  xTitle: PropTypes.string.isRequired,
  yTitle: PropTypes.string.isRequired,
  width: PropTypes.number, // eslint-disable-line
  height: PropTypes.number, // eslint-disable-line
  axisStyle: PropTypes.object,
  legendStyle: PropTypes.object,
};

ReactVisComponent.defaultProps = {
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
