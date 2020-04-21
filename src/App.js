import React from 'react';
import './App.css';
import HomeBook from "./components/HomeBook";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <Router>
    <Switch>
    <Route exact path="/" component={HomeBook} />
  </Switch>
  </Router>

  );
}

export default App;
