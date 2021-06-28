import { gql } from "apollo-server-express"

const types = gql`

type User {
  _id: ID!
  name: String!
  email: String!
  password: String
  about: String,
  avatar: String,
}

input UserInput {  
  name: String!
  email: String!
  password: String!
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
  }

type Mutation {
  addCard(card: InputCard!): [Card]!
  deleteCard(id: ID!): [Card]!
  updateCard(id: ID!, card: InputCard!): Card!
  putLikeToCard(id: ID): Card!
  deleteLikeFromCard(id: ID): Card!
  signUp(user: UserInput): User!
  login(email: String!, password: String!): User!
}

type Subscription { 
  userAdded: User!
  cardUpdated: Card!  
  cardsChanged: [Card]!  
}


`
export default types;