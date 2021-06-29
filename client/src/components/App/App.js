import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { Switch, Route } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import Login from '../Login/Login';
import Register from '../Register/Register';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { useSelector } from 'react-redux';
import useTravlrsApi from '../../hooks/useTravlrsApi';
import './app.css';
import { AnimatedSwitch } from 'react-router-transition';
import { useQueryMe } from '../../hooks/useQueryMe';



const App = () => {
  const { loggedIn, userInfo, openedPopup } = useSelector(({ app }) => app);
  const { loginCheck } = useTravlrsApi();
  const {getMe, user: queryUser} = useQueryMe()
  
  React.useEffect(() => {
    if (loggedIn)getMe()
  
    console.log('⚛️ : queryUser', queryUser)
    
    
  }, [loggedIn]);

  return (
    <>
      <Header />
      <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      className="switch-wrapper"
      >
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/'>{loggedIn && userInfo ? <Main /> : <Spinner />}</Route>
      </AnimatedSwitch>
      <Footer />
      {openedPopup.isLoginStatusPopupOpen && <InfoTooltip name='tooltip' />}
    </>
  );
};

export default App;
