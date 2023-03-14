import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPostalCode1669290326575 implements MigrationInterface {
    name = 'AddPostalCode1669290326575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "postalCode" character varying(5) NOT NULL DEFAULT '00000'`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "postalCode" character varying(5) NOT NULL DEFAULT '00000'`);
        await queryRunner.query(`ALTER TABLE "contract_entity" ADD "postalCode" character varying(5) NOT NULL DEFAULT '00000'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract_entity" DROP COLUMN "postalCode"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "postalCode"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "postalCode"`);
    }

}
