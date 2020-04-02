import React from 'react';
import './App.css';
import { Appbar } from './components/navbar/navbar';
import { Home } from './views/home';
import { Switch, Route } from 'react-router-dom';
import { SinglePost } from './views/singlePost';
import { Signup } from './views/signup';
import { SignIn } from './views/signin';
import { useIsLoggedIn } from './components/hooks/useIsLoggedIn';

function App() {
  useIsLoggedIn();
  return (
    <>
      <Appbar />
      <Switch>
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/' component={SignIn} />
        <Route exact path='/feed' component={Home} />
        <Route exact path='/:id' component={SinglePost} />
      </Switch>
      {/* <Footer /> */}
    </>
  );
}

export default App;
