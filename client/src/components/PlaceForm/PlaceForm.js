/* eslint-disable default-case */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutationAddCard } from '../../hooks/useMutationAddCard';
import { useActions } from '../../reducers/useActions';

const PlaceForm = () => {
  const { handleSubmit, register, errors } = useForm({
    mode: 'onChange',
  });
  const { closePopups } = useActions();
  const {addNewCard, cards, errors: errorsAddCard, loading} = useMutationAddCard();
  const handleData = (data) => {
    addNewCard(data).then(()=>closePopups()).catch(e => {      
    });    
  };


  return (
    <form onSubmit={handleSubmit(handleData)} className='popup__form' noValidate>
      <label className='popup__label'>
        <input
          name='name'
          ref={register({
            required: 'Это поле необходимо заполнить',
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
          id='place-name'
          className={`popup__input ${errors.name ? 'popup__input_type_error' : ''}`}
          placeholder='Название'
          required
          minLength='1'
          maxLength='30'
        />
        {errors.name && (
          <span className='popup__error' id='place-name-error'>
            {errors.name.message}
          </span>
        )}
      </label>
      <label className='popup__label'>
        <input
          name='link'
          ref={register({
            required: 'Это поле необходимо заполнить',
            pattern: {
              value: /^(https:)/,
              message: 'Должна быть ссылка',
            },
          })}
          type='url'
          id='place-link'
          className={`popup__input ${errors.link ? 'popup__input_type_error' : ''}`}
          placeholder='Ссылка на картинку'
          required
        />
        {errors.link && (
          <span className='popup__error' id='place-link-error'>
            {errors.link.message}
          </span>
        )}
      </label>
      <button
        type='submit'
        className={`button popup__button ${errors.link || errors.name ? 'popup__button_disabled' : 0}`}
      >
        {loading ? 'Загрузка...' : 'Сохранить'}
      </button>
    </form>
  );
};

export default PlaceForm;
