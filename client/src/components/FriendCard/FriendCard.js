import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const FriendCard = ({ card: { name, about, avatar, _id } }) => {
  const {
    userInfo: { userId },
  } = useSelector(({ app }) => app);
  const history = useHistory();

  return userId !== _id 
  ? (
    <li className='places__item card'>
      <div
        onClick={() => history.push(`${_id}`)}
        className='card__image'
        style={{ backgroundImage: `url(${avatar})` }}
      ></div>
      <div className='card__image-blur' style={{ backgroundImage: `url(${avatar})` }}></div>

      <div className='card__friend-description'>
        <h2 className='card__title'>{name}</h2>
        <p className='card__about'>{about}</p>
      </div>
    </li>
  ) 
  : null;
};

export default FriendCard;
