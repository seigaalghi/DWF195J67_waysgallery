import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.scss';
import Background from './components/landing/Background';
import store from './redux/store';
import { loadUser } from './redux/action/auth';
import setAuthToken from './redux/utility/setAuthToken';
import Home from './components/home/Home';
import PrivateRoute from './components/routing/PrivateRoute';
import Profile from './components/profile/Profile';
import Project from './components/Project/Project';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/landing' exact component={Background} />
          <div className='App-container'>
            <PrivateRoute path='/' exact component={Home} />
            <PrivateRoute path='/profile/:id' exact component={Profile} />
            <PrivateRoute path='/order' exact component={Project} />
          </div>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
