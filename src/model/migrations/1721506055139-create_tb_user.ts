import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTbUser1721506055139 implements MigrationInterface {
  name = 'CreateTbUser1721506055139';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "users"
                             (
                                 "id"        SERIAL            NOT NULL,
                                 "username"  character varying(100) NOT NULL,
                                 "email"     character varying(100) NOT NULL,
                                 "password"  character varying(100) NOT NULL,
                                 "createdAt" TIMESTAMP         NOT NULL DEFAULT now(),
                                 "updatedAt" TIMESTAMP         NOT NULL DEFAULT now(),
                                 CONSTRAINT "PK_USER" PRIMARY KEY ("id")
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }

}
