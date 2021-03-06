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
import { useCardsActions } from '../../reducers/useCardsActions';
import { useQueryCards } from '../../hooks/useQueryCards';
import Spinner from '../Spinner/Spinner';
import { useQueryUsers } from '../../hooks/useQueryUsers';
import { useSubscriptionCardsChanged } from '../../hooks/useSubscriptionCardsChanged';
import { useMutationDeleteCard } from '../../hooks/useMutationDeleteCard';
import { useSubscription–°ardUpdated } from '../../hooks/useSubscription–°ardUpdated';

const Main = () => {
  const {  openEditProfilePopup, openAddPlacePopup, openEditAvatarPopup, closePopups } = useActions();
  const { cardsFill, usersFill } = useCardsActions();

  const {
    userInfo: { userName, userDescription, userAvatar, userId },
    openedPopup,
    selectedCard
  } = useSelector(({ app }) => app);
  const { cards, users } = useSelector(({ cards }) => cards); 

  const { cards: cardsReq, loading: loadingCards } = useQueryCards();
  const { users: usersReq, loading: loadingUsers } = useQueryUsers();
const {cards: updatedCards, loading} = useSubscriptionCardsChanged()
const { likedCard } = useSubscription–°ardUpdated();

const {deleteCardById,
  deletedCard,
  error,
  loading: deletingCard} = useMutationDeleteCard()

  useEffect(() => {
    if (likedCard) {
      
      const newCards = cardsReq
      const cardIdx = cards.findIndex(card => card._id === likedCard._id)
      newCards[cardIdx] = likedCard
  
      cardsFill(newCards);
    }
  }, [likedCard]);

  useEffect(() => {
    if (cardsReq) {
      cardsFill(cardsReq);
    }
  }, [cardsReq]);
  useEffect(() => {
    if (updatedCards) {
      cardsFill(updatedCards);
    }
  }, [updatedCards]);
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

  const submitCardDelete = (e) => {
      e.preventDefault();
      deleteCardById(selectedCard?._id)
      closePopups()
    }

  return (
    <>
      <main className='content'>
        {(loadingCards || loadingUsers) && <Spinner />}
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
                    –ú–Ķ—Ā—ā–į
                  </NavLink>
                  <NavLink to='/friends/' className='tab' activeClassName='tab_active'>
                    –Ē—Ä—É–∑—Ć—Ź
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
      {openedPopup.isEditProfilePopupOpen && <EditForm title='–†–Ķ–ī–į–ļ—ā–ł—Ä–ĺ–≤–į—ā—Ć –Ņ—Ä–ĺ—Ą–ł–Ľ—Ć' name='edit' />}
      {openedPopup.isAddPlacePopupOpen && (
        <PopupWithForm title='–ü—Ä–Ķ–ī–Ľ–ĺ–∂–ł—ā—Ć –ľ–Ķ—Ā—ā–ĺ' name='new-card'>
          <PlaceForm />
        </PopupWithForm>
      )}
      {openedPopup.isDeleteCardPopupOpened && (
        <PopupWithForm title='–í—č —É–≤–Ķ—Ä–Ķ–Ĺ—č?' name='remove-card'>
          <form className='popup__form' name='remove-card' noValidate>
            <button type='submit' className='button popup__button' onClick={submitCardDelete}>
              {deletingCard ? '...' : '–Ē–į'}
            </button>
          </form>
        </PopupWithForm>
      )}
      ;
      {openedPopup.isEditAvatarPopupOpen && (
        <PopupWithForm title='–ě–Ī–Ĺ–ĺ–≤–ł—ā—Ć –į–≤–į—ā–į—Ä' name='edit-avatar'>
          <EditAvatar />
        </PopupWithForm>
      )}
    </>
  );
};

export default Main;
