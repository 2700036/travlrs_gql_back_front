import { gql } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import { PlaceCard } from '../types';

type LikedCard = {
  putLikeToCard: PlaceCard;
};
type UnlikedCard = {
  deleteLikeFromCard: PlaceCard;
};

type Variables = {
  id: string;
};

const mutationPutLikeToCard = gql`
  mutation PutLikeToCard($id: ID!) {
    putLikeToCard(id: $id) {
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
`;
const mutationDeleteLikeFromCard = gql`
  mutation DeleteLikeFromCard($id: ID!) {
    deleteLikeFromCard(id: $id) {
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
`;

export const useMutationsLikeCard = () => {
  const [putLike, { data: likedCard }] = useMutation<LikedCard, Variables>(mutationPutLikeToCard);
  
  const [removeLike, { data: unlikedCard }] = useMutation<UnlikedCard, Variables>(mutationDeleteLikeFromCard);
  

  const handleLike = (id: string, isLiked: boolean) => {
  
    return isLiked
      ? removeLike({
          variables: { id },
        })
      : putLike({
          variables: { id },
        });
  };
  return {
    handleLike
  };
};
