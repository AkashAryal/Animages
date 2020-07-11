import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ScrollView } from './components/ScrollView/ScrollView';
import { Login } from './components/auth/Login'
import { Register } from './components/auth/Register'
import { PrivateRoute } from './components/auth/PrivateRoute'
import Navbar from './components/home/Navbar';
import { Home } from './components/home/Home';
import { BrowseImages } from './components/Browse/BrowseImages'
import { Logout } from './components/auth/Logout';
import { useSelector } from 'react-redux';
import { selectBooruLinks } from './app/Booru/BooruSlice';
import { Favorites } from './components/favorites/Favorite';

function App() {
  const links: string[] = useSelector(selectBooruLinks);
  return (

    <Router>
      <Navbar />
      <Switch>
        <Route path="/scrollView/:id/:favUrls" component={ScrollView} />
        <Route exact path="/" component={Home} />
        <PrivateRoute allowIfAuth={false} redirect="/" path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute allowIfAuth={true} redirect="/" path="/browse" render={(props: any) => <BrowseImages {...props} links={links} />} />
        <PrivateRoute allowIfAuth={true} redirect="/" path="/logout" component={Logout} />
        <PrivateRoute allowIfAuth={true} redirect="/" path="/favorites" component={Favorites} />
      </Switch>
    </Router>
  );
}

export default App;
