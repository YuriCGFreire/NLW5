import { getCustomRepository, Repository } from "typeorm"
import { UserRepository } from "../repositories/UserRepository"
import {User} from "../entities/User"

interface IUsersCreate {
    email: string
}

class UsersService {
    private usersRepository: Repository<User>

    constructor(){
        this.usersRepository = getCustomRepository(UserRepository)
    }

    async create({email}: IUsersCreate){
        const userExists = await this.usersRepository.findOne({ email })
        if(userExists){
            return userExists;
        }
        const user = this.usersRepository.create({
            email
        }) 
        await this.usersRepository.save(user)
        return user
    }
}

export{UsersService}