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
import Post from './components/post/Post';
import AddPost from './components/post/AddPost';
import PopUp from './components/PopUp';
import SendProject from './components/Project/SendProject';
import ViewProject from './components/Project/ViewProject';
import AddHire from './components/hire/AddHire';
import EditProfile from './components/profile/EditProfile';
import Upload from './components/Upload';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <div className='App-container'>
        <PopUp />
        <Upload />
        <Router>
          <Switch>
            <Route path='/landing' exact component={Background} />
            <PrivateRoute path='/upload' exact component={AddPost} />
            <PrivateRoute path='/project/:id' exact component={SendProject} />
            <PrivateRoute path='/hire/:id' exact component={AddHire} />
            <PrivateRoute path='/view-project/:id' exact component={ViewProject} />
            <PrivateRoute path='/post/:id' exact component={Post} />
            <PrivateRoute path='/' exact component={Home} />
            <PrivateRoute path='/profile/:id' exact component={Profile} />
            <PrivateRoute path='/edit-profile' exact component={EditProfile} />
            <PrivateRoute path='/order' exact component={Project} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
