import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import types from './types.js';
import { resolvers } from './resolvers.js';
import cors from 'cors';
import session from 'express-session';
import { readToken } from './readToken.js';
import { config } from './config.js';
import mongoose from 'mongoose';
import http from 'http';
dotenv.config()

const app = express();

app.use(session(config.sessionOptions));
// app.use(cors(config.corsOptions));
app.use(readToken);
const httpServer = http.createServer(app);

const apolloServer = new ApolloServer({
  typeDefs: types,
  resolvers,  
  introspection: true,
  cors: false,
  context: ({req, res})=>{
    return {req, res}
  },
  playground: {
    
    settings: {
      "request.credentials": "include"
    }
  }
});

apolloServer.applyMiddleware({ app  });
apolloServer.installSubscriptionHandlers(httpServer);

mongoose.connect(config.mongo.url, {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connected to Database");

  httpServer.listen(config.port, ()=>{
    console.log(`✅ magic happens on: http://localhost:${config.port}${apolloServer.graphqlPath}`)
    console.log(`✅ subscriptions ready at: ws://localhost:${config.port}${apolloServer.subscriptionsPath}`)
  })
  }).catch((err) => {
      console.log("Not Connected to Database ERROR! ", err);
  });
