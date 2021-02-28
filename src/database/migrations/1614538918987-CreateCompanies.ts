import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCompanies1614538918987 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "companies",
                columns: [{
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "string"
                },
                {
                    name: "segment",
                    type: "string"
                },
                {
                    name:"createdAt",
                    type: "timestamp",
                    default: "now()"
                }
            ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("companies");
    }

}
