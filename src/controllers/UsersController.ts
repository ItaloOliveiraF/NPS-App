import { Request, Response} from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

class UserController {
    async create(request: Request, response: Response) {
        const { name, email }= request.body;

        const userRepository =  getRepository(User);

        const user = userRepository.create({
            name, email
        })
        
        await userRepository.save(user);
        
        return response.json( user);
    }
}

export { UserController };