import { User } from '../types';
import { gql, useQuery } from "@apollo/react-hooks";

type QueryUsers = {
  users: User[]
}

const queryUsers = gql`
  query{
    users{
      _id
      name
      about
      avatar
    }
  }
`

export const useQueryUsers = () => {
  const {data, error, loading} = useQuery<QueryUsers>(queryUsers)
  

  return {users: data && data.users, error: error && error.toString(), loading}
}