import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  DiscreteColorLegend,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  YAxis,
  XYPlot,
  MarkSeries,
} from 'react-vis';
import useDraggable from './DraggableHook';
import useCrosshair from './CrosshairHook';

const createLayerMaker = (children, props) => (
  data,
  name,
  color = '#79C7E3',
  idx
) => (
  <children.type
    key={name}
    opacity={0.8}
    data={data}
    color={color}
    {...props[idx]}
    {...children.props}
  />
);

const buildAdditionalFeatures = (isDraggable, isCrosshair, data, props) => {
  const additionalComponents = [];
  const additionalProps = [];

  const {
    component: crossHairComponent,
    customProps: crosshairProps,
    XYprops,
  } = isCrosshair ? useCrosshair(props) : {};

  isCrosshair &&
    additionalComponents.push(crossHairComponent) &&
    additionalProps.push(crosshairProps);

  const {
    component: draggableComponent,
    customProps: draggableProps,
  } = isDraggable ? useDraggable(props) : {};

  isDraggable &&
    additionalComponents.push(draggableComponent) &&
    additionalProps.push(draggableProps);

  const customProps = data.map((_, idx) =>
    additionalProps.reduce(
      (obj, newProps) => ({ ...newProps[idx], ...obj }),
      {}
    )
  );
  return { customProps, additionalComponents, XYprops };
};

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
    isCrosshair,
  } = props;

  const {
    customProps,
    additionalComponents,
    XYprops,
  } = buildAdditionalFeatures(isDraggable, isCrosshair, data, props);
  const makeLayer = createLayerMaker(children, customProps);
  const renderedLayers = data.map(({ data: layerData, name, color }, idx) =>
    makeLayer(layerData, name, color, idx)
  );
  // If no data at all, return null component
  if (!data) {
    return null;
  }
  return (
    <XYPlot height={height} width={width} {...XYprops}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title={xTitle} style={axisStyle} />
      <YAxis title={yTitle} style={axisStyle} />
      <DiscreteColorLegend
        items={data.map(({ name, color }) => ({ title: name, color }))}
        style={legendStyle}
      />
      {additionalComponents}
      {renderedLayers}
    </XYPlot>
  );
}

ReactVisComponent.propTypes = {
  children: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(Object).isRequired,
  xTitle: PropTypes.string,
  yTitle: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  axisStyle: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number])
  ),
  legendStyle: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  isDraggable: PropTypes.bool,
  isCrosshair: PropTypes.bool,
};

ReactVisComponent.defaultProps = {
  xTitle: '',
  yTitle: '',
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
  isCrosshair: true,
};
