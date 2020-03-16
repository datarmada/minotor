import React, { useEffect, useState } from 'react';
import AreaPlot from '../components/react-vis/AreaPlot';
import BarPlot from '../components/react-vis/BarPlot';

export default function FeaturesAnalytics(props) {
  const [data, setData] = useState([]);

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
      console.log(e.data)
    };
    ws.onclose = function(e) {
      console.log('WebSocket closed');
    };
  }, []);

  return (
    <div>
      <h1>Features Analytics</h1>
      <AreaPlot {...AREA_SERIES_PROPS} />
      <BarPlot {...AREA_SERIES_PROPS} />
    </div>
  );
}
