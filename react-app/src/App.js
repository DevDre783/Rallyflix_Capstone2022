import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Navbar from "./components/Navigation"
import ProtectedRoute from './components/auth/ProtectedRoute';
import BrowsePage from './components/BrowsePage';
import MyListsPage from './components/MyListsPage';
// import UsersList from './components/UsersList';
// import User from './components/User';
import SplashPage from './components/SplashPage';
import Footer from './components/Footer';
import ProfilesPage from './components/ProfilesPage';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [profileId, setProfileId] = useState()
  const dispatch = useDispatch();

  const getProfileId = (profileId) => {
    setProfileId(profileId)
  }

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Navbar profileId={profileId}/>
      <Footer />
      <Switch>
        <Route path='/' exact={true}>
          <SplashPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/profiles" exact={true}>
          <ProfilesPage getProfileId={getProfileId}/>
        </ProtectedRoute>
        <ProtectedRoute path="/browse" exact={true}>
          <BrowsePage profileId={profileId}/>
        </ProtectedRoute>
        <ProtectedRoute path="/my-lists" exact={true}>
          <MyListsPage profileId={profileId}/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}


export default App;
