import React, { useContext } from 'react';
import travlrsApi from '../../utils/travlrsApi';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCardsActions } from '../../reducers/useCardsActions';
import { useActions } from '../../reducers/useActions';
import { useMutationsLikeCard } from '../../hooks/useMutationsLikeCard';

const Card = ({ card }) => {
  const { name, link, likes, owner, _id } = card;  
  
  const { openDeleteCardConfirmPopup } = useActions();
  const {
    userInfo: { userId },
  } = useSelector(({ app }) => app);
  // console.log('⚛️ : userId', userId)
  // console.log('⚛️ : likes', likes)
  const history = useHistory();  
  const isLiked = likes.some((like) => {
    
   return like._id === userId
  });
 
  const isUsersCard = userId === owner._id;
  const { handleLike } = useMutationsLikeCard()
  
  const onBasketClick=(e) => {
  
    e.stopPropagation();
    openDeleteCardConfirmPopup(card);
  }
  //   const likesNames = newLikes.reduce((acc, cur, i)=>{
  //     return acc += i === 0 ? cur.name : `, ${cur.name}`
  //   }, '')



  return (
    <li className='places__item card'>
      <div
        onClick={() => history.push(`${_id}`)}
        className='card__image'
        style={{ backgroundImage: `url(${link})` }}
      ></div>
      <div className='card__image-blur' style={{ backgroundImage: `url(${link})` }}></div>

      {isUsersCard && <button type='button' className='card__delete-button' onClick={onBasketClick}></button>}
      <div className='card__description'>
        <h2 className='card__title'>{name}</h2>
        <div className='card__likes'>
          <button
            type='button'
            className={`card__like-button ${isLiked ? 'card__like-button_is-active ' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleLike(_id, isLiked);
            }}
          ></button>
          <p className='card__like-count'>{likes.length || 0}</p>
        </div>
      </div>
    </li>
  );
};

export default Card;
