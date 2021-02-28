import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import * as Yup from 'yup';
import AppError from "../errors/AppError";

class UserController {
    async create(request: Request, response: Response) {
        const { name, email }= request.body;

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required()
        })

        try {
            await schema.validate(request.body, {abortEarly: false});    
        } catch (error) {
            throw new AppError(error);
        }

        const userRepository =  getCustomRepository(UserRepository);

        const userAlrealdyExists = await userRepository.findOne({
            email
        });

        if(userAlrealdyExists){
            throw new AppError("User already exists!");
        }

        const user = userRepository.create({
            name, email
        })
        
        await userRepository.save(user);
        
        return response.status(201).json( user);
    }
}

export { UserController };
