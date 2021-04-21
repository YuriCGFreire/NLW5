import { getCustomRepository } from "typeorm"
import { SettingsRepository } from "../repositories/SettingsRepository"

interface ISettingsCreate {
    chat: boolean,
    username: string
}

class SettingsService {

    async create({chat, username} : ISettingsCreate){
        const settingsRepository = getCustomRepository(SettingsRepository)

        //select * from settings where username = username
        const userAlreadyExists = await settingsRepository.findOne({username})
        const settings = settingsRepository.create({
            chat,
            username,
        })

        if(userAlreadyExists){
            throw new Error("User already exists!")
        }
    
        await settingsRepository.save(settings);

        return settings
    }
}

export { SettingsService }