import { PlaceCard } from './../types';
import { gql, useMutation } from "@apollo/react-hooks";

type QueryCard = {
  addCard: PlaceCard[]
}

type QueryVariables = {
   
    card: InputCard
  
}

type InputCard = {
  name: string,
  link: string
}

const mutationAddCard = gql`
  mutation AddCard($card: InputCard!){
    addCard(card: $card){
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

export const useMutationAddCard = () => {
  const [addCard, {data, error, loading}] = useMutation<QueryCard, QueryVariables>(mutationAddCard);
  
  const addNewCard = (card: InputCard) => {
    return addCard(
      { 
      variables: {
        card: {...card}
    }
  })
  
  }

  return {addNewCard, cards: data && data.addCard, error, loading}
}