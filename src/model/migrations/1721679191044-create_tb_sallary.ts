import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTbSallary1721679191044 implements MigrationInterface {
  name = 'CreateTbSallary1721679191044';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "sallary"
                             (
                                 "id"      SERIAL  NOT NULL,
                                 "sallary" numeric NOT NULL,
                                 "user_id" integer,
                                 CONSTRAINT "PK_SALLARY" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "sallary"
        ADD CONSTRAINT "FK_SALLARY_USER" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sallary"
        DROP CONSTRAINT "FK_SALLARY_USER"`);
    await queryRunner.query(`DROP TABLE "sallary"`);
  }

}
