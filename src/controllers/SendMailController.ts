import {Request,Response} from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';
import { UserRepository } from '../repositories/UserRepository';
import SendEmailService from '../services/SendEmailService';
import path from 'path';
import AppError from '../errors/AppError';


class SendEmailController{
    async execute(request: Request, response: Response) {
        console.log("entrei")
        const { email, survey_id } = request.body;
        
        const userRepository = getCustomRepository(UserRepository);
        const surveyRepository =  getCustomRepository(SurveyRepository);
        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const user = await userRepository.findOne({ email });

        if (!user) {
            throw new AppError("User don't exists");
        }

        
        const survey = await surveyRepository.findOne({ id: survey_id });

        if (!survey) {
            throw new AppError("Survey don't exists");
        }
        
        const surveyUserAlreadyExists = await surveyUserRepository.findOne({
            where: {user_id: user.id, value : null},
            relations: ["user", "survey"]
        })

        const npsPath = path.resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        const variables = {
            username : user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL
        }

        if(surveyUserAlreadyExists){
            variables.id = surveyUserAlreadyExists.id

            await SendEmailService.execute(
                email,
                survey.title,
                variables,
                npsPath)

            return response.json(surveyUserAlreadyExists)
        }

        const surveyUser = surveyUserRepository.create({
            user_id: user.id,
            survey_id,
        })

        await surveyUserRepository.save(surveyUser)

        variables.id = surveyUser.id;
        await SendEmailService.execute(
            email,
            survey.title,
            variables,
            npsPath)


        return response.json(surveyUser)
    }
}

export { SendEmailController }