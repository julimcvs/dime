import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTbBillHistory1720135734071 implements MigrationInterface {
  name = 'UpdateTbBillHistory1720135734071';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bill_history"
        ADD "price" numeric(10, 2) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bill_history"
        DROP COLUMN "price"`);
  }

}
