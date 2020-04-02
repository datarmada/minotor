import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Components
import NavBar from './components/navbar/NavBar';
// Pages
import FeaturesAnalytics from './pages/FeaturesAnalytics';
import PredictionAnalytics from './pages/PredictionsAnalytics';
// Styles
import './sass/main.scss';
import InputsAnalytics from './components/inputs-table/InputsAnalytics';
import { buildGetFetcher } from './utils/data-managers/DataFetcher';

const dataSetter = async (response, setFeatureData, setSelectedInputs) => {
  const data = await response.json();
  setFeatureData(data);
  setSelectedInputs({
    Training: new Set(data.valuesInfos.training.ids.slice(0, 5)),
  });
};

const App = () => {
  const [featureData, setFeatureData] = useState({});
  const [selectedInputs, setSelectedInputs] = useState({});

  useEffect(() => {
    const { fetchData, abortController } = buildGetFetcher('data', dataSetter);
    fetchData(setFeatureData, setSelectedInputs);
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Suspense fallback={<div>Loading...</div>} />
        <div id="main-switch">
          <Switch>
            <Route exact path="/features" component={FeaturesAnalytics} />
            <Route exact path="/predictions" component={PredictionAnalytics} />
            <Route
              exact
              path="/inputs"
              render={() => (
                <InputsAnalytics
                  featureData={featureData}
                  selectedInputs={selectedInputs}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
