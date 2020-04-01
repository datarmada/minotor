import {
  arrayOf,
  object,
  objectOf,
  oneOfType,
  number,
  shape,
  string,
} from 'prop-types';
import React, { useState } from 'react';

import {
  DiscreteColorLegend,
  Highlight,
  HorizontalGridLines,
  MarkSeries,
  VerticalGridLines,
  XAxis,
  FlexibleXYPlot,
  YAxis,
} from 'react-vis';

// Utils
const createLayerMaker = (highlightPoint, highlighting) => (
  layerData,
  name,
  color = '#79C7E3'
) => (
  <MarkSeries
    key={name}
    style={{ pointerEvents: highlighting ? 'none' : '' }}
    colorType="literal"
    getColor={d => {
      return highlightPoint(d) ? '#EF5D28' : color;
    }}
    opacity={0.8}
    data={layerData}
  />
);

const createPointHighlighter = filter => d => {
  if (!filter) {
    return false;
  }
  const leftRight = d.x <= filter.right && d.x >= filter.left;
  const upDown = d.y <= filter.top && d.y >= filter.bottom;
  return leftRight && upDown;
};

export default function DraggableScatterPlot(props) {
  const { data, xTitle, yTitle, axisStyle, legendStyle } = props;
  const [filter, setFilter] = useState(null);
  const [highlighting, setHighlighting] = useState(false);

  const highlightPoint = createPointHighlighter(filter);
  const makeLayer = createLayerMaker(highlightPoint, highlighting);
  const renderedLayers = data.map(({ data: layerData, name, color }) =>
    makeLayer(layerData, name, color)
  );

  const nbSelectedPoints = Array.prototype
    .concat(...data.map(category => category.data))
    .filter(highlightPoint).length;

  return (
    <FlexibleXYPlot {...props}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title={xTitle} style={axisStyle} />
      <YAxis title={yTitle} style={axisStyle} />
      <DiscreteColorLegend
        items={data.map(({ name, color }) => ({ title: name, color }))}
        style={legendStyle}
      />
      <Highlight
        drag
        onBrushStart={() => setHighlighting(true)}
        onBrush={area => setFilter(area)}
        onBrushEnd={area => {
          setHighlighting(false);
          setFilter(area);
        }}
        onDragStart={() => setHighlighting(true)}
        onDrag={area => setFilter(area)}
        onDragEnd={area => {
          setHighlighting(false);
          setFilter(area);
        }}
      />
      {renderedLayers}
      <p>There is {nbSelectedPoints} points selected</p>
    </FlexibleXYPlot>
  );
}

DraggableScatterPlot.propTypes = {
  data: arrayOf(
    shape({
      data: arrayOf(shape({ x: number, y: number })).isRequired,
      name: string.isRequired,
      color: string,
    })
  ).isRequired,
  xTitle: string,
  yTitle: string,
  width: number, // eslint-disable-line
  height: number, // eslint-disable-line
  axisStyle: objectOf(object),
  legendStyle: objectOf(oneOfType([string, number])),
};

DraggableScatterPlot.defaultProps = {
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
};
