import { User } from '../types';
import { gql, useMutation } from "@apollo/react-hooks";

type QueryMe = {
  login: User & {token: string}
}

type Credentials = {
  email: string,
  password: string
}

const mutationLogin = gql`
  mutation Login($email: String!, $password: String!){
    login(email: $email, password: $password){
      name
      about
      avatar
      email
      token
    }
  }
`

export const useMutationLogin = () => {
  const [loginMutation, {data, error, loading}] = useMutation<QueryMe>(mutationLogin);
  if(data && data.login && data.login.token){
    document.cookie = `token=${encodeURIComponent(data.login.token)}`
  }
  const handleLogin = (credentials: Credentials) => {
    return loginMutation({ 
      variables: credentials
    })
  }

  return {handleLogin, user: data && data.login, error, loading}
}