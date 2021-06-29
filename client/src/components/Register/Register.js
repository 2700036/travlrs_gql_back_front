import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useActions } from '../../reducers/useActions';
import travlrsApi from '../../utils/travlrsApi';
import '../Login/login.css';

const Register = ({history}) => {
  
  const { logIn, updateAuthStatus } = useActions();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const handleChange = ({ target: { name, value } }) => {
    setUserData((userData) => ({ ...userData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    travlrsApi.register(userData.email, userData.password, userData.name).then((res) => {
      if (res) {
        updateAuthStatus(res);
        travlrsApi.authorize(userData.email, userData.password).then((res) => {
          logIn();
          history.push('/');
        });
      } else {
        console.log('Произошла ошибка.');
      }
    });
  };

  return (
    <div className='login'>
      <p className='login__welcome'>Регистрация</p>
      <form onSubmit={handleSubmit} className='login__form'>
        <input
          required
          id='name'
          name='name'
          type='text'
          placeholder='Имя'
          minLength='2'
          value={userData.name}
          onChange={handleChange}
        />
        <input
          required
          id='email'
          name='email'
          type='email'
          placeholder='Email'
          value={userData.email}
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
          Регистрируюсь
        </button>
      </form>

      <div className='login__signup'>
        <p>Уже зарегестрированны?</p>
        <Link to='/login' className='signup__link'>
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;
