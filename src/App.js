import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Reviews from './components/Reviews';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/reviews" exact component={Reviews} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
