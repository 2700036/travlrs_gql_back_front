import { combineReducers } from "redux";
import appReducer from './appReducer';
import cardsReducer from './cardsReducer';

export const reducer = combineReducers({
    app: appReducer,
    cards: cardsReducer
})