import React from 'react';
import { useForm } from 'react-hook-form';
import useTravlrsApi from '../../hooks/useTravlrsApi';

const EditAvatar = () => {
  const {onAvatarEditSubmit} = useTravlrsApi();
  const {handleSubmit, register, errors} = useForm({
    mode: 'onChange',
  })
  return (
    <form onSubmit={handleSubmit(onAvatarEditSubmit)} className="popup__form" name="avatar" noValidate>
    <label className="popup__label">
      <input
        type="url"
        name="avatar"
        id="owner-avatar"
        className={`popup__input ${errors.userName ? 'popup__input_type_error' : ''}`}
        // className="popup__input popup__input_type_description"
        placeholder="Ссылка на изображение"
        required
        ref={register({
          required: 'Это поле необходимо заполнить',
          pattern: {
            value: /^(https:)/,
            message: 'Должна быть ссылка',
          },
        })}
      />      
      {errors.avatar && (
          <span className='popup__error' id='owner-avatar-error'>
            {errors.avatar.message}
          </span>
        )}
    </label>
    <button type="submit" className="button popup__button">
      Сохранить
    </button>
  </form>
  )
}

export default EditAvatar;