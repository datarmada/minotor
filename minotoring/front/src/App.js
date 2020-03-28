import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Components
import NavBar from './components/navbar/NavBar';
import FeatureAnalyzer from './components/analyzers/FeatureAnalyzer';
// Pages
import FeaturesAnalytics from './pages/FeaturesAnalytics';
import PredictionAnalytics from './pages/PredictionsAnalytics';
import InputsAnalytics from './components/inputs-table/InputsAnalytics';
// Styles
import './sass/main.scss';

const App = () => {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Suspense fallback={<div>Loading...</div>} />
        <div id="main-switch">
          <Switch>
            <Route exact path="/features" component={FeaturesAnalytics} />
            <Route exact path="/predictions" component={PredictionAnalytics} />
            <Route exact path="/inputs" component={InputsAnalytics} />
            <Route exact path="/feature-analysis" component={FeatureAnalyzer} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
