import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import travlrsApi from '../../utils/travlrsApi';
import { useActions } from '../../reducers/useActions';
import { useSelector } from 'react-redux';
import './login.css';
import { useMutationLogin } from '../../hooks/useMutationLogin';

const Login = ({ history }) => {
  const { loggedIn, userInfo } = useSelector(({ app }) => app);
  const { logIn, updateAuthStatus, updateUserInfo } = useActions();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const { handleLogin, user, loading, error } = useMutationLogin();  
  
  
  const handleChange = ({ target: { name, value } }) => {
    setUserData((userData) => ({ ...userData, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      return;
    }
    
    handleLogin(userData)
    .then((data) => {
         
        
        setUserData({ email: '', password: '' });
        
        logIn();
        history.push('/');
      })
      .catch((error) => {
        updateAuthStatus({error: error.toString()});
        console.log(error);
      });


  };
  useEffect(() => {
    if(user){
    
      updateUserInfo({
        userName: user.name,
        userDescription: user.about,
        userAvatar: user.avatar,
        userId: user._id,
        userEmail: user.email,
      });
    }
  }, [user])

  

  return loggedIn && userInfo ? (
    <Redirect to='/' />
  ) : (
    <div className='login'>
      <p className='login__welcome'>Вход</p>
      <form onSubmit={handleSubmit} className='login__form'>
        <input
          required
          id='email'
          name='email'
          type='email'
          placeholder='Email'
          value={userData.username}
          onChange={handleChange}
        />

        <input
          required
          id='password'
          name='password'
          type='password'
          placeholder='Пароль'
          value={userData.password}
          onChange={handleChange}
        />

        <button type='submit' onSubmit={handleSubmit} className='login__button'>
          {loading ? 'Загрузка...' : 'Войти'}
        </button>
      </form>

      <div className='login__signup'>
        <Link to='/register' className='signup__link'>
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};

export default Login;
