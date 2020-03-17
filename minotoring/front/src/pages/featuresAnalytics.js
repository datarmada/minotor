import React, { useEffect, useState } from 'react';

// Components
import AreaPlot from '../components/react-vis/AreaPlot';
import BarPlot from '../components/react-vis/BarPlot';
import Table from '../components/base-elements/Table';

export default function FeaturesAnalytics(props) {
  const [data, setData] = useState([]);

  // Event functions
  const onTrClicked = (e) => {
    const tr = e.currentTarget;
    const selectedFeature = tr.firstChild.innerText;
    // TODO: display graphs related to selected feature
    console.log(`User has selected the feature : ${selectedFeature}`);
  };

  // Constants
  const TABLE_PROPS = {
    onTrClicked,
    orderedKeys: ['featureName', 'mean', 'std', 'nb_nan'],
    verboseKeyNames: {
      featureName: 'Name of the features',
      mean: 'Mean',
      std: 'Standard Deviation',
      nb_nan: 'Number of NaN',
    },
    data: [
      {
        featureName: 'size',
        mean: 0.56,
        std: 0.56,
        nb_nan: 0.56,
      },
      {
        featureName: 'weight',
        mean: 0.56,
        std: 0.56,
        nb_nan: 0.56,
      },
      {
        featureName: 'age',
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
    return () => ws.close();
  }, []);

  return (
    <div id="features-analytics">
      <h1 style={{ marginBottom: '30px' }}>Features Analytics</h1>
      <Table {...TABLE_PROPS} />
      <AreaPlot {...AREA_SERIES_PROPS} />
      <BarPlot {...AREA_SERIES_PROPS} />
    </div>
  );
}
