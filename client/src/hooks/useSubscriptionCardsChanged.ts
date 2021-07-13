import { PlaceCard, User } from '../types';
import { gql, useSubscription } from '@apollo/react-hooks';

type Cards = {
  cardsChanged: PlaceCard[]}

const subscriptionCardsChanged = gql`
  subscription {
    cardsChanged {
    _id
    name
    link
    likes {
      name
    }
    owner {
      _id
      name
    }
  }
  }
`;

export const useSubscriptionCardsChanged = () => {
  const { data, error, loading } = useSubscription<Cards>(subscriptionCardsChanged); 
  
  return { cards: data && data.cardsChanged, error: error && error.toString(), loading };
};
