import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Company } from "./Company";

@Entity("surveys")
class Survey{

    @PrimaryColumn()
    readonly id: string;

    @Column()
    company_id: string;

    @ManyToOne( () => Company)
    @JoinColumn( {name : "company_id"})
    company: Company;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
    
}

export { Survey }