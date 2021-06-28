import { getCardById, getCards } from "./model.js"

export const queries = {  
    cards: ()=> getCards(),
    card: (_, {id}) => getCardById(id)  
}