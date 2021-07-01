import { PlaceCard, User } from '../types';
import { gql, useQuery } from "@apollo/react-hooks";

type QueryCards = {
  cards: PlaceCard[]
}

const queryCards = gql`
  query{
    cards{
      _id
      name
      link
      owner{
        _id
        name
      }
      likes{
        _id
        name
      }
      createdAt
    }
  }
`

export const useQueryCards = () => {
  const {data, error, loading} = useQuery<QueryCards>(queryCards)
  

  return {cards: data && data.cards, error: error && error.toString(), loading}
}