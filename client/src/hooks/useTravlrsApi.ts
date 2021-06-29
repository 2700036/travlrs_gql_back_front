import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppState, RootState } from '../reducers/types';
import { useActions } from '../reducers/useActions';
import { useCardsActions } from '../reducers/useCardsActions';
import travlrsApi from '../utils/travlrsApi';



export default function useTravlrsApi() {
  const { selectedCard, userInfo } = useSelector(({ app }: RootState): AppState => app);
  const { updateUserInfo, logIn, updateAuthStatus, closePopups } = useActions();
  const { fetchData, addCard, deleteCard } = useCardsActions();
  const history = useHistory();

  const loginCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      travlrsApi
        .checkToken(jwt)
        .then((res) => {
          if (userInfo?.userId === res._id) return;
          updateUserInfo({
            userName: res.name,
            userDescription: res.about,
            userAvatar: res.avatar,
            userId: res._id,
            userEmail: res.email,
          });
          logIn();
          fetchData(travlrsApi);
        })
        .catch((err) => {
          console.log(err);
          history.push('/login');
          updateAuthStatus({ message: err.message || err });
        });
    } else {
      history.push('/login');
    }
  };

  const onDeleteCardSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    travlrsApi
      .removeCard(selectedCard?._id)
      .then((res) => {
        
        deleteCard(selectedCard!._id);
        closePopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onAddCardSubmit = ({ name, link }: { name: string; link: string }) => {
    travlrsApi
      .addCard({ name, link })
      .then((card) => {
        addCard(card);
        closePopups();
      })
      .catch((err) => {
        updateAuthStatus({ message: 'Что-то пошло не так...' });
        console.log(err);
      });
  };
  const handleEditSubmit = (userInfo: { name: string; about: string }) => {
    travlrsApi.setUserInfo(userInfo).then(({ name, about }) => {
      updateUserInfo({ userName: name, userDescription: about });
      closePopups();
    });
  };

  const onAvatarEditSubmit = (url: { avatar: string }) => {
    travlrsApi.setUserAvatar(url).then(({ avatar }) => {
      updateUserInfo({ userAvatar: avatar });
      closePopups();
    });
  };

  return {
    loginCheck,
    onDeleteCardSubmit,
    onAddCardSubmit,
    handleEditSubmit,
    onAvatarEditSubmit,
  };
}
