import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingUserColumn1721671276362 implements MigrationInterface {
  name = 'AddingUserColumn1721671276362';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories"
        ADD "user_id" integer`);
    await queryRunner.query(`ALTER TABLE "expenses"
        ADD "user_id" integer`);
    await queryRunner.query(`ALTER TABLE "bills"
        ADD "user_id" integer`);
    await queryRunner.query(`ALTER TABLE "categories"
        ADD CONSTRAINT "FK_CATEGORY_USER" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "expenses"
        ADD CONSTRAINT "FK_EXPENSE_USER" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "bills"
        ADD CONSTRAINT "FK_BILL_USER" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bills"
        DROP CONSTRAINT "FK_BILL_USER"`);
    await queryRunner.query(`ALTER TABLE "expenses"
        DROP CONSTRAINT "FK_EXPENSE_USER"`);
    await queryRunner.query(`ALTER TABLE "categories"
        DROP CONSTRAINT "FK_CATEGORY_USER"`);
    await queryRunner.query(`ALTER TABLE "bills"
        DROP COLUMN "user_id"`);
    await queryRunner.query(`ALTER TABLE "expenses"
        DROP COLUMN "user_id"`);
    await queryRunner.query(`ALTER TABLE "categories"
        DROP COLUMN "user_id"`);
  }

}
