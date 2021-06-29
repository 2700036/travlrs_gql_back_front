import { gql } from 'apollo-server-express';

const types = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    about: String
    avatar: String!
  }

  type UserToken {
    _id: ID!
    name: String!
    email: String!
    password: String
    about: String
    avatar: String
    token: String
  }

  input InputSignUp { 
    name: String!   
    email: String!
    password: String!    
  }
  input InputUser {    
    name: String  
    about: String
    avatar: String    
  }

  type Card {
    _id: ID!
    name: String!
    link: String!
    owner: User!
    likes: [User]!
    createdAt: String!
  }

  input InputCard {
    name: String!
    link: String!
  }

  type Query {
    cards: [Card!]!
    card(id: ID!): Card!
    users: [User!]!
    me: User!
  }

  type Mutation {
    addCard(card: InputCard!): [Card]!
    deleteCard(id: ID!): [Card]!
    updateCard(id: ID!, card: InputCard!): Card!
    putLikeToCard(id: ID): Card!
    deleteLikeFromCard(id: ID): Card!
    updateUser(user: InputUser!): User!
    signUp(user: InputSignUp!): User!
    login(email: String!, password: String!): UserToken!
  }

  type Subscription {
    userAdded: User!
    cardUpdated: Card!
    cardsChanged: [Card]!
  }
`;
export default types;
