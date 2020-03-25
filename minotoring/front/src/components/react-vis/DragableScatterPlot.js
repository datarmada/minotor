import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  DiscreteColorLegend,
  Highlight,
  HorizontalGridLines,
  MarkSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from 'react-vis';

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

export default function DragableScatterPlot(props) {
  const { data, xTitle, yTitle, width, height, axisStyle, legendStyle } = props;
  const [filter, setFilter] = useState(null);
  const [highlighting, setHighlighting] = useState(false);

  const highlightPoint = createPointHighlighter(filter);
  const makeLayer = createLayerMaker(highlightPoint, highlighting);
  const renderedLayers = data.map(({ data: layerData, name, color }) =>
    makeLayer(layerData, name, color)
  );

  const nbSelectedPoints = Array.prototype
    .concat(data[0].data, data[1].data)
    .filter(highlightPoint).length;
  return (
    <div>
      <XYPlot width={width} height={height}>
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
      </XYPlot>
      <p>There is {nbSelectedPoints} points selected</p>
    </div>
  );
}

DragableScatterPlot.propTypes = {
  // data has to contain :
  // [
  //  {
  //    data: [{x, y}, {x, y}, ...],
  //    name: Name of the layer,
  //    color: string of a color, optional
  //  },
  //  ...
  // ]
  data: PropTypes.arrayOf(Object).isRequired,
  xTitle: PropTypes.string.isRequired,
  yTitle: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  axisStyle: PropTypes.objectOf(Object),
  legendStyle: PropTypes.objectOf,
};

DragableScatterPlot.defaultProps = {
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
