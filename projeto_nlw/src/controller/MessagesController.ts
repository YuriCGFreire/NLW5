import {Request, Response} from "express"
import { MessagesService } from "../services/MessagesService"

class MessagesController{
    async create(req: Request, res: Response){
        const {admin_id, text, user_id} = req.body
        const messagesService = new MessagesService()
        try{
            const message = await messagesService.create({
                admin_id,
                text,
                user_id
            })
            return res.json(message)
        }catch(err){
            res.json({ message: err.message })
        }
    }
}

export { MessagesController }