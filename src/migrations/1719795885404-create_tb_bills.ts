import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTbBills1719795885404 implements MigrationInterface {
    name = 'CreateTbBills1719795885404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bills" ("id" SERIAL NOT NULL, "description" character varying(100) NOT NULL, "price" numeric NOT NULL, "recurrentPaymentDay" integer NOT NULL, "sendNotification" boolean NOT NULL, "isFixedPrice" boolean NOT NULL, "isDeleted" boolean NOT NULL, CONSTRAINT "PK_a56215dfcb525755ec832cc80b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "query-result-cache"`);
        await queryRunner.query(`DROP TABLE "bills"`);
    }

}
