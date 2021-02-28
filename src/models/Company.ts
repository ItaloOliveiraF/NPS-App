import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("companies")
class Company{

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    segment: string;

    @CreateDateColumn()
    createdAt: Date;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
    
}

export { Company }