import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { Route, Redirect, Switch } from 'react-router-dom';

import Login from '../Login/Login';
import Register from '../Register/Register';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { useSelector } from 'react-redux';

import './app.css';


const App = () => {
  const { loggedIn, openedPopup } = useSelector(({ app }) => app);

  return (
    <>
      <Header />
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/'>{loggedIn ? <Main /> : <Redirect to='/login' />}</Route>
      </Switch>
      <Footer />
      {openedPopup.isLoginStatusPopupOpen && <InfoTooltip name='tooltip' />}
    </>
  );
};

export default App;
