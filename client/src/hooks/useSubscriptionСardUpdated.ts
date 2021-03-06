import { PlaceCard, User } from '../types';
import { gql, useSubscription } from '@apollo/react-hooks';

type Card = {
  cardUpdated: PlaceCard}

const subscription–°ardUpdated = gql`
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

export const useSubscription–°ardUpdated = () => {
  const { data, error, loading } = useSubscription<Card>(subscription–°ardUpdated); 

  
  return { likedCard: data && data.cardUpdated, error: error && error.toString(), loading };
};
