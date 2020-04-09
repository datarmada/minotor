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
import React, { useState, useLayoutEffect, useRef } from 'react';

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
const legendHeight = 60;

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
    style={{ ...style, ...props[idx].style }}
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
    description,
    xTitle,
    yTitle,
    axisStyle,
    isDraggable,
    isCrosshair,
    title,
  } = props;

  const [titleHeight, setTitleHeight] = useState(0);
  const [titleMarginBottom, setTitleMarginBottom] = useState('0px');
  const [titleMarginTop, setTitleMarginTop] = useState('0px');

  const titleRef = useRef();
  useLayoutEffect(() => {
    titleRef.current &&
      (setTitleHeight(titleRef.current.offsetHeight) ||
        setTitleMarginBottom(getComputedStyle(titleRef.current).marginBottom) ||
        setTitleMarginTop(getComputedStyle(titleRef.current).marginTop));
  }, []);

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
    <div className="plot-container">
      <div ref={titleRef} className="plot-title-container">
        <h3 className="plot-title">{title}</h3>
        <p>{description}</p>
      </div>
      <div
        className="plot"
        style={{
          height: `calc(100% - (${titleHeight}px + ${titleMarginBottom} + ${titleMarginTop} + ${legendHeight}px))`,
        }}
      >
        <FlexibleXYPlot {...props} {...XYprops}>
          <VerticalGridLines />
          <HorizontalGridLines />
          {additionalComponents}
          {renderedLayers}
          <XAxis title={xTitle} style={axisStyle} />
          <YAxis title={yTitle} style={axisStyle} />
        </FlexibleXYPlot>
      </div>
      <DiscreteColorLegend
        items={data.map(({ name, color }) => ({
          title: name,
          color,
        }))}
        height={legendHeight}
        orientation="horizontal"
      />
    </div>
  );
}

ReactVisComponent.propTypes = {
  children: object.isRequired, // eslint-disable-line
  data: arrayOf(object).isRequired,
  description: string,
  xTitle: string,
  yTitle: string,
  width: number, // eslint-disable-line
  height: number, // eslint-disable-line
  axisStyle: objectOf(oneOfType([object, string, number])),
  isDraggable: bool,
  isCrosshair: bool,
  highlightedIdxCallback: func,
  title: string,
};

ReactVisComponent.defaultProps = {
  xTitle: '',
  yTitle: '',
  description: '',
  axisStyle: {
    title: {
      fontWeight: 900,
      fontSize: '16px',
    },
  },
  isDraggable: false,
  isCrosshair: false,
  highlightedIdxCallback: null,
  title: '',
};
