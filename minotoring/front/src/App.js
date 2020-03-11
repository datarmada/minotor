import React from 'react';

import AreaSeries from './components/react-vis/AreaSeries';

function App() {
  const AREA_SERIES_PROPS = {
    xTitle: "I'm axis X",
    yTitle: "And I'm axis Y",
    width: 600,
    height: 400,
    data: [
      { x: 0, y: 8 },
      { x: 1, y: 5 },
      { x: 2, y: 4 },
      { x: 3, y: 9 },
      { x: 4, y: 1 },
      { x: 5, y: 7 },
      { x: 6, y: 6 },
      { x: 7, y: 3 },
      { x: 8, y: 2 },
      { x: 9, y: 0 },
    ],
  };

  const ws = new WebSocket('ws://0.0.0.0:8888/ws');
  ws.onopen = function() {
    ws.send('Hello, world');
  };
  ws.onmessage = function(evt) {
    alert(evt.data);
  };

  return (
    <div className="App">
      <h1>Minotoring Dashboard</h1>
      <AreaSeries {...AREA_SERIES_PROPS} />
    </div>
  );
}

export default App;
