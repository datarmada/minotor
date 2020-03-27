import React, { useState } from 'react';
import { Highlight } from 'react-vis';

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

export default function useDraggable(props) {
  const { data } = props;
  const [filter, setFilter] = useState(null);
  const [highlighting, setHighlighting] = useState(false);

  const highlightPoint = createPointHighlighter(filter);
  const buildProps = createPropsBuilder(highlightPoint, highlighting);
  const customProps = data.map(({ color }) => buildProps(color));
  return {
    component: (
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
    ),
    customProps,
  };
}
