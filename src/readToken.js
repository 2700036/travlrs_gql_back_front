import jwt from 'jsonwebtoken';
import { AuthenticationError } from "apollo-server-express";


export const readToken = (req, res, next) => {
  const {token} = req.session;
  
  if(token){
    let payload;
    try { 
      payload = jwt.verify(token, process.env.JWT_SECRET);      
      req.userId = payload.userId;
         
    } 
    catch (e) {
      console.log('error');         
      next();
      return 
    }
  }
  next()
  
}