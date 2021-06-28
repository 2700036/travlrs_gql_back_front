import { mutations as cardsMutations } from './bus/cards/mutations.js';
import { mutations as usersMutations } from './bus/users/mutations.js';
import { queries as cardsQueries } from './bus/cards/queries.js';
import { queries as usersQueries } from './bus/users/queries.js';
import { subscriptions as usersSubscriptions } from './bus/users/subscriptions.js';
import { subscriptions as cardsSubscriptions } from './bus/cards/subscriptions.js';



export const resolvers = {
  Query: {
    ...cardsQueries,
    ...usersQueries,
  },
  Mutation: {
    ...cardsMutations,
    ...usersMutations,
  },
  Subscription: {
    ...usersSubscriptions,
    ...cardsSubscriptions
  }
};

