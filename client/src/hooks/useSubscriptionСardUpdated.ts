import { PlaceCard, User } from '../types';
import { gql, useSubscription } from '@apollo/react-hooks';

type Card = {
  cardUpdated: PlaceCard}

const subscriptionСardUpdated = gql`
  subscription {
    cardUpdated {
    _id
    name
    link
    likes {
      _id
      name
    }
    owner {
      _id
      name
    }
  }
  }
`;

export const useSubscriptionСardUpdated = () => {
  const { data, error, loading } = useSubscription<Card>(subscriptionСardUpdated); 
  console.log('⚛️ : data', data)
  
  return { likedCard: data && data.cardUpdated, error: error && error.toString(), loading };
};
