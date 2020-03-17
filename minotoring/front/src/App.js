import React, { Suspense, useState } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Styles
import './sass/main.scss';

// Pages
import FeaturesAnalytics from './pages/featuresAnalytics';
import PredictionsAnalytics from './pages/predictionsAnalytics';

// Components
import NavBar from './components/navbar/NavBar';
import WebSocketComponent from './components/data-managers/WebSocketComponent';

function App() {
  const [featureData, setFeatureData] = useState({});

  return (
    <div className="App">
      <Router>
        <NavBar />
        <WebSocketComponent setFeatureData={setFeatureData} />
        <Suspense fallback={<div>Loading...</div>} />
        <div id="main-switch">
          <Switch>
            <Route
              exact
              path="/features"
              render={props => (
                <FeaturesAnalytics {...props} data={featureData} />
              )}
            />
            <Route exact path="/predictions" component={PredictionsAnalytics} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
