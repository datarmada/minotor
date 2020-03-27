import React, { useState } from 'react';
import { Highlight } from 'react-vis';
import highlight from 'react-vis/dist/plot/highlight';

const createPropsBuilder = (highlightPoint, highlighting) => (
  color = '#79C7E3'
) => ({
  style: { pointerEvents: highlighting ? 'none' : '' },
  colorType: 'literal',
  getColor: d => (highlightPoint(d) ? '#EF5D28' : color),
});

const createPointHighlighter = filter => d => {
  if (!filter) {
    return false;
  }
  const leftRight = d.x <= filter.right && d.x >= filter.left;
  const upDown = d.y <= filter.top && d.y >= filter.bottom;
  return leftRight && upDown;
};

const getHighlightedIdx = (highlightPoint, data) =>
  data.reduce(
    (obj, { data: layerData, name }) => ({
      [name]: layerData.reduce(
        (highlightedPoints, value, idx) =>
          highlightPoint(value)
            ? [idx, ...highlightedPoints]
            : highlightedPoints,
        []
      ),
      ...obj,
    }),
    {}
  );

export default function useDraggable(props) {
  const { data, highlightedIdxCallback } = props;
  const [filter, setFilter] = useState(null);
  const [highlighting, setHighlighting] = useState(false);

  const highlightPoint = createPointHighlighter(filter);
  const buildProps = createPropsBuilder(highlightPoint, highlighting);
  const customProps = data.map(({ color }) => buildProps(color));
  const callHighlightedIdxCallback = () => {
    (highlightedIdxCallback &&
      highlightedIdxCallback(getHighlightedIdx(highlightPoint, data))) ||
      (!highlightedIdxCallback &&
        console.error(
          'You should specify a callback for selected data points'
        ));
  };
  return {
    component: (
      <Highlight
        drag
        onBrushStart={() => setHighlighting(true)}
        onBrush={area => setFilter(area)}
        onBrushEnd={area => {
          setHighlighting(false);
          setFilter(area);
          callHighlightedIdxCallback();
        }}
        onDragStart={() => setHighlighting(true)}
        onDrag={area => setFilter(area)}
        onDragEnd={area => {
          setHighlighting(false);
          setFilter(area);
          callHighlightedIdxCallback();
        }}
      />
    ),
    customProps,
  };
}
