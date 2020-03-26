import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  DiscreteColorLegend,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from 'react-vis';
import CrosshairComponent from './CrosshairComponent';
import DraggableComponent from './DraggableComponent';

export default function ReactVisComponent({ children, ...props }) {
  const {
    data,
    xTitle,
    yTitle,
    width,
    height,
    axisStyle,
    legendStyle,
    isDraggable,
  } = props;

  const plotFactory = isDraggable ? DraggableComponent : CrosshairComponent;

  const [XYPlotMouseLeave, setXYPlotMouseLeave] = useState(() => () => {});
  // If no data at all, return null component
  if (!data) {
    return null;
  }
  return (
    <XYPlot height={height} width={width} onMouseLeave={XYPlotMouseLeave}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title={xTitle} style={axisStyle} />
      <YAxis title={yTitle} style={axisStyle} />
      <DiscreteColorLegend
        items={data.map(({ name, color }) => ({ title: name, color }))}
        style={legendStyle}
      />
      {plotFactory({ child: children, data, setXYPlotMouseLeave })}
    </XYPlot>
  );
}

ReactVisComponent.propTypes = {
  children: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(Object).isRequired,
  xTitle: PropTypes.string.isRequired,
  yTitle: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  axisStyle: PropTypes.objectOf(
    PropTypes.oneOf([PropTypes.object, PropTypes.string, PropTypes.number])
  ),
  legendStyle: PropTypes.objectOf(
    PropTypes.oneOf([PropTypes.string, PropTypes.number])
  ),
  isDraggable: PropTypes.bool,
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
  isDraggable: false,
};
