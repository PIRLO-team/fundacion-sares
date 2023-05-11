import { MigrationInterface, QueryRunner } from "typeorm"

export class migrations1683781890648 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO acquisition_type (acquisition_name) VALUES ('Por compra'), ('Intercambio de bienes'), ('Donativo');
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
