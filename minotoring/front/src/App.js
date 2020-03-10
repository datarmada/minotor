import React from 'react';

import AreaGraph from './components/d3/AreaGraph';

function App() {
  const AREA_GRAPH_PROPS = {
    width: 700,
    height: 400,
    data: [
      { x: 1, y: 1 },
      { x: 2, y: 3 },
      { x: 3, y: 6 },
      { x: 4, y: 12 },
      { x: 5, y: 16 },
      { x: 6, y: 24 },
      { x: 7, y: 42 },
      { x: 8, y: 56 },
    ],
  };

  return (
    <div>
      <h1>Minotoring Dashboard</h1>
      <AreaGraph {...AREA_GRAPH_PROPS} />
    </div>
  );
}

export default App;
