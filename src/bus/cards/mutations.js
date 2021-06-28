import { pubSub } from "../../pubSub.js"
import { events } from "./events.js"

import { addCard, deleteCard, putLikeToCard, deleteLikeFromCard } from "./model.js"

export const mutations = {  
  
    addCard: (_, {card}, ctx) => {
        const newCard = addCard(card, ctx)
        pubSub.publish(events.CARD_ADDED, { cardsChanged: newCard})
        return newCard
    },
    deleteCard: (_, {id}, ctx) => {
        const newCards = deleteCard(id, ctx)
        pubSub.publish(events.CARD_DELETED, {cardsChanged: newCards})
        return newCards
    },
    putLikeToCard: (_, {id}, ctx) => {
        const newCard = putLikeToCard(id, ctx)
        pubSub.publish(events.CARD_LIKED, { cardUpdated: newCard})
        return newCard
    },
    deleteLikeFromCard: (_, {id}, ctx) => {
        const newCard = deleteLikeFromCard(id, ctx)
        pubSub.publish(events.CARD_UNLIKED, { cardUpdated: newCard})
        return newCard
    },
  
}