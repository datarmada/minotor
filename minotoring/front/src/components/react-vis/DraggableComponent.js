import React, { useState } from 'react';
import { Highlight, MarkSeries } from 'react-vis';

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

export default function DraggableComponent(props) {
  const { data } = props;
  const [filter, setFilter] = useState(null);
  const [highlighting, setHighlighting] = useState(false);

  const highlightPoint = createPointHighlighter(filter);
  const makeLayer = createLayerMaker(highlightPoint, highlighting);
  const renderedLayers = data.map(({ data: layerData, name, color }) =>
    makeLayer(layerData, name, color)
  );
  return [
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
    />,
    ...renderedLayers,
  ];
}
