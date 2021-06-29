import { PlaceCard } from '../types';
import { CardsActionTypes, CardsState } from './types';
import { CARDS_FILL, ADD_CARD, DELETE_CARD, UPDATE_LIKE_CARD, USERS_FILL } from './types';

const initialState: CardsState = {
  cards: [],
  users: [],
};

const isPlaceCard = (card: PlaceCard | undefined): card is PlaceCard => {
  return (card as PlaceCard).likes ? true : false;
};

export default (state = initialState, action: CardsActionTypes): CardsState => {
  switch (action.type) {
    case CARDS_FILL:
      return { ...state, cards: action.payload };
    case ADD_CARD:
      return { ...state, cards: [action.payload, ...state.cards] };
    case DELETE_CARD:
      const newCards = [...state.cards].filter((el) => el._id !== action.payload);
      return { ...state, cards: newCards };
    case UPDATE_LIKE_CARD:
      const newCards2 = [...state.cards];
      const card = newCards2.find((card) => card._id === action.payload._id);
      if (isPlaceCard(card)) card.likes = action.payload.likes;
      return { ...state, cards: newCards2 };
    case USERS_FILL:
      return { ...state, users: action.payload };

    default:
      const forgotSomeAction: never = action;
  }
  return state;
};
