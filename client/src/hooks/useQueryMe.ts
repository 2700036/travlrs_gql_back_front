import { User } from './../types';
import { gql, useQuery } from "@apollo/react-hooks";

type QueryMe = {
  me: User
}

const queryMe = gql`
  query{
    me{
      name
      email
      about
    }
  }
`

export const useQueryMe = () => {
  const {data, error, loading, refetch} = useQuery<QueryMe>(queryMe)
  

  return {user: data && data.me, error: error && error.toString(), loading: loading}
}