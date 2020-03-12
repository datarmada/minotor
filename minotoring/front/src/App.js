import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import './sass/app.scss';
import FeaturesAnalytics from './pages/featuresAnalytics';
import PredictionsAnalytics from './pages/predictionsAnalytics';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Suspense fallback={<div>Loading...</div>} />
        <Switch>
          <Route exact path="/features" component={FeaturesAnalytics} />
          <Route exact path="/predictions" component={PredictionsAnalytics} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
