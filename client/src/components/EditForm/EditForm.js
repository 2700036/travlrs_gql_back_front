import React from 'react';
import withPopup from '../hoc-helpers/withPopup';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import useTravlrsApi from '../../hooks/useTravlrsApi';

const EditForm = () => {
  const { userInfo } = useSelector(({ app }) => app);
  const {handleEditSubmit} = useTravlrsApi();
  const { handleSubmit, register, errors } = useForm({
    mode: 'onChange',
  });
  const handleData = (data) => {
    handleEditSubmit(data);
  };

  return (
    <form className='popup__form' onSubmit={handleSubmit(handleData)} name='edit' noValidate>
      <label className='popup__label'>
        <input
          name='name'
          ref={register({
            required: 'Это поле необходимо заполнить',
            pattern: {
              value: /^[a-zA-Zа-яА-Я -]/,
              message: 'Введите данные в нужном формате',
            },
            minLength: {
              value: 2,
              message: 'Должно быть не менее 2 символов',
            },
            maxLength: {
              value: 30,
              message: 'Должно быть не менее 30 символов',
            },
          })}
          type='text'
          id='owner-name'
          className={`popup__input ${errors.name ? 'popup__input_type_error' : ''}`}
          defaultValue={userInfo.userName}
        />
        {errors.name && (
          <span className='popup__error' id='owner-name-error'>
            {errors.name.message}
          </span>
        )}
      </label>
      <label className='popup__label'>
        <input
          name='about'
          ref={register({
            required: 'Это поле необходимо заполнить',
            minLength: {
              value: 2,
              message: 'Должно быть не менее 2 символов',
            },
            maxLength: {
              value: 30,
              message: 'Должно быть не более 30 символов',
            },
            pattern: {
              value: /^[a-zA-Zа-яА-Я -]{1,}/,
              message: 'Введите данные в нужном формате',
            },
          })}
          type='text'
          id='owner-description'
          className={`popup__input ${errors.about ? 'popup__input_type_error' : ''}`}
          required
          minLength='2'
          maxLength='200'
          defaultValue={userInfo.userDescription}
        />
        {errors.about && (
          <span className='popup__error' id='owner-description-error'>
            {errors.about.message}
          </span>
        )}
      </label>
      <button type='submit' className='button popup__button'>
        Сохранить
      </button>
    </form>
  );
};

export default withPopup(EditForm);
