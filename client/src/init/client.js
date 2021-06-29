import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink, split } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const root = 'travlrs-gql.herokuapp.com/graphql';
const uri = `https://${root}`;
const httpLink = createHttpLink({ uri, credentials: 'include'
});
const wsLink = new WebSocketLink({
  uri: `wss://${root}`,
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {    
    const difinition = getMainDefinition(query);
    
    return difinition.kind === 'OperationDefinition' && 
    difinition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache();

export const client = new ApolloClient({
  cache,
  link, 
  credentials: 'include' 
});
