import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTbBillHistory1719872297070 implements MigrationInterface {
  name = 'CreateTbBillHistory1719872297070';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "bill_history"
                             (
                                 "id"      SERIAL  NOT NULL,
                                 "month"   integer NOT NULL,
                                 "year"    integer NOT NULL,
                                 "bill_id" integer,
                                 CONSTRAINT "PK_BILL_HISTORY" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "bill_history"
        ADD CONSTRAINT "FK_BILL_HISTORY__BILL" FOREIGN KEY ("bill_id") REFERENCES "bills" ("id")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "bill_history"`);
  }

}
