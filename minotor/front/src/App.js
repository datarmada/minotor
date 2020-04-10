import React, { Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
// Components
import NavBar from './components/navbar/NavBar';
// Pages
import FeaturesAnalytics from './pages/FeaturesAnalytics';
import PredictionAnalytics from './pages/PredictionsAnalytics';
// Styles
import './sass/main.scss';

const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);

  return (
    <div className="App">
      <Router>
        <Redirect from="/" to="/features" />
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
