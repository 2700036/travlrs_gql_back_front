import React from 'react';
import logo from '../../images/logo.ico';
import { Route, Link, useHistory } from 'react-router-dom'
import { useActions } from '../../reducers/useActions';
import { useSelector } from 'react-redux';

const Header = () => {
  const { loggedIn, userInfo } = useSelector(({ app }) => app);
  const {logOut} = useActions();
  const history = useHistory();
  function signOut() {
    localStorage.removeItem("jwt");
    logOut();
    
    history.push("/login");
  }
  return (
    <header className="header page__section">
      <img src={logo} className='logo'/>
    <h1 className="header__logo">Travlrs.</h1>
    <Route exact  path='/login'>
      <Link to='/register' className='signup__link'>
      Регистрация
      </Link>
    </Route>
    <Route exact path='/register'>
      <Link to='/login' className='signup__link'>
      Войти
      </Link>
    </Route>
    {loggedIn && (
      <>
    <p className='header__email'>{userInfo?.userEmail}</p>
    <button onClick={signOut} className='signout__link'>
        Выйти
        </button>
        </>
        )      
}
  </header>
  )
};

export default Header;

