import { gql } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import { PlaceCard } from '../types';

type DeletedCard = {
  deleteCard: PlaceCard;
};

type Variables = {
  id: string;
};

const mutationDeleteCard = gql`
  mutation DeleteCard($id: ID!) {
    deleteCard(id: $id) {
      _id
    }
  }
`;

export const useMutationDeleteCard = () => {
  const [deleteCard, { data, error, loading }] = useMutation<DeletedCard, Variables>(mutationDeleteCard);

  const deleteCardById = (id: string) => {  
    return deleteCard({
      variables: {id},
    });
  };
  return {
    deleteCardById,
    deletedCard: data && data.deleteCard,
    error: error && error.toString(),
    loading,
  };
};
