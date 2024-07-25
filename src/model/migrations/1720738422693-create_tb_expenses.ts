import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTbExpenses1720738422693 implements MigrationInterface {
    name = 'CreateTbExpenses1720738422693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "description" character varying(100) NOT NULL, CONSTRAINT "PK_CATEGORIES" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expenses" ("id" SERIAL NOT NULL, "description" character varying(100) NOT NULL, "price" numeric NOT NULL, "paymentDay" TIMESTAMP NOT NULL, "isDeleted" boolean NOT NULL, "categoryId" integer, CONSTRAINT "PK_EXPENSES" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "expenses"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
