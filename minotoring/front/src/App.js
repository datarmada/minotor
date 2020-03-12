import React from 'react';

import AreaSeries from './components/react-vis/AreaSeries';
import NavBar from './components/navbar/NavBar';

import './sass/app.scss';

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
      { x: 9, y: 0 }
    ]
  };

  return (
    <div className="App">
      <NavBar />
      <AreaSeries {...AREA_SERIES_PROPS} />
    </div>
  );
}

export default App;
