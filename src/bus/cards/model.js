import { ApolloError, AuthenticationError } from 'apollo-server-express';
import pkg from 'mongoose';
const { Schema, model } = pkg;

const options = {
  new: true, // обработчик then получит на вход обновлённую запись
  runValidators: true, // данные будут валидированы перед изменением
  // upsert: true // если пользователь не найден, он будет создан
};

const cardSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: true,
    },
    link: {
      type: String,
      required: true,
      validate: 
      {
      validator: v=> {
        return /^(http:\/\/|https:\/\/)(www.)?\S{1,256}/.test(v)
      },
      message: "Cсылка неверного формата"
      }
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    likes: [{
      type: [Schema.Types.ObjectId],
      ref: 'User',
    }],
    createdAt: {
      type: Date,
      default: Date.now
    },
  },
  {
    versionKey: false,
  }
);

const Card = model('Card', cardSchema);

export const getCards = async () => {
  return await Card.find({}).populate('owner', '_id name about avatar').populate('likes', '_id name about avatar')
  
};

export const getCardById = async (id) => {
  try {
    return await Card.findById(id)
  } catch (err) {
    throw new ApolloError(`card with ID:${id} not found`);
  }
  
};

export const addCard = async (card, ctx) => {
  const _id = ctx.req.userId;
  if(!_id)throw new AuthenticationError(`Authorization required!`) 
  try {   
    const _id = ctx.req.userId;
    await Card.create({name: card.name, link: card.link, owner: _id});
    
    return await getCards();
  } catch (err) {
    throw new Error(err);
  }
  
};

export const deleteCard = async (id, ctx) => {
  const _id = ctx.req.userId;
  if(!_id)throw new AuthenticationError(`Authorization required!`)  
  try {
    const deletedCard = await getCardById(id);
    if (!deletedCard) return;
    
    await Card.findByIdAndRemove(id);
    return await getCards()    
  } catch (err) {
    throw new ApolloError(`card with ID:${id} not found`);
  }

};
export const putLikeToCard = async (id, ctx) => {
  const _id = ctx.req.userId;
  if(!_id)throw new AuthenticationError(`Authorization required!`)  
  try {
    return await Card.findByIdAndUpdate(id, { $addToSet: { likes: _id }}, { new: true }).populate('owner', '_id name about avatar').populate('likes', '_id name about avatar')
  } catch (err) {
    throw new ApolloError(err);
  }

};
export const deleteLikeFromCard = async (id, ctx) => {
  const _id = ctx.req.userId;
  if(!_id)throw new AuthenticationError(`Authorization required!`)  
  try {
    return await Card.findByIdAndUpdate(id, { $pull: { likes: _id }}, { new: true })
       
  } catch (err) {
    throw new ApolloError(err);
  }

};

// export const updateCard = async (id, card) => {

//   const updatedCard = await getCardById(id);
  
//   if (!updatedCard) return;
//   const { title, author } = updatedCard._doc;
  
//   return await Card.findByIdAndUpdate(id, { title, author, ...card }, options);
// };
