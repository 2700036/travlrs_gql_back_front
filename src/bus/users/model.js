import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AuthenticationError } from 'apollo-server-express';
import { ApolloError } from 'apollo-server-express';
import pkg from 'mongoose';
const { Schema, model } = pkg;


const createHashedPassword = async (password) => await bcrypt.hash(password, 10) 

const options = {
  new: true, // обработчик then получит на вход обновлённую запись
  runValidators: true, // данные будут валидированы перед изменением
  // upsert: true // если пользователь не найден, он будет создан
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: true,
      unique: true, 
    },
    email: {
      type: String,
      required: true,
      unique: true,      
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    }
    
  },
  {
    versionKey: false,
  }
);

const User = model('User', userSchema);


const findUserbyEmail = async (email) => {
  return User.findOne({email}).then((b) => b).catch(() => {
  throw new ApolloError(`user with email:${email} not found`);
})};


export const getUsers = async (ctx) => {
  const _id = ctx.req.userId;
  if(!_id)throw new AuthenticationError(`Authorization required!`) 
  const users = await User.find({})  
  const Users = users.map(u => ({...u._doc, password: null}))
    
  return Users
}
export const getUserMe = async (ctx) => {
  const _id = ctx.req.userId;
  if(!_id)throw new AuthenticationError(`Authorization required!`) 
  const user = await User.findById({_id})
  if(!user)throw AuthenticationError('User not found!');
  const newUser = {...user._doc, password: null}
  console.log('⚛️ : user', newUser)
  return newUser
}

export const signUp = async (user) => {  
  const isUserExist = await findUserbyEmail(user.email)
  if(isUserExist)throw new Error(`User with email ${user.email} already exists`)
  const { email, password, name } = user;
  const hashedPassword = await createHashedPassword(password)
  const newUser = await User.create({ email, name, password: hashedPassword })
    
  return newUser     
}


export const login = async (email, password, ctx) => {

  const isUserExist = await findUserbyEmail(email)
  if(!isUserExist) throw new AuthenticationError(`Неверная связка имени и пароля`)
  const isValidPassword = await bcrypt.compare(password, isUserExist.password);
  
  if(!isValidPassword)throw new AuthenticationError(`Неверная связка имени и пароля`)

  const token = jwt.sign({ userId: isUserExist._doc._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  
  ctx.req.session.token = token;
  return isUserExist
}
