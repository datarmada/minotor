import React, { Suspense } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Styles
import './sass/main.scss';

// Pages
import FeaturesAnalytics from './pages/featuresAnalytics';
import PredictionsAnalytics from './pages/predictionsAnalytics';

// Components
import NavBar from './components/navbar/NavBar';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Suspense fallback={<div>Loading...</div>} />
        <Switch>
          <div id="main-switch">
            <Route exact path="/features" component={FeaturesAnalytics} />
            <Route exact path="/predictions" component={PredictionsAnalytics} />
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
