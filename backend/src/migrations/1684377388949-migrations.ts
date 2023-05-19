import { MigrationInterface, QueryRunner } from "typeorm"

export class migrations1684377388949 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO discount_type (discount_type_name) VALUES ('Por atención');
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
