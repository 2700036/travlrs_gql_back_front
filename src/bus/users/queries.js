import { getUsers } from "./model.js"

export const queries = {  
    users: (_, __, ctx)=> getUsers(ctx),
    
}