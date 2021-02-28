import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";

class NpsController {
    async execute(request: Request, response: Response) {
        const { survey_id } = request.params;

        const surveyUserRepository =  getCustomRepository(SurveyUserRepository);

        const surveysUsers = await surveyUserRepository.find(
            {
                
                    survey_id,
                    value: Not(IsNull())
                
            }
        ) 

        const detractors = surveysUsers.filter((survey) => 
         survey.value >= 1 && survey.value <= 6).length;

        const neutrals = surveysUsers.filter((survey) => 
            survey.value >= 7 && survey.value <= 8
        ).length;

        const promotors = surveysUsers.filter((survey) => 
            survey.value >= 9 && survey.value <= 10
        ).length;

        
        const totalAnswers = surveysUsers.length;

        const calculeNPS = Number(
            (((promotors - detractors)/totalAnswers) * 100).toFixed(2));

        return response.json({
            detractors,
            neutrals,
            promotors,
            totalAnswers,
            calculeNPS
        })
    }
}

export { NpsController };

