import { getCustomRepository, Repository } from "typeorm"
import { UserRepository } from "../repositories/UserRepository"
import {User} from "../entities/User"


class UsersService {
    private usersRepository: Repository<User>

    constructor(){
        this.usersRepository = getCustomRepository(UserRepository)
    }

    async create(email: string){
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

    async findByEmail(email: string){
        const emailExists = await this.usersRepository.findOne({ email })
        return emailExists
    }
}

export{UsersService}