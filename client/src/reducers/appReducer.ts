import { AppActionTypes, AppState } from "./types";
import {
  LOG_IN,
  LOG_OUT,
  UPDATE_AUTH_STATUS,
  OPEN_EDIT_PROFILE_POPUP,
  OPEN_ADD_PLACE_POPUP,
  OPEN_EDIT_AVATAR_POPUP,
  OPEN_DELETE_CARD_CONFIRM_POPUP,
  CLOSE_POPUPS,
  UPDATE_USERINFO
} from "./types";

const initialState: AppState = {
  loggedIn: false,
  authStatus: null,
  openedPopup: {
    isEditProfilePopupOpen: false,
    isAddPlacePopupOpen: false,
    isEditAvatarPopupOpen: false,
    isDeleteCardPopupOpened: false,
    isLoginStatusPopupOpen: false
  },
  selectedCard: null,
  userInfo: null,  
};

export default (state = initialState, action: AppActionTypes): AppState => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, loggedIn: true };
    case LOG_OUT:
      return { ...state, loggedIn: false, userInfo: null };
    case UPDATE_AUTH_STATUS:
      return { ...state, 
        authStatus: action.payload,
        openedPopup: { isLoginStatusPopupOpen: true }        
    };
    case OPEN_EDIT_PROFILE_POPUP:
      return { ...state, openedPopup: { isEditProfilePopupOpen: true } };
    case OPEN_ADD_PLACE_POPUP:
      return { ...state, openedPopup: { isAddPlacePopupOpen: true } };
    case OPEN_EDIT_AVATAR_POPUP:
      return { ...state, openedPopup: { isEditAvatarPopupOpen: true } };
    case OPEN_DELETE_CARD_CONFIRM_POPUP:
      return {
        ...state,
        selectedCard: action.payload,
        openedPopup: { isDeleteCardPopupOpened: true }
      };
    case CLOSE_POPUPS:
      return { ...state, selectedCard: null, openedPopup: {} };
    case UPDATE_USERINFO:
      return {
        ...state,
        userInfo: {...state.userInfo, ...action.payload}
      };

    default:
      const forgotSomeAction: never = action;
  }
  return state;
};
