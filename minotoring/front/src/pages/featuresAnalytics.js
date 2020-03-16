import React, { useEffect, useState } from 'react';

// Components
import AreaPlot from '../components/react-vis/AreaPlot';
import BarPlot from '../components/react-vis/BarPlot';
import Table from '../components/base-elements/Table';

export default function FeaturesAnalytics(props) {
  const [data, setData] = useState([]);

  const TABLE_PROPS = {
    keys: ['featureName', 'mean', 'std', 'nb_nan'],
    data: [
      {
        featureName: 'feature 1',
        mean: 0.56,
        std: 0.56,
        nb_nan: 0.56,
      },
      {
        featureName: 'feature 2',
        mean: 0.56,
        std: 0.56,
        nb_nan: 0.56,
      },
    ],
  };

  const AREA_SERIES_PROPS = {
    xTitle: "I'm axis X",
    yTitle: "And I'm axis Y",
    width: 600,
    height: 400,
    data,
  };

  useEffect(() => {
    const ws = new WebSocket('ws://0.0.0.0:8888/ws');
    ws.onopen = function() {
      console.log('WebSocket opened');
    };
    ws.onmessage = function(e) {
      setData(JSON.parse(e.data).area);
    };
    ws.onclose = function(e) {
      console.log('WebSocket closed');
    };
  }, []);

  return (
    <div id="features-analytics">
      <h1>Features Analytics</h1>
      <Table {...TABLE_PROPS} />
      <AreaPlot {...AREA_SERIES_PROPS} />
      <BarPlot {...AREA_SERIES_PROPS} />
    </div>
  );
}
