import React, { useEffect } from 'react';
import Card from '../Card/Card';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import EditForm from '../EditForm/EditForm';
import PlaceForm from '../PlaceForm/PlaceForm';
import EditAvatar from '../EditAvatar/EditAvatar';
import { Route, NavLink } from 'react-router-dom';
import FriendCard from '../FriendCard/FriendCard';
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';
import { useSelector } from 'react-redux';
import { useActions } from '../../reducers/useActions';
import List from '../List/List';
import useTravlrsApi from '../../hooks/useTravlrsApi';
import { AnimatedSwitch } from 'react-router-transition';
import { useQueryMe } from '../../hooks/useQueryMe';
import { useCardsActions } from '../../reducers/useCardsActions';
import { useQueryCards } from '../../hooks/useQueryCards';
import Spinner from '../Spinner/Spinner';
import { useQueryUsers } from '../../hooks/useQueryUsers';

const Main = () => {
  const { updateUserInfo, openEditProfilePopup, openAddPlacePopup, openEditAvatarPopup } = useActions();
  const { cardsFill, usersFill } = useCardsActions();

  const {
    userInfo: { userName, userDescription, userAvatar, userId },
    openedPopup,
  } = useSelector(({ app }) => app);
  const { cards, users } = useSelector(({ cards }) => cards);
  const { onDeleteCardSubmit } = useTravlrsApi();

  const { user, error: errorMe, loading: loadingMe } = useQueryMe();
  const { cards: cardsReq, error: errorCards, loading: loadingCards } = useQueryCards();
  const { users: usersReq, error: errorUsers, loading: loadingUsers } = useQueryUsers();

  useEffect(() => {
    if (user) {
      updateUserInfo({
        userName: user.name,
        userDescription: user.about,
        userAvatar: user.avatar,
        userId: user._id,
        userEmail: user.email,
      });
    }
  }, [user]);

  useEffect(() => {
    if (cardsReq) {
      cardsFill(cardsReq);
    }
  }, [cardsReq]);
  useEffect(() => {
    if (usersReq) {
      usersFill(usersReq);
    }
  }, [usersReq]);

  const sortedFavorites = cards
    .filter((card) => card.likes.some(({ _id }) => userId === _id))
    .sort((a, b) => {
      return b.likes.length - a.likes.length;
    });

  return (
    <>
      <main className='content'>
        {(loadingCards || loadingMe) && <Spinner />}
        {userName && (
          <>
            <section className='profile page__section'>
              <div
                className='profile__image'
                onClick={openEditAvatarPopup}
                style={{ backgroundImage: `url(${userAvatar})` }}
              ></div>
              <div className='profile__info'>
                <h1 className='profile__title'>{userName}</h1>
                <button
                  className='profile__edit-button'
                  type='button'
                  onClick={openEditProfilePopup}
                ></button>
                <p className='profile__description'>{userDescription}</p>
              </div>
              <button className='profile__add-button' type='button' onClick={openAddPlacePopup}></button>
            </section>
            {cards.length && (
              <>
                <div className='tabs page__section'>
                  <NavLink to='/cards/' className='tab' activeClassName='tab_active'>
                    Места
                  </NavLink>
                  <NavLink to='/friends/' className='tab' activeClassName='tab_active'>
                    Друзья
                  </NavLink>
                  <NavLink
                    style={{ marginLeft: 'auto' }}
                    to='/favorite/'
                    className='tab'
                    activeClassName='tab_active'
                  >
                    <div className={`card__like-button card__like-button_is-active`}></div>
                  </NavLink>
                </div>
                <section className='places page__section'>
                  <AnimatedSwitch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className='switch-wrapper'
                  >
                    <Route exact path='/' render={WelcomeScreen} />
                    <Route
                      path='/cards/:id?'
                      render={() => {
                        return <List itemComponent={Card} items={cards} />;
                      }}
                    />
                    <Route
                      path='/friends/:id?'
                      render={() => {
                        return <List itemComponent={FriendCard} items={users} />;
                      }}
                    />
                    <Route
                      path='/favorite/:id?'
                      render={() => {
                        return <List itemComponent={Card} items={sortedFavorites} />;
                      }}
                    />
                  </AnimatedSwitch>
                </section>
              </>
            )}
          </>
        )}
      </main>
      {openedPopup.isEditProfilePopupOpen && <EditForm title='Редактировать профиль' name='edit' />}
      {openedPopup.isAddPlacePopupOpen && (
        <PopupWithForm title='Предложить место' name='new-card'>
          <PlaceForm />
        </PopupWithForm>
      )}
      {openedPopup.isDeleteCardPopupOpened && (
        <PopupWithForm title='Вы уверены?' name='remove-card'>
          <form className='popup__form' name='remove-card' noValidate>
            <button type='submit' className='button popup__button' onClick={onDeleteCardSubmit}>
              Да
            </button>
          </form>
        </PopupWithForm>
      )}
      ;
      {openedPopup.isEditAvatarPopupOpen && (
        <PopupWithForm title='Обновить аватар' name='edit-avatar'>
          <EditAvatar />
        </PopupWithForm>
      )}
    </>
  );
};

export default Main;
