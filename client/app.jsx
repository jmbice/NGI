import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Root from './components/Root';
import './styles/main.scss';


const routedRoot = (
  <Router>
    <Route exact path="/" render={props => <Root {...props} filter="latest" />} />
    <Route exact path="/articles/" render={props => <Root {...props} filter="articles" />} />
    <Route exact path="/videos/" render={props => <Root {...props} filter="videos" />} />
  </Router>
);

ReactDOM.render(routedRoot, document.getElementById('IGN-webApp-FE'));
