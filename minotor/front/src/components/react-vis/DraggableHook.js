import React, { useState } from 'react';

import { Highlight } from 'react-vis';

// Utils
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

const getHighlightedIds = (highlightPoint, data) =>
  data.reduce((set, { data: layerData }) => {
    layerData.map(value => highlightPoint(value) && set.add(value.id));
    return set;
  }, new Set());

export default function useDraggable(props) {
  const { data, onHighlightedPoints: highlightedIdsCallback } = props;
  const [filter, setFilter] = useState(null);
  const [highlighting, setHighlighting] = useState(false);

  const highlightPoint = createPointHighlighter(filter);
  const buildProps = createPropsBuilder(highlightPoint, highlighting);
  const customProps = data.map(({ color }) => buildProps(color));
  const callHighlightedIdxCallback = () => {
    (highlightedIdsCallback &&
      highlightedIdsCallback(getHighlightedIds(highlightPoint, data))) ||
      (!highlightedIdsCallback &&
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
        key="highlight"
      />
    ),
    customProps,
  };
}
