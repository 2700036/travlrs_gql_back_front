import { User } from '../types';
import { gql, useMutation } from '@apollo/react-hooks';

type MutationSignUp = {
  signUp: User;
};

type SignUpVariables = {
  user: InputSignUp
}

type InputSignUp = {
  name: string;
  email: string;
  password: string;
};

const mutationSignUp = gql`
  mutation SignUp($user: InputSignUp!) {
    signUp(user: $user) {
      about
      avatar
      _id
      email
      name
    }
  }
`;

export const useMutationSignUp = () => {
  const [signUpMutation, { data, error, loading }] = useMutation<MutationSignUp, SignUpVariables>(mutationSignUp);

  const handleSignUp = (credentials: InputSignUp) => { 
    return signUpMutation({
      variables: {
        user: credentials
      },
    });
  };

  return { handleSignUp, user: data && data.signUp, error: error && error.toString(), loading };
};
