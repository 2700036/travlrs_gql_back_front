import { pubSub } from "../../pubSub.js";
import { events } from "./events.js";

export const subscriptions = {
  userAdded: {
    subscribe: ()=> pubSub.asyncIterator([events.USER_ADDED])
  }
}