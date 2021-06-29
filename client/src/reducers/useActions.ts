/* eslint-disable no-unused-vars */
import { useDispatch } from 'react-redux';
import { PlaceCard } from '../types';

import {
  LOG_IN,
  LOG_OUT,
  UPDATE_AUTH_STATUS,
  OPEN_EDIT_PROFILE_POPUP,
  OPEN_ADD_PLACE_POPUP,
  OPEN_EDIT_AVATAR_POPUP,
  OPEN_DELETE_CARD_CONFIRM_POPUP,
  CLOSE_POPUPS,
  UPDATE_USERINFO,
  AppState,
} from './types';
import { DispatchAction } from './useCardsActions';

export function useActions(a:void) {
  const dispatch = useDispatch();

  const logIn: DispatchAction<void> = () =>
    dispatch({
      type: LOG_IN,
    });
  const logOut: DispatchAction<void> = () =>
    dispatch({
      type: LOG_OUT,
    });
  const updateAuthStatus: DispatchAction<{ message: string } | { error: string }> = (payload) =>
    dispatch({
      type: UPDATE_AUTH_STATUS,
      payload,
    });
  const openEditProfilePopup: DispatchAction<void> = () =>
    dispatch({
      type: OPEN_EDIT_PROFILE_POPUP,
    });

  const openAddPlacePopup: DispatchAction<void> = () =>
    dispatch({
      type: OPEN_ADD_PLACE_POPUP,
    });

  const openEditAvatarPopup: DispatchAction<void> = () =>
    dispatch({
      type: OPEN_EDIT_AVATAR_POPUP,
    });

  const openDeleteCardConfirmPopup: DispatchAction<PlaceCard> = (payload) =>
    dispatch({
      type: OPEN_DELETE_CARD_CONFIRM_POPUP,
      payload,
    });

  const closePopups: DispatchAction<void> = () =>
    dispatch({
      type: CLOSE_POPUPS,
    });

  const updateUserInfo: DispatchAction<AppState['userInfo']> = (payload) =>
    dispatch({
      type: UPDATE_USERINFO,
      payload,
    });

  return {
    logIn,
    logOut,
    updateAuthStatus,
    openEditProfilePopup,
    openAddPlacePopup,
    openEditAvatarPopup,
    openDeleteCardConfirmPopup,
    // openLoginStatusPopup,
    closePopups,
    updateUserInfo,
  };
}
