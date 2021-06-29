import { reducer } from '.';
import { PlaceCard, User } from '../types';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const UPDATE_AUTH_STATUS = 'UPDATE_AUTH_STATUS';
export const OPEN_EDIT_PROFILE_POPUP = 'OPEN_EDIT_PROFILE_POPUP';
export const OPEN_ADD_PLACE_POPUP = 'OPEN_ADD_PLACE_POPUP';
export const OPEN_EDIT_AVATAR_POPUP = 'OPEN_EDIT_AVATAR_POPUP';
export const OPEN_DELETE_CARD_CONFIRM_POPUP = 'OPEN_DELETE_CARD_CONFIRM_POPUP';
export const CLOSE_POPUPS = 'CLOSE_POPUPS';
export const UPDATE_USERINFO = 'UPDATE_USERINFO';

export const CARDS_FILL = 'CARDS_FILL';
export const ADD_CARD = 'ADD_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const UPDATE_LIKE_CARD = 'UPDATE_LIKE_CARD';
export const USERS_FILL = 'USERS_FILL';

export type AppState = {
  loggedIn: boolean;
  authStatus: { message: string } | { error: string } | null;
  openedPopup: {
    isEditProfilePopupOpen?: boolean;
    isAddPlacePopupOpen?: boolean;
    isEditAvatarPopupOpen?: boolean;
    isDeleteCardPopupOpened?: boolean;
    isLoginStatusPopupOpen?: boolean;
  };
  selectedCard: PlaceCard | null;
  userInfo: {
    userName?: string;
    userDescription?: string;
    userAvatar?: string;
    userId?: string;
    userEmail?: string;
  } | null;
};

export type CardsState = {
  cards: PlaceCard[];
  users: User[];
};

export type RootState = ReturnType<typeof reducer>;

type logInAction = {
  type: typeof LOG_IN;
};
type logOutAction = {
  type: typeof LOG_OUT;
};
type updateAuthStatusAction = {
  type: typeof UPDATE_AUTH_STATUS;
  payload: { message: string } | { error: string };
};
type openPopupAction = {
  type: typeof OPEN_EDIT_PROFILE_POPUP | typeof OPEN_ADD_PLACE_POPUP | typeof OPEN_EDIT_AVATAR_POPUP;
};
type openDeleteCardConfirmPopupAction = {
  type: typeof OPEN_DELETE_CARD_CONFIRM_POPUP;
  payload: PlaceCard;
};
type closePopupsAction = {
  type: typeof CLOSE_POPUPS;
};
type updateUserInfoAction = {
  type: typeof UPDATE_USERINFO;
  payload: AppState['userInfo'];
};

export type AppActionTypes =
  | logInAction
  | logOutAction
  | updateAuthStatusAction
  | openPopupAction
  | openDeleteCardConfirmPopupAction
  | closePopupsAction
  | updateUserInfoAction;

type cardsFillAction = {
  type: typeof CARDS_FILL;
  payload: PlaceCard[]
}
type addCardAction = {
  type: typeof ADD_CARD;
  payload: PlaceCard
}
type deleteCardAction = {
  type: typeof DELETE_CARD;
  payload: string
}
type updateLikeCardAction = {
  type: typeof UPDATE_LIKE_CARD;
  payload: PlaceCard
}
type usersFillAction = {
  type: typeof USERS_FILL;
  payload: User[]
}

export type CardsActionTypes = 
| cardsFillAction
| addCardAction
| deleteCardAction
| updateLikeCardAction
| usersFillAction;
