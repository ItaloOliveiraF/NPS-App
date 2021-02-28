import { EntityRepository, Repository } from "typeorm";
import { Company } from "../models/Company";

@EntityRepository(Company)
class CompanyRepository extends Repository<Company>{}

export { CompanyRepository };
