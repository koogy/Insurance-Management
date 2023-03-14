import { MigrationInterface, QueryRunner } from "typeorm";

export class addNewColumnsUserAndQuote1666717821422 implements MigrationInterface {
    name = 'addNewColumnsUserAndQuote1666717821422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "city_prime" ("city" character varying NOT NULL, "value" integer NOT NULL, CONSTRAINT "PK_932a099bb6eac85485754395307" PRIMARY KEY ("city"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "city" character varying NOT NULL DEFAULT 'Paris'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phoneNumber" character varying(15) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_f2578043e491921209f5dadd080" UNIQUE ("phoneNumber")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "address" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "city" character varying(120) NOT NULL DEFAULT 'Paris'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_f2578043e491921209f5dadd080"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "city"`);
        await queryRunner.query(`DROP TABLE "city_prime"`);
    }

}
