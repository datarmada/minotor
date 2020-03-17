import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Components
import NavBar from './components/navbar/NavBar';
// Pages
import FeaturesAnalytics from './pages/FeaturesAnalytics';
import PredictionsAnalytics from './pages/PredictionsAnalytics';
// Styles
import './sass/main.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Suspense fallback={<div>Loading...</div>} />
        <div id="main-switch">
          <Switch>
            <Route exact path="/features" component={FeaturesAnalytics} />
            <Route exact path="/predictions" component={PredictionsAnalytics} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
