import { pubSub } from "../../pubSub.js"
import { events } from "./events.js"
import { signUp, login, updateUser } from "./model.js"

export const mutations = {  
  
    signUp: (_, {user}) => {
        const newUser = signUp(user)
        pubSub.publish(events.USER_ADDED, { 
            userAdded: newUser
          })
        return newUser
    },
    login: (_, {email, password}, ctx) => login(email, password, ctx),
    updateUser: (_, {user}, ctx) => updateUser(user, ctx),
   
  
}