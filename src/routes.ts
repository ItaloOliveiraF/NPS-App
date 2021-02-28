import { Router } from "express";
import { AnswerController } from "./controllers/AnswerController";
import { NpsController } from "./controllers/NpsController";
import { SendEmailController } from "./controllers/SendMailController";
import { SurveyController } from "./controllers/SurveysController";
import { UserController } from './controllers/UsersController';
import { CompaniesController } from './controllers/CompaniesController';

const router =  Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendEmailController = new SendEmailController();
const answerController = new AnswerController();
const npsController = new NpsController();
const companiesController = new CompaniesController();

router.post('/users', userController.create);

router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.show);

router.post('/companies', companiesController.create);

router.post('/sendMail', sendEmailController.execute);

router.get('/answers/:value', answerController.execute);

router.get('/nps/:survey_id', npsController.execute);

export { router }