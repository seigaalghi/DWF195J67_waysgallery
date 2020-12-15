import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.scss';
import Background from './components/landing/Background';
import store from './redux/store';
import { loadUser } from './redux/action/auth';
import setAuthToken from './redux/utility/setAuthToken';

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
          <Route component={Background} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
