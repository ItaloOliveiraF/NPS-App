import { Request, Response } from "express"
import { getCustomRepository } from "typeorm";
import { CompanyRepository } from "../repositories/CompanyRepository";

class CompaniesController{
    async create(request: Request, response: Response) {
        const { name, segment } = request.body;

        const companyRepository = getCustomRepository(CompanyRepository);

        const company = companyRepository.create({
            name, segment
        })

        await companyRepository.save(company);

        return response.status(200).json(company);
    }
}

export { CompaniesController }