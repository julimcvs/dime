import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTbBills1719796009199 implements MigrationInterface {
  name = 'CreateTbBills1719796009199';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "bills"
                             (
                                 "id"                  SERIAL                 NOT NULL,
                                 "description"         character varying(100) NOT NULL,
                                 "price"               numeric(10, 2)                NOT NULL,
                                 "recurrentPaymentDay" integer                NOT NULL,
                                 "sendNotification"    boolean                NOT NULL,
                                 "isFixedPrice"        boolean                NOT NULL,
                                 "isDeleted"           boolean                NOT NULL,
                                 CONSTRAINT "PK_BILLS" PRIMARY KEY ("id")
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "bills"`);
  }

}
