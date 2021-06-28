import { pubSub } from "../../pubSub.js";
import { events } from "./events.js";

export const subscriptions = {
  cardUpdated: {
    subscribe: ()=> pubSub.asyncIterator([events.CARD_LIKED, events.CARD_UNLIKED])
  },
  cardsChanged: {
    subscribe: ()=> pubSub.asyncIterator([events.CARD_ADDED, events.CARD_DELETED])
  }
}