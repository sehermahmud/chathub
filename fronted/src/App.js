import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './component/Header';
import Home from './page/home/home';
import ChatingRoom from './page/chating-room/chat';

function App() {
  return (
    <Router>
      <Header />
      <br />
      <br />
      <br />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/chat">
          <ChatingRoom />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
