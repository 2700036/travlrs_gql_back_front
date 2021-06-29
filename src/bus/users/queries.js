import { getUsers, getUserMe } from "./model.js"

export const queries = {  
    users: (_, __, ctx)=> getUsers(ctx),
    me: (_, __, ctx)=> getUserMe(ctx),
    
}