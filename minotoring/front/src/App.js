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
  const [isNavOpen, setIsNavOpen] = useState(true);
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
        <NavBar isOpen={isNavOpen} onToggleNav={setIsNavOpen} />
        <Suspense fallback={<div>Loading...</div>} />
        <div id="main-switch" className={isNavOpen ? null : 'wide'}>
          <Switch>
            <Route exact path="/features" component={FeaturesAnalytics} />
            <Route exact path="/predictions" component={PredictionAnalytics} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
