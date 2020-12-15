import { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.scss';

function App() {
  return (
    <Fragment>
      <Router>
        <h1>Hello</h1>
        <Switch></Switch>
      </Router>
    </Fragment>
  );
}

export default App;
