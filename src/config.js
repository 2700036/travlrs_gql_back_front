import dotenv from 'dotenv';
dotenv.config();

export const config = {
  environment: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 4000,
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/TrvlrsGQL_DB'
  },
  corsOptions: {
    origin: `http://localhost:${process.env.PORT || 4000}`,
    credentials: true,
  },
  sessionOptions: {
    key: 'token',
    secret: process.env.JWT_SECRET,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 15 * 60 *1000,
      
    },
  }
}