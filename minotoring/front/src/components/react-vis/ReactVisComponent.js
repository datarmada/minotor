import {
  arrayOf,
  bool,
  func,
  object,
  objectOf,
  oneOfType,
  number,
  string,
} from 'prop-types';
import React from 'react';

import {
  DiscreteColorLegend,
  FlexibleXYPlot,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  YAxis,
} from 'react-vis';

// Hooks
import useCrosshair from './CrosshairHook';
import useDraggable from './DraggableHook';

// Utils
const createLayerMaker = (children, props) => (
  color = '#79C7E3',
  data,
  name,
  opacity,
  style,
  idx
) => (
  <children.type
    {...props[idx]}
    {...children.props}
    key={name}
    opacity={opacity}
    data={data}
    color={color}
    style={style}
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
  const renderedLayers = data.map(
    ({ color, data: layerData, name, opacity, style }, idx) =>
      makeLayer(color, layerData, name, opacity, style, idx)
  );
  // If no data at all, return null component
  if (!data) {
    return null;
  }
  return (
    <FlexibleXYPlot {...props} {...XYprops}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <DiscreteColorLegend
        items={data.map(({ name, color }) => ({
          title: name,
          color,
        }))}
        style={legendStyle}
      />
      {additionalComponents}
      {renderedLayers}
      <XAxis title={xTitle} style={axisStyle} />
      <YAxis title={yTitle} style={axisStyle} />
    </FlexibleXYPlot>
  );
}

ReactVisComponent.propTypes = {
  children: object.isRequired, // eslint-disable-line
  data: arrayOf(object).isRequired,
  xTitle: string,
  yTitle: string,
  width: number, // eslint-disable-line
  height: number, // eslint-disable-line
  axisStyle: objectOf(oneOfType([object, string, number])),
  legendStyle: objectOf(oneOfType([string, number])),
  isDraggable: bool,
  isCrosshair: bool,
  highlightedIdxCallback: func,
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
