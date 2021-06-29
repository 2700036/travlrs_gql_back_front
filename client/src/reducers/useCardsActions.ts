import { useDispatch } from "react-redux";
import { PlaceCard, User } from "../types";

import { CARDS_FILL, ADD_CARD, DELETE_CARD, UPDATE_LIKE_CARD, USERS_FILL } from './types';

export type DispatchAction<T> = (payload: T) => void;

export function useCardsActions() {
  const dispatch = useDispatch();
  const cardsFill: DispatchAction<PlaceCard[]> = (payload) => dispatch({
    type: CARDS_FILL,
    payload,
  });
  const addCard: DispatchAction<PlaceCard> = (payload) => dispatch({
    type: ADD_CARD,
    payload,
  });
  const deleteCard: DispatchAction<string> = (payload) => dispatch({
    type: DELETE_CARD,
    payload,
  });
  const updateLikeCard: DispatchAction<PlaceCard> = (payload) => dispatch({
    type: UPDATE_LIKE_CARD,
    payload,
  });
  const usersFill: DispatchAction<User[]> = (payload) => dispatch({
    type: USERS_FILL,
    payload,
  });
  const fetchData = (api: any) => {    
    Promise.all([api.getCardList(), api.getUsers()])
    .then((res) => {
      const [cardsData, users] = res;
      cardsFill(cardsData);
      usersFill(users);      
    })
    .catch((err) => {
      console.log(err);
      });
  }

  return {
    cardsFill,
    addCard,
    deleteCard,
    updateLikeCard,
    usersFill,
    fetchData
  };
}
