import { getCustomRepository, Repository } from "typeorm"
import { SettingsRepository } from "../repositories/SettingsRepository"
import {Setting} from "../entities/setting"

interface ISettingsCreate {
    chat: boolean,
    username: string
}

class SettingsService {

    private settingsRepository: Repository<Setting>;

    constructor(){
        this.settingsRepository = getCustomRepository(SettingsRepository)
    }

    async create({chat, username} : ISettingsCreate){

        //select * from settings where username = username
        const userAlreadyExists = await this.settingsRepository.findOne({username})
        const settings = this.settingsRepository.create({
            chat,
            username,
        })

        if(userAlreadyExists){
            throw new Error("User already exists!")
        }
    
        await this.settingsRepository.save(settings);

        return settings
    }

    async findByUserName(username: string){
        const settings = await this.settingsRepository.findOne({
            username
        })

        return settings
    }

    async update(username:string, chat: boolean){
        await this.settingsRepository.createQueryBuilder()
            .update(Setting)
            .set({ chat })
            .where("username= :username", {
                username
            }).execute()

    }
}

export { SettingsService }