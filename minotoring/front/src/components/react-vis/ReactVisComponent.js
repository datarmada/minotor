import PropTypes from 'prop-types';
import React from 'react';
import {
  DiscreteColorLegend,
  FlexibleXYPlot,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  YAxis,
} from 'react-vis';
import useCrosshair from './CrosshairHook';
import useDraggable from './DraggableHook';

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

  // Crosshair feature
  const {
    component: crossHairComponent,
    customProps: crosshairProps,
    XYprops,
  } = isCrosshair ? useCrosshair(props) : {};

  isCrosshair &&
    additionalComponents.push(crossHairComponent) &&
    additionalProps.push(crosshairProps);

  // Draggable feature
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
    <FlexibleXYPlot {...props} {...XYprops}>
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
    </FlexibleXYPlot>
  );
}

ReactVisComponent.propTypes = {
  children: PropTypes.object.isRequired, // eslint-disable-line
  data: PropTypes.arrayOf(Object).isRequired,
  xTitle: PropTypes.string,
  yTitle: PropTypes.string,
  width: PropTypes.number, // eslint-disable-line
  height: PropTypes.number, // eslint-disable-line
  axisStyle: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number])
  ),
  legendStyle: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  isDraggable: PropTypes.bool,
  isCrosshair: PropTypes.bool,
  highlightedIdxCallback: PropTypes.func,
};

ReactVisComponent.defaultProps = {
  xTitle: '',
  yTitle: '',
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
  isCrosshair: false,
  highlightedIdxCallback: null,
};
