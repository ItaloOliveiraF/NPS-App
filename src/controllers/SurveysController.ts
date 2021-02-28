import {Request, Response} from "express";
import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import { CompanyRepository } from "../repositories/CompanyRepository";
import { SurveyRepository } from "../repositories/SurveyRepository";

class SurveyController {
    async create(request:Request, response: Response){
        const { company_id ,title, description } = request.body;

        const surveyRepository = getCustomRepository(SurveyRepository);
        const companyRepository = getCustomRepository(CompanyRepository);

        const company = await companyRepository.findOne({id: company_id});

        if(!company){
            throw new AppError("Company does not exists")
        }

        const survey = surveyRepository.create({
            company_id, title, description
        })

        await surveyRepository.save(survey)

        const surveyResponse = await surveyRepository.findOne({
            where: {id : survey.id},
            relations: ["company"]
        })
        
        return response.status(201).json(surveyResponse)
    }

    async show(request:Request, response: Response){
        const surveyRepository = getCustomRepository(SurveyRepository);

        const all = await surveyRepository.find();

        response.json(all);
    }
}

export { SurveyController }