import { User } from './../types';
import { gql, useLazyQuery } from "@apollo/react-hooks";

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
  const [getMe, {data, error, loading}] = useLazyQuery<QueryMe>(queryMe)
  

  return {getMe, user: data && data.me, error, loading}
}